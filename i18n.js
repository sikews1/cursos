// === FULL i18n SYSTEM ===
// Two controls: Language (ES/EN) + Help (translation hints ON/OFF)
// - ES mode: everything in Spanish
// - EN mode: everything in English
// - Help ON: shows the OTHER language as small subtitle below each text

const UI_TRANSLATIONS = {
    // Nav
    'Glosario': 'Glossary', 'Modulos': 'Modules', 'Quiz': 'Quiz', 'Flashcards': 'Flashcards',
    'Simulador Examen': 'Exam Simulator', 'Escenarios': 'Scenarios',

    // Buttons
    'Siguiente': 'Next', 'Anterior': 'Previous', 'Repetir': 'Retry',
    'Entregar examen': 'Submit exam', 'Comenzar examen': 'Start exam',
    'Nuevo examen': 'New exam', 'Ver respuestas': 'View answers',
    'Ver todas las respuestas': 'View all answers', 'Repetir quiz': 'Retry quiz',
    'Lo se': 'I know it', 'No lo se': "I don't know it",
    'Entrar': 'Enter', 'Todos': 'All', 'Todas': 'All',

    // Quiz
    'Quiz Interactivo': 'Interactive Quiz',
    'Preguntas por modulo - Practica para el examen': 'Questions by module - Exam practice',
    'Ciber General': 'General Cyber', 'Pregunta': 'Question',

    // Flashcards
    'Flashcards de Estudio': 'Study Flashcards',
    'Haz clic en la tarjeta para ver la respuesta - Usa las flechas o los botones': 'Click the card to flip - Use arrows or buttons',
    'Amenazas': 'Threats', 'Deteccion': 'Detection', 'Herramientas': 'Tools',
    'Gestion': 'Management', 'Red': 'Network', 'Clic para girar': 'Click to flip',
    'Pendientes': 'Remaining',

    // Exam
    'Simulador de Examen': 'Exam Simulator',
    'Examinate con tiempo limitado - Simula el examen real': 'Timed exam - Simulate the real test',
    'Configurar examen': 'Configure exam',
    'Personaliza tu simulacro antes de empezar': 'Customize your mock exam',
    'Numero de preguntas': 'Number of questions', 'Tiempo limite': 'Time limit',
    'Nota para aprobar': 'Passing score', 'Sin limite': 'No limit',
    'Examen con mis errores': 'Exam with my mistakes', 'Tu historial': 'Your history',
    'Borrar historial': 'Clear history', 'Correctas': 'Correct',
    'Incorrectas': 'Incorrect', 'Errores acumulados': 'Total mistakes',
    'Repasar mis errores': 'Review my mistakes', 'Repaso completo': 'Full review',

    // Modules
    'Modulos del Curso': 'Course Modules',
    'Resumen, vocabulario y claves de cada modulo - Todo en espanol': 'Summary, vocabulary and key points for each module',
    'Tu progreso en el curso': 'Your course progress',
    'completados': 'completed', 'en progreso': 'in progress', 'pendientes': 'pending',
    'COMPLETADO': 'COMPLETED', 'EN PROGRESO': 'IN PROGRESS', 'PENDIENTE': 'PENDING',
    'Resumen': 'Summary', 'Vocabulario': 'Vocabulary', 'Practica': 'Practice',

    // Glosario
    'Glosario de Ciberseguridad - Curso de Certificacion': 'Cybersecurity Glossary - Certification Course',
    'Buscar termino...': 'Search term...', 'Inicio': 'Home',
    'Conceptos Generales': 'General Concepts', 'Falcon Platform': 'Falcon Platform',
    'Modulos Falcon': 'Falcon Modules', 'Gestion Falcon': 'Falcon Management',
    'Alertas': 'Alerts', 'Red & Sistemas': 'Network & Systems',
    'Amenazas y Ataques': 'Threats & Attacks',
    'Indicadores y Deteccion': 'Indicators & Detection',
    'Herramientas y Tecnologias de Seguridad': 'Security Tools & Technologies',
    'Ver modulos del curso': 'View course modules',
    'Concepto clave del curso': 'Key course concept',
    'Usa las pestanas de arriba o el buscador para explorar los terminos': 'Use the tabs or search bar to explore terms',

    // Escenarios
    'Escenarios Practicos': 'Practical Scenarios',
    'Situaciones reales para aprender a usar Falcon paso a paso': 'Real situations to learn Falcon step by step',
    'Volver a escenarios': 'Back to scenarios', 'La situacion': 'The situation',
    'Lo que aprendes de este escenario': 'What you learn from this scenario',

    // Tags
    'Basico': 'Basic', 'Muy importante': 'Very important', 'Clave en CrowdStrike': 'Key in CrowdStrike',

    // Results
    '!Aprobado! Buen trabajo': 'Passed! Good job',
    'Necesitas repasar un poco mas. !Tu puedes!': 'You need more practice. You can do it!',

    // Status
    'Examenes': 'Exams', 'Mejor nota': 'Best score', 'Media': 'Average',
    'Aprobados': 'Passed', 'Errores unicos': 'Unique mistakes',
    'Total': 'Total', 'Tiempo usado': 'Time used',
};

// Reverse map for EN->ES
const UI_TRANSLATIONS_REV = {};
Object.entries(UI_TRANSLATIONS).forEach(([es, en]) => { UI_TRANSLATIONS_REV[en] = es; });

const _originals = new Map();

function getLang() { return document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'es'; }
function isHelpOn() { return document.documentElement.getAttribute('data-help') === 'on'; }

function translateUI() {
    const toEn = getLang() === 'en';
    const dict = toEn ? UI_TRANSLATIONS : UI_TRANSLATIONS_REV;

    // Nav links
    document.querySelectorAll('.top-bar a:not(.theme-toggle):not(.lang-toggle):not(.help-toggle)').forEach(el => _swapEl(el, dict));

    // Buttons with text
    document.querySelectorAll('.nav button, .module-selector button, .category-selector button').forEach(el => _swapEl(el, dict));

    // Various UI text
    document.querySelectorAll('.section-title, .callout h3, .config-option label, h2, h3, .module-code, .tag, .fc-stat .lbl, .score-detail .label, .question-module-tag').forEach(el => _swapEl(el, dict));

    // Buttons
    document.querySelectorAll('.btn, .btn-know, .btn-dontknow, .mistakes-btn').forEach(el => {
        // Only swap direct text, preserve child elements like badges
        _swapDirectText(el, dict);
    });

    // Placeholders
    document.querySelectorAll('input[placeholder]').forEach(el => {
        if (!_originals.has('ph_' + el.id)) _originals.set('ph_' + el.id, el.placeholder);
        const orig = _originals.get('ph_' + el.id);
        const translated = dict[orig];
        el.placeholder = translated || orig;
    });

    // Header subtitle
    document.querySelectorAll('.header p').forEach(el => _swapEl(el, dict));
}

function _swapEl(el, dict) {
    if (!el || el.children.length > 0) {
        // Has children - try direct text nodes only
        _swapDirectText(el, dict);
        return;
    }
    const key = 'orig_' + (el.dataset.i18nId || (el.dataset.i18nId = Math.random().toString(36).slice(2)));
    if (!_originals.has(key)) _originals.set(key, el.textContent);
    const orig = _originals.get(key);
    const text = el.textContent.trim();
    const translated = dict[text];
    if (translated) el.textContent = translated;
    else if (dict[orig.trim()]) el.textContent = dict[orig.trim()];
}

function _swapDirectText(el, dict) {
    if (!el) return;
    el.childNodes.forEach(node => {
        if (node.nodeType === 3 && node.textContent.trim()) {
            const key = 'tn_' + (node._i18nId || (node._i18nId = Math.random().toString(36).slice(2)));
            if (!_originals.has(key)) _originals.set(key, node.textContent);
            const text = node.textContent.trim();
            const translated = dict[text];
            if (translated) node.textContent = ' ' + translated + ' ';
        }
    });
}

// Observe lang changes
const _observer = new MutationObserver((muts) => {
    muts.forEach(m => {
        if (m.attributeName === 'data-lang' || m.attributeName === 'data-help') {
            translateUI();
        }
    });
});

function _initI18n() {
    _observer.observe(document.documentElement, { attributes: true });
    translateUI();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _initI18n);
else _initI18n();
