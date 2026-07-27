// Game State
const gameState = {
    players: [],
    impostorIndex: -1,
    secretWord: '',
    currentRevealIndex: 0,
    votes: {},
    votingRound: 1,
    customMode: false,
    lastImpostorIndex: -1,
    impostorConsecutiveCount: 0,
    selectedCategories: [] // Store selected category IDs
};

// DOM Elements
const categoryPhase = document.getElementById('category-phase');
const setupPhase = document.getElementById('setup-phase');
const namesPhase = document.getElementById('names-phase');
const revealPhase = document.getElementById('reveal-phase');
const votingPhase = document.getElementById('voting-phase');
const resultsPhase = document.getElementById('results-phase');

const categoriesContainer = document.getElementById('categories-container');
const selectAllBtn = document.getElementById('select-all-btn');
const deselectAllBtn = document.getElementById('deselect-all-btn');
const confirmCategoriesBtn = document.getElementById('confirm-categories-btn');

const playerCountInput = document.getElementById('player-count');
const customWordGroup = document.getElementById('custom-word-group');
const customWordInput = document.getElementById('custom-word');
const customPlayerCountGroup = document.getElementById('custom-player-count-group');
const customPlayerCountInput = document.getElementById('custom-player-count');
const setPlayersBtn = document.getElementById('set-players-btn');
const playerNamesContainer = document.getElementById('player-names-container');
const startGameBtn = document.getElementById('start-game-btn');

const currentPlayerName = document.getElementById('current-player-name');
const revealRoleBtn = document.getElementById('reveal-role-btn');
const revealWaiting = document.getElementById('reveal-waiting');
const revealContent = document.getElementById('reveal-content');
const roleDisplay = document.getElementById('role-display');
const nextPlayerBtn = document.getElementById('next-player-btn');

const votingContainer = document.getElementById('voting-container');
const voteCount = document.getElementById('vote-count');
const totalVotes = document.getElementById('total-votes');
const finishVotingBtn = document.getElementById('finish-voting-btn');

const resultsContent = document.getElementById('results-content');
const newVoteBtn = document.getElementById('new-vote-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const restartGameBtn = document.getElementById('restart-game-btn');

// Event Listeners
selectAllBtn.addEventListener('click', selectAllCategories);
deselectAllBtn.addEventListener('click', deselectAllCategories);
confirmCategoriesBtn.addEventListener('click', confirmCategories);
playerCountInput.addEventListener('input', checkSecretCode);
setPlayersBtn.addEventListener('click', setupPlayerNames);
startGameBtn.addEventListener('click', startGame);
revealRoleBtn.addEventListener('click', showRole);
nextPlayerBtn.addEventListener('click', nextPlayer);
finishVotingBtn.addEventListener('click', showResults);
newVoteBtn.addEventListener('click', startNewVoting);
playAgainBtn.addEventListener('click', playAgain);
restartGameBtn.addEventListener('click', restartGame);

// Secret Code Detection
function checkSecretCode() {
    const value = playerCountInput.value.trim();

    if (value === '2353') {
        gameState.customMode = true;
        customWordGroup.classList.remove('hidden');
        customPlayerCountGroup.classList.remove('hidden');
        customWordInput.focus();
    } else {
        gameState.customMode = false;
        customWordGroup.classList.add('hidden');
        customPlayerCountGroup.classList.add('hidden');
    }
}

// Category Selection Functions
function renderCategories() {
    const categories = getAllCategories();
    categoriesContainer.innerHTML = '';

    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.dataset.categoryId = category.id;
        card.innerHTML = `
            <div class="category-checkbox">
                <input type="checkbox" id="cat-${category.id}" class="category-input">
                <label for="cat-${category.id}"></label>
            </div>
            <div class="category-info">
                <h3 class="category-name">${category.name}</h3>
                <p class="category-count">${category.count} palabras</p>
            </div>
        `;

        const checkbox = card.querySelector('.category-input');
        checkbox.addEventListener('change', updateCategorySelection);

        card.addEventListener('click', (e) => {
            if (e.target !== checkbox && e.target.tagName !== 'LABEL') {
                checkbox.checked = !checkbox.checked;
                updateCategorySelection();
            }
        });

        categoriesContainer.appendChild(card);
    });
}

function updateCategorySelection() {
    const checkboxes = document.querySelectorAll('.category-input');
    const selectedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

    confirmCategoriesBtn.disabled = selectedCount === 0;

    // Update visual state of cards
    checkboxes.forEach(checkbox => {
        const card = checkbox.closest('.category-card');
        if (checkbox.checked) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

function selectAllCategories() {
    const checkboxes = document.querySelectorAll('.category-input');
    checkboxes.forEach(cb => cb.checked = true);
    updateCategorySelection();
}

function deselectAllCategories() {
    const checkboxes = document.querySelectorAll('.category-input');
    checkboxes.forEach(cb => cb.checked = false);
    updateCategorySelection();
}

function confirmCategories() {
    const checkboxes = document.querySelectorAll('.category-input:checked');
    gameState.selectedCategories = Array.from(checkboxes).map(cb =>
        cb.id.replace('cat-', '')
    );

    if (gameState.selectedCategories.length === 0) {
        alert('Por favor, selecciona al menos una categoría');
        return;
    }

    showPhase(namesPhase);
}

// Phase Management
function showPhase(phase) {
    [categoryPhase, setupPhase, namesPhase, revealPhase, votingPhase, resultsPhase].forEach(p => {
        p.classList.remove('active');
    });
    phase.classList.add('active');
}

// Setup Player Names
function setupPlayerNames() {
    let count;

    // Check if custom mode is active
    if (gameState.customMode) {
        const customWord = customWordInput.value.trim();

        if (!customWord) {
            alert('Por favor, ingresa una palabra o tema personalizado');
            return;
        }

        // Store custom word
        gameState.secretWord = customWord;

        // Get number of players from custom input
        count = parseInt(customPlayerCountInput.value);

        if (isNaN(count) || count < 2 || count > 10) {
            alert('Por favor, ingresa un número válido entre 2 y 10 jugadores');
            return;
        }
    } else {
        count = parseInt(playerCountInput.value);

        if (isNaN(count) || count < 2 || count > 10) {
            alert('Por favor, ingresa entre 2 y 10 jugadores');
            return;
        }
    }

    playerNamesContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.className = 'player-input-group';
        div.innerHTML = `
            <span class="player-number">Jugador ${i + 1}:</span>
            <input type="text" class="input-field player-name-input" placeholder="Nombre" required>
        `;
        playerNamesContainer.appendChild(div);
    }

    showPhase(categoryPhase);
}

// Start Game
function startGame() {
    const nameInputs = document.querySelectorAll('.player-name-input');
    const names = Array.from(nameInputs).map(input => input.value.trim());

    // Validate names
    if (names.some(name => name === '')) {
        alert('Por favor, ingresa todos los nombres');
        return;
    }

    // Check for duplicate names
    const uniqueNames = new Set(names);
    if (uniqueNames.size !== names.length) {
        alert('Los nombres deben ser únicos');
        return;
    }

    // Initialize game state
    gameState.players = names;
    gameState.impostorIndex = Math.floor(Math.random() * names.length);
    gameState.lastImpostorIndex = gameState.impostorIndex;
    gameState.impostorConsecutiveCount = 1;

    // Use custom word if in custom mode, otherwise random from selected categories
    if (!gameState.customMode) {
        gameState.secretWord = getRandomWord(gameState.selectedCategories);
    }

    gameState.currentRevealIndex = 0;
    gameState.votes = {};
    gameState.votingRound = 1;

    // Start reveal phase
    showRevealPhase();
}

// Reveal Phase
function showRevealPhase() {
    currentPlayerName.textContent = gameState.players[gameState.currentRevealIndex];
    revealWaiting.classList.remove('hidden');
    revealContent.classList.add('hidden');
    showPhase(revealPhase);
}

function showRole() {
    const isImpostor = gameState.currentRevealIndex === gameState.impostorIndex;

    if (isImpostor) {
        roleDisplay.innerHTML = `
            <div class="role-impostor">
                <div class="role-title">🎭 ERES EL IMPOSTOR 🎭</div>
                <p class="role-description">
                    Los demás jugadores tienen una palabra secreta.<br>
                    Intenta descubrir cuál es sin que te descubran.<br>
                    ¡Actúa como si la conocieras!
                </p>
            </div>
        `;
    } else {
        roleDisplay.innerHTML = `
            <div class="role-innocent">
                <div class="role-title">✅ ERES INOCENTE ✅</div>
                <div class="secret-word">${gameState.secretWord}</div>
                <p class="role-description">
                    Esta es tu palabra secreta.<br>
                    El impostor NO la conoce.<br>
                    ¡Descubre quién es el impostor!
                </p>
            </div>
        `;
    }

    revealWaiting.classList.add('hidden');
    revealContent.classList.remove('hidden');
}

function nextPlayer() {
    gameState.currentRevealIndex++;

    if (gameState.currentRevealIndex < gameState.players.length) {
        showRevealPhase();
    } else {
        startVoting();
    }
}

// Voting Phase
function startVoting() {
    votingContainer.innerHTML = '';
    gameState.votes = {};

    gameState.players.forEach((player, index) => {
        const btn = document.createElement('button');
        btn.className = 'vote-btn';
        btn.textContent = player;
        btn.dataset.index = index;
        btn.addEventListener('click', () => voteForPlayer(index, btn));
        votingContainer.appendChild(btn);
    });

    totalVotes.textContent = gameState.players.length;
    voteCount.textContent = '0';
    finishVotingBtn.disabled = true;

    showPhase(votingPhase);
}

function voteForPlayer(index, btn) {
    // Remove previous vote styling
    document.querySelectorAll('.vote-btn').forEach(b => b.classList.remove('voted'));

    // Add vote
    btn.classList.add('voted');

    // Track votes
    if (!gameState.votes[index]) {
        gameState.votes[index] = 0;
    }
    gameState.votes[index]++;

    // Update vote count
    const currentVotes = Object.values(gameState.votes).reduce((a, b) => a + b, 0);
    voteCount.textContent = currentVotes;

    // Enable finish button when all voted
    if (currentVotes >= gameState.players.length) {
        finishVotingBtn.disabled = false;
    }
}

// Results Phase
function showResults() {
    const voteCounts = {};

    // Count votes
    gameState.players.forEach((_, index) => {
        voteCounts[index] = gameState.votes[index] || 0;
    });

    // Find player with most votes
    let maxVotes = 0;
    let suspectIndex = -1;

    Object.entries(voteCounts).forEach(([index, count]) => {
        if (count > maxVotes) {
            maxVotes = count;
            suspectIndex = parseInt(index);
        }
    });

    const isCorrect = suspectIndex === gameState.impostorIndex;
    const impostorName = gameState.players[gameState.impostorIndex];
    const suspectName = suspectIndex >= 0 ? gameState.players[suspectIndex] : 'Nadie';

    // Build results HTML
    let resultsHTML = '';

    if (isCorrect) {
        resultsHTML = `
            <div class="result-icon">🎉</div>
            <h2 class="result-title result-win">¡GANARON LOS INOCENTES!</h2>
            <p class="result-message">
                Encontraron al impostor correctamente.<br>
                <strong>${impostorName}</strong> era el impostor.<br><br>
                La palabra secreta era: <span class="secret-word-reveal">${gameState.secretWord}</span>
            </p>
        `;
    } else {
        resultsHTML = `
            <div class="result-icon">😈</div>
            <h2 class="result-title result-lose">¡EL IMPOSTOR SIGUE LIBRE!</h2>
            <p class="result-message">
                Votaron por <strong>${suspectName}</strong>, pero el impostor era <strong>${impostorName}</strong>.<br>
                Pueden votar de nuevo o iniciar un nuevo juego.
            </p>
        `;
    }

    // Add vote breakdown
    resultsHTML += '<div class="vote-results">';
    gameState.players.forEach((player, index) => {
        const votes = voteCounts[index] || 0;
        const isImpostor = index === gameState.impostorIndex;
        resultsHTML += `
            <div class="vote-result-item">
                <span class="vote-result-name">
                    ${player} ${isImpostor ? '' : ''}
                </span>
                <span class="vote-result-count">${votes} voto${votes !== 1 ? 's' : ''}</span>
            </div>
        `;
    });
    resultsHTML += '</div>';

    resultsContent.innerHTML = resultsHTML;

    // Show/hide buttons based on result
    if (isCorrect) {
        newVoteBtn.style.display = 'none';
        playAgainBtn.style.display = 'inline-block';
    } else {
        newVoteBtn.style.display = 'inline-block';
        playAgainBtn.style.display = 'none';
    }

    showPhase(resultsPhase);
}

function startNewVoting() {
    gameState.votingRound++;
    startVoting();
}

function playAgain() {
    // Keep the same players, just reset the game
    const currentPlayers = [...gameState.players];

    // Select new impostor with consecutive limit
    let newImpostorIndex;

    // If the last impostor has been impostor 2 times in a row, force a change
    if (gameState.impostorConsecutiveCount >= 2) {
        // Select a different player
        do {
            newImpostorIndex = Math.floor(Math.random() * currentPlayers.length);
        } while (newImpostorIndex === gameState.lastImpostorIndex && currentPlayers.length > 1);

        gameState.impostorConsecutiveCount = 1;
    } else {
        // Random selection
        newImpostorIndex = Math.floor(Math.random() * currentPlayers.length);

        // Update consecutive count
        if (newImpostorIndex === gameState.lastImpostorIndex) {
            gameState.impostorConsecutiveCount++;
        } else {
            gameState.impostorConsecutiveCount = 1;
        }
    }

    gameState.impostorIndex = newImpostorIndex;
    gameState.lastImpostorIndex = newImpostorIndex;

    // Use custom word if in custom mode, otherwise random from selected categories
    if (!gameState.customMode) {
        gameState.secretWord = getRandomWord(gameState.selectedCategories);
    }

    gameState.currentRevealIndex = 0;
    gameState.votes = {};
    gameState.votingRound = 1;

    // Start reveal phase with same players
    showRevealPhase();
}

function restartGame() {
    gameState.players = [];
    gameState.impostorIndex = -1;
    gameState.secretWord = '';
    gameState.currentRevealIndex = 0;
    gameState.votes = {};
    gameState.votingRound = 1;
    gameState.customMode = false;
    gameState.lastImpostorIndex = -1;
    gameState.impostorConsecutiveCount = 0;
    gameState.selectedCategories = [];

    playerCountInput.value = '5';
    customWordInput.value = '';
    customPlayerCountInput.value = '5';
    customWordGroup.classList.add('hidden');
    customPlayerCountGroup.classList.add('hidden');

    // Reset category selection
    deselectAllCategories();
    showPhase(setupPhase);
}

// Initialize
renderCategories();
showPhase(setupPhase);
