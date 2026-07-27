const TRIVIA_QUESTIONS = [
    // --- CULTURA POP & ENTRETENIMIENTO ---
    {
        id: 1,
        category: "cultura_pop",
        categoryName: "Cultura Pop",
        icon: "🍿",
        question: "¿Qué red social utilizaba originalmente el límite de 140 caracteres?",
        options: ["Facebook", "Twitter (X)", "Instagram", "Snapchat"],
        correct: 1,
        explanation: "Twitter se lanzó en 2006 con un límite estricto de 140 caracteres inspirado en el tamaño de los mensajes SMS."
    },
    {
        id: 2,
        category: "cultura_pop",
        categoryName: "Cultura Pop",
        icon: "🍿",
        question: "¿Cuál es la bebida alcohólica más vendida en todo el mundo por volumen?",
        options: ["Cerveza", "Vodka", "Soju", "Tequila"],
        correct: 2,
        explanation: "El Soju surcoreano (especialmente la marca Jinro) es la bebida alcohólica más vendida del mundo."
    },
    {
        id: 3,
        category: "cultura_pop",
        categoryName: "Cultura Pop",
        icon: "🍿",
        question: "¿Qué muñeca famosa fue creada por Ruth Handler en 1959?",
        options: ["Bratz", "Barbie", "Polly Pocket", "Nancy"],
        correct: 1,
        explanation: "Barbie fue creada por Ruth Handler, cofundadora de Mattel, inspirada en su hija Barbara."
    },
    {
        id: 4,
        category: "cultura_pop",
        categoryName: "Cultura Pop",
        icon: "🍿",
        question: "¿En qué país nació el meme del gato blanco enfadado ('Smudge the Cat')?",
        options: ["Estados Unidos", "Canadá", "Japón", "Reino Unido"],
        correct: 1,
        explanation: "Smudge es un gato rescatado de Ottawa, Canadá, que se hizo viral comiendo ensalada."
    },

    // --- CINE Y SERIES ---
    {
        id: 5,
        category: "cine_series",
        categoryName: "Cine y Series",
        icon: "🎬",
        question: "¿Cómo se llama el reino ficticio donde transcurre principalmente la película 'Black Panther'?",
        options: ["Genovia", "Wakanda", "Sokovia", "Latveria"],
        correct: 1,
        explanation: "Wakanda es una nación africana ficticia muy avanzada tecnológicamente en el universo Marvel."
    },
    {
        id: 6,
        category: "cine_series",
        categoryName: "Cine y Series",
        icon: "🎬",
        question: "¿Qué actor interpreta a Jack Sparrow en la saga 'Piratas del Caribe'?",
        options: ["Brad Pitt", "Johnny Depp", "Orlando Bloom", "Keanu Reeves"],
        correct: 1,
        explanation: "Johnny Depp inmortalizó al icónico capitán Jack Sparrow en 5 películas."
    },
    {
        id: 7,
        category: "cine_series",
        categoryName: "Cine y Series",
        icon: "🎬",
        question: "En la serie 'Stranger Things', ¿cómo se llama el mundo paralelo y oscuro?",
        options: ["El Abismo", "El Upside Down (Del Revés)", "El Inframundo", "La Dimensión X"],
        correct: 1,
        explanation: "El Upside Down es una dimensión paralela llena de criaturas como el Demogorgon y Vecna."
    },
    {
        id: 8,
        category: "cine_series",
        categoryName: "Cine y Series",
        icon: "🎬",
        question: "¿Cuál es la película con mayor recaudación en la historia del cine sin ajustar inflación?",
        options: ["Titanic", "Avengers: Endgame", "Avatar", "Star Wars: Episode VII"],
        correct: 2,
        explanation: "Avatar (2009) dirigida por James Cameron ocupa el puesto #1 con más de $2.9 mil millones de dólares."
    },

    // --- VIDEOJUEGOS ---
    {
        id: 9,
        category: "videojuegos",
        categoryName: "Videojuegos",
        icon: "🎮",
        question: "¿Cuál es la profesión original de Mario en la franquicia de Nintendo?",
        options: ["Carpintero", "Fontanero", "Electricista", "Constructor"],
        correct: 0,
        explanation: "Cuando apareció en Donkey Kong (1981) bajo el nombre 'Jumpman', Mario era carpintero."
    },
    {
        id: 10,
        category: "videojuegos",
        categoryName: "Videojuegos",
        icon: "🎮",
        question: "¿Qué videojuego popular popularizó la frase 'The Cake is a Lie' (La tarta es una mentira)?",
        options: ["Half-Life 2", "Portal", "Bioshock", "Minecraft"],
        correct: 1,
        explanation: "La icónica frase aparece escrita en las paredes por Doug Rattmann en el juego Portal de Valve."
    },
    {
        id: 11,
        category: "videojuegos",
        categoryName: "Videojuegos",
        icon: "🎮",
        question: "¿Cómo se llama la ciudad principal donde ocurren los eventos de GTA: San Andreas?",
        options: ["Vice City", "Liberty City", "Los Santos", "San Fierro"],
        correct: 2,
        explanation: "Los Santos está inspirada en Los Ángeles y es el punto de partida de CJ en GTA San Andreas."
    },
    {
        id: 12,
        category: "videojuegos",
        categoryName: "Videojuegos",
        icon: "🎮",
        question: "¿Qué estudio desarrolló el aclamado juego 'The Witcher 3: Wild Hunt'?",
        options: ["CD Projekt Red", "Bethesda", "Ubisoft", "Rockstar Games"],
        correct: 0,
        explanation: "El estudio polaco CD Projekt Red adaptó las novelas de Andrzej Sapkowski al videojuego."
    },

    // --- ANIME Y MANGA ---
    {
        id: 13,
        category: "anime",
        categoryName: "Anime y Manga",
        icon: "⚡",
        question: "¿Cómo se llama el objeto mágico que concede deseos en 'Dragon Ball'?",
        options: ["Esferas del Dragón", "Semillas del Ermitaño", "Báculo Sagrado", "Goku Ball"],
        correct: 0,
        explanation: "Reunir las 7 Esferas del Dragón permite invocar al dragón Shenlong para cumplir un deseo."
    },
    {
        id: 14,
        category: "anime",
        categoryName: "Anime y Manga",
        icon: "⚡",
        question: "En 'One Piece', ¿cuál es la meta principal de Monkey D. Luffy?",
        options: ["Ser el más fuerte del mundo", "Ser el Rey de los Piratas", "Vengar a su familia", "Encontrar a Shanks"],
        correct: 1,
        explanation: "Luffy quiere encontrar el legendario tesoro One Piece y convertirse en el Rey de los Piratas."
    },
    {
        id: 15,
        category: "anime",
        categoryName: "Anime y Manga",
        icon: "⚡",
        question: "¿Qué cuaderno otorga el poder de matar a cualquier persona cuyo nombre sea escrito en él?",
        options: ["Death Note", "Future Diary", "Black Grimoire", "Demon Book"],
        correct: 0,
        explanation: "El Death Note pertenece a los Shinigamis y cae en manos de Light Yagami."
    },
    {
        id: 16,
        category: "anime",
        categoryName: "Anime y Manga",
        icon: "⚡",
        question: "¿Quién es el titán fundador y colosal en la primera temporada de 'Attack on Titan'?",
        options: ["Eren Yeager", "Bertolt Hoover", "Reiner Braun", "Armin Arlert"],
        correct: 1,
        explanation: "Bertolt Hoover es la identidad secreta del Titán Colosal que rompe la muralla Maria."
    },

    // --- MÚSICA Y ARTE ---
    {
        id: 17,
        category: "musica",
        categoryName: "Música",
        icon: "🎵",
        question: "¿Qué banda británica lanzó el famoso álbum 'Abbey Road' en 1969?",
        options: ["Queen", "The Rolling Stones", "The Beatles", "Pink Floyd"],
        correct: 2,
        explanation: "The Beatles inmortalizaron el paso de peatones de Abbey Road en la portada de dicho álbum."
    },
    {
        id: 18,
        category: "musica",
        categoryName: "Música",
        icon: "🎵",
        question: "¿Quién es conocido mundialmente como el 'Rey del Pop'?",
        options: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"],
        correct: 1,
        explanation: "Michael Jackson es reconocido mundialmente con el título del Rey del Pop."
    },
    {
        id: 19,
        category: "musica",
        categoryName: "Música",
        icon: "🎵",
        question: "¿Cuál es el video musical más visto de todos los tiempos en YouTube en el formato de canción infantil?",
        options: ["Despacito", "Baby Shark Dance", "Shape of You", "Gangnam Style"],
        correct: 1,
        explanation: "Baby Shark Dance superó los 14 mil millones de reproducciones en YouTube."
    },

    // --- HISTORIA Y CIENCIA ---
    {
        id: 20,
        category: "historia_ciencia",
        categoryName: "Historia y Ciencia",
        icon: "🔬",
        question: "¿Cuál es el elemento químico más abundante en el universo observable?",
        options: ["Oxígeno", "Helio", "Hidrógeno", "Carbono"],
        correct: 2,
        explanation: "El Hidrógeno representa aproximadamente el 75% de la materia bariónica del universo."
    },
    {
        id: 21,
        category: "historia_ciencia",
        categoryName: "Historia y Ciencia",
        icon: "🔬",
        question: "¿En qué año llegó el ser humano por primera vez a la Luna en la misión Apolo 11?",
        options: ["1965", "1969", "1972", "1959"],
        correct: 1,
        explanation: "Neil Armstrong y Buzz Aldrin caminaron sobre la Luna el 20 de julio de 1969."
    },
    {
        id: 22,
        category: "historia_ciencia",
        categoryName: "Historia y Ciencia",
        icon: "🔬",
        question: "¿Cuál es el planeta más grande del sistema solar?",
        options: ["Saturno", "Neptuno", "Júpiter", "Tierra"],
        correct: 2,
        explanation: "Júpiter es el planeta gigante gaseoso más grande de nuestro sistema solar."
    }
];

const CATEGORIES_DATA = [
    { id: "cultura_pop", name: "Cultura Pop", icon: "🍿", count: 4 },
    { id: "cine_series", name: "Cine y Series", icon: "🎬", count: 4 },
    { id: "videojuegos", name: "Videojuegos", icon: "🎮", count: 4 },
    { id: "anime", name: "Anime y Manga", icon: "⚡", count: 4 },
    { id: "musica", name: "Música", icon: "🎵", count: 3 },
    { id: "historia_ciencia", name: "Historia y Ciencia", icon: "🔬", count: 3 }
];
