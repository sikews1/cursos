// === FALCON STUDY - User System ===
const USER_KEY = 'falcon_user_name';

function getUser() { return localStorage.getItem(USER_KEY); }
function setUser(name) { localStorage.setItem(USER_KEY, name.trim()); }

function logout() {
    if (confirm('Cerrar sesion? Tu progreso se mantendra en este navegador.')) {
        localStorage.removeItem(USER_KEY);
        location.reload();
    }
}

function showLoginScreen() {
    const overlay = document.createElement('div');
    overlay.id = 'loginOverlay';
    overlay.innerHTML = `
        <div style="position:fixed;inset:0;background:rgba(10,12,18,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(20px);">
            <div style="background:linear-gradient(135deg,#1a1f35,#1e2745,#1c2e4a);padding:50px 40px;border-radius:24px;border:1px solid rgba(255,107,74,0.3);max-width:450px;width:90%;text-align:center;box-shadow:0 25px 80px rgba(0,0,0,0.6),0 0 60px rgba(255,107,74,0.1);">
                <div style="width:64px;height:64px;margin:0 auto 16px;border-radius:16px;background:linear-gradient(135deg,#ff6b4a,#ff9843);display:flex;align-items:center;justify-content:center;font-size:1.8rem;box-shadow:0 8px 24px rgba(255,107,74,0.3);">&#x1F6E1;&#xFE0F;</div>
                <h1 style="color:#fff;font-size:1.6rem;margin-bottom:5px;font-family:'Inter','Segoe UI',sans-serif;font-weight:800;letter-spacing:-0.02em;"><span style="background:linear-gradient(135deg,#ff6b4a,#ff9843);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">CrowdStrike</span> Falcon</h1>
                <p style="color:#9ba3be;margin-bottom:30px;font-family:'Inter','Segoe UI',sans-serif;font-size:0.9rem;">Material de estudio - Administrator</p>
                <p style="color:#edf0f7;margin-bottom:20px;font-family:'Inter','Segoe UI',sans-serif;font-size:1rem;">Como te llamas?</p>
                <input type="text" id="loginName" placeholder="Tu nombre..."
                    style="width:100%;padding:14px 20px;border-radius:12px;border:2px solid #2e3650;background:#141820;color:#edf0f7;font-size:1.1rem;outline:none;font-family:'Inter','Segoe UI',sans-serif;text-align:center;margin-bottom:20px;transition:border-color 0.3s;"
                    onfocus="this.style.borderColor='#ff6b4a'" onblur="this.style.borderColor='#2e3650'"
                    autofocus>
                <br>
                <button onclick="doLogin()"
                    style="padding:14px 50px;border-radius:25px;border:none;background:linear-gradient(135deg,#ff6b4a,#ff9843);color:#fff;font-size:1rem;font-weight:700;cursor:pointer;font-family:'Inter','Segoe UI',sans-serif;transition:all 0.3s;box-shadow:0 4px 20px rgba(255,107,74,0.25);"
                    onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 30px rgba(255,107,74,0.4)'"
                    onmouseout="this.style.transform='';this.style.boxShadow='0 4px 20px rgba(255,107,74,0.25)'">
                    Entrar
                </button>
                <p style="color:#6b7394;font-size:0.75rem;margin-top:20px;font-family:'Inter','Segoe UI',sans-serif;">Tu progreso se guarda en este navegador</p>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('loginName').addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin(); });
    setTimeout(() => document.getElementById('loginName').focus(), 100);
}

function doLogin() {
    const name = document.getElementById('loginName').value.trim();
    if (!name) { document.getElementById('loginName').style.borderColor = '#f87171'; return; }
    setUser(name);
    document.getElementById('loginOverlay').remove();
    updateUserDisplay();
}

function updateUserDisplay() {
    const user = getUser();
    if (!user) return;
    const header = document.querySelector('.header');
    if (header) {
        let badge = header.querySelector('.user-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'user-badge';
            badge.style.cssText = 'margin-top:12px;display:inline-flex;align-items:center;gap:8px;background:rgba(255,107,74,0.12);padding:6px 18px;border-radius:20px;font-size:0.85rem;color:#ff6b4a;font-weight:600;cursor:pointer;border:1px solid rgba(255,107,74,0.2);transition:all 0.3s;';
            badge.title = 'Clic para cerrar sesion';
            badge.onclick = logout;
            badge.onmouseover = function() { this.style.background = 'rgba(255,107,74,0.2)'; };
            badge.onmouseout = function() { this.style.background = 'rgba(255,107,74,0.12)'; };
            header.appendChild(badge);
        }
        badge.innerHTML = '&#x1F464; ' + user;
    }
}

(function() {
    const init = getUser() ? updateUserDisplay : showLoginScreen;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
