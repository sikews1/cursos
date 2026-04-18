// Floating whiteboard (pissarra) widget
(function() {
    let isOpen = false;
    let isDrawing = false;
    let ctx, canvas;
    let color = '#1d1d1f';
    let lineWidth = 3;
    let history = [];
    let historyIdx = -1;

    // Create floating button
    const btn = document.createElement('button');
    btn.id = 'pissarra-btn';
    btn.innerHTML = '&#x270D;&#xFE0F;';
    btn.title = 'Obrir pissarra';
    btn.style.cssText = 'position:fixed;bottom:24px;right:90px;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;border:none;font-size:1.4rem;cursor:pointer;box-shadow:0 4px 20px rgba(59,130,246,0.3);z-index:9000;transition:all 0.3s;display:flex;align-items:center;justify-content:center;';
    btn.onmouseover = function() { this.style.transform = 'scale(1.1)'; };
    btn.onmouseout = function() { this.style.transform = ''; };

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'pissarra-overlay';
    overlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:9500;backdrop-filter:blur(4px);';

    // Create popup
    const popup = document.createElement('div');
    popup.id = 'pissarra-popup';
    popup.style.cssText = 'display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:95%;max-width:900px;background:var(--bg-raised,#fff);border-radius:20px;box-shadow:0 25px 80px rgba(0,0,0,0.3);z-index:9600;overflow:hidden;';

    popup.innerHTML = `
        <div style="padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border-subtle,#e5e5e5);flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                <span style="font-weight:700;font-size:.9rem;color:var(--text-primary,#1d1d1f);">&#x270D;&#xFE0F; Pissarra</span>
                <div style="display:flex;gap:4px;" id="pissarra-colors"></div>
                <div style="display:flex;align-items:center;gap:4px;margin-left:8px;">
                    <span style="font-size:.7rem;color:var(--text-muted,#888);">Gruix:</span>
                    <input type="range" min="1" max="12" value="3" id="pissarra-width" style="width:60px;accent-color:#3b82f6;">
                </div>
            </div>
            <div style="display:flex;gap:6px;">
                <button id="pissarra-undo" style="padding:6px 12px;border-radius:6px;border:1px solid var(--border-default,#ddd);background:var(--bg-base,#f5f5f5);cursor:pointer;font-size:.8rem;color:var(--text-secondary,#666);" title="Desfer">&#x21A9;</button>
                <button id="pissarra-clear" style="padding:6px 12px;border-radius:6px;border:1px solid var(--border-default,#ddd);background:var(--bg-base,#f5f5f5);cursor:pointer;font-size:.8rem;color:var(--text-secondary,#666);" title="Esborrar tot">&#x1F5D1;</button>
                <button id="pissarra-grid" style="padding:6px 12px;border-radius:6px;border:1px solid var(--border-default,#ddd);background:var(--bg-base,#f5f5f5);cursor:pointer;font-size:.8rem;color:var(--text-secondary,#666);" title="Quadrícula">&#x25A6;</button>
                <button id="pissarra-close" style="padding:6px 12px;border-radius:6px;border:1px solid var(--border-default,#ddd);background:var(--bg-base,#f5f5f5);cursor:pointer;font-size:1.1rem;color:var(--text-secondary,#666);line-height:1;" title="Tancar">&times;</button>
            </div>
        </div>
        <div style="padding:8px;background:var(--bg-base,#fafafa);">
            <canvas id="pissarra-canvas" style="width:100%;border-radius:12px;cursor:crosshair;background:#fff;display:block;touch-action:none;"></canvas>
        </div>
    `;

    const colors = [
        { c: '#1d1d1f', name: 'Negre' },
        { c: '#3b82f6', name: 'Blau' },
        { c: '#ef4444', name: 'Vermell' },
        { c: '#059669', name: 'Verd' },
        { c: '#f97316', name: 'Taronja' },
        { c: '#8b5cf6', name: 'Lila' },
        { c: '#ffffff', name: 'Esborrar' },
    ];

    function init() {
        // Color buttons
        const colorDiv = popup.querySelector('#pissarra-colors');
        colors.forEach((col, i) => {
            const b = document.createElement('button');
            b.style.cssText = `width:24px;height:24px;border-radius:50%;border:2px solid ${col.c === '#ffffff' ? '#ccc' : col.c};background:${col.c};cursor:pointer;transition:transform .15s;${i === 0 ? 'transform:scale(1.2);box-shadow:0 0 0 2px #3b82f6;' : ''}`;
            b.title = col.name;
            if (col.c === '#ffffff') b.innerHTML = '<span style="font-size:10px;">&#x232B;</span>';
            b.onclick = () => {
                color = col.c;
                lineWidth = col.c === '#ffffff' ? 20 : parseInt(popup.querySelector('#pissarra-width').value);
                colorDiv.querySelectorAll('button').forEach(x => { x.style.transform = ''; x.style.boxShadow = ''; });
                b.style.transform = 'scale(1.2)';
                b.style.boxShadow = '0 0 0 2px #3b82f6';
            };
            colorDiv.appendChild(b);
        });

        // Width slider
        popup.querySelector('#pissarra-width').oninput = function() {
            if (color !== '#ffffff') lineWidth = parseInt(this.value);
        };

        // Buttons
        popup.querySelector('#pissarra-clear').onclick = clearCanvas;
        popup.querySelector('#pissarra-undo').onclick = undo;
        popup.querySelector('#pissarra-close').onclick = close;
        popup.querySelector('#pissarra-grid').onclick = toggleGrid;
    }

    let showGrid = false;

    function setupCanvas() {
        canvas = popup.querySelector('#pissarra-canvas');
        const rect = canvas.parentElement.getBoundingClientRect();
        const w = rect.width - 16;
        const h = Math.min(w * 0.6, window.innerHeight * 0.6);
        canvas.width = w * 2;
        canvas.height = h * 2;
        canvas.style.height = h + 'px';
        ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        clearCanvas();

        // Mouse events
        canvas.onmousedown = startDraw;
        canvas.onmousemove = draw;
        canvas.onmouseup = endDraw;
        canvas.onmouseleave = endDraw;

        // Touch events
        canvas.ontouchstart = e => { e.preventDefault(); startDraw(getTouchPos(e)); };
        canvas.ontouchmove = e => { e.preventDefault(); draw(getTouchPos(e)); };
        canvas.ontouchend = e => { e.preventDefault(); endDraw(); };
    }

    function getTouchPos(e) {
        const rect = canvas.getBoundingClientRect();
        const t = e.touches[0];
        return { offsetX: t.clientX - rect.left, offsetY: t.clientY - rect.top, preventDefault: () => {} };
    }

    function startDraw(e) {
        isDrawing = true;
        const scaleX = (canvas.width / 2) / canvas.offsetWidth;
        const scaleY = (canvas.height / 2) / canvas.offsetHeight;
        ctx.beginPath();
        ctx.moveTo(e.offsetX * scaleX, e.offsetY * scaleY);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        if (color === '#ffffff') {
            ctx.globalCompositeOperation = 'destination-out';
        } else {
            ctx.globalCompositeOperation = 'source-over';
        }
    }

    function draw(e) {
        if (!isDrawing) return;
        const scaleX = (canvas.width / 2) / canvas.offsetWidth;
        const scaleY = (canvas.height / 2) / canvas.offsetHeight;
        ctx.lineTo(e.offsetX * scaleX, e.offsetY * scaleY);
        ctx.stroke();
    }

    function endDraw() {
        if (isDrawing) {
            isDrawing = false;
            ctx.globalCompositeOperation = 'source-over';
            saveState();
        }
    }

    function saveState() {
        historyIdx++;
        history = history.slice(0, historyIdx);
        history.push(canvas.toDataURL());
    }

    function undo() {
        if (historyIdx > 0) {
            historyIdx--;
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
                if (showGrid) drawGrid();
                ctx.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
            };
            img.src = history[historyIdx];
        } else {
            clearCanvas();
        }
    }

    function clearCanvas() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
        if (showGrid) drawGrid();
        history = [];
        historyIdx = -1;
        saveState();
    }

    function drawGrid() {
        const w = canvas.width / 2;
        const h = canvas.height / 2;
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 0.5;
        for (let x = 0; x <= w; x += 25) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = 0; y <= h; y += 25) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }
    }

    function toggleGrid() {
        showGrid = !showGrid;
        const gridBtn = popup.querySelector('#pissarra-grid');
        gridBtn.style.background = showGrid ? '#3b82f6' : '';
        gridBtn.style.color = showGrid ? '#fff' : '';
        clearCanvas();
    }

    function open() {
        overlay.style.display = 'block';
        popup.style.display = 'block';
        isOpen = true;
        setTimeout(setupCanvas, 50);
    }

    function close() {
        overlay.style.display = 'none';
        popup.style.display = 'none';
        isOpen = false;
    }

    btn.onclick = () => { if (isOpen) close(); else open(); };
    overlay.onclick = close;

    document.body.appendChild(btn);
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
    init();
})();
