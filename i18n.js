// === INTERNATIONALIZATION ===
// When EN mode is active, swap all text to English
// Spanish shown as small subtitle/tooltip

const translations = {
    // Nav
    'Glosario': 'Glossary',
    'Modulos': 'Modules',
    'Quiz': 'Quiz',
    'Flashcards': 'Flashcards',
    'Simulador Examen': 'Exam Simulator',
    'Escenarios': 'Scenarios',

    // Common buttons
    'Siguiente': 'Next',
    'Anterior': 'Previous',
    'Repetir': 'Retry',
    'Entregar examen': 'Submit exam',
    'Comenzar examen': 'Start exam',
    'Nuevo examen': 'New exam',
    'Ver respuestas': 'View answers',
    'Ver todas las respuestas': 'View all answers',
    'Repetir quiz': 'Retry quiz',
    'Repetir examen': 'Retry exam',
    'Lo se': 'I know it',
    'No lo se': "I don't know",
    'Entrar': 'Enter',

    // Quiz page
    'Quiz Interactivo': 'Interactive Quiz',
    'Preguntas por modulo - Practica para el examen': 'Questions by module - Exam practice',
    'Todos': 'All',
    'Ciber General': 'General Cyber',

    // Flashcards page
    'Flashcards de Estudio': 'Study Flashcards',
    'Haz clic en la tarjeta para ver la respuesta - Usa las flechas o los botones': 'Click the card to see the answer - Use arrows or buttons',
    'Todas': 'All',
    'Amenazas': 'Threats',
    'Deteccion': 'Detection',
    'Herramientas': 'Tools',
    'Falcon': 'Falcon',
    'Modulos': 'Modules',
    'Gestion': 'Management',
    'Red': 'Network',
    'Threat Actors': 'Threat Actors',
    'Clic para girar': 'Click to flip',
    'Pendientes': 'Remaining',

    // Exam page
    'Simulador de Examen': 'Exam Simulator',
    'Examinate con tiempo limitado - Simula el examen real': 'Take a timed exam - Simulate the real test',
    'Configurar examen': 'Configure exam',
    'Personaliza tu simulacro antes de empezar': 'Customize your mock exam before starting',
    'Numero de preguntas': 'Number of questions',
    'Tiempo limite': 'Time limit',
    'Nota para aprobar': 'Passing score',
    'preguntas': 'questions',
    'minutos': 'minutes',
    'Sin limite': 'No limit',
    'Examen con mis errores': 'Exam with my mistakes',
    'Tu historial': 'Your history',
    'Borrar historial': 'Clear history',
    'Examenes': 'Exams',
    'Mejor nota': 'Best score',
    'Media': 'Average',
    'Aprobados': 'Passed',
    'Errores unicos': 'Unique mistakes',
    'Correctas': 'Correct',
    'Incorrectas': 'Incorrect',
    'Total': 'Total',
    'Tiempo usado': 'Time used',
    'Errores acumulados': 'Total mistakes',
    'Repasar mis errores': 'Review my mistakes',
    'Repaso completo': 'Full review',
    'Repaso de respuestas': 'Answer review',

    // Exam results
    '!APROBADO! !Enhorabuena!': 'PASSED! Congratulations!',
    '!Aprobado! Buen trabajo': 'Passed! Good job',
    'Necesitas repasar un poco mas. !Tu puedes!': 'You need to study a bit more. You can do it!',
    'Examen de repaso de errores': 'Mistakes review exam',
    'Tus errores en este examen': 'Your mistakes in this exam',
    'Ver repaso de errores': 'View error review',

    // Modules page
    'Modulos del Curso': 'Course Modules',
    'Resumen, vocabulario y claves de cada modulo - Todo en espanol': 'Summary, vocabulary and key points for each module',
    'Tu progreso en el curso': 'Your course progress',
    'completados': 'completed',
    'en progreso': 'in progress',
    'pendientes': 'pending',
    'COMPLETADO': 'COMPLETED',
    'EN PROGRESO': 'IN PROGRESS',
    'PENDIENTE': 'PENDING',
    'Resumen': 'Summary',
    'Vocabulario': 'Vocabulary',
    'Practica': 'Practice',

    // Glosario page
    'Glosario de Ciberseguridad - Curso de Certificacion': 'Cybersecurity Glossary - Certification Course',
    'Buscar termino...': 'Search term...',
    'Inicio': 'Home',
    'Conceptos Generales': 'General Concepts',
    'Falcon Platform': 'Falcon Platform',
    'Modulos Falcon': 'Falcon Modules',
    'Gestion Falcon': 'Falcon Management',
    'Alertas': 'Alerts',
    'Red & Sistemas': 'Network & Systems',
    'Amenazas y Ataques': 'Threats & Attacks',
    'Indicadores y Deteccion': 'Indicators & Detection',
    'Herramientas y Tecnologias de Seguridad': 'Security Tools & Technologies',
    'Ver modulos del curso': 'View course modules',
    'Concepto clave del curso': 'Key course concept',
    'Usa las pestanas de arriba o el buscador para explorar los terminos': 'Use the tabs above or the search bar to explore terms',

    // Escenarios page
    'Escenarios Practicos': 'Practical Scenarios',
    'Situaciones reales para aprender a usar Falcon paso a paso': 'Real situations to learn Falcon step by step',
    'Volver a escenarios': 'Back to scenarios',
    'La situacion': 'The situation',
    'Lo que aprendes de este escenario': 'What you learn from this scenario',

    // Tags
    'Basico': 'Basic',
    'Muy importante': 'Very important',
    'Clave en CrowdStrike': 'Key in CrowdStrike',

    // General
    'Pregunta': 'Question',
    'de': 'of',
    'Cerrar sesion': 'Log out',
};

// Store original texts for reverting
const originalTexts = new Map();

function translatePage() {
    const isEn = document.documentElement.getAttribute('data-lang') === 'en';

    // Translate nav links
    document.querySelectorAll('.top-bar a:not(.theme-toggle):not(.lang-toggle)').forEach(el => {
        swapText(el, isEn);
    });

    // Translate nav buttons (category selectors, module selectors)
    document.querySelectorAll('.nav button, .module-selector button, .category-selector button').forEach(el => {
        swapText(el, isEn);
    });

    // Translate headers
    document.querySelectorAll('.header h1, .header p').forEach(el => {
        // For h1 with span, only translate the text after the span
        if (el.tagName === 'H1' && el.querySelector('span')) return;
        swapText(el, isEn);
    });

    // Translate buttons
    document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-success, .btn-know, .btn-dontknow, .mistakes-btn').forEach(el => {
        // Skip if has child elements that are badges
        const text = getDirectText(el);
        if (text && translations[text.trim()]) {
            swapText(el, isEn, true);
        }
    });

    // Translate labels and text elements
    document.querySelectorAll('.section-title, .callout h3, .config-option label, .progress-title, h2, h3').forEach(el => {
        swapText(el, isEn);
    });

    // Translate placeholders
    document.querySelectorAll('input[placeholder]').forEach(el => {
        if (!originalTexts.has(el)) originalTexts.set(el, el.placeholder);
        const orig = originalTexts.get(el);
        el.placeholder = isEn && translations[orig] ? translations[orig] : orig;
    });

    // Translate select options
    document.querySelectorAll('select option').forEach(el => {
        swapText(el, isEn);
    });

    // Translate tags
    document.querySelectorAll('.tag, .tag-basico, .tag-importante, .tag-crowdstrike, .module-code, .question-module-tag').forEach(el => {
        swapText(el, isEn);
    });

    // Translate misc text
    document.querySelectorAll('.fc-stat .lbl, .score-detail .label, .h-lbl, .result-stat .lbl, .shortcuts-info, .flip-hint, .fc-counter, .progress-counts span, .module-meta').forEach(el => {
        swapText(el, isEn);
    });
}

function swapText(el, toEn, directTextOnly) {
    if (!el) return;

    const text = directTextOnly ? getDirectText(el).trim() : el.textContent.trim();
    if (!text) return;

    if (!originalTexts.has(el)) {
        originalTexts.set(el, directTextOnly ? getDirectText(el) : el.innerHTML);
    }

    if (toEn) {
        if (translations[text]) {
            if (directTextOnly) {
                setDirectText(el, translations[text]);
            } else {
                // Check if innerHTML has child elements
                if (el.children.length > 0) {
                    // Only translate direct text nodes
                    el.childNodes.forEach(node => {
                        if (node.nodeType === 3 && node.textContent.trim()) {
                            const t = node.textContent.trim();
                            if (translations[t]) node.textContent = translations[t];
                        }
                    });
                } else {
                    el.textContent = translations[text];
                }
            }
        }
    } else {
        // Revert to original
        const orig = originalTexts.get(el);
        if (orig !== undefined) {
            if (directTextOnly) {
                setDirectText(el, orig);
            } else {
                el.innerHTML = orig;
            }
        }
    }
}

function getDirectText(el) {
    let text = '';
    el.childNodes.forEach(node => {
        if (node.nodeType === 3) text += node.textContent;
    });
    return text;
}

function setDirectText(el, newText) {
    el.childNodes.forEach(node => {
        if (node.nodeType === 3 && node.textContent.trim()) {
            node.textContent = newText;
            return;
        }
    });
}

// Listen for language changes
const langObserver = new MutationObserver((mutations) => {
    mutations.forEach(m => {
        if (m.attributeName === 'data-lang') {
            translatePage();
        }
    });
});

// Init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        langObserver.observe(document.documentElement, { attributes: true });
        translatePage();
    });
} else {
    langObserver.observe(document.documentElement, { attributes: true });
    translatePage();
}
