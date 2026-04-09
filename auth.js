// === FALCON STUDY - User System ===
// Stores user name in localStorage. Each browser = independent user.

const USER_KEY = 'falcon_user_name';

function getUser() {
    return localStorage.getItem(USER_KEY);
}

function setUser(name) {
    localStorage.setItem(USER_KEY, name.trim());
}

function logout() {
    if (confirm('¿Cerrar sesion? Tu progreso se mantendra en este navegador.')) {
        localStorage.removeItem(USER_KEY);
        location.reload();
    }
}

function showLoginScreen() {
    const overlay = document.createElement('div');
    overlay.id = 'loginOverlay';
    overlay.innerHTML = `
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;">
            <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:50px 40px;border-radius:20px;border:2px solid #e94560;max-width:450px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(233,69,96,0.3);">
                <div style="font-size:2.5rem;margin-bottom:10px;">&#x1F6E1;&#xFE0F;</div>
                <h1 style="color:#fff;font-size:1.6rem;margin-bottom:5px;font-family:'Segoe UI',sans-serif;"><span style="color:#e94560;">CrowdStrike</span> Falcon</h1>
                <p style="color:#8892a4;margin-bottom:30px;font-family:'Segoe UI',sans-serif;font-size:0.9rem;">Material de estudio - Administrator</p>
                <p style="color:#e0e6ed;margin-bottom:20px;font-family:'Segoe UI',sans-serif;font-size:1rem;">¿Como te llamas?</p>
                <input type="text" id="loginName" placeholder="Tu nombre..."
                    style="width:100%;padding:14px 20px;border-radius:12px;border:2px solid #2a3a4e;background:#0f1923;color:#fff;font-size:1.1rem;outline:none;font-family:'Segoe UI',sans-serif;text-align:center;margin-bottom:20px;"
                    autofocus>
                <br>
                <button onclick="doLogin()"
                    style="padding:14px 50px;border-radius:25px;border:none;background:#e94560;color:#fff;font-size:1rem;font-weight:700;cursor:pointer;font-family:'Segoe UI',sans-serif;transition:all 0.3s;">
                    Entrar
                </button>
                <p style="color:#4a5568;font-size:0.75rem;margin-top:20px;font-family:'Segoe UI',sans-serif;">Tu progreso se guarda en este navegador</p>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Enter key
    document.getElementById('loginName').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doLogin();
    });

    // Focus input
    setTimeout(() => document.getElementById('loginName').focus(), 100);
}

function doLogin() {
    const name = document.getElementById('loginName').value.trim();
    if (!name) { document.getElementById('loginName').style.borderColor = '#e74c3c'; return; }
    setUser(name);
    document.getElementById('loginOverlay').remove();
    updateUserDisplay();
}

function updateUserDisplay() {
    const user = getUser();
    if (!user) return;

    // Add user badge to header if exists
    const header = document.querySelector('.header');
    if (header) {
        let badge = header.querySelector('.user-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'user-badge';
            badge.style.cssText = 'margin-top:12px;display:inline-flex;align-items:center;gap:8px;background:rgba(233,69,96,0.15);padding:6px 16px;border-radius:20px;font-size:0.85rem;color:#e94560;font-weight:600;cursor:pointer;';
            badge.title = 'Clic para cerrar sesion';
            badge.onclick = logout;
            header.appendChild(badge);
        }
        badge.innerHTML = '&#x1F464; ' + user;
    }
}

// Init on every page
(function() {
    if (!getUser()) {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showLoginScreen);
        } else {
            showLoginScreen();
        }
    } else {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updateUserDisplay);
        } else {
            updateUserDisplay();
        }
    }
})();
