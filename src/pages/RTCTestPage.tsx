import { useEffect, useRef, useState } from 'react';
import { Device } from 'mediasoup-client';
import {
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
}

interface MediaProducers {
  videoProducer: Producer | null;
  audioProducer: Producer | null;
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
  const recvTransportRef = useRef<Transport | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lastReceivedEvent, setLastReceivedEvent] = useState<string>('');

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
    };

    // Register all event listeners
    socket.on('seller-agreed-response', onSellerAgreedResponse);
    socket.on('new-peer', onNewPeer);
    socket.on('peer-left', onPeerLeft);
    socket.on('stop-producer', onStopProducer);

    if (auctionId && !joined) {
      console.log('Attempting to join room:', auctionId);
      joinRoom();
    }

    return () => {
      console.log('끊어');
      stopCamera();
      socket.off('new-peer');
      socket.off('peer-left');
      socket.off('stop-producer');
      socket.off('seller-agreed-response');
    };
  }, [socket]);

  console.log(joined);

  useEffect(() => {
    if (joined && isOwner && agreed) {
      console.log('카메라를 켜요 제발');
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
    console.log('------socket', socket);
    if (!socket || !auctionId) return;
    console.log('거 드가쇼');
    socket.emit(
      'join-room',
      { roomId: auctionId, peerId: socket.id },
      async (response: JoinRoomResponse) => {
        console.log('여기는 오나?');
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
        } = response;

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

        console.log('방에 들어갈게요?');
        setJoined(true);
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

  const startCamera = async () => {
    if (!sendTransportRef.current) return;

    stopPrevProducer();

    console.log('New Creater-----');
    /* produce audio */
    const audioTrack = await getLocalAudioStreamAndTrack();
    const newAudioProducer = await sendTransportRef.current.produce({
      track: audioTrack,
    });

    // setAudioProducer(newAudioProducer);
    mediaProducers.current.audioProducer = newAudioProducer;
    /* produce video */
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 720 }, // 원하는 가로 해상도
        height: { ideal: 1280 }, // 원하는 세로 해상도
      },
    });
    setLocalStream(stream);

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

    console.log('영상틀었다요');
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
    console.log(`New producer: ${producerId} from ${peerId} of kind ${kind}`);
    // stopCamera();
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
          audioElement.autoplay = true;
          // audioElement.controls = true;
          // document.getElementById('remote-media').appendChild(audioElement);

          // 브라우저의 자동재생 정책을 우회하기 위해 재생 시도
          try {
            await audioElement.play();
          } catch (err) {
            console.error('Audio playback failed:', err);
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

  const stopPrevProducer = () => {
    socket.emit('stop-prev-producer', { roomId: auctionId });
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
          <button onClick={stopPrevProducer}>turn off the other</button>
        </div>
        <div>
          <h2>Remote Media</h2>
          <div id="remote-media" />
        </div>
      </div>
      {agreed ? (
        <div>
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
      ) : (
        <Image
          display="block"
          width="100%"
          height="100%"
          src="/images/back_temp.jpeg"
          objectFit="cover"
        />
      )}
    </div>
  );
}

export default RTCTestPage;
