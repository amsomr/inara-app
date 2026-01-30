import { getSurah, getAyahs, getChapterAudio } from '@/lib/api';
import { AyahList } from '@/components/AyahList';
import { ArrowLeft, PlayCircle, Download } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const surahId = parseInt(id, 10);
    const surah = await getSurah(surahId);

    return {
        title: `Surah ${surah.name_simple} (${surah.name_arabic}) - Quran App`,
        description: `Read and listen to Surah ${surah.name_simple} (${surah.translated_name.name}) online with translation, audio, and tafsir.`,
    };
}

export default async function SurahPage({ params }: PageProps) {
    const { id } = await params;
    const surahId = parseInt(id, 10);

    const [surah, ayahs, audioInfo] = await Promise.all([
        getSurah(surahId),
        getAyahs(surahId),
        getChapterAudio(surahId) // Get default reciter audio for download
    ]);

    return (
        <main className="min-h-screen bg-background pb-32">
            {/* Header Banner */}
            <div className="bg-emerald-700 dark:bg-emerald-900/50 text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.png')] opcode-10"></div>
                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
                    <Link href="/" className="absolute left-0 top-0 p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>

                    <div className="space-y-2">
                        <h1 className="font-arabic text-5xl md:text-6xl mb-4">{surah.name_arabic}</h1>
                        <h2 className="text-2xl md:text-3xl font-semibold">{surah.name_simple}</h2>
                        <p className="text-emerald-100">{surah.translated_name.name}</p>
                    </div>

                    <div className="flex items-center justify-center gap-4 pt-4 text-sm font-medium">
                        <span className="bg-white/20 px-3 py-1 rounded-full uppercase tracking-wide">
                            {surah.revelation_place}
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-full">
                            {surah.verses_count} Ayahs
                        </span>
                    </div>

                    {/* Global Actions */}
                    <div className="flex items-center justify-center gap-4 pt-4">
                        {/* Note: Play Surah Button will need client component wrapper or pass logic to header if strictly server */}
                        {/* For now, we rely on individual Ayah play or the global player logic which we haven't built into the header yet. 
                 But the implementation plan asked for "Download System... trigger MP3 for entire Surah". */}
                        {/* We can add a simple download link for the full chapter */}
                        <a
                            href={audioInfo.audio_url}
                            className="flex items-center gap-2 bg-white text-emerald-800 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-lg"
                            target="_blank" rel="noopener noreferrer"
                            download
                        >
                            <Download className="h-5 w-5" /> Download Surah
                        </a>
                    </div>
                </div>
            </div>

            {/* Ayahs List */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <AyahList initialAyahs={ayahs} surah={surah} />
            </div>
        </main>
    );
}
