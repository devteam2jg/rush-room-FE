import { useEffect, useRef, useState } from 'react';
import { Device } from 'mediasoup-client';
import {
  Consumer,
  DtlsParameters,
  MediaKind,
  Producer,
  RtpCapabilities,
  RtpParameters,
  Transport,
  TransportOptions,
} from 'mediasoup-client/lib/types';
import { useParams } from 'react-router-dom';
import { Box, Image, Text } from '@chakra-ui/react';
import VideoSocketStore from '../store/VideoSocketStore';
import SpeakingIndicator from '../components/Bid/SpeakingIndicator';
import SpringModal from '../components/Modal/SpringModal';
import { blinkAnimation } from '../components/Bid/BiddingItemResult';
import useAuthStore from '../store/UserAuthStore';

interface JoinRoomResponse {
  sendTransportOptions: TransportOptions;
  recvTransportOptions: TransportOptions;
  rtpCapabilities: RtpCapabilities;
  peerIds: string[];
  existingProducers: {
    producerId: string;
    peerId: string;
    kind: string;
  }[];
  error?: string;
  isAgreed: boolean;
}

interface MediaProducers {
  videoProducer: Producer | null;
  audioProducer: Producer | null;
}

interface MediaConsumers {
  videoConsumer: Consumer | null;
  audioConsumer: Consumer | null;
}

interface TestProps {
  isOwner: boolean;
  cameraOff: boolean;
}

function RTCTestPage({ isOwner, cameraOff }: TestProps) {
  const socket = VideoSocketStore((state) => state.socket);
  const { auctionId } = useParams();
  const [screenProducer, setScreenProducer] = useState<Producer | null>(null);
  const [joined, setJoined] = useState(false);
  const [peers, setPeers] = useState<any[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const sendTransportRef = useRef<Transport | null>(null);
  const mediaProducers = useRef<MediaProducers>({} as MediaProducers);
  const audioContextRef = useRef<AudioContext | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const deviceRef = useRef<Device | null>(null);
  const mediaConsumers = useRef<MediaConsumers>({
    videoConsumer: null,
    audioConsumer: null,
  });
  const recvTransportRef = useRef<Transport | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lastReceivedEvent, setLastReceivedEvent] = useState<string>('');
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const user = useAuthStore((state) => state.user);

  console.log('agreed', agreed);

  useEffect(() => {
    // 오디오 컨텍스트 초기화
    const initAudioContext = async () => {
      try {
        console.log('생성?');
        if (!audioContextRef.current) {
          console.log('응 생성');
          audioContextRef.current = new (window.AudioContext ||
            window.webkitAudioContext)();
        }
      } catch (err) {
        console.error('Failed to initialize AudioContext:', err);
      }
    };

    initAudioContext();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) {
      console.log('Socket not initialized, skipping event registration');
      return undefined;
    }

    console.log('Registering event listeners, socket ID:', socket.id);

    // Debug listener registration
    const onSellerAgreedResponse = (response) => {
      console.log('Received seller-agreed-response:', response);
      setLastReceivedEvent('seller-agreed-response');
      setAgreed(response.isAgreed);
    };

    const onNewPeer = ({ peerId }) => {
      console.log('Received new-peer event:', peerId);
      setLastReceivedEvent('new-peer');
      setPeers((prevPeers) => [...prevPeers, peerId]);
    };

    const onPeerLeft = ({ peerId }) => {
      console.log('Received peer-left event:', peerId);
      setLastReceivedEvent('peer-left');
      setPeers((prevPeers) => prevPeers.filter((id) => id !== peerId));
    };

    const onStopProducer = () => {
      console.log('Received stop-producer event');
      setLastReceivedEvent('stop-producer');
      stopCamera();
      setIsVideo(false);
    };

    const onStopConsumer = () => {
      console.log('3. stop consumer-----', mediaConsumers.current);
      if (mediaConsumers.current) {
        mediaConsumers.current.videoConsumer?.close();
        mediaConsumers.current.audioConsumer?.close();
        mediaConsumers.current = { videoConsumer: null, audioConsumer: null };
      }
    };

    const onDisagreedCamera = (response) => {
      setAgreed(response.isAgreed);
    };

    // Register all event listeners
    socket.on('seller-disagreed-camera-response', onDisagreedCamera);
    socket.on('stop-consumer', onStopConsumer);
    socket.on('seller-agreed-response', onSellerAgreedResponse);
    socket.on('new-peer', onNewPeer);
    socket.on('peer-left', onPeerLeft);
    socket.on('stop-producer', onStopProducer);

    if (auctionId && !joined) {
      console.log('Attempting to join room:', auctionId);
      joinRoom();
    }

    return () => {
      cleanupResources(); // 기존 cleanup 대신 통합된 cleanup 함수 사용
      socket.off('stop-consumer');
      socket.off('new-peer');
      socket.off('peer-left');
      socket.off('stop-producer');
      socket.off('seller-agreed-response');
    };
  }, [socket]);

  console.log('joined', joined);
  console.log('isOwner', isOwner);
  console.log('agreed', agreed);

  useEffect(() => {
    if (!joined) return;

    if (isOwner && agreed) {
      console.log('joined:', joined, 'isOwner:', isOwner, 'agreed:', agreed);
      startCamera();
    }
  }, [agreed, joined]);

  useEffect(() => {
    setAgreed(false);
    if (cameraOff) {
      stopCamera();
    }
  }, [cameraOff]);

  const createDevice = async (rtpCapabilities: RtpCapabilities) => {
    const newDevice = new Device();
    await newDevice.load({ routerRtpCapabilities: rtpCapabilities });
    deviceRef.current = newDevice; // deviceRef에 값 할당
    return newDevice;
  };

  const createSendTransport = (
    initialDevice: Device,
    transportOptions: TransportOptions
  ) => {
    const newSendTransport =
      initialDevice.createSendTransport(transportOptions);
    newSendTransport.on(
      'connect',
      (
        { dtlsParameters }: { dtlsParameters: DtlsParameters },
        callback,
        errback
      ) => {
        try {
          socket?.emit('connect-transport', {
            transportId: newSendTransport.id,
            dtlsParameters,
            roomId: auctionId,
            peerId: socket?.id,
          });
          callback();
        } catch (error) {
          errback(error);
        }
      }
    );

    newSendTransport.on(
      'produce',
      (
        {
          kind,
          rtpParameters,
        }: { kind: MediaKind; rtpParameters: RtpParameters },
        callback,
        errback
      ) => {
        try {
          socket?.emit(
            'produce',
            {
              transportId: newSendTransport.id,
              kind,
              rtpParameters,
              roomId: auctionId,
              peerId: socket?.id,
            },
            (producerId) => {
              callback({ id: producerId });
            }
          );
        } catch (error) {
          errback(error);
        }
      }
    );
    sendTransportRef.current = newSendTransport;
    // setSendTransport(newSendTransport);
    return newSendTransport;
  };

  const createRecvTransport = (
    initialDevice: Device,
    transportOptions: TransportOptions
  ) => {
    const newRecvTransport =
      initialDevice.createRecvTransport(transportOptions);
    newRecvTransport.on('connect', ({ dtlsParameters }, callback, errback) => {
      try {
        socket?.emit('connect-transport', {
          transportId: newRecvTransport.id,
          dtlsParameters,
          roomId: auctionId,
          peerId: socket?.id,
        });
        callback();
      } catch (error) {
        errback(error);
      }
    });
    recvTransportRef.current = newRecvTransport;
    return newRecvTransport;
  };

  const cleanupResources = () => {
    stopCamera();
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (sendTransportRef.current) {
      sendTransportRef.current.close();
      sendTransportRef.current = null;
    }
    if (recvTransportRef.current) {
      recvTransportRef.current.close();
      recvTransportRef.current = null;
    }
    if (deviceRef.current) {
      deviceRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setJoined(false);
    setIsVideo(false);
    setAgreed(false);
  };

  const joinRoom = () => {
    console.log('------socket', socket);
    if (!socket || !auctionId) return;

    if (joined) {
      cleanupResources();
    }

    console.log('거 드가쇼');
    socket.emit(
      'join-room',
      { roomId: auctionId, peerId: socket.id },
      async (response: JoinRoomResponse) => {
        if (response.error) {
          console.error('Error joining room:', response.error);
          return;
        }

        const {
          sendTransportOptions,
          recvTransportOptions,
          rtpCapabilities,
          peerIds,
          existingProducers,
          isAgreed,
        } = response;

        setAgreed(isAgreed);

        const newDevice = await createDevice(rtpCapabilities);
        createSendTransport(newDevice, sendTransportOptions);
        createRecvTransport(newDevice, recvTransportOptions);

        socket.on('new-producer', handleNewProducer);
        setPeers(peerIds.filter((id) => id !== socket.id));

        for (const producerInfo of existingProducers) {
          await consume(producerInfo);
        }

        setJoined(true);

        if (isOwner && isAgreed) {
          startCamera();
        }
      }
    );
  };

  const leaveRoom = () => {
    if (!socket) return;

    socket.emit('leave-room', (response) => {
      if (response && response.error) {
        console.error('Error leaving room:', response.error);
        return;
      }
      console.log('Left room');
      // 로컬 상태 초기화
      setJoined(false);
      setPeers([]);
      // 리소스 정리
      stopCamera();
      if (sendTransportRef.current) {
        sendTransportRef.current.close();
        // setSendTransport(null);
        sendTransportRef.current = null;
      }
      if (recvTransportRef.current) {
        recvTransportRef.current.close();
        recvTransportRef.current = null;
      }
      if (deviceRef.current) {
        deviceRef.current = null;
      }
      // 이벤트 리스너 제거
      socket.off('new-producer', handleNewProducer);
    });
  };

  const startProducing = async () => {
    console.log('==== Start Producing Called ====');
    console.log('SendTransport State:', sendTransportRef.current);

    if (!sendTransportRef.current) {
      console.error('Send transport not initialized');
      return;
    }

    try {
      console.log('Requesting media stream...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 720 },
          height: { ideal: 1280 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      setLocalStream(stream);

      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      if (videoTrack) {
        console.log('Creating video producer...');
        const newVideoProducer = await sendTransportRef.current.produce({
          track: videoTrack,
        });
        console.log('Video producer created:', newVideoProducer.id);
        mediaProducers.current.videoProducer = newVideoProducer;
      }

      if (audioTrack) {
        console.log('Creating audio producer...');
        const newAudioProducer = await sendTransportRef.current.produce({
          track: audioTrack,
        });
        console.log('Audio producer created:', newAudioProducer.id);
        mediaProducers.current.audioProducer = newAudioProducer;
      }

      setIsVideo(true);
    } catch (error) {
      console.error('StartProducing Error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      stopCamera();
      socket?.emit('seller-disagreed-camera', { roomId: auctionId });
    }
  };

  const stopConsumers = () => {
    if (mediaConsumers.current.videoConsumer) {
      mediaConsumers.current.videoConsumer.close();
      mediaConsumers.current.videoConsumer = null;
    }
    if (mediaConsumers.current.audioConsumer) {
      mediaConsumers.current.audioConsumer.close();
      mediaConsumers.current.audioConsumer = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (audioRef.current) {
      audioRef.current.srcObject = null;
    }
  };

  const stopCamera = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
        track.enabled = false; // 트랙 비활성화 추가
      });
      setLocalStream(null);
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (mediaProducers.current.videoProducer) {
      mediaProducers.current.videoProducer.close();
      mediaProducers.current.videoProducer = null;
    }

    if (mediaProducers.current.audioProducer) {
      mediaProducers.current.audioProducer.close();
      mediaProducers.current.audioProducer = null;
    }

    // Consumer 정리 추가
    stopConsumers();
    setIsVideo(false);
  };

  const handleNewProducer = async ({ producerId, peerId, kind }) => {
    console.log(`New producer: ${producerId} from ${peerId} of kind ${kind}`);
    // stopCamera();
    setIsVideo(true);
    await consume({ producerId, peerId, kind });
  };

  const consume = async ({ producerId, peerId, kind }) => {
    const device = deviceRef.current;
    const recvTransport = recvTransportRef.current;
    if (!device || !recvTransport) {
      console.log('Device or RecvTransport not initialized');
    }

    socket.emit(
      'consume',
      {
        transportId: recvTransport.id,
        producerId,
        roomId: auctionId,
        peerId: socket.id,
        rtpCapabilities: device.rtpCapabilities,
      },
      async (response) => {
        if (response.error) {
          console.error('Error consuming:', response.error);
          return;
        }

        const { consumerData } = response;

        const consumer = await recvTransport.consume({
          id: consumerData.id,
          producerId: consumerData.producerId,
          kind: consumerData.kind,
          rtpParameters: consumerData.rtpParameters,
        });
        if (kind === 'video') mediaConsumers.current.videoConsumer = consumer;
        if (kind === 'audio') mediaConsumers.current.audioConsumer = consumer;

        // Consumer를 resume합니다.
        await consumer.resume();

        console.log('New consumer:', consumer.kind);
        // 수신한 미디어를 재생
        const remoteStream = new MediaStream();
        remoteStream.addTrack(consumer.track);

        if (consumer.kind === 'video') {
          // const videoElement = document.createElement('video');
          const videoElement = localVideoRef.current;
          videoElement.srcObject = remoteStream;
          videoElement.autoplay = true;
          videoElement.style.width = '100%'; // 가로 크기를 자동으로 설정
          videoElement.style.height = 'calc(var(--vh, 1vh) * 100)'; // 세로 크기를 화면에 맞게 설정
          videoElement.style.objectFit = 'cover';
        } else if (consumer.kind === 'audio') {
          const audioElement = audioRef.current;
          audioElement.srcObject = remoteStream;
          // audioElement.autoplay = true;

          // 오디오 컨텍스트 생성 및 초기화
          if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext ||
              window.webkitAudioContext)();
          }

          // 오디오 분석 설정
          const source =
            audioContextRef.current.createMediaStreamSource(remoteStream);
          const analyser = audioContextRef.current.createAnalyser();
          analyserRef.current = analyser;

          console.log('analyser', analyserRef.current);

          // 분석 설정
          analyser.fftSize = 256;
          analyser.smoothingTimeConstant = 0.5;

          source.connect(analyser);
          // 오디오 출력을 위한 연결
          source.connect(audioContextRef.current.destination);

          // 사용자 인터랙션 핸들러
          const resumeAudio = async () => {
            try {
              if (audioContextRef.current?.state === 'suspended') {
                await audioContextRef.current.resume();
              }
              await audioElement.play();
              document.removeEventListener('click', resumeAudio);
              document.removeEventListener('touchstart', resumeAudio);
            } catch (err) {
              console.error('Audio playback failed:', err);
            }
          };

          document.addEventListener('click', resumeAudio);
          document.addEventListener('touchstart', resumeAudio);

          try {
            await audioElement.play();
          } catch (err) {
            setIsOpen(true);
            console.log('Waiting for user interaction to play audio');
          }
        }
      }
    );
  };
  const startScreenShare = async () => {
    if (!sendTransportRef.current) return;

    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    const screenTrack = stream.getVideoTracks()[0];

    const newScreenProducer = await sendTransportRef.current.produce({
      track: screenTrack,
    });
    setScreenProducer(newScreenProducer);

    screenTrack.onended = () => {
      stopScreenShare();
    };
  };

  const stopScreenShare = () => {
    if (screenProducer) {
      screenProducer.close();
      setScreenProducer(null);
    }
  };

  const startCamera = async () => {
    console.log('==== Start Camera Called ====');
    console.log('Current Socket State:', socket?.connected);
    console.log('Current MediaProducers:', mediaProducers.current);

    stopCamera();

    if (!socket || !socket.connected) {
      console.error('Socket Connection Error - Socket:', socket);
      return;
    }

    try {
      // 이전 producer 정리
      const response = await new Promise<boolean>((resolve) => {
        console.log('Emitting stop-prev-producer');
        socket.emit(
          'stop-prev-producer',
          { roomId: auctionId, peerId: socket.id },
          (res: boolean) => {
            console.log('Stop Previous Producer Response:', res);
            resolve(res);
          }
        );
      });

      console.log('After stopping previous producer');
      await startProducing();
    } catch (error) {
      console.error('StartCamera Error:', error);
    }
  };

  console.log('isVideo', isVideo);

  return (
    <Box
      bgImage="url('/images/defaultImage.png')"
      bgSize="cover"
      bgPosition="center"
      width="100%"
      height="100%"
    >
      <SpeakingIndicator analyser={analyserRef.current} />
      <Box display={isOwner ? 'none' : 'block'}>
        <Text
          animation={`${blinkAnimation} 1.5s ease-in-out infinite`}
          backgroundColor="transparent"
          textAlign="center"
          fontWeight="700"
          color="#FCFCFD"
          left={0}
          right={0}
          position="absolute"
          bottom="50px"
          display={isOpen ? 'block' : 'none'}
          fontSize="24px"
          zIndex={100}
          onClick={() => setIsOpen(false)}
        >
          아무 곳이나 눌러주세요
        </Text>
        <SpringModal p="" isOpen={isOpen} setIsOpen={setIsOpen}>
          <Box height="1px" />
        </SpringModal>
      </Box>

      <div style={{ display: 'none' }}>
        <h2>Room: {auctionId || '-'}</h2>
        {!joined ? (
          <div>
            <input type="text" placeholder="Room ID" value={auctionId} />
            <button onClick={joinRoom}>Join Room</button>
          </div>
        ) : (
          <div>
            <button onClick={leaveRoom}>Leave Room</button>
            <button onClick={localStream ? stopCamera : startCamera}>
              {localStream ? 'Stop Camera' : 'Start Camera'}
            </button>
            <button
              onClick={screenProducer ? stopScreenShare : startScreenShare}
            >
              {screenProducer ? 'Stop Screen Share' : 'Start Screen Share'}
            </button>
          </div>
        )}
        <div>
          <h2>Local Video</h2>
        </div>
        <div>
          <h2>Remote Media</h2>
          <div id="remote-media" />
        </div>
      </div>
      <div style={{ display: agreed ? 'block' : 'none' }}>
        {/* <div style={{ display: agreed && isVideo ? 'block' : 'none' }}> */}
        <audio ref={audioRef} playsInline controls={false}>
          <track />
        </audio>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: 'calc(var(--vh, 1vh) * 100)',
            objectFit: 'cover',
          }}
        />
      </div>
      {/* <Image
        display={agreed ? 'none' : 'block'}
        // display={agreed && isVideo ? 'none' : 'block'}
        width="100%"
        height="100%"
        // src={agreed && isVideo ? '' : '/images/back_temp.jpeg'}
        src={agreed ? '' : '/images/back_temp.jpeg'}
        objectFit="cover"
      /> */}
    </Box>
  );
}

export default RTCTestPage;
