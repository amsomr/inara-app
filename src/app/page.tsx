import { getSurahs } from '@/lib/api';
import { SurahGrid } from '@/components/SurahGrid';

export default async function Home() {
  // Fetch data on the server
  const surahs = await getSurahs();

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 md:px-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-primary font-arabic leading-relaxed pb-2">
            Inara
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Read, Listen, and Reflect
          </p>
        </div>

        <SurahGrid surahs={surahs} />
      </div>
    </main>
  );
}
