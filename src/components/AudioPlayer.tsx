'use client';

import { useEffect, useRef, useState } from 'react';
import { useAudioStore } from '@/store/audioStore';
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RECITERS } from '@/lib/api';

export function AudioPlayer() {
    const {
        currentSurah,
        currentAyahKey,
        isPlaying,
        togglePlay,
        nextAyah,
        prevAyah,
        sound,
        reciterId,
        setReciter,
        playSurah
    } = useAudioStore();

    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);

    // Sync progress
    useEffect(() => {
        const timer = setInterval(() => {
            if (sound && isPlaying) {
                setDuration(sound.duration());
                setProgress(sound.seek());
            }
        }, 100);
        return () => clearInterval(timer);
    }, [sound, isPlaying]);

    if (!currentSurah) return null;

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (sound) {
            sound.seek(val);
            setProgress(val);
        }
    };

    const handleReciterChange = (id: number) => {
        setReciter(id);
        if (currentSurah) {
            playSurah(currentSurah);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300">
            {/* Progress Bar (Top of player) */}
            <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 cursor-pointer group">
                <div
                    className="h-full bg-emerald-500 relative"
                    style={{ width: `${(progress / (duration || 1)) * 100}%` }}
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" />
                </div>
                <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={progress || 0}
                    onChange={handleSeek}
                    className="absolute top-0 left-0 w-full h-1 opacity-0 cursor-pointer z-10"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                {/* Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {currentSurah.name_simple}
                        </span>
                        <span className="text-xs text-slate-500 truncate">
                            Ayah {currentAyahKey ? currentAyahKey.split(':')[1] : '...'} &bull; {RECITERS.find(r => r.id === reciterId)?.name}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                    <button onClick={prevAyah} className="p-2 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-500 transition-colors">
                        <SkipBack className="h-5 w-5" />
                    </button>

                    <button
                        onClick={togglePlay}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/20 transition-all font-bold"
                    >
                        {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-1" />}
                    </button>

                    <button onClick={nextAyah} className="p-2 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-500 transition-colors">
                        <SkipForward className="h-5 w-5" />
                    </button>
                </div>

                {/* Extras (Reciter & Volume) */}
                <div className="flex items-center gap-4 flex-1 justify-end">
                    <div className="hidden md:flex items-center gap-2">
                        <select
                            title="Change Reciter"
                            className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs py-1 px-2 focus:ring-1 focus:ring-emerald-500 text-slate-700 dark:text-slate-300"
                            value={reciterId}
                            onChange={(e) => handleReciterChange(Number(e.target.value))}
                        >
                            {RECITERS.map((r) => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
