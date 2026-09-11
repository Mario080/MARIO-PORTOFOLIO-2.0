/* Edit manifest ini untuk mengelola seluruh konten media portofolio. */
window.PORTFOLIO_PROJECTS = [
  {
    id: "weekly-announcement",
    category: "long",
    label: "LONG-FORM VIDEO",
    title: "Weekly Announcement Production",
    description: "Covers end-to-end production from equipment setup, lighting, talent direction, scriptwriting, and concepting, up to full video editing and final rendering. Projects extend beyond weekly announcements to include related church media content and special event broadcasts.",
    detailDescription: "Directing church announcements completely from scratch (0 to final output). Features 4 main videos including Behind-the-Scenes (BTS) footage, Before vs. After editing comparisons, and special event announcements that require extended scripts and custom creative concepts.",
    role: "Director · Camera · Lighting · Editor",
    format: "Long-form Video",
    tools: "Filmora Pro · Canva Pro · Photoshop",
    focus: "Studio storytelling",
    skills: ["Directing", "Lighting", "Audio Leveling", "Scriptwriting"],
    folder: "assets/media/01_announcements/",
    video: "announcement_1.mp4",
    poster: "poster_1.jpg",
    featuredVideos: ["announcement_1", "announcement_2", "announcement_3", "announcement_4"].map((name, i) => ({
      file: `${name}.mp4`,
      poster: i ? `${name}_poster.jpg` : "poster_1.jpg",
      label: `Announcement ${i + 1}`
    }))
  },
  {
    id: "short-content",
    category: "short",
    label: "SHORT-FORM / REELS",
    title: "Comedy, Lifestyle & Relatable Shorts",
    description: "Short-form video creation designed to enhance personal branding on social media, channel creative ideas, entertain audiences, and express creative identity.",
    detailDescription: "Highlights various content genres created primarily for Instagram, including comedy sketches, relatable daily situations, travel vlogs/after-movies, and experimental creative edits.",
    role: "Creative Lead · Editor",
    format: "Vertical 9:16",
    tools: "CapCut Pro · Filmora Pro · Canva Pro",
    focus: "Retention & hook",
    skills: ["Pacing", "Color Grading", "Audio Leveling", "Hook Strategy"],
    folder: "assets/media/02_short_content/",
    video: "short_1.mp4",
    poster: "short_1_poster.jpg",
    featuredVideos: ["short_1", "short_2", "short_3", "short_4"].map((name, i) => ({
      file: `${name}.mp4`,
      poster: `${name}_poster.jpg`,
      label: `Short-form edit ${i + 1}`
    }))
  },
  {
    id: "obs-livestream",
    category: "short",
    label: "TECHNICAL MEDIA",
    title: "OBS Live Streaming Operations",
    description: "Covers hardware setup, LED screen calibration, soundcard integration, and routing display feeds for live church congregations. Manages complex weekly YouTube live streaming, requiring high adaptability, calm problem-solving under pressure, and ensuring seamless hardware/software connectivity across offline and online environments.",
    detailDescription: "Directing live multi-camera broadcasts and LED stage feeds on-site. Responsibilities encompass complete physical and digital setup: positioning camera angles, calibrating soundcard integration, audio routing via Focusrite audio mixers, configuring vMix and OBS display scenes, and real-time hardware troubleshooting under pressure during live church congregations.",
    role: "Technical Lead · OBS Operator",
    format: "Live Broadcast & Ops",
    tools: "OBS Studio · YouTube Studio · Focusrite Audio Mixer · vMix",
    focus: "Live reliability",
    skills: ["OBS", "Signal Flow", "Audio Routing", "Troubleshooting"],
    folder: "assets/media/03_obs_livestream/",
    video: "stream_1.mp4",
    poster: "stream_1_poster.jpg",
    featuredVideos: [
      { file: "stream_1.mp4", poster: "stream_1_poster.jpg", label: "Live Stream Highlight" }
    ],
    images: ["setup_1.jpg", "setup_2.jpg", "setup_3.jpg", "image_1.jpg"]
  },
  {
    id: "genbi-community",
    category: "short",
    label: "EVENT AFTER-MOVIE",
    title: "GenBI Community & Event Campaigns",
    description: "Highlights active involvement with GenBI (Generasi Baru Indonesia), explaining its role as a Bank Indonesia-sponsored student organization on campus. As part of the PR Division, responsibilities include documenting all organization activities via photo and video, producing event after-movies, and managing Instagram social media assets (carousels, feeds, and activity flyers).",
    detailDescription: "Highlights active involvement with GenBI (Generasi Baru Indonesia), explaining its role as a Bank Indonesia-sponsored student organization on campus. As part of the PR Division, responsibilities include documenting all organization activities via photo and video, producing event after-movies, and managing Instagram social media assets (carousels, feeds, and activity flyers).",
    role: "PR · Content Creator · Editor",
    format: "Vertical 9:16 + Campaign",
    tools: "Canva Pro · Filmora Pro · CapCut Pro",
    focus: "Event energy",
    skills: ["Recap Edit", "Campaigns", "Community Outreach"],
    folder: "assets/media/04_genbi_community/",
    video: "aftermovie_1.mp4",
    poster: "aftermovie_poster.jpg",
    images: ["image_1.jpg", "image_2.jpg", "image_3.jpg", "image_4.jpg"],
    featuredVideos: ["aftermovie_1", "aftermovie_2", "aftermovie_3", "aftermovie_4"].map((name, i) => ({
      file: `${name}.mp4`,
      poster: i ? `${name}_poster.jpg` : "aftermovie_poster.jpg",
      label: `Event story ${i + 1}`
    }))
  },
  {
    id: "serenade-decor",
    category: "short",
    label: "PROMOTIONAL SHORTS",
    title: "Serenade Décor Social Campaigns",
    description: "Serenade Décor is a home, office, and commercial interior decoration/furniture company. Responsible for creating engaging content tracking project progress and final execution results, delivered via photo thumbnails and short promotional videos.",
    detailDescription: "Serenade Décor is a home, office, and commercial interior decoration/furniture company. Responsible for creating engaging content tracking project progress and final execution results, delivered via photo thumbnails and short promotional videos.",
    role: "Social Media Analyst · Video Editor",
    format: "Vertical 9:16",
    tools: "CapCut Pro · Canva Pro · Analytics",
    focus: "Conversion & reach",
    skills: ["Short-form", "Analytics", "CTA Design"],
    folder: "assets/media/05_serenade_decor/",
    video: "promo_1.mp4",
    poster: "promo_1_poster.jpg",
    images: ["image_1.jpg", "image_2.jpg", "image_3.jpg", "image_4.jpg"],
    featuredVideos: ["promo_1", "promo_2", "promo_3", "promo_4"].map((name, i) => ({
      file: `${name}.mp4`,
      poster: `${name}_poster.jpg`,
      label: `Campaign short ${i + 1}`
    }))
  },
  {
    id: "humility-apparel",
    category: "short",
    label: "BRANDING & BUSINESS DEVELOPMENT",
    title: "Humility Apparel Brand Development",
    description: "Supported the transformation of an online thrift business into an independent apparel brand through branding, content production, product photography, operational support, and business development activities.",
    detailDescription: "Supported the transformation of an online thrift business into an independent apparel brand through branding, content production, product photography, operational support, and business development activities.",
    role: "Graphic Designer / Product Photographer / Business Support",
    format: "Vertical 9:16 + Brand Gallery",
    tools: "Photoshop · Canva Pro · CapCut Pro",
    focus: "Branding & Business Execution",
    skills: ["Branding", "Product Photography", "Live Selling", "Content Strategy"],
    folder: "assets/media/07_humility_apparel/",
    video: "humility_short_1.mp4",
    poster: "humility_poster_1.jpg",
    featuredVideos: [
      { file: "humility_short_1.mp4", poster: "humility_poster_1.jpg", label: "Process & BTS Short 1" },
      { file: "humility_short_2.mp4", poster: "humility_poster_2.jpg", label: "Process & BTS Short 2" },
      { file: "humility_short_3.mp4", poster: "humility_poster_3.jpg", label: "Process & BTS Short 3" },
      { file: "humility_short_4.mp4", poster: "humility_poster_4.jpg", label: "Process & BTS Short 4" }
    ],
    images: ["image_1.jpg", "image_2.jpg", "image_3.jpg"]
  }
];