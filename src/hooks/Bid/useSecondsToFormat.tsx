interface FormatProps {
  thirtyMatters: boolean;
  currentTime: number;
}

const useSecondsToFormat = ({ currentTime, thirtyMatters }: FormatProps) => {
  const hours = Math.floor(currentTime / 3600);
  const minutes = Math.floor((currentTime % 3600) / 60);
  const remainingSeconds = currentTime % 60;

  if (thirtyMatters) {
    return currentTime > 15
      ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
      : `${String(remainingSeconds).padStart(2, '0')}`;
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default useSecondsToFormat;
