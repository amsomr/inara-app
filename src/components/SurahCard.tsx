import Link from 'next/link';
import { Surah } from '@/lib/api';

interface SurahCardProps {
    surah: Surah;
}

export function SurahCard({ surah }: SurahCardProps) {
    return (
        <Link
            href={`/surah/${surah.id}`}
            className="group relative flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
        >
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-emerald-600 dark:text-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                    {surah.id}
                </div>
                <div className="flex flex-col">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {surah.name_simple}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {surah.translated_name.name}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="font-arabic text-lg leading-none text-slate-800 dark:text-slate-200">
                    {surah.name_arabic}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">
                    {surah.revelation_place} &bull; {surah.verses_count}
                </span>
            </div>
        </Link>
    );
}
