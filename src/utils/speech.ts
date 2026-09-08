// Web Speech API helper for pronunciation and listening practice

const AUDIO_SPEED_KEY = "qc_english_audio_speed";

export function getAudioSpeed(): number {
  if (typeof window === "undefined") return 0.78;
  const saved = localStorage.getItem(AUDIO_SPEED_KEY);
  if (saved) {
    const parsed = parseFloat(saved);
    if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 1.5) {
      return parsed;
    }
  }
  return 0.78; // Default to a clear, learner-friendly pace (0.78x)
}

export function setAudioSpeed(speed: number): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUDIO_SPEED_KEY, String(speed));
  }
}

export function playAudio(text: string, rate?: number): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("SpeechSynthesis is not supported in this browser.");
      resolve();
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech

    const cleanText = text.replace(/\[.*?\]/g, "").trim(); // Remove brackets or translations
    if (!cleanText) {
      resolve();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-US";
    utterance.rate = rate !== undefined ? rate : getAudioSpeed();
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Jenny") || v.name.includes("Guy")) && v.lang.startsWith("en")
    ) || voices.find((v) => v.lang.startsWith("en"));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

export function stopAudio(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
