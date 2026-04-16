// === MOSSOS STUDY PLATFORM - Progress System ===

const MOSSOS_PROGRESS_KEY = 'mossos_progress';
const MOSSOS_MISTAKES_KEY = 'mossos_mistakes';
const MOSSOS_QUIZ_HISTORY_KEY = 'mossos_quiz_history';

// --- Progress per tema ---
function getProgress() {
    try { return JSON.parse(localStorage.getItem(MOSSOS_PROGRESS_KEY)) || {}; } catch { return {}; }
}

function setTemaStatus(temaId, status) {
    // status: 'not-studied', 'seen', 'mastered'
    const p = getProgress();
    if (!p[temaId]) p[temaId] = {};
    p[temaId].status = status;
    p[temaId].lastUpdated = Date.now();
    localStorage.setItem(MOSSOS_PROGRESS_KEY, JSON.stringify(p));
}

function getTemaStatus(temaId) {
    const p = getProgress();
    return (p[temaId] && p[temaId].status) || 'not-studied';
}

// --- Quiz scores ---
function saveQuizScore(temaId, score, total) {
    const p = getProgress();
    if (!p[temaId]) p[temaId] = {};
    if (!p[temaId].quizScores) p[temaId].quizScores = [];
    p[temaId].quizScores.push({ score, total, date: Date.now() });
    // Keep last 10
    if (p[temaId].quizScores.length > 10) p[temaId].quizScores.shift();
    // Auto-update status
    const pct = (score / total) * 100;
    if (pct >= 80) p[temaId].status = 'mastered';
    else if (pct >= 40 || p[temaId].status === 'not-studied') p[temaId].status = 'seen';
    localStorage.setItem(MOSSOS_PROGRESS_KEY, JSON.stringify(p));
}

function getBestScore(temaId) {
    const p = getProgress();
    if (!p[temaId] || !p[temaId].quizScores || p[temaId].quizScores.length === 0) return null;
    return Math.max(...p[temaId].quizScores.map(s => Math.round((s.score / s.total) * 100)));
}

// --- Mistakes tracking ---
function getMistakes() {
    try { return JSON.parse(localStorage.getItem(MOSSOS_MISTAKES_KEY)) || {}; } catch { return {}; }
}

function addMistake(questionId) {
    const m = getMistakes();
    m[questionId] = (m[questionId] || 0) + 1;
    localStorage.setItem(MOSSOS_MISTAKES_KEY, JSON.stringify(m));
}

function removeMistake(questionId) {
    const m = getMistakes();
    if (m[questionId]) {
        m[questionId]--;
        if (m[questionId] <= 0) delete m[questionId];
    }
    localStorage.setItem(MOSSOS_MISTAKES_KEY, JSON.stringify(m));
}

function getMistakeCount() {
    return Object.keys(getMistakes()).length;
}

// --- Quiz history ---
function saveQuizHistory(entry) {
    const history = getQuizHistory();
    history.unshift(entry);
    if (history.length > 50) history.pop();
    localStorage.setItem(MOSSOS_QUIZ_HISTORY_KEY, JSON.stringify(history));
}

function getQuizHistory() {
    try { return JSON.parse(localStorage.getItem(MOSSOS_QUIZ_HISTORY_KEY)) || []; } catch { return []; }
}

// --- Flashcard tracking ---
function getFlashcardProgress(temaId) {
    const p = getProgress();
    return (p[temaId] && p[temaId].flashcards) || { known: 0, unknown: 0, total: 0 };
}

function saveFlashcardProgress(temaId, known, unknown, total) {
    const p = getProgress();
    if (!p[temaId]) p[temaId] = {};
    p[temaId].flashcards = { known, unknown, total, date: Date.now() };
    localStorage.setItem(MOSSOS_PROGRESS_KEY, JSON.stringify(p));
}

// --- Export / Import ---
function exportProgress() {
    const data = {
        progress: getProgress(),
        mistakes: getMistakes(),
        history: getQuizHistory(),
        exportDate: new Date().toISOString(),
        version: 1
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mossos-progress-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importProgress(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.progress) localStorage.setItem(MOSSOS_PROGRESS_KEY, JSON.stringify(data.progress));
            if (data.mistakes) localStorage.setItem(MOSSOS_MISTAKES_KEY, JSON.stringify(data.mistakes));
            if (data.history) localStorage.setItem(MOSSOS_QUIZ_HISTORY_KEY, JSON.stringify(data.history));
            alert('Progrés importat correctament!');
            location.reload();
        } catch (err) {
            alert('Error en importar: ' + err.message);
        }
    };
    reader.readAsText(file);
}

// --- Stats ---
function getOverallStats() {
    const p = getProgress();
    const temaIds = ['a1','a2','a3','a4','a5','a6','a7','b1','b2','b3','b4','b5','b6','b7','b8','c1','c2','c3','c4','c5'];
    let mastered = 0, seen = 0, notStudied = 0;
    let totalQuizzes = 0, totalCorrect = 0, totalQuestions = 0;

    temaIds.forEach(id => {
        const status = getTemaStatus(id);
        if (status === 'mastered') mastered++;
        else if (status === 'seen') seen++;
        else notStudied++;

        if (p[id] && p[id].quizScores) {
            p[id].quizScores.forEach(s => {
                totalQuizzes++;
                totalCorrect += s.score;
                totalQuestions += s.total;
            });
        }
    });

    return {
        total: temaIds.length,
        mastered, seen, notStudied,
        totalQuizzes,
        avgScore: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
        mistakeCount: getMistakeCount()
    };
}
