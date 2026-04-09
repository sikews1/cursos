// === THEME, LANGUAGE & HELP TOGGLES ===

// --- Theme (light/dark) ---
function toggleTheme() {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (next === 'light') html.removeAttribute('data-theme');
    else html.setAttribute('data-theme', 'dark');
    localStorage.setItem('falcon_theme', next);
    updateToggleIcon();
}

function updateToggleIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-toggle:not(.lang-toggle):not(.help-toggle)').forEach(btn => {
        btn.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
    });
}

// --- Language (ES/EN) ---
function toggleLang() {
    const html = document.documentElement;
    const next = html.getAttribute('data-lang') === 'en' ? 'es' : 'en';
    if (next === 'es') html.removeAttribute('data-lang');
    else html.setAttribute('data-lang', 'en');
    localStorage.setItem('falcon_lang', next);
    updateLangIcon();
}

function updateLangIcon() {
    const isEn = document.documentElement.getAttribute('data-lang') === 'en';
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.textContent = isEn ? 'EN' : 'ES';
        btn.title = isEn ? 'English mode (click for Spanish)' : 'Modo espanol (clic para ingles)';
    });
}

// --- Help (translation hints ON/OFF) ---
function toggleHelp() {
    const html = document.documentElement;
    const next = html.getAttribute('data-help') === 'on' ? 'off' : 'on';
    if (next === 'off') html.removeAttribute('data-help');
    else html.setAttribute('data-help', 'on');
    localStorage.setItem('falcon_help', next);
    updateHelpIcon();
}

function updateHelpIcon() {
    const isOn = document.documentElement.getAttribute('data-help') === 'on';
    document.querySelectorAll('.help-toggle').forEach(btn => {
        btn.textContent = '?';
        btn.style.opacity = isOn ? '1' : '0.4';
        btn.title = isOn
            ? (getLang() === 'en' ? 'Translation help ON (click to hide)' : 'Ayuda de traduccion ON (clic para ocultar)')
            : (getLang() === 'en' ? 'Show translation help' : 'Mostrar ayuda de traduccion');
    });
}

function getLang() {
    return document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'es';
}

function isHelpOn() {
    return document.documentElement.getAttribute('data-help') === 'on';
}

// Helper used by quiz/exam to check language
function isBilingual() {
    return getLang() === 'en';
}

// --- Inject buttons ---
function injectToggle() {
    const topBar = document.querySelector('.top-bar');
    if (!topBar) return;

    // Theme toggle
    if (!topBar.querySelector('.theme-toggle:not(.lang-toggle):not(.help-toggle)')) {
        const btn = document.createElement('button');
        btn.className = 'theme-toggle';
        btn.onclick = toggleTheme;
        topBar.appendChild(btn);
        updateToggleIcon();
    }

    // Lang toggle
    if (!topBar.querySelector('.lang-toggle')) {
        const btn = document.createElement('button');
        btn.className = 'theme-toggle lang-toggle';
        btn.onclick = toggleLang;
        btn.style.cssText = 'font-size:0.75rem;font-weight:700;font-family:var(--font-sans);';
        topBar.appendChild(btn);
        updateLangIcon();
    }

    // Help toggle
    if (!topBar.querySelector('.help-toggle')) {
        const btn = document.createElement('button');
        btn.className = 'theme-toggle help-toggle';
        btn.onclick = toggleHelp;
        btn.style.cssText = 'font-size:0.85rem;font-weight:700;font-family:var(--font-sans);';
        topBar.appendChild(btn);
        updateHelpIcon();
    }
}

// --- Card glow ---
function initCardGlow() {
    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.card, .actor-card, .module-card, .scenario-card, .flashcard-front, .flashcard-back').forEach(card => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
            card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
        });
    });
}

// --- Init ---
(function() {
    const savedTheme = localStorage.getItem('falcon_theme');
    if (savedTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

    const savedLang = localStorage.getItem('falcon_lang');
    if (savedLang === 'en') document.documentElement.setAttribute('data-lang', 'en');

    const savedHelp = localStorage.getItem('falcon_help');
    if (savedHelp === 'on') document.documentElement.setAttribute('data-help', 'on');

    function initAll() {
        updateToggleIcon();
        updateLangIcon();
        updateHelpIcon();
        initCardGlow();
        injectToggle();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
    else initAll();
})();
