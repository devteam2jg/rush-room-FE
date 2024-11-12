import { create } from 'zustand';

interface SpeakingProps {
  isSpeaking: boolean;
  setIsSpeaking: (isSpeaking: boolean) => void;
}

const SpeakingStore = create<SpeakingProps>((set) => ({
  isSpeaking: false,
  setIsSpeaking: (isSpeaking) => set({ isSpeaking }),
}));

export default SpeakingStore;
