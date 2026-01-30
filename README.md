# Inara (إنارة)

**Inara** is a modern, high-performance Quran web application designed with "Spiritual Minimalism" at its core. Built for speed, accessibility, and reflection, it offers a seamless reading and listening experience.

![Inara App](https://raw.githubusercontent.com/amsomr/inara-app/main/public/file.svg) *(Replace with actual screenshot)*

## ✨ Features

- **📖 Surah Index**: Browsable grid of all 114 Surahs with Arabic/English names and revelation context.
- **🔍 Instant Search**: Real-time filtering to find chapters by name or number.
- **🎧 Global Audio Player**:
    - Persistent playback across pages.
    - Verse-by-verse sync with **Mishary Rashid Alafasy**.
    - Auto-scroll and continuous play (Gapless experience utilizing segment data).
- **📥 Download System**: Download full Surahs or individual Ayahs for offline reflection.
- **🌙 Adaptive UI**: Beautiful Emerald & Slate theme with full **Dark Mode** support.
- **⚡ Performance**: Infinite scrolling for large Surahs (like Al-Baqarah) using Intersection Observers.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Audio Engine**: [Howler.js](https://howlerjs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [Quran.com API v4](https://quran.api-docs.io/v4)

## 🚀 Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # UI Components (SurahCard, AudioPlayer, etc.)
├── lib/              # API utilities and constants
└── store/            # Global state (AudioStore)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
