'use client';

import { Ayah, Surah } from '@/lib/api';
import { useAudioStore } from '@/store/audioStore';
import { Play, Pause, Download, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility exists or use clsx

interface AyahItemProps {
    ayah: Ayah;
    surah: Surah;
}

const AUDIO_BASE_URL = 'https://verses.quran.com/';

export function AyahItem({ ayah, surah }: AyahItemProps) {
    const { playAyah, isPlaying, currentAyahKey, currentSurah } = useAudioStore();

    const isCurrentAyah = currentSurah?.id === surah.id && currentAyahKey === ayah.verse_key;
    const isActive = isCurrentAyah && isPlaying;

    const handlePlay = () => {
        if (isActive) {
            useAudioStore.getState().togglePlay();
        } else {
            playAyah(surah, ayah.verse_key);
        }
    };

    const downloadUrl = `${AUDIO_BASE_URL}${ayah.audio.url}`;

    return (
        <div
            id={`ayah-${ayah.verse_key}`}
            className={cn(
                "flex flex-col gap-6 py-8 border-b border-slate-100 dark:border-slate-800 transition-colors duration-500",
                isCurrentAyah ? "bg-emerald-50/50 dark:bg-emerald-900/10 -mx-4 px-4 rounded-xl" : ""
            )}
        >
            {/* Actions Bar */}
            <div className="flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300">
                        {ayah.verse_key}
                    </span>
                    <button
                        onClick={handlePlay}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 transition-colors"
                        title={isActive ? "Pause" : "Play"}
                    >
                        {isActive ? <Pause className="h-4 w-4 fill-emerald-600 text-emerald-600" /> : <Play className="h-4 w-4" />}
                    </button>
                    <a
                        href={downloadUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 transition-colors"
                        title="Download MP3"
                    >
                        <Download className="h-4 w-4" />
                    </a>
                </div>
            </div>

            {/* Arabic Text */}
            <div className="w-full text-right" dir="rtl">
                <p className="font-arabic text-3xl md:text-4xl leading-[2.5] text-slate-900 dark:text-slate-100">
                    {ayah.text_uthmani}
                </p>
            </div>

            {/* Translation */}
            <div className="w-full text-left">
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {ayah.translations?.[0]?.text}
                </p>
            </div>
        </div>
    );
}
