import { create } from 'zustand';
import { Howl } from 'howler';
import { AudioData, Surah, getChapterAudio } from '@/lib/api';

interface AudioState {
    isPlaying: boolean;
    isLoading: boolean;
    reciterId: number;
    currentSurah: Surah | null; // Metadata for display
    currentAyahKey: string | null; // e.g., "1:1"
    audioData: AudioData | null;
    sound: Howl | null;

    // Actions
    setReciter: (id: number) => void;
    playSurah: (surah: Surah) => Promise<void>;
    playAyah: (surah: Surah, verseKey: string) => Promise<void>;
    togglePlay: () => void;
    nextAyah: () => void;
    prevAyah: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
    isPlaying: false,
    isLoading: false,
    reciterId: 7, // Mishary
    currentSurah: null,
    currentAyahKey: null,
    audioData: null,
    sound: null,

    setReciter: (id) => set({ reciterId: id }),

    playSurah: async (surah) => {
        const { reciterId, sound: currentSound, currentSurah } = get();

        // If already playing this surah, just toggle or restart?
        // Let's restart if called explicitly, or resume if paused?
        // Implementation: Fetch new audio if different surah or no audio.

        if (currentSound) {
            currentSound.stop();
        }

        set({ isLoading: true, currentSurah: surah, isPlaying: false });

        try {
            const audioData = await getChapterAudio(surah.id, reciterId);

            const sound = new Howl({
                src: [audioData.audio_url],
                html5: true, // Force HTML5 Audio for large files/streaming
                onend: () => {
                    set({ isPlaying: false });
                },
                onplay: () => set({ isPlaying: true }),
                onpause: () => set({ isPlaying: false }),
                onstop: () => set({ isPlaying: false }),
            });

            set({ audioData, sound, isLoading: false, currentAyahKey: `${surah.id}:1` });
            sound.play();
        } catch (error) {
            console.error("Failed to load audio", error);
            set({ isLoading: false });
        }
    },

    playAyah: async (surah, verseKey) => {
        const { currentSurah, audioData, reciterId, sound } = get();

        // If surah is different, we must load it first
        if (!currentSurah || currentSurah.id !== surah.id || !sound) {
            await get().playSurah(surah);
            // After load, seek to ayah
        }

        // Now seek
        const state = get();
        if (state.audioData && state.sound) {
            const segment = state.audioData.timestamps.find(t => t.verse_key === verseKey);
            if (segment) {
                state.sound.seek(segment.timestamp_from / 1000); // Howler uses seconds
                if (!state.sound.playing()) state.sound.play();
                set({ currentAyahKey: verseKey });
            }
        }
    },

    togglePlay: () => {
        const { sound } = get();
        if (sound) {
            if (sound.playing()) sound.pause();
            else sound.play();
        }
    },

    nextAyah: () => {
        // Logic to find next segment and seek/update state
        const { audioData, currentAyahKey, sound } = get();
        if (!audioData || !sound || !currentAyahKey) return;

        const currentIndex = audioData.timestamps.findIndex(t => t.verse_key === currentAyahKey);
        if (currentIndex !== -1 && currentIndex < audioData.timestamps.length - 1) {
            const nextSegment = audioData.timestamps[currentIndex + 1];
            sound.seek(nextSegment.timestamp_from / 1000);
            set({ currentAyahKey: nextSegment.verse_key });
        }
    },

    prevAyah: () => {
        const { audioData, currentAyahKey, sound } = get();
        if (!audioData || !sound || !currentAyahKey) return;

        const currentIndex = audioData.timestamps.findIndex(t => t.verse_key === currentAyahKey);
        if (currentIndex > 0) {
            const prevSegment = audioData.timestamps[currentIndex - 1];
            sound.seek(prevSegment.timestamp_from / 1000);
            set({ currentAyahKey: prevSegment.verse_key });
        }
    }
}));
