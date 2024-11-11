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
import { Image } from '@chakra-ui/react';
import { log } from 'console';
import VideoSocketStore from '../store/VideoSocketStore';

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
  const [isSeller, setIsSeller] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const sendTransportRef = useRef<Transport | null>(null);
  const mediaProducers = useRef<MediaProducers>({} as MediaProducers);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const deviceRef = useRef<Device | null>(null);
  const mediaConsumers = useRef<MediaConsumers>({
    videoConsumer: null,
    audioConsumer: null,
  });
  const recvTransportRef = useRef<Transport | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lastReceivedEvent, setLastReceivedEvent] = useState<string>('');

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    // Debug listener registration
    const onSellerAgreedResponse = (response) => {
      setLastReceivedEvent('seller-agreed-response');
      setAgreed(response.isAgreed);
    };

    const onNewPeer = ({ peerId }) => {
      setLastReceivedEvent('new-peer');
      setPeers((prevPeers) => [...prevPeers, peerId]);
    };

    const onPeerLeft = ({ peerId }) => {
      setLastReceivedEvent('peer-left');
      setPeers((prevPeers) => prevPeers.filter((id) => id !== peerId));
    };

    const onStopProducer = () => {
      setLastReceivedEvent('stop-producer');
      stopCamera();
    };

    const onStopConsumer = () => {
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
      joinRoom();
    }

    return () => {
      setIsVideo(false);

      stopCamera();
      socket.off('stop-consumer');
      socket.off('new-peer');
      socket.off('peer-left');
      socket.off('stop-producer');
      socket.off('seller-agreed-response');
    };
  }, [socket]);

  useEffect(() => {
    if (joined && isOwner && agreed) {
      startCamera();
    }
  }, [agreed]);

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

  const getLocalAudioStreamAndTrack = async () => {
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    return audioStream.getAudioTracks()[0];
  };

  const joinRoom = () => {
    if (!socket || !auctionId) return;

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

        // Device 생성 및 로드
        const newDevice = await createDevice(rtpCapabilities);

        // 송신용 Transport 생성
        const newSendTransport = createSendTransport(
          newDevice,
          sendTransportOptions
        );

        // 수신용 Transport 생성
        createRecvTransport(newDevice, recvTransportOptions);

        socket.on('new-producer', handleNewProducer);

        // 기존 참여자 목록 업데이트
        setPeers(peerIds.filter((id) => id !== socket.id));

        // 기존 Producer들에 대한 Consumer 생성
        for (const producerInfo of existingProducers) {
          await consume(producerInfo);
        }

        setJoined(true);
      }
    );
  };

  const leaveRoom = () => {
    if (!socket) return;

    socket.emit('leave-room', (response) => {
      if (response && response.error) {
        return;
      }

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

  const getStream = async () => {
    let stream;

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 720 },
          height: { ideal: 1280 },
        },
      });

      setLocalStream(stream);
      return stream; // 성공 시 stream 반환
    } catch (error) {
      socket?.emit('seller-disagreed-camera', { roomId: auctionId });
    }
  };

  const startProducing = async () => {
    if (!sendTransportRef.current) return;

    const stream = await getStream();
    /* produce audio */

    /* produce video */
    // let stream;
    // navigator.mediaDevices
    //   .getUserMedia({
    //     video: {
    //       width: { ideal: 720 }, // 원하는 가로 해상도
    //       height: { ideal: 1280 }, // 원하는 세로 해상도
    //     },
    //   })
    //   .then((gotStream) => {
    //     setLocalStream(gotStream);
    //     stream = gotStream;
    //   })
    //   .catch((reason) => {
    //     socket?.emit('seller-disagreed-camera', { roomId: auctionId });
    //   });
    // const stream = await navigator.mediaDevices.getUserMedia({
    //   video: {
    //     width: { ideal: 720 }, // 원하는 가로 해상도
    //     height: { ideal: 1280 }, // 원하는 세로 해상도
    //   },
    // });

    // if (!stream) {

    //   return;
    // }
    if (stream) {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const videoTrack = stream.getVideoTracks()[0];

      // 비디오 Producer 생성
      const newVideoProducer = await sendTransportRef.current.produce({
        track: videoTrack,
      });
      // setVideoProducer(newVideoProducer);
      mediaProducers.current.videoProducer = newVideoProducer;
      setIsSeller(true);

      const audioTrack = await getLocalAudioStreamAndTrack();
      const newAudioProducer = await sendTransportRef.current.produce({
        track: audioTrack,
      });

      // setAudioProducer(newAudioProducer);
      mediaProducers.current.audioProducer = newAudioProducer;
    }
  };

  const stopCamera = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
      setIsVideo(false);
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (mediaProducers.current.videoProducer) {
      mediaProducers.current.videoProducer.close();
      mediaProducers.current.videoProducer = null;
    }
    // if (audioProducer) {
    if (mediaProducers.current.audioProducer) {
      mediaProducers.current.audioProducer.close();
      mediaProducers.current.audioProducer = null;
    }
    setIsSeller(false);
  };

  const handleNewProducer = async ({ producerId, peerId, kind }) => {
    // stopCamera();
    setIsVideo(true);
    await consume({ producerId, peerId, kind });
  };

  const consume = async ({ producerId, peerId, kind }) => {
    const device = deviceRef.current;
    const recvTransport = recvTransportRef.current;
    if (!device || !recvTransport) {
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
          audioElement.autoplay = true;
          // audioElement.controls = true;
          // document.getElementById('remote-media').appendChild(audioElement);

          // 브라우저의 자동재생 정책을 우회하기 위해 재생 시도
          try {
            await audioElement.play();
          } catch (err) {
            // 123
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

  const startCamera = () => {
    socket.emit(
      'stop-prev-producer',
      { roomId: auctionId, peerId: socket.id },
      (response: boolean) => {
        if (!response) {
          return;
        }

        startProducing();
      }
    );
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
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
        <audio ref={audioRef}>
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
      <Image
        display={agreed ? 'none' : 'block'}
        width="100%"
        height="100%"
        src="/images/back_temp.jpeg"
        objectFit="cover"
      />
    </div>
  );
}

export default RTCTestPage;
