'use client';

import { useState } from 'react';
import { Surah } from '@/lib/api';
import { SurahCard } from './SurahCard'; // Ensure relative import is correct
import { Search } from 'lucide-react';

interface SurahGridProps {
    surahs: Surah[];
}

export function SurahGrid({ surahs }: SurahGridProps) {
    const [query, setQuery] = useState('');

    const filteredSurahs = surahs.filter((surah) =>
        surah.name_simple.toLowerCase().includes(query.toLowerCase()) ||
        surah.translated_name.name.toLowerCase().includes(query.toLowerCase()) ||
        surah.id.toString().includes(query)
    );

    return (
        <div className="space-y-6">
            <div className="relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <Search className="h-5 w-5" />
                </div>
                <input
                    type="text"
                    placeholder="Search Surah by name or number..."
                    className="block w-full rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3 pl-10 pr-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSurahs.map((surah) => (
                    <SurahCard key={surah.id} surah={surah} />
                ))}
            </div>

            {filteredSurahs.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    No Surahs found matching "{query}"
                </div>
            )}
        </div>
    );
}
