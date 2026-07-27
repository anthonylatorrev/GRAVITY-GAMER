document.addEventListener("DOMContentLoaded", () => {
    // --- ESTADO DEL JUEGO ---
    const state = {
        gameMode: "competitive", // 'competitive' o 'free'
        playerCount: 4,
        roundCount: 5,
        selectedCategories: [],
        players: [], // [{ id, name, score }]
        currentRound: 1,
        currentPlayerIndex: 0,
        questionPool: [],
        currentQuestion: null,
        hasAnswered: false,

        // Estado Modo Libre
        freeStreak: 0,
        freeTotalCorrect: 0,
        freeCurrentQuestion: null,
        freeHasAnswered: false
    };

    // --- ELEMENTOS DEL DOM ---
    const phases = {
        mode: document.getElementById("mode-phase"),
        setup: document.getElementById("setup-phase"),
        category: document.getElementById("category-phase"),
        names: document.getElementById("names-phase"),
        turnWaiting: document.getElementById("turn-waiting-phase"),
        question: document.getElementById("question-phase"),
        leaderboard: document.getElementById("leaderboard-phase"),
        podium: document.getElementById("podium-phase"),
        freeMode: document.getElementById("free-mode-phase")
    };

    // --- CAMBIO DE FASE ---
    function showPhase(targetPhase) {
        Object.values(phases).forEach(phase => {
            if (phase) phase.classList.remove("active");
        });
        if (targetPhase) {
            targetPhase.classList.add("active");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    // --- FASE 1: SELECCIÓN DE MODO ---
    const modeCards = document.querySelectorAll(".mode-card");
    const modeContinueBtn = document.getElementById("mode-continue-btn");

    modeCards.forEach(card => {
        card.addEventListener("click", () => {
            modeCards.forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            state.gameMode = card.dataset.mode;
        });
    });

    modeContinueBtn.addEventListener("click", () => {
        if (state.gameMode === "competitive") {
            showPhase(phases.setup);
        } else {
            // Modo Libre
            initCategoriesPhase();
        }
    });

    // --- FASE 2: SETUP (JUGADORES Y RONDAS) ---
    const playerCountInput = document.getElementById("player-count");
    const roundCountInput = document.getElementById("round-count");
    const setupContinueBtn = document.getElementById("setup-continue-btn");

    setupContinueBtn.addEventListener("click", () => {
        let pCount = parseInt(playerCountInput.value) || 4;
        let rCount = parseInt(roundCountInput.value) || 5;

        pCount = Math.max(2, Math.min(10, pCount));
        rCount = Math.max(1, Math.min(10, rCount));

        state.playerCount = pCount;
        state.roundCount = rCount;

        initCategoriesPhase();
    });

    // --- FASE 3: CATEGORÍAS ---
    const categoriesContainer = document.getElementById("categories-container");
    const selectAllCatBtn = document.getElementById("select-all-cat-btn");
    const deselectAllCatBtn = document.getElementById("deselect-all-cat-btn");
    const categoriesContinueBtn = document.getElementById("categories-continue-btn");

    function initCategoriesPhase() {
        categoriesContainer.innerHTML = "";
        state.selectedCategories = CATEGORIES_DATA.map(c => c.id);

        CATEGORIES_DATA.forEach(cat => {
            const card = document.createElement("div");
            card.className = "category-card selected";
            card.dataset.id = cat.id;
            card.innerHTML = `
                <span class="category-icon">${cat.icon}</span>
                <span class="category-name">${cat.name}</span>
            `;

            card.addEventListener("click", () => {
                if (card.classList.contains("selected")) {
                    // Prevenir deseleccionar la última categoría
                    if (state.selectedCategories.length > 1) {
                        card.classList.remove("selected");
                        state.selectedCategories = state.selectedCategories.filter(id => id !== cat.id);
                    }
                } else {
                    card.classList.add("selected");
                    state.selectedCategories.push(cat.id);
                }
            });

            categoriesContainer.appendChild(card);
        });

        showPhase(phases.category);
    }

    selectAllCatBtn.addEventListener("click", () => {
        state.selectedCategories = CATEGORIES_DATA.map(c => c.id);
        document.querySelectorAll(".category-card").forEach(c => c.classList.add("selected"));
    });

    deselectAllCatBtn.addEventListener("click", () => {
        if (CATEGORIES_DATA.length > 0) {
            state.selectedCategories = [CATEGORIES_DATA[0].id];
            document.querySelectorAll(".category-card").forEach((c, idx) => {
                if (idx === 0) c.classList.add("selected");
                else c.classList.remove("selected");
            });
        }
    });

    categoriesContinueBtn.addEventListener("click", () => {
        if (state.selectedCategories.length === 0) return;

        if (state.gameMode === "competitive") {
            initNamesPhase();
        } else {
            startFreeMode();
        }
    });

    // --- FASE 4: INGRESO DE NOMBRES ---
    const playerNamesContainer = document.getElementById("player-names-container");
    const startGameBtn = document.getElementById("start-game-btn");

    function initNamesPhase() {
        playerNamesContainer.innerHTML = "";
        for (let i = 1; i <= state.playerCount; i++) {
            const group = document.createElement("div");
            group.className = "form-group";
            group.innerHTML = `
                <label for="player-name-${i}">Jugador ${i}</label>
                <input type="text" id="player-name-${i}" class="input-field player-name-input" value="Jugador ${i}" placeholder="Nombre de Jugador ${i}">
            `;
            playerNamesContainer.appendChild(group);
        }
        showPhase(phases.names);
    }

    startGameBtn.addEventListener("click", () => {
        const inputs = document.querySelectorAll(".player-name-input");
        state.players = [];

        inputs.forEach((input, index) => {
            const name = input.value.trim() || `Jugador ${index + 1}`;
            state.players.push({
                id: index + 1,
                name: name,
                score: 0
            });
        });

        startCompetitiveGame();
    });

    // --- INICIALIZACIÓN PARTIDA COMPETITIVA ---
    function startCompetitiveGame() {
        state.currentRound = 1;
        state.currentPlayerIndex = 0;

        // Filtrar y mezclar preguntas
        let available = TRIVIA_QUESTIONS.filter(q => state.selectedCategories.includes(q.category));
        if (available.length === 0) available = [...TRIVIA_QUESTIONS];
        state.questionPool = shuffleArray([...available]);

        showTurnWaitingPhase();
    }

    // Helper para mezclar array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // --- FASE 5: ESPERA DE TURNO ---
    const currentPlayerTurnName = document.getElementById("current-player-turn-name");
    const waitingPlayerNameBold = document.getElementById("waiting-player-name-bold");
    const startTurnBtn = document.getElementById("start-turn-btn");

    function showTurnWaitingPhase() {
        const activePlayer = state.players[state.currentPlayerIndex];
        currentPlayerTurnName.textContent = activePlayer.name;
        waitingPlayerNameBold.textContent = activePlayer.name;

        showPhase(phases.turnWaiting);
    }

    startTurnBtn.addEventListener("click", () => {
        showQuestionPhase();
    });

    // --- FASE 6: PREGUNTA ACTIVA ---
    const activePlayerName = document.getElementById("active-player-name");
    const currentRoundNum = document.getElementById("current-round-num");
    const totalRoundsNum = document.getElementById("total-rounds-num");
    const questionCategoryTag = document.getElementById("question-category-tag");
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const feedbackBanner = document.getElementById("feedback-banner");
    const feedbackTitle = document.getElementById("feedback-title");
    const feedbackExplanation = document.getElementById("feedback-explanation");
    const nextTurnBtn = document.getElementById("next-turn-btn");

    function showQuestionPhase() {
        state.hasAnswered = false;
        feedbackBanner.classList.add("hidden");
        nextTurnBtn.classList.add("hidden");

        const activePlayer = state.players[state.currentPlayerIndex];
        activePlayerName.textContent = activePlayer.name;
        currentRoundNum.textContent = state.currentRound;
        totalRoundsNum.textContent = state.roundCount;

        // Obtener siguiente pregunta
        if (state.questionPool.length === 0) {
            let available = TRIVIA_QUESTIONS.filter(q => state.selectedCategories.includes(q.category));
            state.questionPool = shuffleArray([...available]);
        }
        state.currentQuestion = state.questionPool.pop();

        questionCategoryTag.textContent = `${state.currentQuestion.icon} ${state.currentQuestion.categoryName}`;
        questionText.textContent = state.currentQuestion.question;

        // Cargar Opciones
        optionsContainer.innerHTML = "";
        const letters = ["A", "B", "C", "D"];

        state.currentQuestion.options.forEach((optText, idx) => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.dataset.index = idx;
            btn.innerHTML = `
                <span class="option-letter">${letters[idx]}</span>
                <span>${optText}</span>
            `;

            btn.addEventListener("click", () => handleAnswerSelect(idx, btn));
            optionsContainer.appendChild(btn);
        });

        showPhase(phases.question);
    }

    function handleAnswerSelect(selectedIndex, selectedBtn) {
        if (state.hasAnswered) return;
        state.hasAnswered = true;

        const allButtons = optionsContainer.querySelectorAll(".option-btn");
        allButtons.forEach(b => b.disabled = true);

        const correctIndex = state.currentQuestion.correct;
        const activePlayer = state.players[state.currentPlayerIndex];

        if (selectedIndex === correctIndex) {
            selectedBtn.classList.add("correct");
            activePlayer.score += 100;

            feedbackBanner.className = "feedback-banner correct-banner";
            feedbackTitle.textContent = "¡RESPUESTA CORRECTA! 🎉 (+100 PTS)";
            feedbackExplanation.textContent = state.currentQuestion.explanation;
        } else {
            selectedBtn.classList.add("wrong");
            // Resaltar correcta en verde
            const correctBtn = optionsContainer.querySelector(`[data-index="${correctIndex}"]`);
            if (correctBtn) correctBtn.classList.add("correct");

            feedbackBanner.className = "feedback-banner wrong-banner";
            feedbackTitle.textContent = "¡RESPUESTA INCORRECTA! ❌";
            feedbackExplanation.textContent = `La opción correcta era: ${state.currentQuestion.options[correctIndex]}. ${state.currentQuestion.explanation}`;
        }

        feedbackBanner.classList.remove("hidden");
        nextTurnBtn.classList.remove("hidden");
    }

    nextTurnBtn.addEventListener("click", () => {
        state.currentPlayerIndex++;

        if (state.currentPlayerIndex < state.players.length) {
            // Siguiente jugador de la misma ronda
            showTurnWaitingPhase();
        } else {
            // Fin de la ronda
            showLeaderboardPhase();
        }
    });

    // --- FASE 7: TABLA DE POSICIONES (LEADERBOARD) ---
    const lbRoundNum = document.getElementById("lb-round-num");
    const leaderboardList = document.getElementById("leaderboard-list");
    const nextRoundBtn = document.getElementById("next-round-btn");

    function showLeaderboardPhase() {
        lbRoundNum.textContent = state.currentRound;

        // Ordenar copia de jugadores por puntaje de mayor a menor
        const sortedPlayers = [...state.players].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.name.localeCompare(b.name);
        });

        leaderboardList.innerHTML = "";
        const rankEmojis = ["🥇", "🥈", "🥉"];

        sortedPlayers.forEach((player, index) => {
            const row = document.createElement("div");
            row.className = `leaderboard-row rank-${index + 1}`;

            const badgeText = index < 3 ? rankEmojis[index] : `#${index + 1}`;

            row.innerHTML = `
                <div class="player-rank-info">
                    <span class="rank-badge">${badgeText}</span>
                    <span class="player-name-text">${player.name}</span>
                </div>
                <span class="player-score-text">${player.score} PTS</span>
            `;

            leaderboardList.appendChild(row);
        });

        if (state.currentRound < state.roundCount) {
            nextRoundBtn.textContent = `¡Comenzar Ronda ${state.currentRound + 1}! 🚀`;
        } else {
            nextRoundBtn.textContent = `¡Ver Resultados Finales y Podio! 🏆`;
        }

        showPhase(phases.leaderboard);
    }

    nextRoundBtn.addEventListener("click", () => {
        if (state.currentRound < state.roundCount) {
            state.currentRound++;
            state.currentPlayerIndex = 0;
            showTurnWaitingPhase();
        } else {
            showPodiumPhase();
        }
    });

    // --- FASE 8: PODIO FINAL DE GANADORES ---
    const podiumContainer = document.getElementById("podium-container");
    const playAgainBtn = document.getElementById("play-again-btn");

    function showPodiumPhase() {
        podiumContainer.innerHTML = "";

        const sorted = [...state.players].sort((a, b) => b.score - a.score);

        // Armar posiciones para podio (2do a la izq, 1ro al centro, 3ro a la der)
        const podiumData = [];

        if (sorted[1]) podiumData.push({ place: 2, player: sorted[1], avatar: "🥈", class: "podium-2" });
        if (sorted[0]) podiumData.push({ place: 1, player: sorted[0], avatar: "👑", class: "podium-1" });
        if (sorted[2]) podiumData.push({ place: 3, player: sorted[2], avatar: "🥉", class: "podium-3" });

        podiumData.forEach(item => {
            const placeDiv = document.createElement("div");
            placeDiv.className = `podium-place ${item.class}`;
            placeDiv.innerHTML = `
                <div class="podium-avatar">${item.avatar}</div>
                <div class="podium-name">${item.player.name}</div>
                <div class="podium-score">${item.player.score} PTS</div>
                <div class="podium-block">#${item.place}</div>
            `;
            podiumContainer.appendChild(placeDiv);
        });

        showPhase(phases.podium);

        // Revelar con animación escalonada
        setTimeout(() => {
            const places = podiumContainer.querySelectorAll(".podium-place");
            places.forEach((p, idx) => {
                setTimeout(() => {
                    p.classList.add("show");
                }, idx * 300);
            });
        }, 100);
    }

    playAgainBtn.addEventListener("click", () => {
        showPhase(phases.mode);
    });

    // --- FASE 9: MODO LIBRE ---
    const freeStreakCount = document.getElementById("free-streak-count");
    const freeTotalCorrect = document.getElementById("free-total-correct");
    const freeCategoryTag = document.getElementById("free-category-tag");
    const freeQuestionText = document.getElementById("free-question-text");
    const freeOptionsContainer = document.getElementById("free-options-container");
    const freeFeedbackBanner = document.getElementById("free-feedback-banner");
    const freeFeedbackTitle = document.getElementById("free-feedback-title");
    const freeFeedbackExplanation = document.getElementById("free-feedback-explanation");
    const freeNextBtn = document.getElementById("free-next-btn");

    function startFreeMode() {
        state.freeStreak = 0;
        state.freeTotalCorrect = 0;
        freeStreakCount.textContent = "0";
        freeTotalCorrect.textContent = "0";

        let available = TRIVIA_QUESTIONS.filter(q => state.selectedCategories.includes(q.category));
        if (available.length === 0) available = [...TRIVIA_QUESTIONS];
        state.questionPool = shuffleArray([...available]);

        loadFreeQuestion();
        showPhase(phases.freeMode);
    }

    function loadFreeQuestion() {
        state.freeHasAnswered = false;
        freeFeedbackBanner.classList.add("hidden");
        freeNextBtn.classList.add("hidden");

        if (state.questionPool.length === 0) {
            let available = TRIVIA_QUESTIONS.filter(q => state.selectedCategories.includes(q.category));
            state.questionPool = shuffleArray([...available]);
        }
        state.freeCurrentQuestion = state.questionPool.pop();

        freeCategoryTag.textContent = `${state.freeCurrentQuestion.icon} ${state.freeCurrentQuestion.categoryName}`;
        freeQuestionText.textContent = state.freeCurrentQuestion.question;

        freeOptionsContainer.innerHTML = "";
        const letters = ["A", "B", "C", "D"];

        state.freeCurrentQuestion.options.forEach((optText, idx) => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.dataset.index = idx;
            btn.innerHTML = `
                <span class="option-letter">${letters[idx]}</span>
                <span>${optText}</span>
            `;

            btn.addEventListener("click", () => handleFreeAnswerSelect(idx, btn));
            freeOptionsContainer.appendChild(btn);
        });
    }

    function handleFreeAnswerSelect(selectedIndex, selectedBtn) {
        if (state.freeHasAnswered) return;
        state.freeHasAnswered = true;

        const allBtns = freeOptionsContainer.querySelectorAll(".option-btn");
        allBtns.forEach(b => b.disabled = true);

        const correctIndex = state.freeCurrentQuestion.correct;

        if (selectedIndex === correctIndex) {
            selectedBtn.classList.add("correct");
            state.freeStreak++;
            state.freeTotalCorrect++;

            freeStreakCount.textContent = state.freeStreak;
            freeTotalCorrect.textContent = state.freeTotalCorrect;

            freeFeedbackBanner.className = "feedback-banner correct-banner";
            freeFeedbackTitle.textContent = "¡CORRECTO! 🔥";
            freeFeedbackExplanation.textContent = state.freeCurrentQuestion.explanation;
        } else {
            selectedBtn.classList.add("wrong");
            const correctBtn = freeOptionsContainer.querySelector(`[data-index="${correctIndex}"]`);
            if (correctBtn) correctBtn.classList.add("correct");

            state.freeStreak = 0;
            freeStreakCount.textContent = "0";

            freeFeedbackBanner.className = "feedback-banner wrong-banner";
            freeFeedbackTitle.textContent = "¡INCORRECTO! ❌";
            freeFeedbackExplanation.textContent = `La respuesta correcta era: ${state.freeCurrentQuestion.options[correctIndex]}. ${state.freeCurrentQuestion.explanation}`;
        }

        freeFeedbackBanner.classList.remove("hidden");
        freeNextBtn.classList.remove("hidden");
    }

    freeNextBtn.addEventListener("click", () => {
        loadFreeQuestion();
    });
});
