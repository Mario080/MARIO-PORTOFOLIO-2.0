# Mario Reggy Yedija — Automated Media Portfolio

Portofolio web statis responsif yang digerakkan oleh satu manifest konfigurasi data: [`media-config.js`](media-config.js). Seluruh proyek, galeri foto, video carousel, dan detail halaman diperbarui secara otomatis tanpa perlu mengubah struktur kode HTML pendukung.

---

## 📁 Struktur Folder Aset Media

Semua aset foto dan video disimpan di dalam folder `assets/media/` sesuai dengan nama proyek masing-masing:

```text
assets/
├── profile.jpg                      # Foto profil utama halaman depan
└── media/
    ├── 01_announcements/            # Weekly Announcement Production
    │   ├── announcement_1.mp4 … announcement_4.mp4
    │   └── poster_1.jpg, announcement_2_poster.jpg … announcement_4_poster.jpg
    ├── 02_short_content/            # Comedy, Lifestyle & Relatable Shorts
    │   ├── short_1.mp4 … short_4.mp4
    │   └── short_1_poster.jpg … short_4_poster.jpg
    ├── 03_obs_livestream/           # OBS Live Streaming Operations
    │   ├── stream_1.mp4 & stream_1_poster.jpg
    │   └── setup_1.jpg, setup_2.jpg, setup_3.jpg, image_1.jpg
    ├── 04_genbi_community/          # GenBI Community & Event Campaigns
    │   ├── aftermovie_1.mp4 … aftermovie_4.mp4
    │   ├── aftermovie_poster.jpg, aftermovie_2_poster.jpg …
    │   └── image_1.jpg … image_4.jpg
    ├── 05_serenade_decor/           # Serenade Décor Social Campaigns
    │   ├── promo_1.mp4 … promo_4.mp4
    │   ├── promo_1_poster.jpg … promo_4_poster.jpg
    │   └── image_1.jpg … image_4.jpg
    └── 07_humility_apparel/         # Humility Apparel Brand Development
        ├── humility_short_1.mp4 … humility_short_4.mp4
        ├── humility_poster_1.jpg … humility_poster_4.jpg
        └── image_1.jpg … image_3.jpg