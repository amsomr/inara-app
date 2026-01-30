export const BASE_URL = 'https://api.quran.com/api/v4';

export interface Surah {
    id: number;
    revelation_place: string;
    revelation_order: number;
    bismillah_pre: boolean;
    name_simple: string;
    name_complex: string;
    name_arabic: string;
    verses_count: number;
    pages: number[];
    translated_name: {
        language_name: string;
        name: string;
    };
}

export interface Ayah {
    id: number;
    verse_key: string;
    text_uthmani: string;
    translations: {
        id: number;
        resource_id: number;
        text: string;
    }[];
    audio: {
        url: string; // Relative URL e.g. "Alafasy/mp3/001001.mp3"
    };
}

export async function getSurahs(): Promise<Surah[]> {
    const res = await fetch(`${BASE_URL}/chapters`);
    if (!res.ok) throw new Error('Failed to fetch chapters');
    const data = await res.json();
    return data.chapters;
}

export async function getSurah(id: number): Promise<Surah> {
    const res = await fetch(`${BASE_URL}/chapters/${id}`);
    if (!res.ok) throw new Error('Failed to fetch chapter');
    const data = await res.json();
    return data.chapter;
}

export async function getAyahs(id: number): Promise<Ayah[]> {
    // 85 = Abdel Haleem translation (English)
    // Included &audio=7 (Mishary) to get download links for verses
    const res = await fetch(`${BASE_URL}/verses/by_chapter/${id}?language=en&words=false&translations=85&fields=text_uthmani&per_page=286&audio=7`);
    if (!res.ok) throw new Error('Failed to fetch ayahs');
    const data = await res.json();
    return data.verses;
}

export interface AudioData {
    audio_url: string;
    format: string;
    file_size: number;
    timestamps: {
        verse_key: string;
        timestamp_from: number;
        timestamp_to: number;
        duration: number;
    }[];
}

export async function getChapterAudio(chapterId: number, reciterId: number = 7): Promise<AudioData> { // 7 = Mishary Rashid Alafasy
    const res = await fetch(`${BASE_URL}/chapter_recitations/${reciterId}/${chapterId}?segments=true`);
    if (!res.ok) throw new Error('Failed to fetch audio');
    const data = await res.json();
    return data.audio_file;
}

export const RECITERS = [
    { id: 7, name: 'Mishary Rashid Alafasy' },
    { id: 10, name: 'Saud Al-Shuraim' }, // Example, will verify IDs if needed
    // Omar Al Kazabri and Laayoun El Kouchi need ID lookup
];
