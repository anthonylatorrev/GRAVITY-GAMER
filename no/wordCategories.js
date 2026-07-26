// Word Categories for El Impostor Game
const wordCategories = {
    'peliculas-series': {
        name: '🎬 Películas y Series',
        words: [
            'Toy Story', 'Buzz Lightyear', 'Woody', 'Rex', 'Slinky - toy story',
            'Harry Potter',
            'Avengers', 'Iron Man', 'Capitán América', 'Thor', 'Hulk',
            'Squid Game',
            'Wednesday', 'Merlina',
            'Shrek', 'Fiona', 'Burro', 'Gato con Botas', 'Dragona'
        ]
    },
    'futbol-deportes': {
        name: '⚽ Fútbol y Deportes',
        words: [
            'Messi', 'Neymar Junior', 'Paolo Guerrero', 'Cueva', 'Gareca', 'Lapadula',
            'Cristiano Ronaldo', 'Mbappé'
        ]
    },
    'celebridades': {
        name: '⭐ Celebridades',
        words: [
            'Pamela Franco', 'Christian Domínguez', 'Magaly', 'Paisana Jacinta',
            'Ricolas', 'Yahaira Plasencia', 'Rosángela Espinoza', 'Melcochita'
        ]
    },
    'profesores-uac': {
        name: '👨‍🏫 Profesores UAC',
        words: [
            'Ingeniero Palomino', 'Ingeniero Carrasco', 'Ingeniero Ramon',
            'Ingeniero Vitaly', 'Ingeniero Cossio', 'Ingeniero Lornel',
            'Ingeniero Zamalloa', 'Ingeniero Felix'
        ]
    },
    'alumnos-uac': {
        name: '🎓 Alumnos UAC',
        words: [
            'Gian luca', 'Honorio', 'Sayo', 'Zavaleta', 'Luis Marin',
            'Yajaira', 'Martin Donnato'
        ]
    },
    'superheroes': {
        name: '🦸 Superhéroes Marvel y DC',
        words: [
            'Spider-Man', 'Batman', 'Superman', 'Wonder Woman', 'Flash',
            'Wolverine', 'Black Panther', 'Doctor Strange', 'Deadpool',
            'Aquaman', 'Linterna Verde'
        ]
    },
    'cartoon-network': {
        name: '📺 Cartoon Network',
        words: [
            // Hora de Aventura
            'Finn', 'Jake', 'Princesa Chicle', 'Rey Helado', 'Marceline - hora de aventura',
            // Un Show Más
            'Mordecai', 'Rigby', 'Benson - un show más', 'Skips', 'Papaleta',
            // Clarence
            'Clarence', 'Jeff - clarence', 'Sumo - clarence',
            // Tío Grandpa
            'Tío Grandpa', 'Pizza Steve',
            // Increíble Mundo de Gumball
            'Gumball - increible mundo de gumball', 'Darwin - increible mundo de gumball',
            'Anais - increible mundo de gumball', 'Nicole - increible mundo de gumball',
            'Richard - increible mundo de gumball',
            // Gravity Falls
            'Dipper - gravity falls', 'Mabel - gravity falls', 'Tio Stan - gravity falls',
            'Wendy - gravity falls', 'Bill Cipher - gravity falls'
        ]
    },
    'disney-channel': {
        name: '🎪 Disney Channel',
        words: [
            // Phineas y Ferb
            'Phineas', 'Ferb', 'Perry el Ornitorrinco', 'Dr. Doofenshmirtz',
            // Pecezuelos
            'Pecezuelos',
            // Kick Buttowski
            'Kick Buttowski', 'Gunther', 'Brad - kick buttowski'
        ]
    },
    'clasicos': {
        name: '🌟 Clásicos',
        words: [
            // Los Simpson
            'Homero', 'Marge', 'Bart', 'Lisa', 'Mr. Burns - los simpson',
            // Dragon Ball
            'Goku', 'Vegeta', 'Bulma - dragon ball', 'Krilin - dragon ball',
            'Freezer - dragon ball', 'Cell - dragon ball'
        ]
    }
};

/**
 * Get all available categories
 * @returns {Array} Array of category objects with id, name, and word count
 */
function getAllCategories() {
    return Object.keys(wordCategories).map(key => ({
        id: key,
        name: wordCategories[key].name,
        count: wordCategories[key].words.length
    }));
}

/**
 * Get words from selected categories
 * @param {Array} selectedCategoryIds - Array of category IDs to include
 * @returns {Array} Combined array of words from selected categories
 */
function getWordsByCategories(selectedCategoryIds) {
    if (!selectedCategoryIds || selectedCategoryIds.length === 0) {
        return [];
    }

    let words = [];
    selectedCategoryIds.forEach(categoryId => {
        if (wordCategories[categoryId]) {
            words = words.concat(wordCategories[categoryId].words);
        }
    });

    return words;
}

/**
 * Get all words from all categories
 * @returns {Array} All available words
 */
function getAllWords() {
    let allWords = [];
    Object.keys(wordCategories).forEach(key => {
        allWords = allWords.concat(wordCategories[key].words);
    });
    return allWords;
}

/**
 * Get a random word from selected categories
 * @param {Array} selectedCategoryIds - Array of category IDs
 * @returns {String} Random word
 */
function getRandomWord(selectedCategoryIds) {
    const words = getWordsByCategories(selectedCategoryIds);
    if (words.length === 0) {
        return '';
    }
    return words[Math.floor(Math.random() * words.length)];
}
