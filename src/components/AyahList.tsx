'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Ayah, Surah } from '@/lib/api';
import { AyahItem } from './AyahItem';

interface AyahListProps {
    initialAyahs: Ayah[];
    surah: Surah;
}

const ITEMS_PER_PAGE = 20;

export function AyahList({ initialAyahs, surah }: AyahListProps) {
    const [displayedAyahs, setDisplayedAyahs] = useState<Ayah[]>([]);
    const [page, setPage] = useState(1);
    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDisplayedAyahs(initialAyahs.slice(0, ITEMS_PER_PAGE));
        setPage(1);
    }, [initialAyahs]);

    const loadMore = useCallback(() => {
        if (displayedAyahs.length >= initialAyahs.length) return;

        const nextLimit = (page + 1) * ITEMS_PER_PAGE;
        setDisplayedAyahs(initialAyahs.slice(0, nextLimit));
        setPage(p => p + 1);
    }, [displayedAyahs.length, initialAyahs, page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.5 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [loadMore]);

    return (
        <div className="space-y-4">
            {displayedAyahs.map((ayah) => (
                <AyahItem key={ayah.id} ayah={ayah} surah={surah} />
            ))}

            {displayedAyahs.length < initialAyahs.length && (
                <div ref={observerTarget} className="h-20 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}
