// --- UNIFICADOR DE PREGUNTA Y CATEGORÍAS ---
// Las preguntas se cargan de forma modular desde la carpeta /categorias

const TRIVIA_QUESTIONS = [
    ...CULTURA_POP_QUESTIONS,
    ...CINE_SERIES_QUESTIONS,
    ...VIDEOJUEGOS_QUESTIONS,
    ...ANIME_QUESTIONS,
    ...MUSICA_QUESTIONS,
    ...HISTORIA_CIENCIA_QUESTIONS,
    ...MINECRAFT_QUESTIONS,
    ...FUTBOL_CLASICO_QUESTIONS,
    ...FUTBOL_AVANZADO_QUESTIONS
];

const CATEGORIES_DATA = [
    { id: "cultura_pop", name: "Cultura Pop", icon: "🍿", count: CULTURA_POP_QUESTIONS.length },
    { id: "cine_series", name: "Cine y Series", icon: "🎬", count: CINE_SERIES_QUESTIONS.length },
    { id: "videojuegos", name: "Videojuegos", icon: "🎮", count: VIDEOJUEGOS_QUESTIONS.length },
    { id: "anime", name: "Anime y Manga", icon: "⚡", count: ANIME_QUESTIONS.length },
    { id: "musica", name: "Música", icon: "🎵", count: MUSICA_QUESTIONS.length },
    { id: "historia_ciencia", name: "Historia y Ciencia", icon: "🔬", count: HISTORIA_CIENCIA_QUESTIONS.length },
    { id: "minecraft", name: "Minecraft", icon: "⛏️", count: MINECRAFT_QUESTIONS.length },
    { id: "futbol_clasico", name: "Fútbol Clásico", icon: "⚽", count: FUTBOL_CLASICO_QUESTIONS.length },
    { id: "futbol_avanzado", name: "Fútbol Avanzado", icon: "🏆", count: FUTBOL_AVANZADO_QUESTIONS.length }
];
