// js/app.js — HAULITZ Engine v6.1
// Architectural Editorial Verification Engine
// Zero-Bloat · Procedural Audio · Native Canvas Oscilloscope · Strict Determinism

(function () {
  'use strict';

  // =========================================================================
  // 1. WEB AUDIO ENGINE (procedural, zero assets)
  // =========================================================================
  class Audio {
    constructor() {
      this.ctx = null;
      this.on = false;
    }

    _ensureCtx() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return false;
        this.ctx = new AC();
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return true;
    }

    toggle() {
      this.on = !this.on;
      const btn = document.getElementById('btn-audio');
      if (btn) btn.classList.toggle('audio-on', this.on);
      if (this.on) {
        this._ensureCtx();
        this.chime();
        showToast('Sound aktiviert', 'fa-solid fa-volume-high text-emerald');
      } else {
        showToast('Sound stumm', 'fa-solid fa-volume-xmark');
      }
      return this.on;
    }

    _play(freq, type, decay, vol = 0.12) {
      if (!this.on || !this._ensureCtx()) return;
      try {
        const osc = this.ctx.createOscillator();
        const g   = this.ctx.createGain();
        const t   = this.ctx.currentTime;
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + decay);
      } catch (_) {}
    }

    _playRamp(f0, f1, type, decay, vol = 0.12) {
      if (!this.on || !this._ensureCtx()) return;
      try {
        const osc = this.ctx.createOscillator();
        const g   = this.ctx.createGain();
        const t   = this.ctx.currentTime;
        osc.type = type;
        osc.frequency.setValueAtTime(f0, t);
        osc.frequency.exponentialRampToValueAtTime(f1, t + decay);
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + decay);
      } catch (_) {}
    }

    click() { this._play(380, 'triangle', 0.04, 0.08); }
    alert() { this._playRamp(200, 100, 'sawtooth', 0.2, 0.14); }
    chime() { this._playRamp(587, 880, 'sine', 0.28, 0.12); }
    pulse() { this._playRamp(130, 55, 'sine', 0.14, 0.15); }
    seal()  { this._playRamp(523, 1047, 'sine', 0.3, 0.13); }
  }

  const audio = new Audio();

  // =========================================================================
  // 2. TOAST COMPONENT
  // =========================================================================
  function showToast(msg, iconClass = 'fa-solid fa-check text-emerald') {
    const t  = document.getElementById('toast');
    const m  = document.getElementById('toast-msg');
    const ic = document.getElementById('toast-icon');
    if (!t || !m) return;
    m.textContent = msg;
    if (ic) ic.className = iconClass;
    t.classList.add('show');
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove('show'), 2800);
  }

  // =========================================================================
  // 3. AMBIENT CANVAS (Calibrated Particle Network)
  // =========================================================================
  function initAmbientCanvas() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });

    const N = Math.min(36, Math.floor(W * H / 32000));
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.3 + 0.6
    }));

    function tick() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(16,185,129,${0.08 * (1 - d / 120)})`;
            ctx.lineWidth   = 0.6;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.fillStyle = 'rgba(16,185,129,0.3)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // =========================================================================
  // 4. KINETIC RETICLE CURSOR
  // =========================================================================
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let hasMoved = false;
    let mx = innerWidth / 2, my = innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        rx = mx; ry = my;
        dot.classList.add('ready');
        ring.classList.add('ready');
      }
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });

    (function lerp() {
      if (hasMoved) {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      }
      requestAnimationFrame(lerp);
    })();

    document.querySelectorAll('a, button, input, .chaos-pill, .invoice-card, .instrument-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  // =========================================================================
  // 5. INVOICE CHAOS ENGINE (Strict State Hygiene)
  // =========================================================================
  const PRESETS = {
    clean: {
      verdictPulseClass: '',
      verdictBadgeClass: '',
      verdictBadgeText: 'VERIFIED CLEAN',
      cardClass: '',
      ibanText: 'DE89 3704 0044 0532 0130 00',
      ibanClass: 'iban-ok',
      totalVat: '760,00 €',
      totalGross: '4.760,00 €',
      showError: false,
      errorClass: '',
      errorLabel: '',
      footerTargetText: 'SAP S/4HANA · BAPI_INCOMINGINVOICE_CREATE',
      footerTargetClass: '',
      footerStatusText: '0,00 € Abweichung',
      footerStatusClass: ''
    },
    math: {
      verdictPulseClass: 'flawed',
      verdictBadgeClass: 'flawed',
      verdictBadgeText: 'ARITHMETIK-DRIFT',
      cardClass: 'state-flawed',
      ibanText: 'DE89 3704 0044 0532 0130 00',
      ibanClass: 'iban-ok',
      totalVat: '640,00 €',
      totalGross: '4.640,00 €',
      showError: true,
      errorClass: '',
      errorLabel: 'Abweichung: Berechnet 760,00 € — Deklariert 640,00 €',
      footerTargetText: 'Quarantäne · HGB § 377 Rügeobliegenheit',
      footerTargetClass: 'flawed',
      footerStatusText: '-120,00 € Differenz',
      footerStatusClass: 'flawed'
    },
    iban: {
      verdictPulseClass: 'amber',
      verdictBadgeClass: 'amber',
      verdictBadgeText: 'SEPA-CHECKSUMME UNGÜLTIG',
      cardClass: 'state-iban',
      ibanText: 'DE89 3704 0044 0532 0130 99 (MOD-97 ungültig)',
      ibanClass: 'iban-bad',
      totalVat: '760,00 €',
      totalGross: '4.760,00 €',
      showError: true,
      errorClass: 'amber',
      errorLabel: 'SEPA-Prüfziffer 99 ist ungültig (ISO 7064 MOD-97 Rest ≠ 1 · Rückläuferrisiko)',
      footerTargetText: 'Zahlungssperre · SEPA Kreditor-Stammdatenprüfung',
      footerTargetClass: 'amber',
      footerStatusText: 'IBAN-BRUCH',
      footerStatusClass: 'amber'
    },
    sql: {
      verdictPulseClass: 'purple',
      verdictBadgeClass: 'purple',
      verdictBadgeText: 'SQL-INJEKTION GESTOPPT',
      cardClass: 'state-sql',
      ibanText: 'DE89 3704 0044 0532 0130 00',
      ibanClass: 'iban-ok',
      totalVat: '760,00 €',
      totalGross: '4.760,00 €',
      showError: true,
      errorClass: 'purple',
      errorLabel: "Angriffsvektor isoliert: ' OR '1'='1; DROP TABLE STG;-- → Kein Schema mutiert",
      footerTargetText: 'Sicherheitslogbuch · OWASP ASVS Level 3',
      footerTargetClass: 'purple',
      footerStatusText: '0 Schema-Mutationen',
      footerStatusClass: 'purple'
    }
  };

  let currentState = 'clean';

  function applyPreset(key) {
    const p = PRESETS[key] || PRESETS.clean;
    currentState = key;

    const card        = document.getElementById('invoice-card');
    const pulse       = document.getElementById('verdict-pulse');
    const badge       = document.getElementById('verdict-badge');
    const fieldIban   = document.getElementById('field-iban');
    const totalVat    = document.getElementById('total-vat');
    const totalGross  = document.getElementById('total-gross');
    const errorRow    = document.getElementById('error-row');
    const errorLabel  = document.getElementById('error-label');
    const footTarget  = document.getElementById('footer-target');
    const footStatus  = document.getElementById('footer-status');

    // Card border / glow
    if (card) card.className = `invoice-card${p.cardClass ? ' ' + p.cardClass : ''}`;

    // Verdict pulse dot
    if (pulse) pulse.className = `verdict-pulse${p.verdictPulseClass ? ' ' + p.verdictPulseClass : ''}`;

    // Verdict badge
    if (badge) {
      badge.className = `verdict-badge mono${p.verdictBadgeClass ? ' ' + p.verdictBadgeClass : ''}`;
      badge.textContent = p.verdictBadgeText;
    }

    // IBAN field: strictly set text and class
    if (fieldIban) {
      fieldIban.textContent = p.ibanText;
      fieldIban.className   = `field-val mono ${p.ibanClass}`;
    }

    // Totals
    if (totalVat)   totalVat.textContent   = p.totalVat;
    if (totalGross) totalGross.textContent = p.totalGross;

    // Error row: strictly format color and text
    if (errorRow) {
      const show = p.showError;
      errorRow.style.display  = show ? 'flex' : 'none';
      errorRow.className      = `total-row error-row${p.errorClass ? ' ' + p.errorClass : ''}`;
      errorRow.setAttribute('aria-hidden', show ? 'false' : 'true');
    }
    if (errorLabel && p.errorLabel) {
      errorLabel.innerHTML = `<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> ${p.errorLabel}`;
    }

    // Footer
    if (footTarget) {
      footTarget.className = `footer-target${p.footerTargetClass ? ' ' + p.footerTargetClass : ''}`;
      const icon = footTarget.querySelector('i');
      footTarget.textContent = '';
      if (icon) footTarget.appendChild(icon);
      const span = document.createElement('span');
      span.textContent = p.footerTargetText;
      footTarget.appendChild(span);
    }
    if (footStatus) {
      footStatus.textContent = p.footerStatusText;
      footStatus.className   = `footer-status${p.footerStatusClass ? ' mono ' + p.footerStatusClass : ' mono'}`;
    }

    // Pills active state
    document.querySelectorAll('.chaos-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-chaos') === key);
    });

    // Hero toggle button
    const btnToggle = document.getElementById('btn-toggle-state');
    const btnLabel  = document.getElementById('btn-state-label');
    if (btnToggle && btnLabel) {
      if (key === 'clean') {
        btnToggle.classList.remove('state-flawed');
        btnLabel.textContent = 'Fehler einschleusen';
      } else {
        btnToggle.classList.add('state-flawed');
        btnLabel.textContent = 'Protokoll bereinigen';
      }
    }

    // Sound feedback
    if (key === 'clean') audio.chime();
    else audio.alert();
  }

  function initChaosConsole() {
    // Chaos pills
    document.querySelectorAll('.chaos-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        audio.click();
        applyPreset(btn.getAttribute('data-chaos'));
      });
    });

    // Hero toggle button: cycle clean <-> math
    const btnToggle = document.getElementById('btn-toggle-state');
    if (btnToggle) {
      btnToggle.addEventListener('click', () => {
        audio.click();
        applyPreset(currentState === 'clean' ? 'math' : 'clean');
      });
    }
  }

  // Specular sheen on the invoice card
  function initInvoiceSpecular() {
    const card  = document.getElementById('invoice-card');
    const sheen = document.getElementById('invoice-sheen');
    if (!card || !sheen) return;
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width)  * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      sheen.style.setProperty('--mx', `${x}%`);
      sheen.style.setProperty('--my', `${y}%`);
    });
  }

  // =========================================================================
  // 6. INSTRUMENT 1 — FLOAT/CENT MATH DIVERGENCE SLIDER
  // =========================================================================
  function initMathSlider() {
    const slider  = document.getElementById('math-slider');
    const floatEl = document.getElementById('float-result');
    const centEl  = document.getElementById('cent-result');
    const qtyEl   = document.getElementById('slider-qty');
    if (!slider) return;

    function update() {
      const n = parseInt(slider.value, 10) || 1;
      if (qtyEl) qtyEl.textContent = n.toLocaleString('de-DE');

      // IEEE-754 float: sum n * (0.1 + 0.2)
      let floatSum = 0;
      const iter = Math.min(n, 10000);
      for (let i = 0; i < iter; i++) floatSum += 0.1 + 0.2;
      if (n > 10000) floatSum = floatSum * (n / 10000);

      // Exact 64-bit cent calculation: n * 30 cents = EUR
      const centSum = n * 30;
      const centEur = (centSum / 100).toFixed(2);

      if (floatEl) {
        floatEl.textContent = floatSum.toPrecision(17).replace(/\.?0+$/, '') || floatSum.toString();
      }
      if (centEl) {
        centEl.textContent = centEur;
      }
    }

    slider.addEventListener('input', update);
    update();
  }

  // =========================================================================
  // 7. INSTRUMENT 2 — PIPELINE ANIMATION
  // =========================================================================
  function initPipeline() {
    const btn          = document.getElementById('btn-pipeline');
    const nodeSupplier = document.getElementById('pipe-supplier');
    const nodeGateway  = document.getElementById('pipe-gateway');
    const nodeSap      = document.getElementById('pipe-sap');
    const pulse1       = document.getElementById('pulse-1');
    const pulse2       = document.getElementById('pulse-2');
    const telemetry    = document.getElementById('pipe-telemetry');
    if (!btn) return;

    function resetNodes() {
      [nodeSupplier, nodeGateway, nodeSap].forEach(n => n && n.classList.remove('active'));
      [pulse1, pulse2].forEach(p => p && p.classList.remove('running'));
    }

    function animatePipeline() {
      btn.disabled = true;
      resetNodes();
      if (telemetry) {
        telemetry.textContent = 'Eingang: Beleg empfangen (0,02 ms)';
        telemetry.className = 'pipe-telemetry mono';
      }

      nodeSupplier && nodeSupplier.classList.add('active');
      audio.click();

      setTimeout(() => {
        nodeSupplier && nodeSupplier.classList.remove('active');
        pulse1 && pulse1.classList.add('running');
        audio.pulse();
      }, 350);

      setTimeout(() => {
        pulse1 && pulse1.classList.remove('running');
        nodeGateway && nodeGateway.classList.add('active');
        if (telemetry) telemetry.textContent = 'Prüfung: Cent-Arithmetik & ISO 7064 (0,18 ms)';
        audio.click();
      }, 700);

      setTimeout(() => {
        nodeGateway && nodeGateway.classList.remove('active');
        pulse2 && pulse2.classList.add('running');
        audio.pulse();
      }, 1050);

      setTimeout(() => {
        pulse2 && pulse2.classList.remove('running');
        nodeSap && nodeSap.classList.add('active');
        if (telemetry) {
          telemetry.textContent = 'Freigabe: SAP S/4HANA verbucht (0,38 ms)';
          telemetry.className   = 'pipe-telemetry mono success';
        }
        audio.chime();
        showToast('Beleg freigegeben: SAP S/4HANA Staging OK');

        setTimeout(() => {
          nodeSap && nodeSap.classList.remove('active');
          if (telemetry) {
            telemetry.textContent = 'Bereit · 0,4 ms Gesamtlatenz';
            telemetry.className   = 'pipe-telemetry mono';
          }
          btn.disabled = false;
        }, 1200);
      }, 1400);
    }

    btn.addEventListener('click', animatePipeline);
  }

  // =========================================================================
  // 8. BENCHMARK ENGINE — Phosphor Oscilloscope Waveform
  // =========================================================================
  function initBenchmark() {
    const btn       = document.getElementById('btn-bench');
    const countEl   = document.getElementById('bm-count');
    const latEl     = document.getElementById('bm-latency');
    const canvas    = document.getElementById('bench-canvas');
    const activeTag = document.getElementById('bench-active-tag');
    if (!btn || !canvas) return;

    const ctx = canvas.getContext('2d');
    let running = false;
    let count   = 0;
    let waveOff = 0;

    function drawWave() {
      if (!ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // CRT phosphor grid ticks
      ctx.strokeStyle = 'rgba(16,185,129,0.08)';
      ctx.lineWidth   = 1;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 40) {
        ctx.moveTo(x, 0); ctx.lineTo(x, H);
      }
      for (let y = 0; y <= H; y += 20) {
        ctx.moveTo(0, y); ctx.lineTo(W, y);
      }
      ctx.stroke();

      // Oscilloscope curve
      ctx.lineWidth   = running ? 2.5 : 1.5;
      ctx.strokeStyle = running ? '#10b981' : 'rgba(16,185,129,0.45)';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur  = running ? 12 : 4;

      ctx.beginPath();
      const slices = 60;
      for (let i = 0; i <= slices; i++) {
        const amp = running ? 32 : 8;
        const freq = running ? 0.6 : 0.25;
        const y   = H / 2 + Math.sin(i * freq + waveOff) * amp * Math.sin(i * 0.12);
        const x   = (i / slices) * W;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Translucent phosphor glow fill beneath curve
      if (running) {
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, H / 2, 0, H);
        grad.addColorStop(0, 'rgba(16,185,129,0.22)');
        grad.addColorStop(1, 'rgba(16,185,129,0.0)');
        ctx.fillStyle = grad;
        ctx.fill();
      }

      waveOff += running ? 0.38 : 0.05;
      requestAnimationFrame(drawWave);
    }
    requestAnimationFrame(drawWave);

    let benchTimer = null;

    function start() {
      if (running) return;
      running = true;
      btn.classList.add('running');
      if (activeTag) {
        activeTag.textContent = 'RUNNING 5.000 TPS';
        activeTag.style.color = '#10b981';
      }
      audio.click();

      benchTimer = setInterval(() => {
        count += 100;
        if (countEl) countEl.textContent = count.toLocaleString('de-DE');
        if (latEl)   latEl.textContent   = (0.15 + Math.random() * 0.05).toFixed(2);
      }, 20);
    }

    function stop() {
      if (!running) return;
      running = false;
      clearInterval(benchTimer);
      btn.classList.remove('running');
      if (activeTag) {
        activeTag.textContent = 'IDLE';
        activeTag.style.color = 'var(--text-sub)';
      }
      audio.chime();
    }

    btn.addEventListener('mousedown', start);
    btn.addEventListener('mouseup',   stop);
    btn.addEventListener('mouseleave', stop);
    btn.addEventListener('touchstart', e => { e.preventDefault(); start(); });
    btn.addEventListener('touchend',   e => { e.preventDefault(); stop();  });
  }

  // =========================================================================
  // 9. COPY BUTTONS & CONTACT ACTIONS
  // =========================================================================
  function initCopyButtons() {
    const audioBtn = document.getElementById('btn-audio');
    const emailBtn = document.getElementById('btn-copy-email');

    if (audioBtn) audioBtn.addEventListener('click', () => audio.toggle());

    if (emailBtn) {
      emailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('allensimeonfletcher@gmail.com').then(() => {
          showToast('allensimeonfletcher@gmail.com kopiert!');
          audio.chime();
        });
      });
    }
  }

  // =========================================================================
  // 10. SCROLL FADE-IN (Intersection Observer)
  // =========================================================================
  function initFadeIns() {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  }

  // =========================================================================
  // 11. LENIS SMOOTH SCROLL
  // =========================================================================
  function initLenis() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof window.Lenis === 'undefined') return;
    const lenis = new window.Lenis({
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // =========================================================================
  // 12. NAV ACTIVE LINK on scroll
  // =========================================================================
  function initNavActiveLinks() {
    const sections = ['hero', 'document', 'instruments', 'benchmark', 'colophon']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= 140) current = sec.id;
      }
      links.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === '#' + current);
      });
    }, { passive: true });
  }

  // =========================================================================
  // 13. APPLY FADE-UP CLASS to key blocks
  // =========================================================================
  function applyFadeUpClasses() {
    const targets = [
      '.section-header', '.inspection-bay', '.instrument-card',
      '.colophon-inner', '.benchmark-left', '.benchmark-right'
    ];
    targets.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.classList.add('fade-up'));
    });
  }

  // =========================================================================
  // DOM READY BOOTSTRAP
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    applyFadeUpClasses();
    initAmbientCanvas();
    initCursor();
    initChaosConsole();
    initInvoiceSpecular();
    initMathSlider();
    initPipeline();
    initBenchmark();
    initCopyButtons();
    initFadeIns();
    initLenis();
    initNavActiveLinks();
  });

})();
