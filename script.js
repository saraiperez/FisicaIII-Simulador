const app = document.getElementById("app");
const navButtons = [...document.querySelectorAll(".nav-link")];
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");

let activeAnimId = null;

function stopActiveAnimation() {
  if (activeAnimId) {
    cancelAnimationFrame(activeAnimId);
    activeAnimId = null;
  }
}

/* Menú hamburguesa para dispositivos móviles */
function toggleSidebar() {
  sidebar.classList.toggle("active");
  sidebarOverlay.classList.toggle("active");
}

if (menuToggle && sidebarOverlay) {
  menuToggle.addEventListener("click", toggleSidebar);
  sidebarOverlay.addEventListener("click", toggleSidebar);
}

const theoryKirchhoff = `
<div class="theory-card">
<h2>Fundamento teórico: Circuito en Serie y Leyes de Kirchhoff</h2>
<h3>1. Primera Ley de Kirchhoff (Ley de Corrientes - LCK)</h3>
<p>Basada en la conservación de la carga eléctrica, establece que la suma de las corrientes que entran a un nodo es igual a la suma de las corrientes que salen:</p>
<div class="formula">Σ I = 0  |  I1 + I2 = I3 + I4</div>
<h3>2. Circuito en Serie y Segunda Ley de Kirchhoff (LVK)</h3>
<p>En un circuito en serie, los componentes se conectan uno tras otro formando un <b>único camino cerrado</b> para la corriente eléctrica:</p>
<ul>
  <li><b>Corriente única:</b> La misma corriente circula por todas las resistencias (I = I₁ = I₂ = ...).</li>
  <li><b>Resistencia total:</b> R_total = R1 + R2 + ... + Rn</li>
  <li><b>Ley de Voltajes (LVK):</b> La suma de las caídas de voltaje es igual al voltaje de la fuente (V_fuente = V1 + V2 + ... + Vn).</li>
</ul>
<div class="formula">I = V_fuente / R_total  |  Vn = I · Rn</div>
</div>`;

const theoryMagnet = `
<div class="theory-card">
<h2>Fundamento teórico: Magnetismo y Campo Magnético</h2>
<h3>1. Concepto y Propiedades</h3>
<p>El magnetismo está asociado al movimiento de cargas eléctricas. Para una carga en movimiento dentro de un campo magnético uniforme, la fuerza magnética se define mediante el producto cruz:</p>
<div class="formula">F_B = q · (v × B)</div>
<h3>2. Magnitud de la Fuerza Magnética</h3>
<div class="formula">F_B = |q| · v · B · sen(θ)</div>
<h3>3. Casos particulares y Regla de la Mano Derecha</h3>
<ul>
  <li><b>θ = 0° o 180°:</b> La velocidad es paralela al campo magnético; la fuerza magnética es <b>cero</b> (la partícula sigue en línea recta).</li>
  <li><b>θ = 90°:</b> La velocidad es perpendicular al campo; la fuerza magnética alcanza su valor <b>máximo</b> y curva la trayectoria.</li>
  <li><b>Cargas negativas (como el electrón):</b> La dirección de la fuerza magnética se invierte respecto a la regla de la mano derecha.</li>
</ul>
</div>`;

function heading(title, subtitle) {
  return `<div class="page-heading"><h1>${title}</h1><p>${subtitle}</p></div>`;
}

function setView(view) {
  stopActiveAnimation();
  navButtons.forEach(b => b.classList.toggle("active", b.dataset.view === view));
  ({ inicio, kirchhoff, magnetismo, quiz, acerca }[view] || inicio)();
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (sidebar.classList.contains("active")) {
    toggleSidebar();
  }
}

navButtons.forEach(b => b.addEventListener("click", () => setView(b.dataset.view)));
document.querySelector(".brand").addEventListener("click", e => { e.preventDefault(); setView("inicio"); });

function inicio() {
  app.innerHTML = `
  ${heading("Te damos la bienvenida", "Aprende experimentando con simulaciones interactivas en tiempo real.")}
  <section class="hero">
    <span class="eyebrow">APRENDE · EXPERIMENTA · COMPRUEBA</span>
    <h2>La física cobra sentido cuando puedes experimentar.</h2>
    <p>Cambia variables al instante, observa el movimiento de los electrones y las partículas cargadas, y verifica los principios físicos con gráficas animadas.</p>
  </section>
  <h3 class="section-label">SELECCIONA UN MÓDULO</h3>
  <div class="module-grid">
    <article class="module-card">
      <span class="module-number">01</span>
      <h3>LEYES DE KIRCHHOFF</h3>
      <p>Simulador interactivo de circuitos en serie (2 o 3 resistencias) y análisis de nodos (LCK) con animación y gráficas.</p>
      <button class="primary-btn" onclick="setView('kirchhoff')">ABRIR SIMULADOR →</button>
    </article>
    <article class="module-card">
      <span class="module-number" style="color:var(--teal)">02</span>
      <h3>MAGNETISMO</h3>
      <p>Simulador animado de fuerza magnética sobre cargas en movimiento, regla de la mano derecha y gráfica interactiva F vs. θ.</p>
      <button class="primary-btn teal" onclick="setView('magnetismo')">ABRIR SIMULADOR →</button>
    </article>
    <article class="module-card">
      <span class="module-number" style="color:var(--orange)">03</span>
      <h3>AUTOEVALUACIÓN</h3>
      <p>Responde preguntas de los temas estudiados y recibe una calificación automática con retroalimentación.</p>
      <button class="primary-btn orange" onclick="setView('quiz')">COMENZAR →</button>
    </article>
  </div>
  <div class="notice">
    <strong>PROPÓSITO DEL PROYECTO</strong>
    <p>Comprender y aplicar los principios de circuitos eléctricos (Leyes de Kirchhoff) y electromagnetismo mediante simulaciones visuales interactivas basadas en los temas vistos en clase.</p>
  </div>`;
}

function tabs(theory, sim, example, defaultTab = "sim") {
  return `
  <div class="tabs">
    <button class="tab-btn ${defaultTab === 'sim' ? 'active' : ''}" data-tab="sim">Simulador Interactivo</button>
    <button class="tab-btn ${defaultTab === 'theory' ? 'active' : ''}" data-tab="theory">Marco teórico</button>
    <button class="tab-btn ${defaultTab === 'example' ? 'active' : ''}" data-tab="example">Ejemplo resuelto</button>
  </div>
  <div class="tab-panel ${defaultTab === 'sim' ? 'active' : ''}" id="sim">${sim}</div>
  <div class="tab-panel ${defaultTab === 'theory' ? 'active' : ''}" id="theory">${theory}</div>
  <div class="tab-panel ${defaultTab === 'example' ? 'active' : ''}" id="example">${example}</div>`;
}

function activateTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(x => x.classList.toggle("active", x === btn));
    document.querySelectorAll(".tab-panel").forEach(x => x.classList.toggle("active", x.id === btn.dataset.tab));
  }));
}

/* Seno exacto en ángulos notables para evitar residuos de punto flotante (ej. sin(180°) = 0) */
function exactSinDegrees(deg) {
  const norm = ((deg % 360) + 360) % 360;
  if (norm === 0 || norm === 180) return 0;
  if (norm === 90) return 1;
  if (norm === 270) return -1;
  return Math.sin((deg * Math.PI) / 180);
}

/* Formato científico limpio con superíndices (ej. 2.29×10⁻¹⁴) */
function formatScientific(val) {
  if (!Number.isFinite(val) || Math.abs(val) < 1e-30) return "0.00";
  const expStr = val.toExponential(2);
  const [mantissa, exponent] = expStr.split("e");
  const expNum = parseInt(exponent, 10);
  const superscriptMap = {
    "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³",
    "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹"
  };
  const supExp = String(expNum).split("").map(c => superscriptMap[c] || c).join("");
  return `${mantissa}×10${supExp}`;
}

/* Actualización directa y limpia de métricas */
function setMetricValue(el, targetVal, suffix, isExp = false) {
  if (!el) return;
  const cleanVal = Math.abs(targetVal) < 1e-30 ? 0 : targetVal;
  el.dataset.val = cleanVal;
  el.textContent = isExp ? `${formatScientific(cleanVal)} ${suffix}` : `${cleanVal.toFixed(2)} ${suffix}`;
}

/* =========================================================================
   MÓDULO 1: SIMULADOR DE LEYES DE KIRCHHOFF (SERIE LVK Y NODO LCK)
   ========================================================================= */
function seriesCircuitSVG(v, resistances, voltages) {
  const isThree = resistances.length === 3;
  const rPositions = isThree ? [205, 380, 555] : [255, 505];
  const colors = ["#168aad", "#159a83", "#e78a45"];

  const resistorsMarkup = resistances.map((r, i) => {
    const cx = rPositions[i];
    const color = colors[i];
    const vr = voltages[i].toFixed(2);
    return `
      <rect x="${cx - 48}" y="40" width="96" height="48" rx="8" fill="#ffffff" stroke="${color}" stroke-width="3.5"/>
      <text x="${cx}" y="61" fill="#18324b" font-family="Manrope, sans-serif" font-size="13.5" font-weight="800" text-anchor="middle">R${i + 1} = ${r} Ω</text>
      <text x="${cx}" y="79" fill="${color}" font-family="DM Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">V${i + 1} = ${vr} V</text>
    `;
  }).join("");

  return `
  <svg id="seriesSvg" viewBox="0 0 740 265" role="img" aria-label="Diagrama animado de circuito en serie">
    <rect x="105" y="64" width="555" height="150" rx="16" fill="none" stroke="#20364f" stroke-width="5"/>
    <path id="electronPath" d="M 105 214 L 105 64 L 660 64 L 660 214 Z" fill="none" stroke="none"/>

    <rect x="75" y="106" width="60" height="66" rx="10" fill="#eef3f8"/>
    <line x1="83" y1="126" x2="127" y2="126" stroke="#e78a45" stroke-width="5" stroke-linecap="round"/>
    <line x1="93" y1="139" x2="117" y2="139" stroke="#18324b" stroke-width="4" stroke-linecap="round"/>
    <line x1="83" y1="152" x2="127" y2="152" stroke="#e78a45" stroke-width="5" stroke-linecap="round"/>
    <text x="62" y="136" fill="#e78a45" font-family="Manrope, sans-serif" font-size="15" font-weight="800" text-anchor="end">${v} V</text>
    <text x="62" y="153" fill="#687d91" font-family="DM Sans, sans-serif" font-size="11" font-weight="700" text-anchor="end">Fuente</text>

    ${resistorsMarkup}

    <text x="382" y="242" fill="#687d91" font-family="DM Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">
      ← Regreso por el cable hacia la fuente
    </text>

    <g id="electronsLayer"></g>
  </svg>`;
}

function renderNodeSVG(i1, i2, i3, i4) {
  const i4Color = i4 >= 0 ? "#159a83" : "#ef4444";
  return `
  <svg viewBox="0 0 740 265" role="img" aria-label="Diagrama de Nodo Primera Ley de Kirchhoff">
    <!-- Ramas entrantes (Izquierda) -->
    <line x1="120" y1="65" x2="370" y2="132" stroke="#168aad" stroke-width="5" stroke-linecap="round"/>
    <polygon points="265,103 248,92 252,108" fill="#168aad"/>
    <rect x="75" y="32" width="130" height="32" rx="8" fill="#edf6fa" stroke="#168aad" stroke-width="2"/>
    <text x="140" y="53" fill="#18324b" font-family="Manrope, sans-serif" font-size="13" font-weight="800" text-anchor="middle">I1 = ${i1.toFixed(2)} A (→)</text>

    <line x1="120" y1="200" x2="370" y2="132" stroke="#168aad" stroke-width="5" stroke-linecap="round"/>
    <polygon points="265,161 252,156 248,172" fill="#168aad"/>
    <rect x="75" y="205" width="130" height="32" rx="8" fill="#edf6fa" stroke="#168aad" stroke-width="2"/>
    <text x="140" y="226" fill="#18324b" font-family="Manrope, sans-serif" font-size="13" font-weight="800" text-anchor="middle">I2 = ${i2.toFixed(2)} A (→)</text>

    <!-- Ramas salientes (Derecha) -->
    <line x1="370" y1="132" x2="620" y2="65" stroke="#e78a45" stroke-width="5" stroke-linecap="round"/>
    <polygon points="520,92 503,88 507,104" fill="#e78a45"/>
    <rect x="535" y="32" width="130" height="32" rx="8" fill="#fff7ed" stroke="#e78a45" stroke-width="2"/>
    <text x="600" y="53" fill="#18324b" font-family="Manrope, sans-serif" font-size="13" font-weight="800" text-anchor="middle">I3 = ${i3.toFixed(2)} A (↗)</text>

    <line x1="370" y1="132" x2="620" y2="200" stroke="${i4Color}" stroke-width="5" stroke-linecap="round"/>
    <polygon points="520,173 507,161 503,177" fill="${i4Color}"/>
    <rect x="525" y="205" width="150" height="34" rx="8" fill="#e8f7f2" stroke="${i4Color}" stroke-width="2.5"/>
    <text x="600" y="227" fill="${i4Color}" font-family="Manrope, sans-serif" font-size="13.5" font-weight="800" text-anchor="middle">I4 = ${i4.toFixed(2)} A (↘)</text>

    <!-- Nodo Central -->
    <circle cx="370" cy="132" r="18" fill="#14283f" stroke="#38bdf8" stroke-width="4"/>
    <text x="370" y="137" fill="#ffffff" font-family="Manrope, sans-serif" font-size="13" font-weight="800" text-anchor="middle">N</text>
    <text x="370" y="172" fill="#18324b" font-family="DM Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Nodo (Σ I = 0)</text>
  </svg>`;
}

function startElectronAnimation(currentAmps) {
  stopActiveAnimation();
  if (currentAmps <= 0) return;

  const path = document.getElementById("electronPath");
  const layer = document.getElementById("electronsLayer");
  if (!path || !layer) return;

  const totalLength = path.getTotalLength();
  const numElectrons = 22;
  const circles = [];

  for (let i = 0; i < numElectrons; i++) {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("r", "4.8");
    c.setAttribute("fill", "#38bdf8");
    c.setAttribute("stroke", "#0f172a");
    c.setAttribute("stroke-width", "1.2");
    layer.appendChild(c);
    circles.push({ el: c, offset: (i / numElectrons) * totalLength });
  }

  let lastTime = performance.now();

  function animate(now) {
    const dt = (now - lastTime) / 1000;
    lastTime = now;

    const speed = Math.min(540, Math.max(25, currentAmps * 100));

    circles.forEach(item => {
      item.offset = (item.offset + speed * dt) % totalLength;
      const pt = path.getPointAtLength(item.offset);
      item.el.setAttribute("cx", pt.x.toFixed(1));
      item.el.setAttribute("cy", pt.y.toFixed(1));
    });

    activeAnimId = requestAnimationFrame(animate);
  }

  activeAnimId = requestAnimationFrame(animate);
}

function kirchhoff() {
  let mode = 2; // 2 = Serie 2R, 3 = Serie 3R, "node" = Nodo LCK

  const sim = `
  <div class="sim-layout">
    <div>
      <div class="panel">
        <h3>CONFIGURA EL CIRCUITO <span class="badge-live">MANUAL</span></h3>
        
        <label style="display:block;font-size:10px;color:var(--muted);font-weight:700;margin-bottom:6px;">ELIGE EL DISEÑO</label>
        <div class="design-toggle three-cols">
          <button type="button" class="design-btn active" id="btnMode2">Serie: 2 R</button>
          <button type="button" class="design-btn" id="btnMode3">Serie: 3 R</button>
          <button type="button" class="design-btn" id="btnModeNode">Nodo (LCK)</button>
        </div>
        <div class="route-pill" id="routeText">Fuente → R1 → R2 → Regreso</div>

        <!-- CONTROLES MODO SERIE (LVK) -->
        <div id="seriesControls">
          <div class="field">
            <div class="field-header">
              <span>Voltaje de la fuente (V)</span>
              <span class="field-val" id="valV">0 V</span>
            </div>
            <div class="range-row">
              <input type="range" id="rangeV" min="0" max="50" step="0.5" value="0">
              <input type="number" id="numV" min="0" max="500" step="any" value="0">
            </div>
          </div>

          <div class="field">
            <div class="field-header">
              <span>Resistencia R1 (Ω)</span>
              <span class="field-val" id="valR1">0 Ω</span>
            </div>
            <div class="range-row">
              <input type="range" id="rangeR1" min="0" max="100" step="1" value="0">
              <input type="number" id="numR1" min="0" max="10000" step="any" value="0">
            </div>
          </div>

          <div class="field">
            <div class="field-header">
              <span>Resistencia R2 (Ω)</span>
              <span class="field-val" id="valR2">0 Ω</span>
            </div>
            <div class="range-row">
              <input type="range" id="rangeR2" min="0" max="100" step="1" value="0">
              <input type="number" id="numR2" min="0" max="10000" step="any" value="0">
            </div>
          </div>

          <div class="field" id="fieldR3" style="display:none;">
            <div class="field-header">
              <span>Resistencia R3 (Ω)</span>
              <span class="field-val" id="valR3">0 Ω</span>
            </div>
            <div class="range-row">
              <input type="range" id="rangeR3" min="0" max="100" step="1" value="0">
              <input type="number" id="numR3" min="0" max="10000" step="any" value="0">
            </div>
          </div>
        </div>

        <!-- CONTROLES MODO NODO (LCK) -->
        <div id="nodeControls" style="display:none;">
          <div class="field">
            <div class="field-header">
              <span>Corriente Entrante I1 (A)</span>
              <span class="field-val" id="valI1">0 A</span>
            </div>
            <div class="range-row">
              <input type="range" id="rangeI1" min="0" max="30" step="0.5" value="0">
              <input type="number" id="numI1" min="0" max="500" step="any" value="0">
            </div>
          </div>

          <div class="field">
            <div class="field-header">
              <span>Corriente Entrante I2 (A)</span>
              <span class="field-val" id="valI2">0 A</span>
            </div>
            <div class="range-row">
              <input type="range" id="rangeI2" min="0" max="30" step="0.5" value="0">
              <input type="number" id="numI2" min="0" max="500" step="any" value="0">
            </div>
          </div>

          <div class="field">
            <div class="field-header">
              <span>Corriente Saliente I3 (A)</span>
              <span class="field-val teal-val" id="valI3">0 A</span>
            </div>
            <div class="range-row">
              <input type="range" class="teal-range" id="rangeI3" min="0" max="30" step="0.5" value="0">
              <input type="number" id="numI3" min="0" max="500" step="any" value="0">
            </div>
          </div>
        </div>

        <button type="button" class="primary-btn" id="btnCalcKirchhoff" style="margin-top:12px;">
          ▶ Calcular / Hacer Simulación
        </button>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:8px;">
          <button type="button" class="secondary-btn" id="btnLoadClass">
            ↺ Datos de ejemplo
          </button>
          <button type="button" class="secondary-btn" id="btnResetZeroK">
            Limpiar (0)
          </button>
        </div>
      </div>

      <div class="panel">
        <h3>DATOS DE REFERENCIA</h3>
        <div class="class-table-wrap">
          <table class="class-table">
            <thead>
              <tr><th>Dato</th><th>Valor</th></tr>
            </thead>
            <tbody>
              <tr><td>Serie 3R (Fuente)</td><td><strong>24 V (3Ω, 5Ω, 4Ω)</strong></td></tr>
              <tr><td>Corriente Serie</td><td><strong>2.00 A (6V, 10V, 8V)</strong></td></tr>
              <tr><td>Nodo LCK Entran</td><td><strong>I1 = 8 A, I2 = 5 A</strong></td></tr>
              <tr><td>Nodo LCK Salen</td><td><strong>I3 = 6 A, I4 = 7 A</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div>
      <div class="panel visual-panel">
        <div id="circuitContainer" style="width:100%;"></div>
        <div class="flow-caption" id="flowCaption">
          Ingresa los valores y presiona "Calcular / Hacer Simulación".
        </div>
      </div>

      <div class="result-card">
        <h3>RESULTADOS DEL CIRCUITO <span class="badge-live">RESULTADOS</span></h3>
        <div id="kresults" class="result-lines"></div>
        <p id="kexplain" class="explanation"></p>
      </div>

      <div class="panel">
        <h3 id="chartTitleK">GRÁFICA DE DISTRIBUCIÓN DE VOLTAJE</h3>
        <div id="voltageChartBars" class="voltage-bars"></div>
      </div>
    </div>
  </div>`;

  const example = `
  <div class="theory-card">
    <h2>Ejemplos resueltos de la Práctica</h2>
    <div class="example-box">
      <h3>1. Segunda Ley de Kirchhoff (Diseño Serie: 3 Resistencias)</h3>
      <p>Fuente: <b>24 V</b> | Resistencias: <b>R1 = 3 Ω</b>, <b>R2 = 5 Ω</b>, <b>R3 = 4 Ω</b>.</p>
      <p>R_total = 12 Ω | Corriente I = <b>2.00 A</b> | Voltajes: V1 = <b>6 V</b>, V2 = <b>10 V</b>, V3 = <b>8 V</b>.</p>
      <p>Comprobación LVK: 24 V - 6 V - 10 V - 8 V = <b>0 V</b>.</p>
    </div>
    <div class="example-box" style="border-left-color: var(--blue);">
      <h3>2. Primera Ley de Kirchhoff (Diseño Nodo: LCK)</h3>
      <p>Corrientes entrantes: <b>I1 = 8 A</b>, <b>I2 = 5 A</b> | Corriente saliente conocida: <b>I3 = 6 A</b>.</p>
      <p>Ecuación: I1 + I2 - I3 - I4 = 0 → 8 + 5 - 6 - I4 = 0 → <b>I4 = 7.00 A</b>.</p>
    </div>
  </div>`;

  app.innerHTML = heading("Simulador de Leyes de Kirchhoff", "Selecciona el diseño (Serie o Nodo LCK), ingresa tus datos y presiona Calcular.") + tabs(theoryKirchhoff, sim, example, "sim");
  activateTabs();

  const btnMode2 = document.getElementById("btnMode2");
  const btnMode3 = document.getElementById("btnMode3");
  const btnModeNode = document.getElementById("btnModeNode");
  const routeText = document.getElementById("routeText");
  const fieldR3 = document.getElementById("fieldR3");
  const seriesControls = document.getElementById("seriesControls");
  const nodeControls = document.getElementById("nodeControls");
  const btnCalcKirchhoff = document.getElementById("btnCalcKirchhoff");
  const btnLoadClass = document.getElementById("btnLoadClass");
  const btnResetZeroK = document.getElementById("btnResetZeroK");

  const inputs = {
    v:  { range: document.getElementById("rangeV"),  num: document.getElementById("numV"),  badge: document.getElementById("valV") },
    r1: { range: document.getElementById("rangeR1"), num: document.getElementById("numR1"), badge: document.getElementById("valR1") },
    r2: { range: document.getElementById("rangeR2"), num: document.getElementById("numR2"), badge: document.getElementById("valR2") },
    r3: { range: document.getElementById("rangeR3"), num: document.getElementById("numR3"), badge: document.getElementById("valR3") },
    i1: { range: document.getElementById("rangeI1"), num: document.getElementById("numI1"), badge: document.getElementById("valI1") },
    i2: { range: document.getElementById("rangeI2"), num: document.getElementById("numI2"), badge: document.getElementById("valI2") },
    i3: { range: document.getElementById("rangeI3"), num: document.getElementById("numI3"), badge: document.getElementById("valI3") }
  };

  function syncBadges() {
    inputs.v.badge.textContent = `${Number(inputs.v.num.value) || 0} V`;
    inputs.r1.badge.textContent = `${Number(inputs.r1.num.value) || 0} Ω`;
    inputs.r2.badge.textContent = `${Number(inputs.r2.num.value) || 0} Ω`;
    inputs.r3.badge.textContent = `${Number(inputs.r3.num.value) || 0} Ω`;
    inputs.i1.badge.textContent = `${Number(inputs.i1.num.value) || 0} A`;
    inputs.i2.badge.textContent = `${Number(inputs.i2.num.value) || 0} A`;
    inputs.i3.badge.textContent = `${Number(inputs.i3.num.value) || 0} A`;
  }

  function runKirchhoffSimulation() {
    syncBadges();
    const kresults = document.getElementById("kresults");

    if (mode === "node") {
      stopActiveAnimation();
      const i1 = Math.max(0, Number(inputs.i1.num.value) || 0);
      const i2 = Math.max(0, Number(inputs.i2.num.value) || 0);
      const i3 = Math.max(0, Number(inputs.i3.num.value) || 0);
      const totalEntra = i1 + i2;
      const i4 = totalEntra - i3;

      document.getElementById("chartTitleK").textContent = "BALANCE DE CORRIENTES EN EL NODO (LCK)";
      kresults.innerHTML = `
        <div class="metric"><small>Suma Entrante (I1 + I2)</small><strong id="mEntra">0.00 A</strong></div>
        <div class="metric orange-border"><small>Saliente Conocida (I3)</small><strong id="mSal3">0.00 A</strong></div>
        <div class="metric teal-border"><small>Corriente Desconocida (I4)</small><strong id="mSal4">0.00 A</strong></div>
      `;

      setMetricValue(document.getElementById("mEntra"), totalEntra, "A");
      setMetricValue(document.getElementById("mSal3"), i3, "A");
      setMetricValue(document.getElementById("mSal4"), i4, "A");

      if (i1 === 0 && i2 === 0 && i3 === 0) {
        document.getElementById("kexplain").innerHTML = `Ingresa las corrientes entrantes (<b>I1, I2</b>) y saliente (<b>I3</b>), luego presiona <b>Calcular / Hacer Simulación</b>.`;
        document.getElementById("flowCaption").textContent = `En espera de datos (valores en 0)`;
      } else {
        document.getElementById("kexplain").innerHTML = `
          <b>Ecuación LCK (Σ I = 0):</b> ${i1.toFixed(2)} A + ${i2.toFixed(2)} A − ${i3.toFixed(2)} A − <b>${i4.toFixed(2)} A</b> = <b>0.00 A</b>.<br>
          Corrientes que entran (<b>${totalEntra.toFixed(2)} A</b>) = Corrientes que salen (<b>${(i3 + i4).toFixed(2)} A</b>).
        `;
        document.getElementById("flowCaption").textContent = `Primera Ley de Kirchhoff (Conservación de la carga): I1 + I2 = I3 + I4`;
      }

      const maxI = Math.max(totalEntra, i3, Math.abs(i4), 1);
      const bars = [
        { label: `Corriente Entrante I1`, val: i1, color: "#168aad" },
        { label: `Corriente Entrante I2`, val: i2, color: "#168aad" },
        { label: `Corriente Saliente I3`, val: i3, color: "#e78a45" },
        { label: `Corriente Desconocida I4`, val: Math.max(0, i4), color: "#159a83" }
      ];

      document.getElementById("voltageChartBars").innerHTML = bars.map(b => {
        const pct = (i1 === 0 && i2 === 0 && i3 === 0) ? 0 : Math.min(100, (b.val / maxI) * 100);
        return `
          <div class="v-bar-item">
            <div class="v-bar-label">
              <span>${b.label}</span>
              <span style="color:${b.color}">${b.val.toFixed(2)} A</span>
            </div>
            <div class="v-bar-track">
              <div class="v-bar-fill" style="width:${pct}%; background-color:${b.color};"></div>
            </div>
          </div>`;
      }).join("");

      document.getElementById("circuitContainer").innerHTML = renderNodeSVG(i1, i2, i3, i4);
      return;
    }

    // MODO SERIE (2 o 3 RESISTENCIAS)
    document.getElementById("chartTitleK").textContent = "GRÁFICA DE DISTRIBUCIÓN DE VOLTAJE";
    const v = Math.max(0, Number(inputs.v.num.value) || 0);
    const r1 = Math.max(0, Number(inputs.r1.num.value) || 0);
    const r2 = Math.max(0, Number(inputs.r2.num.value) || 0);
    const r3 = Math.max(0, Number(inputs.r3.num.value) || 0);

    const resistances = mode === 2 ? [r1, r2] : [r1, r2, r3];
    const rTotal = resistances.reduce((acc, r) => acc + r, 0);
    const current = rTotal > 0 ? v / rTotal : 0;
    const voltages = resistances.map(r => current * r);

    const borderClasses = ["", "teal-border", "orange-border"];
    kresults.innerHTML = [
      `<div class="metric purple-border"><small>Resistencia Total</small><strong id="mRtot">0.00 Ω</strong></div>`,
      `<div class="metric"><small>Corriente Total</small><strong id="mItot">0.00 A</strong></div>`,
      ...resistances.map((_, i) => `
        <div class="metric ${borderClasses[i]}">
          <small>Voltaje en R${i + 1}</small>
          <strong id="mV${i + 1}">0.00 V</strong>
        </div>
      `)
    ].join("");

    setMetricValue(document.getElementById("mRtot"), rTotal, "Ω");
    setMetricValue(document.getElementById("mItot"), current, "A");
    voltages.forEach((vr, i) => {
      setMetricValue(document.getElementById(`mV${i + 1}`), vr, "V");
    });

    if (v === 0 && rTotal === 0) {
      document.getElementById("kexplain").innerHTML = `Ingresa los valores de voltaje y resistencias y haz clic en <b>Calcular / Hacer Simulación</b>.`;
      document.getElementById("flowCaption").textContent = `En espera de datos (valores en 0)`;
    } else if (rTotal === 0) {
      document.getElementById("kexplain").innerHTML = `<b>Aviso:</b> La resistencia total es 0 Ω. Ingresa al menos una resistencia mayor que 0.`;
      document.getElementById("flowCaption").textContent = `Resistencia total nula (0 Ω)`;
    } else {
      const sumText = voltages.map(vr => `${vr.toFixed(2)} V`).join(" + ");
      document.getElementById("kexplain").innerHTML = `
        <b>Comprobación LVK:</b> ${sumText} = <b>${v.toFixed(2)} V</b>. Todo el voltaje de la fuente se reparte entre las resistencias.
      `;
      document.getElementById("flowCaption").textContent = `Electrones en movimiento · Corriente total: ${current.toFixed(2)} A`;
    }

    const barColors = ["#168aad", "#159a83", "#e78a45"];
    document.getElementById("voltageChartBars").innerHTML = voltages.map((vr, i) => {
      const pct = v > 0 ? Math.min(100, (vr / v) * 100) : 0;
      return `
        <div class="v-bar-item">
          <div class="v-bar-label">
            <span>Resistencia R${i + 1} (${resistances[i]} Ω)</span>
            <span style="color:${barColors[i]}">${vr.toFixed(2)} V (${pct.toFixed(1)}%)</span>
          </div>
          <div class="v-bar-track">
            <div class="v-bar-fill" style="width:${pct}%; background-color:${barColors[i]};"></div>
          </div>
        </div>
      `;
    }).join("");

    document.getElementById("circuitContainer").innerHTML = seriesCircuitSVG(v, resistances, voltages);
    startElectronAnimation(current);
  }

  Object.values(inputs).forEach(ctrl => {
    ctrl.range.addEventListener("input", () => {
      ctrl.num.value = ctrl.range.value;
      syncBadges();
    });
    ctrl.num.addEventListener("input", () => {
      const val = Math.max(0, Number(ctrl.num.value) || 0);
      ctrl.range.value = Math.min(Number(ctrl.range.max), val);
      syncBadges();
    });
  });

  btnCalcKirchhoff.addEventListener("click", runKirchhoffSimulation);

  btnMode2.addEventListener("click", () => {
    mode = 2;
    [btnMode2, btnMode3, btnModeNode].forEach(b => b.classList.remove("active"));
    btnMode2.classList.add("active");
    seriesControls.style.display = "block";
    nodeControls.style.display = "none";
    fieldR3.style.display = "none";
    routeText.textContent = "Fuente → R1 → R2 → Regreso";
    runKirchhoffSimulation();
  });

  btnMode3.addEventListener("click", () => {
    mode = 3;
    [btnMode2, btnMode3, btnModeNode].forEach(b => b.classList.remove("active"));
    btnMode3.classList.add("active");
    seriesControls.style.display = "block";
    nodeControls.style.display = "none";
    fieldR3.style.display = "block";
    routeText.textContent = "Fuente → R1 → R2 → R3 → Regreso";
    runKirchhoffSimulation();
  });

  btnModeNode.addEventListener("click", () => {
    mode = "node";
    [btnMode2, btnMode3, btnModeNode].forEach(b => b.classList.remove("active"));
    btnModeNode.classList.add("active");
    seriesControls.style.display = "none";
    nodeControls.style.display = "block";
    routeText.textContent = "Nodo N: I1 + I2 (Entran) = I3 + I4 (Salen)";
    runKirchhoffSimulation();
  });

  btnLoadClass.addEventListener("click", () => {
    if (mode === "node") {
      inputs.i1.range.value = inputs.i1.num.value = 8;
      inputs.i2.range.value = inputs.i2.num.value = 5;
      inputs.i3.range.value = inputs.i3.num.value = 6;
    } else if (mode === 3) {
      inputs.v.range.value = inputs.v.num.value = 24;
      inputs.r1.range.value = inputs.r1.num.value = 3;
      inputs.r2.range.value = inputs.r2.num.value = 5;
      inputs.r3.range.value = inputs.r3.num.value = 4;
    } else {
      inputs.v.range.value = inputs.v.num.value = 15;
      inputs.r1.range.value = inputs.r1.num.value = 4;
      inputs.r2.range.value = inputs.r2.num.value = 6;
    }
    runKirchhoffSimulation();
  });

  btnResetZeroK.addEventListener("click", () => {
    Object.values(inputs).forEach(ctrl => {
      ctrl.range.value = ctrl.num.value = 0;
    });
    runKirchhoffSimulation();
  });

  runKirchhoffSimulation();
}

/* =========================================================================
   MÓDULO 2: SIMULADOR DE MAGNETISMO
   ========================================================================= */
function magnetismo() {
  let magnetState = {
    q: 0,
    v: 0,
    b: 0,
    angle: 0,
    preset: "proton",
    simulated: false
  };

  const sim = `
  <div class="sim-layout">
    <div>
      <div class="panel">
        <h3>PARÁMETROS DE LA CARGA <span class="badge-live">MANUAL</span></h3>
        
        <label style="display:block;font-size:10px;color:var(--muted);font-weight:700;margin-bottom:6px;">TIPO DE PARTÍCULA (ATAJO DE CARGA)</label>
        <div class="design-toggle three-cols">
          <button type="button" class="design-btn teal-active" data-preset="proton">Protón (+)</button>
          <button type="button" class="design-btn teal-active" data-preset="electron">Electrón (-)</button>
          <button type="button" class="design-btn teal-active" data-preset="alpha">Alfa (+2e)</button>
        </div>
        <div class="route-pill teal-pill" id="particleLabel">Selecciona partícula o ingresa carga q</div>

        <div class="field">
          <div class="field-header">
            <span>Carga eléctrica q (C)</span>
            <span class="field-val teal-val" id="valMq">0.00 C</span>
          </div>
          <div class="range-row">
            <input id="mq" type="number" step="any" value="0" style="width:100%;text-align:left;">
          </div>
        </div>

        <div class="field">
          <div class="field-header">
            <span>Rapidez v (×10⁵ m/s)</span>
            <span class="field-val teal-val" id="valMv">0.0 ×10⁵ m/s</span>
          </div>
          <div class="range-row">
            <input type="range" class="teal-range" id="rangeMv" min="0" max="10" step="0.5" value="0">
            <input type="number" id="numMv" min="0" max="100" step="0.1" value="0">
          </div>
        </div>

        <div class="field">
          <div class="field-header">
            <span>Campo magnético B (T)</span>
            <span class="field-val teal-val" id="valMb">0.00 T</span>
          </div>
          <div class="range-row">
            <input type="range" class="teal-range" id="rangeMb" min="0" max="3.0" step="0.05" value="0">
            <input type="number" id="numMb" min="0" max="50" step="0.05" value="0">
          </div>
        </div>

        <div class="field">
          <div class="field-header">
            <span>Ángulo θ entre v y B</span>
            <span class="field-val teal-val" id="valMa">0°</span>
          </div>
          <div class="range-row">
            <input type="range" class="teal-range" id="rangeMa" min="0" max="180" step="1" value="0">
            <input type="number" id="numMa" min="0" max="180" step="1" value="0">
          </div>
        </div>

        <button type="button" class="primary-btn teal" id="btnCalcMagnet" style="margin-top:12px;">
          ▶ Calcular / Hacer Simulación
        </button>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:8px;">
          <button type="button" class="secondary-btn" id="btnLoadClassMagnet">
            ↺ Datos de clase
          </button>
          <button type="button" class="secondary-btn" id="btnResetMagnet">
            Limpiar (0)
          </button>
        </div>
      </div>

      <div class="panel">
        <h3>DATOS DE LA PRÁCTICA DE CLASE</h3>
        <div class="class-table-wrap">
          <table class="class-table">
            <thead>
              <tr><th>Dato</th><th>Valor</th></tr>
            </thead>
            <tbody>
              <tr><td>Partícula (Protón)</td><td><strong>1.6×10⁻¹⁹ C</strong></td></tr>
              <tr><td>Rapidez (v)</td><td><strong>2.5×10⁵ m/s</strong></td></tr>
              <tr><td>Campo magnético (B)</td><td><strong>1.0 T</strong></td></tr>
              <tr><td>Ángulo (θ)</td><td><strong>35°</strong></td></tr>
              <tr><td>Fuerza magnética (FB)</td><td><strong>2.29×10⁻¹⁴ N</strong></td></tr>
              <tr><td>Fuerza máxima (Fmax)</td><td><strong>4.00×10⁻¹⁴ N</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div>
      <div class="panel" style="padding:14px;">
        <h3>SIMULACIÓN VISUAL: CAMPO B, VELOCIDAD v Y FUERZA FB <span class="badge-live">SIMULADOR</span></h3>
        <div class="magnet-sim-wrap">
          <canvas id="magnetSimCanvas"></canvas>
        </div>
        <div class="flow-caption" id="magnetCaption">
          Ingresa los parámetros y presiona "Calcular / Hacer Simulación".
        </div>
      </div>

      <div class="result-card">
        <h3>RESULTADOS DE FUERZA MAGNÉTICA <span class="badge-live">RESULTADOS</span></h3>
        <div class="result-lines">
          <div class="metric teal-border"><small>Fuerza Magnética (FB)</small><strong id="mForce">0.00 N</strong></div>
          <div class="metric"><small>Fuerza Máxima (θ = 90°)</small><strong id="mMax">0.00 N</strong></div>
          <div class="metric orange-border"><small>Dirección de FB</small><strong id="mDir">En espera (0 N)</strong></div>
        </div>
        <p id="mexp" class="explanation"></p>
      </div>

      <div class="panel">
        <h3>GRÁFICA INTERACTIVA: FUERZA MAGNÉTICA SEGÚN EL ÁNGULO θ</h3>
        <div class="chart-wrap"><canvas id="forceChart"></canvas></div>
      </div>
    </div>
  </div>`;

  const example = `
  <div class="theory-card">
    <h2>Ejemplo resuelto: Práctica de Clase</h2>
    <div class="example-box">
      <h3>Datos del problema</h3>
      <p>Un haz de protones (<b>q = 1.6×10⁻¹⁹ C</b>) se mueve a <b>v = 2.5×10⁵ m/s</b> a través de un campo magnético uniforme de <b>B = 1.0 T</b> formando un ángulo <b>θ = 35°</b> con el vector campo magnético.</p>
      <h3>1. Cálculo de la magnitud de la fuerza</h3>
      <p>FB = |q| · v · B · sen(35°)</p>
      <p>FB = (1.6×10⁻¹⁹ C) · (2.5×10⁵ m/s) · (1.0 T) · (0.5736) = <b>2.29×10⁻¹⁴ N</b></p>
      <h3>2. Fuerza máxima posible (si θ = 90°)</h3>
      <p>Fmax = |q| · v · B = <b>4.00×10⁻¹⁴ N</b></p>
    </div>
  </div>`;

  app.innerHTML = heading("Simulador de Magnetismo y Campo Magnético", "Ingresa tus datos y presiona Calcular para visualizar la simulación y obtener los resultados.") + tabs(theoryMagnet, sim, example, "sim");
  activateTabs();

  const presetBtns = [...document.querySelectorAll("[data-preset]")];
  const mqInput = document.getElementById("mq");
  const rangeMv = document.getElementById("rangeMv");
  const numMv = document.getElementById("numMv");
  const rangeMb = document.getElementById("rangeMb");
  const numMb = document.getElementById("numMb");
  const rangeMa = document.getElementById("rangeMa");
  const numMa = document.getElementById("numMa");
  const btnCalcMagnet = document.getElementById("btnCalcMagnet");
  const btnLoadClassMagnet = document.getElementById("btnLoadClassMagnet");

  function syncMagnetBadges() {
    const q = Number(mqInput.value) || 0;
    const vFactor = Math.max(0, Number(numMv.value) || 0);
    const b = Math.max(0, Number(numMb.value) || 0);
    const a = Math.min(180, Math.max(0, Number(numMa.value) || 0));

    document.getElementById("valMq").textContent = `${formatScientific(q)} C`;
    document.getElementById("valMv").textContent = `${vFactor.toFixed(1)} ×10⁵ m/s`;
    document.getElementById("valMb").textContent = `${b.toFixed(2)} T`;
    document.getElementById("valMa").textContent = `${a}°`;
  }

  function runMagnetSimulation(isInitialZero = false) {
    syncMagnetBadges();
    const q = Number(mqInput.value) || 0;
    const vFactor = Math.max(0, Number(numMv.value) || 0);
    const v = vFactor * 1e5;
    const b = Math.max(0, Number(numMb.value) || 0);
    const a = Math.min(180, Math.max(0, Number(numMa.value) || 0));

    magnetState = { q, v, b, angle: a, preset: magnetState.preset, simulated: !isInitialZero };

    const sinVal = Math.abs(exactSinDegrees(a));
    const maxForce = Math.abs(q) * v * b;
    const force = maxForce * sinVal;

    setMetricValue(document.getElementById("mForce"), force, "N", true);
    setMetricValue(document.getElementById("mMax"), maxForce, "N", true);

    let dirText = "En espera (0 N)";
    let expDetail = "";

    if (isInitialZero || (q === 0 && v === 0 && b === 0)) {
      dirText = "En espera (0 N)";
      document.getElementById("mexp").innerHTML = `Ingresa la carga <b>q</b>, rapidez <b>v</b>, campo <b>B</b> y ángulo <b>θ</b>, luego presiona <b>Calcular / Hacer Simulación</b>.`;
      document.getElementById("magnetCaption").textContent = `Valores en 0 · Presiona "Calcular / Hacer Simulación" cuando ingreses los datos.`;
    } else {
      if (force === 0) {
        dirText = "Nula (sin desviación)";
        expDetail = `Con estos parámetros, la fuerza magnética resultante es cero (0 N).`;
      } else if (q > 0) {
        dirText = "Entrando al plano (⊗)";
        expDetail = "Por la regla de la mano derecha para una carga positiva (+), al girar v hacia B el pulgar apunta entrando al plano (⊗).";
      } else {
        dirText = "Saliendo del plano (⊙)";
        expDetail = "Como la carga es negativa (-), la fuerza magnética se invierte respecto a la regla de la mano derecha y apunta saliendo del plano (⊙).";
      }
      document.getElementById("mexp").innerHTML = `<b>Fórmula:</b> FB = |q|·v·B·sen(${a}°) = <b>${formatScientific(force)} N</b> (${(sinVal * 100).toFixed(1)}% de Fmax). ${expDetail}`;
      document.getElementById("magnetCaption").textContent = `Líneas verdes: Campo B (→) · Flecha naranja: Velocidad v · Símbolo azul: Fuerza magnética FB`;
    }

    document.getElementById("mDir").textContent = dirText;
    drawForceChart(q, v, b, a);
  }

  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      presetBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const p = btn.dataset.preset;
      magnetState.preset = p;
      const lbl = document.getElementById("particleLabel");
      if (p === "proton") {
        mqInput.value = "1.6e-19";
        lbl.textContent = "Protón · Carga positiva (+1.60×10⁻¹⁹ C)";
      } else if (p === "electron") {
        mqInput.value = "-1.6e-19";
        lbl.textContent = "Electrón · Carga negativa (-1.60×10⁻¹⁹ C)";
      } else {
        mqInput.value = "3.2e-19";
        lbl.textContent = "Partícula Alfa · Carga positiva (+3.20×10⁻¹⁹ C)";
      }
      syncMagnetBadges();
    });
  });

  function bindPair(rangeEl, numEl) {
    rangeEl.addEventListener("input", () => {
      numEl.value = rangeEl.value;
      syncMagnetBadges();
    });
    numEl.addEventListener("input", () => {
      rangeEl.value = Math.min(Number(rangeEl.max), Math.max(Number(rangeEl.min), Number(numEl.value) || 0));
      syncMagnetBadges();
    });
  }

  bindPair(rangeMv, numMv);
  bindPair(rangeMb, numMb);
  bindPair(rangeMa, numMa);
  mqInput.addEventListener("input", syncMagnetBadges);

  btnCalcMagnet.addEventListener("click", () => runMagnetSimulation(false));

  btnLoadClassMagnet.addEventListener("click", () => {
    presetBtns[0].click();
    rangeMv.value = numMv.value = 2.5;
    rangeMb.value = numMb.value = 1.0;
    rangeMa.value = numMa.value = 35;
    runMagnetSimulation(false);
  });

  document.getElementById("btnResetMagnet").addEventListener("click", () => {
    presetBtns.forEach(b => b.classList.remove("active"));
    document.getElementById("particleLabel").textContent = "Selecciona partícula o ingresa carga q";
    mqInput.value = 0;
    rangeMv.value = numMv.value = 0;
    rangeMb.value = numMb.value = 0;
    rangeMa.value = numMa.value = 0;
    runMagnetSimulation(true);
  });

  function startMagnetCanvasAnimation() {
    stopActiveAnimation();
    const canvas = document.getElementById("magnetSimCanvas");
    if (!canvas) return;
    let phase = 0;
    let lastTime = performance.now();

    function render(now) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
        canvas.width = Math.max(300, Math.round(rect.width * dpr));
        canvas.height = Math.max(200, Math.round(rect.height * dpr));
      }

      const ctx = canvas.getContext("2d");
      ctx.save();
      ctx.scale(dpr, dpr);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, w, h);

      const numLines = 6;
      const spacing = h / (numLines + 1);
      const lineSpeed = magnetState.b > 0 ? 30 + magnetState.b * 40 : 0;
      phase = (phase + dt * lineSpeed) % 60;

      ctx.strokeStyle = "rgba(21, 154, 131, 0.35)";
      ctx.fillStyle = "rgba(21, 154, 131, 0.65)";
      ctx.lineWidth = 1.5;

      for (let i = 1; i <= numLines; i++) {
        const y = i * spacing;
        ctx.beginPath();
        ctx.moveTo(20, y);
        ctx.lineTo(w - 20, y);
        ctx.stroke();

        for (let x = 35 + phase; x < w - 25; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - 7, y - 4);
          ctx.lineTo(x - 7, y + 4);
          ctx.closePath();
          ctx.fill();
        }
      }

      ctx.fillStyle = "#34d399";
      ctx.font = "700 12px Manrope, sans-serif";
      ctx.fillText(`Campo Magnético B = ${magnetState.b.toFixed(2)} T →`, 18, 22);

      const cx = w * 0.48;
      const cy = h * 0.56;

      if (!magnetState.simulated || (magnetState.q === 0 && magnetState.v === 0 && magnetState.b === 0)) {
        ctx.fillStyle = "rgba(248, 250, 252, 0.75)";
        ctx.font = "600 13px DM Sans, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Ingresa los datos y presiona «Calcular / Hacer Simulación»", w / 2, h / 2);
        ctx.textAlign = "left";
        ctx.restore();
        activeAnimId = requestAnimationFrame(render);
        return;
      }

      const rad = (magnetState.angle * Math.PI) / 180;
      const sinA = exactSinDegrees(magnetState.angle);
      const signQ = magnetState.q >= 0 ? 1 : -1;

      const tSec = now / 1000;
      const vNorm = magnetState.v / 5e5;
      const amp = sinA * signQ * Math.min(28, 12 * magnetState.b * vNorm);
      const px = cx + (magnetState.v > 0 ? Math.cos(tSec * (2 + vNorm * 2)) * 8 : 0);
      const py = cy + (magnetState.v > 0 ? Math.sin(tSec * (2 + vNorm * 2)) * amp : 0);

      if (magnetState.b > 0) {
        drawArrow(ctx, px, py, px + 85, py, "#34d399", 2.5, "B");
      }

      if (magnetState.v > 0) {
        const vLen = 70 + Math.min(45, vNorm * 22);
        const vx = px + Math.cos(-rad) * vLen;
        const vy = py + Math.sin(-rad) * vLen;
        drawArrow(ctx, px, py, vx, vy, "#f59e0b", 3, "v");
      }

      if (magnetState.angle > 0 && magnetState.angle < 180 && magnetState.v > 0 && magnetState.b > 0) {
        ctx.strokeStyle = "rgba(248, 250, 252, 0.55)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, 28, -rad, 0);
        ctx.stroke();
        ctx.fillStyle = "#f8fafc";
        ctx.font = "600 11px DM Sans, sans-serif";
        ctx.fillText(`θ=${magnetState.angle}°`, px + 32, py - 8);
      }

      if (Math.abs(sinA) > 0 && magnetState.q !== 0 && magnetState.v > 0 && magnetState.b > 0) {
        const fx = px - 48;
        const fy = py;
        ctx.strokeStyle = "#38bdf8";
        ctx.fillStyle = "#38bdf8";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(fx, fy, 13, 0, Math.PI * 2);
        ctx.stroke();

        if (signQ > 0) {
          ctx.beginPath();
          ctx.moveTo(fx - 6, fy - 6);
          ctx.lineTo(fx + 6, fy + 6);
          ctx.moveTo(fx + 6, fy - 6);
          ctx.lineTo(fx - 6, fy + 6);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(fx, fy, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.font = "700 11px Manrope, sans-serif";
        ctx.fillText("FB", fx - 7, fy - 18);
      }

      ctx.beginPath();
      ctx.arc(px, py, 12, 0, Math.PI * 2);
      ctx.fillStyle = magnetState.q === 0 ? "#64748b" : (signQ > 0 ? "#ef4444" : "#3b82f6");
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "800 13px Manrope, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(magnetState.q === 0 ? "0" : (signQ > 0 ? "+" : "−"), px, py + 0.5);
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      ctx.restore();
      activeAnimId = requestAnimationFrame(render);
    }

    activeAnimId = requestAnimationFrame(render);
  }

  runMagnetSimulation(true);
  startMagnetCanvasAnimation();
}

function drawArrow(ctx, x1, y1, x2, y2, color, width, label) {
  const headlen = 9;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();

  if (label) {
    ctx.font = "800 12px Manrope, sans-serif";
    ctx.fillText(label, x2 + 6, y2 - 4);
  }
}

function drawForceChart(q, v, b, angle) {
  const canvas = document.getElementById("forceChart");
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(300, rect.width * dpr);
  canvas.height = Math.max(180, rect.height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const w = canvas.width / dpr, h = canvas.height / dpr, pad = 42;
  const rawMax = Math.abs(q) * v * b;
  const max = rawMax || 1;

  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    let y = pad + (h - 2 * pad) * (i / 4);
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(w - 15, y);
    ctx.stroke();
  }

  ctx.font = "9px DM Sans";
  ctx.fillStyle = "#63788e";
  ctx.textAlign = "center";

  for (let deg = 0; deg <= 180; deg += 10) {
    let x = pad + (w - pad - 20) * (deg / 180);
    ctx.beginPath();
    ctx.strokeStyle = (deg === 0 || deg === 90 || deg === 180) ? "#cbd5e1" : "#f1f5f9";
    ctx.moveTo(x, pad);
    ctx.lineTo(x, h - pad);
    ctx.stroke();
    ctx.fillText(deg + "°", x, h - 14);
  }

  if (rawMax > 0) {
    ctx.fillStyle = "rgba(21, 154, 131, 0.12)";
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    for (let deg = 0; deg <= 180; deg++) {
      let x = pad + (w - pad - 20) * (deg / 180);
      let f = Math.abs(q) * v * b * Math.abs(exactSinDegrees(deg));
      let y = h - pad - (h - 2 * pad) * (f / max);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(pad + (w - pad - 20), h - pad);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#159a83";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let deg = 0; deg <= 180; deg++) {
      let x = pad + (w - pad - 20) * (deg / 180);
      let f = Math.abs(q) * v * b * Math.abs(exactSinDegrees(deg));
      let y = h - pad - (h - 2 * pad) * (f / max);
      if (deg === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    let curX = pad + (w - pad - 20) * (angle / 180);
    let curF = Math.abs(q) * v * b * Math.abs(exactSinDegrees(angle));
    let curY = h - pad - (h - 2 * pad) * (curF / max);

    ctx.fillStyle = "#e78a45";
    ctx.beginPath();
    ctx.arc(curX, curY, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.fillStyle = "#18324b";
  ctx.font = "700 10px Manrope, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("FB (N)", 10, pad - 8);
  ctx.textAlign = "center";
  ctx.fillText("Ángulo θ entre v y B", w / 2, h - 2);
}

/* =========================================================================
   MÓDULO 3: AUTOEVALUACIÓN Y ACERCA
   ========================================================================= */
const questions = [
  ["¿Cómo se calcula la resistencia total en un circuito en serie?", ["Sumando todas las resistencias (R1 + R2 + ...)", "Dividiendo el voltaje entre la potencia", "Multiplicando las resistencias"], 0, "En serie, la corriente atraviesa cada resistencia una tras otra, por lo que sus oposiciones se suman."],
  ["Si una fuente de 15 V alimenta dos resistencias en serie y en R1 caen 6 V, ¿cuánto voltaje cae en R2?", ["6 V", "9 V", "15 V"], 1, "Por la Ley de Voltajes de Kirchhoff, V1 + V2 = 15 V → 6 V + 9 V = 15 V."],
  ["¿Qué ocurre con la velocidad de los electrones si aumenta la corriente en el circuito?", ["Aumenta", "Disminuye", "Se detiene"], 0, "La corriente mide el flujo de carga; a mayor corriente, los electrones se mueven más rápido."],
  ["¿Cuál de estos materiales es ferromagnético?", ["Bismuto", "Aluminio", "Hierro"], 2, "El hierro es un material ferromagnético."],
  ["Si el ángulo entre velocidad y campo es 0°, la fuerza magnética es…", ["Cero", "Máxima", "Negativa"], 0, "F = |q|vB sen(0°) = 0."]
];

function quiz() {
  app.innerHTML = heading("Autoevaluación", "Comprueba lo aprendido y revisa la explicación de cada respuesta.") +
    `<div class="quiz-list">${questions.map((q, i) => `<article class="panel quiz-question"><h3>${i + 1}. ${q[0]}</h3>${q[1].map((o, j) => `<label class="option"><input type="radio" name="q${i}" value="${j}">${o}</label>`).join("")}<div class="feedback" id="fb${i}"></div></article>`).join("")}</div>
    <div style="display:flex; gap:12px; margin-top:16px; flex-wrap:wrap;">
      <button class="primary-btn orange" id="gradeQuiz">CALIFICAR RESPUESTAS</button>
      <button class="primary-btn" id="resetQuiz" style="background:#63788e; display:none;">VOLVER A REALIZAR</button>
    </div>
    <div class="score" id="quizScore"></div>`;

  const gradeBtn = document.getElementById("gradeQuiz");
  const resetBtn = document.getElementById("resetQuiz");

  gradeBtn.addEventListener("click", () => {
    let score = 0, answered = 0;
    questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      const fb = document.getElementById(`fb${i}`);
      if (selected) answered++;
      const good = selected && Number(selected.value) === q[2];
      if (good) score++;

      if (good) {
        fb.style.color = "#159a83";
        fb.textContent = `Correcto. ${q[3]}`;
      } else if (selected) {
        fb.style.color = "#d9534f";
        fb.textContent = `Incorrecto. La respuesta correcta era: "${q[1][q[2]]}". ${q[3]}`;
      } else {
        fb.style.color = "#e78a45";
        fb.textContent = `Sin responder. La respuesta correcta era: "${q[1][q[2]]}". ${q[3]}`;
      }
    });
    document.getElementById("quizScore").textContent = `Resultado: ${score}/5 · Nota: ${(score * 2).toFixed(1)}/10 · Respondidas: ${answered}/5`;
    resetBtn.style.display = "inline-block";
  });

  resetBtn.addEventListener("click", () => quiz());
}

function acerca() {
  app.innerHTML = heading("Acerca del proyecto", "Información académica y alcance del simulador.") +
    `<div class="about-grid">
      <article class="panel"><h3>OBJETIVO GENERAL</h3><p>Desarrollar un entorno interactivo para reforzar los conceptos de Física III mediante teoría, modelos matemáticos y simulaciones programadas.</p></article>
      <article class="panel"><h3>TECNOLOGÍAS</h3><p>HTML estructura el contenido, CSS define el diseño visual y JavaScript realiza los cálculos en tiempo real, animaciones y gráficos.</p></article>
      <article class="panel"><h3>CONTENIDO DE CLASE</h3><p>Integra los ejercicios y principios vistos en clase (Leyes de Kirchhoff en nodos y mallas, y fuerza magnética sobre cargas) permitiendo explorar distintas configuraciones.</p></article>
      <article class="panel"><h3>ALCANCE Y LIMITACIONES</h3><p>Los modelos son idealizados. Los resultados dependen de los valores ingresados y sirven como herramienta visual de apoyo académico.</p></article>
    </div>`;
}

inicio();