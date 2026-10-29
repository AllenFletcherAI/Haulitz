// js/app.js
// HAULITZ Interactive Gateway Engine (v5.0)
// Architectural Scrollytelling, Living Bento Instruments, Aperture Preloader, Procedural Web Audio Synth

(function() {
  'use strict';

  // =========================================================================
  // 1. WEB AUDIO SYNTHESIZER (ZERO-ASSET PROCEDURAL SOUND EFFECTS)
  // =========================================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = false;
      this.droneOsc = null;
      this.droneGain = null;
      this.initFromStorage();
    }

    initFromStorage() {
      const stored = localStorage.getItem('haulitz_audio');
      this.enabled = stored === 'true';
      this.updateDockButton();
    }

    ensureContext() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem('haulitz_audio', this.enabled ? 'true' : 'false');
      this.updateDockButton();
      if (this.enabled) {
        this.ensureContext();
        this.playChime();
        this.startDrone();
        showToast('Audio-Feedback aktiviert');
      } else {
        this.stopDrone();
        showToast('Audio-Feedback stummgeschaltet');
      }
    }

    updateDockButton() {
      const btn = document.getElementById('dock-audio-btn');
      if (!btn) return;
      if (this.enabled) {
        btn.classList.add('active');
        btn.setAttribute('aria-label', 'Soundeffekte stummschalten');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-label', 'Soundeffekte aktivieren');
      }
    }

    startDrone() {
      if (!this.enabled || this.droneOsc) return;
      this.ensureContext();
      try {
        this.droneOsc = this.ctx.createOscillator();
        this.droneGain = this.ctx.createGain();
        this.droneOsc.type = 'sine';
        this.droneOsc.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2 low drone
        this.droneGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
        this.droneOsc.connect(this.droneGain);
        this.droneGain.connect(this.ctx.destination);
        this.droneOsc.start();
      } catch (e) {}
    }

    stopDrone() {
      if (this.droneOsc) {
        try {
          this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
          setTimeout(() => {
            if (this.droneOsc) {
              this.droneOsc.stop();
              this.droneOsc.disconnect();
              this.droneOsc = null;
              this.droneGain = null;
            }
          }, 350);
        } catch (e) {
          this.droneOsc = null;
        }
      }
    }

    modulateDrone(velocity) {
      if (!this.enabled || !this.droneOsc) return;
      try {
        const targetFreq = 65.41 + Math.min(60, velocity * 0.08);
        this.droneOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
      } catch (e) {}
    }

    playClick() {
      if (!this.enabled) return;
      this.ensureContext();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (e) {}
    }

    playChime() {
      if (!this.enabled) return;
      this.ensureContext();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.25);
      } catch (e) {}
    }

    playAlert() {
      if (!this.enabled) return;
      this.ensureContext();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.18);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.2);
      } catch (e) {}
    }

    playPulse() {
      if (!this.enabled) return;
      this.ensureContext();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(130.81, now); // C3
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.12);
      } catch (e) {}
    }

    playSeal() {
      if (!this.enabled) return;
      this.ensureContext();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.22); // C6
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.3);
      } catch (e) {}
    }
  }

  const sound = new SoundEngine();

  // =========================================================================
  // 2. TOAST NOTIFICATION
  // =========================================================================
  function showToast(message, iconClass = 'fa-solid fa-check text-emerald') {
    const toast = document.getElementById('toast-notification');
    const msgEl = document.getElementById('toast-message');
    const iconEl = document.getElementById('toast-icon');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    if (iconEl) iconEl.className = iconClass;

    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // =========================================================================
  // 3. CALIBRATION PRELOADER SEQUENCE (1.2s Aperture Shutter)
  // =========================================================================
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const line = document.querySelector('.preloader-line');
    const counter = document.getElementById('preloader-counter');
    const status = document.getElementById('preloader-status');

    if (!preloader || !line || !counter) return;

    let progress = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      progress = Math.min(100, Math.floor((elapsed / duration) * 100));

      line.style.width = progress + '%';
      counter.textContent = String(progress).padStart(3, '0');
      preloader.setAttribute('aria-valuenow', progress);

      if (progress < 40) {
        if (status) status.textContent = 'CALIBRATING ARITHMETIC REGISTERS...';
      } else if (progress < 80) {
        if (status) status.textContent = 'CHECKING SEPA MODULO-97 LOOKUPS...';
      } else {
        if (status) status.textContent = 'VERIFYING GOBD SHA-256 INTEGRITY...';
      }

      if (progress < 100) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          preloader.classList.add('completed');
          sound.playChime();
        }, 150);
      }
    }

    requestAnimationFrame(step);
  }

  // =========================================================================
  // 4. PINNED 4-BEAT SCROLLYTELLING ENGINE
  // =========================================================================
  const BEAT_DATA = [
    {
      beat: 1,
      pill: 'PHASE 01 // RAW PAYLOAD INGESTION',
      title: 'Rechnungsfehler und Rundungsdrift stoppen,<br><span class="gradient-text">bevor Daten Ihr ERP erreichen.</span>',
      desc: 'Unstrukturierte Lieferantendaten werden in 0.4 Millisekunden erfasst, mathematisch geprüft und vor dem SAP S/4HANA Staging versiegelt.',
      layerVisual: { display: 'block', opacity: 1, transform: 'translateZ(0px)' },
      layerAst: { display: 'none', opacity: 0, transform: 'translateZ(-20px)' },
      layerCrypto: { display: 'none', opacity: 0, transform: 'translateZ(-40px)' },
      monolithScale: 1.0,
      glowColor: 'rgba(16, 185, 129, 0.25)'
    },
    {
      beat: 2,
      pill: 'PHASE 02 // EXACT 64-BIT COMPRESSION',
      title: 'Exakte 64-Bit Cent-Arithmetik<br><span class="gradient-text">eliminiert IEEE-754 Rundungsverluste.</span>',
      desc: 'Gleitkommazahlen wie 0.1 + 0.2 erzeugen im Speicher 0.30000000000000004. HAULITZ verarbeitet Festkomma-Cents als vorzeichenlose 64-Bit Ganzzahlen.',
      layerVisual: { display: 'block', opacity: 1, transform: 'translateZ(10px)' },
      layerAst: { display: 'none', opacity: 0, transform: 'translateZ(-10px)' },
      layerCrypto: { display: 'none', opacity: 0, transform: 'translateZ(-30px)' },
      monolithScale: 0.98,
      glowColor: 'rgba(56, 189, 248, 0.3)'
    },
    {
      beat: 3,
      pill: 'PHASE 03 // MULTI-LAYER X-RAY DISSECTION',
      title: 'Die Anatomie eines Belegs:<br><span class="gradient-text">Sichtbeleg, AST-Token &amp; Binärregister.</span>',
      desc: 'Ziehen Sie die X-Ray Lupe über den Beleg. Erkennen Sie die syntaktischen Validierungsregeln und maschinennahen Register hinter jeder Zeile.',
      layerVisual: { display: 'block', opacity: 0.88, transform: 'translateZ(50px)' },
      layerAst: { display: 'block', opacity: 0.95, transform: 'translateZ(0px)' },
      layerCrypto: { display: 'block', opacity: 0.92, transform: 'translateZ(-50px)' },
      monolithScale: 0.96,
      glowColor: 'rgba(168, 85, 247, 0.35)'
    },
    {
      beat: 4,
      pill: 'PHASE 04 // ERP VAULT LOCK &amp; SHA-256 SEAL',
      title: 'Unveränderlicher GoBD-Prüfpfad<br><span class="gradient-text">vor der ERP-Verbuchung.</span>',
      desc: 'Atomare Freigabe an SAP S/4HANA über BAPI_INCOMINGINVOICE_CREATE. Der kryptografische SHA-256 Block schützt vor unbefugter Mutation.',
      layerVisual: { display: 'block', opacity: 0.6, transform: 'translateZ(60px)' },
      layerAst: { display: 'block', opacity: 0.75, transform: 'translateZ(20px)' },
      layerCrypto: { display: 'block', opacity: 1, transform: 'translateZ(-20px)' },
      monolithScale: 1.02,
      glowColor: 'rgba(16, 185, 129, 0.5)'
    }
  ];

  function initScrollytelling() {
    const track = document.getElementById('scrollytelling-track');
    const pillText = document.getElementById('stage-pill-text');
    const stageTitle = document.getElementById('stage-title');
    const stageDesc = document.getElementById('stage-desc');
    const monolith = document.getElementById('glass-monolith');
    const layerVis = document.getElementById('layer-visual');
    const layerAst = document.getElementById('layer-ast');
    const layerCry = document.getElementById('layer-crypto');
    const monoLine1 = document.getElementById('mono-line-1');
    const monoLine2 = document.getElementById('mono-line-2');

    if (!track) return;

    let currentBeatIndex = 0;
    let lastScrollY = window.scrollY;

    function onScroll() {
      const rect = track.getBoundingClientRect();
      const totalScrollable = track.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));

      // Calculate scroll velocity for typography morphing and sound drone
      const currentScrollY = window.scrollY;
      const velocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      sound.modulateDrone(velocity);

      // Kinetic Typography translation and skew based on velocity & progress
      if (monoLine1 && monoLine2) {
        const offset = (progress - 0.5) * 120;
        monoLine1.style.transform = `translateX(${offset}px)`;
        monoLine2.style.transform = `translateX(${-offset}px)`;
      }

      // Determine active beat (0..3)
      let beatIdx = Math.floor(progress * 4);
      if (beatIdx > 3) beatIdx = 3;

      if (beatIdx !== currentBeatIndex) {
        currentBeatIndex = beatIdx;
        applyBeat(currentBeatIndex);
      }
    }

    function applyBeat(idx) {
      const b = BEAT_DATA[idx];
      if (!b) return;

      // Update indicators
      for (let i = 1; i <= 4; i++) {
        const rail = document.getElementById(`rail-beat-${i}`);
        if (rail) {
          rail.classList.toggle('active', i === idx + 1);
        }
      }

      // Update narrative
      if (pillText) pillText.textContent = b.pill;
      if (stageTitle) stageTitle.innerHTML = b.title;
      if (stageDesc) stageDesc.innerHTML = b.desc;

      // Update Monolith 3D Stack
      if (monolith) {
        monolith.style.boxShadow = `0 25px 60px rgba(0, 0, 0, 0.6), 0 0 45px ${b.glowColor}`;
        monolith.style.transform = `scale(${b.monolithScale})`;
      }

      if (layerVis) {
        layerVis.style.display = b.layerVisual.display;
        layerVis.style.opacity = b.layerVisual.opacity;
        layerVis.style.transform = b.layerVisual.transform;
      }
      if (layerAst) {
        layerAst.style.display = b.layerAst.display;
        layerAst.style.opacity = b.layerAst.opacity;
        layerAst.style.transform = b.layerAst.transform;
      }
      if (layerCry) {
        layerCry.style.display = b.layerCrypto.display;
        layerCry.style.opacity = b.layerCrypto.opacity;
        layerCry.style.transform = b.layerCrypto.transform;
      }

      // Update Dock Nav active link
      document.querySelectorAll('.dock-link[data-beat]').forEach(link => {
        const beatNum = parseInt(link.getAttribute('data-beat'), 10);
        link.classList.toggle('active', beatNum === idx + 1);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    applyBeat(0); // initialize

    // Dock beat link smooth jump
    document.querySelectorAll('.dock-link[data-beat]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const beatNum = parseInt(link.getAttribute('data-beat'), 10);
        const targetProgress = (beatNum - 1 + 0.1) / 4;
        const totalScrollable = track.offsetHeight - window.innerHeight;
        const targetScrollTop = track.offsetTop + (targetProgress * totalScrollable);
        window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
        sound.playClick();
      });
    });
  }

  // =========================================================================
  // 5. DRAGGABLE PHYSICAL X-RAY LOUPE (Casa di Solare Standard)
  // =========================================================================
  function initDraggableLoupe() {
    const loupe = document.getElementById('xray-loupe');
    const container = document.getElementById('glass-monolith');
    const layerAst = document.getElementById('layer-ast');
    const layerCry = document.getElementById('layer-crypto');

    if (!loupe || !container) return;

    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    loupe.addEventListener('pointerdown', (e) => {
      isDragging = true;
      loupe.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = loupe.offsetLeft;
      initialTop = loupe.offsetTop;
      loupe.style.transition = 'none';
      sound.playClick();
      showToast('X-Ray Lupe aktiv: Maschinencode freigelegt', 'fa-solid fa-eye text-emerald');
    });

    loupe.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const maxLeft = container.offsetWidth - loupe.offsetWidth - 10;
      const maxTop = container.offsetHeight - loupe.offsetHeight - 10;

      const newLeft = Math.max(10, Math.min(maxLeft, initialLeft + dx));
      const newTop = Math.max(10, Math.min(maxTop, initialTop + dy));

      loupe.style.left = newLeft + 'px';
      loupe.style.top = newTop + 'px';

      // Reveal AST and Crypto registers dynamically when loupe is dragged
      if (layerAst && layerCry) {
        layerAst.style.display = 'block';
        layerAst.style.opacity = '0.95';
        layerCry.style.display = 'block';
        layerCry.style.opacity = '0.9';
      }
    });

    function endDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      try { loupe.releasePointerCapture(e.pointerId); } catch (err) {}
      loupe.style.transition = 'transform 0.1s ease';
      sound.playPulse();
    }

    loupe.addEventListener('pointerup', endDrag);
    loupe.addEventListener('pointercancel', endDrag);
  }

  // =========================================================================
  // 6. CHAOS ATTACK CONSOLE (INJECTION PRESETS)
  // =========================================================================
  const CHAOS_PRESETS = {
    clean: {
      docId: 'PAYLOAD // DE-2026-X89 // RAW EDI',
      verdictText: 'VERIFIED CLEAN (0.4ms)',
      verdictClass: 'clean',
      dotColor: '#10b981',
      vendor: 'Apex Cloud Infrastructure GmbH',
      iban: 'DE89 3704 0044 0532 0130 00',
      ibanValid: true,
      net: '4.000,00 €',
      tax: '760,00 €',
      gross: '4.760,00 €',
      target: 'STAGING_TARGET: SAP S/4HANA (BAPI_INCOMINGINVOICE_CREATE)',
      drift: '0.00 ppm DRIFT',
      sealHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      ast: `{\n  "invoice_id": "DE-2026-X89",\n  "statutory_regime": "UStG_§14_COMPLIANT",\n  "math_precision": "EXACT_64BIT_CENT",\n  "vat_breakdown": [\n    { "rate": 0.19, "taxable_cents": 400000, "vat_cents": 76000, "delta_cents": 0 }\n  ],\n  "sepa_iban": {\n    "raw": "DE89370400440532013000",\n    "iso_7064_mod97_remainder": 1,\n    "valid": true\n  },\n  "erp_target": "SAP_S4HANA_BAPI_INCOMINGINVOICE_CREATE"\n}`,
      state: 'clean'
    },
    math: {
      docId: 'PAYLOAD // DE-2026-X89 // 10¢_DRIFT',
      verdictText: 'ARITHMETIC DRIFT (-0,10 €) // QUARANTINE',
      verdictClass: 'flawed',
      dotColor: '#ef4444',
      vendor: 'Apex Cloud Infrastructure GmbH',
      iban: 'DE89 3704 0044 0532 0130 00',
      ibanValid: true,
      net: '4.000,00 €',
      tax: '759,90 € (-0,10 € Differenz)',
      gross: '4.759,90 €',
      target: 'QUARANTÄNE-SPEICHER: HGB § 377 RÜGEOBLIEGENHEIT',
      drift: '21.01 ppm DRIFT (EXCEEDS TOLERANCE)',
      sealHash: 'QUARANTINE_NO_HASH_ISSUED_DUE_TO_VARIANCE',
      ast: `{\n  "invoice_id": "DE-2026-X89",\n  "statutory_regime": "UStG_§14_VIOLATION",\n  "math_precision": "ARITHMETIC_VARIANCE_DETECTED",\n  "vat_breakdown": [\n    { "rate": 0.19, "taxable_cents": 400000, "vat_cents": 75990, "delta_cents": -10 }\n  ],\n  "quarantine_reason": "CENT_DRIFT_EXCEEDED_LEGAL_VAT_TIER"\n}`,
      state: 'flawed'
    },
    iban: {
      docId: 'PAYLOAD // DE-2026-X89 // CORRUPT_IBAN',
      verdictText: 'SEPA ISO 7064 BREACH // STOPPED',
      verdictClass: 'flawed',
      dotColor: '#ef4444',
      vendor: 'Apex Cloud Infrastructure GmbH',
      iban: 'DE89 3704 0044 0532 0130 99 (MOD-97 REST 99 != 1)',
      ibanValid: false,
      net: '4.000,00 €',
      tax: '760,00 €',
      gross: '4.760,00 €',
      target: 'ZAHLUNGSSPERRE: KREDITOR_BANKDATEN_UNVALIDIERT',
      drift: '0.00 ppm DRIFT',
      sealHash: 'QUARANTINE_BANK_INTEGRITY_BREACH',
      ast: `{\n  "invoice_id": "DE-2026-X89",\n  "statutory_regime": "SEPA_ISO_7064_BREACH",\n  "sepa_iban": {\n    "raw": "DE89370400440532013099",\n    "iso_7064_mod97_remainder": 99,\n    "valid": false\n  },\n  "quarantine_reason": "REVERSAL_CHARGE_RISK_STOPPED"\n}`,
      state: 'flawed'
    },
    sql: {
      docId: 'PAYLOAD // DE-2026-X89 // ASVS_FIREWALL',
      verdictText: 'OWASP ASVS SQLI NEUTRALIZED',
      verdictClass: 'flawed',
      dotColor: '#a855f7',
      vendor: 'Apex Infrastructure\' OR \'1\'=\'1; DROP TABLE STG;--',
      iban: 'DE89 3704 0044 0532 0130 00',
      ibanValid: true,
      net: '4.000,00 €',
      tax: '760,00 €',
      gross: '4.760,00 €',
      target: 'SICHERHEITS-LOGBUCH: PARAMETERIZED SQL ENFORCED',
      drift: '0.00 ppm DRIFT',
      sealHash: 'FIREWALL_BLOCKED_ATTACK_VECTOR_OWASP',
      ast: `{\n  "security_firewall": "OWASP_ASVS_LEVEL_3",\n  "attack_vector_isolated": "DROP TABLE STG;--",\n  "schema_mutation": "ZERO_MUTATION",\n  "status": "SANITIZED_PARAMETER_BOUND"\n}`,
      state: 'flawed'
    }
  };

  function applyChaosPreset(key) {
    const p = CHAOS_PRESETS[key] || CHAOS_PRESETS.clean;

    const docIdEl = document.getElementById('monolith-doc-id');
    const chipEl = document.getElementById('monolith-verdict-chip');
    const dotEl = document.getElementById('monolith-status-dot');
    const vendorEl = document.getElementById('layer-vendor');
    const ibanEl = document.getElementById('layer-iban');
    const netEl = document.getElementById('layer-net');
    const taxEl = document.getElementById('layer-tax');
    const grossEl = document.getElementById('layer-gross');
    const targetEl = document.getElementById('footer-target-text');
    const driftEl = document.getElementById('footer-drift-badge');
    const sealEl = document.getElementById('crypto-seal-val');
    const astEl = document.getElementById('ast-code-content');

    if (docIdEl) docIdEl.textContent = p.docId;
    if (chipEl) {
      chipEl.textContent = p.verdictText;
      chipEl.className = `verdict-chip font-mono-code ${p.verdictClass}`;
    }
    if (dotEl) {
      dotEl.style.backgroundColor = p.dotColor;
      dotEl.style.boxShadow = `0 0 10px ${p.dotColor}`;
    }
    if (vendorEl) vendorEl.textContent = p.vendor;
    if (ibanEl) {
      ibanEl.textContent = p.iban;
      ibanEl.className = `field-val font-mono-code ${p.ibanValid ? 'text-emerald' : 'text-crimson'}`;
    }
    if (netEl) netEl.textContent = p.net;
    if (taxEl) taxEl.textContent = p.tax;
    if (grossEl) grossEl.textContent = p.gross;
    if (targetEl) targetEl.textContent = p.target;
    if (driftEl) driftEl.textContent = p.drift;
    if (sealEl) sealEl.textContent = p.sealHash;
    if (astEl) astEl.textContent = p.ast;

    // Highlight active pill
    document.querySelectorAll('.chaos-micro-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-chaos') === key);
    });

    if (p.state === 'flawed') {
      sound.playAlert();
      showToast(`Chaos-Simulation aktiv: ${p.verdictText}`, 'fa-solid fa-triangle-exclamation text-crimson');
    } else {
      sound.playChime();
      showToast('Reines Protokoll: Alle 30 Verifikationsstufen sauber');
    }
  }

  function initChaosConsole() {
    document.querySelectorAll('.chaos-micro-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const chaosKey = btn.getAttribute('data-chaos');
        applyChaosPreset(chaosKey);
      });
    });
  }

  // =========================================================================
  // 7. LIVING BENTO INSTRUMENTS
  // =========================================================================
  function initInstruments() {
    // 1. Dual-Needle Float Drift Divergence Gauge
    const slider = document.getElementById('art-trans-slider');
    const qtyText = document.getElementById('art-slider-qty');
    const needleFloat = document.getElementById('needle-float');
    const needleCent = document.getElementById('needle-cent');
    const readoutFloat = document.getElementById('dial-readout-float');
    const readoutCent = document.getElementById('dial-readout-cent');

    if (slider) {
      slider.addEventListener('input', (e) => {
        const qty = parseInt(e.target.value, 10) || 100000;
        if (qtyText) qtyText.textContent = qty.toLocaleString('de-DE');

        // IEEE-754 drift calculation
        const driftAmount = (qty * 0.00000000000004).toFixed(14);
        const floatDeg = Math.min(52, 10 + (qty / 1000000) * 42);

        if (needleFloat) needleFloat.style.transform = `rotate(${floatDeg}deg)`;
        if (needleCent) needleCent.style.transform = 'rotate(0deg)';

        if (readoutFloat) readoutFloat.textContent = `+${driftAmount} €`;
        if (readoutCent) readoutCent.textContent = '0,00 € (0 ppm)';
      });
    }

    // 2. Sequential Routing Patchbay
    const pulseBtn = document.getElementById('btn-fire-pulse');
    const nodeSupplier = document.getElementById('p-node-supplier');
    const pulse1 = document.getElementById('p-pulse-1');
    const nodeEngine = document.getElementById('p-node-engine');
    const pulse2 = document.getElementById('p-pulse-2');
    const nodeSap = document.getElementById('p-node-sap');
    const patchTelemetry = document.getElementById('patch-telemetry');

    if (pulseBtn) {
      pulseBtn.addEventListener('click', () => {
        sound.playClick();
        if (patchTelemetry) patchTelemetry.innerHTML = '<span class="text-blue">01 INGESTION // EDI-STREAM 4.760,00 € EMPFANGEN (0.02ms)</span>';

        nodeSupplier?.classList.add('firing');

        setTimeout(() => {
          nodeSupplier?.classList.remove('firing');
          if (pulse1) {
            pulse1.style.opacity = '1';
            pulse1.style.transition = 'left 0.25s linear';
            pulse1.style.left = '100%';
          }
          sound.playPulse();

          setTimeout(() => {
            if (pulse1) { pulse1.style.opacity = '0'; pulse1.style.left = '0%'; }
            nodeEngine?.classList.add('firing');
            sound.playClick();
            if (patchTelemetry) patchTelemetry.innerHTML = '<span class="text-amber">02 ENGINE // CENT-ARITHMETIK &amp; ISO 7064 GEPRÜFT (0.18ms)</span>';

            setTimeout(() => {
              nodeEngine?.classList.remove('firing');
              if (pulse2) {
                pulse2.style.opacity = '1';
                pulse2.style.transition = 'left 0.25s linear';
                pulse2.style.left = '100%';
              }
              sound.playPulse();

              setTimeout(() => {
                if (pulse2) { pulse2.style.opacity = '0'; pulse2.style.left = '0%'; }
                nodeSap?.classList.add('firing');
                sound.playChime();
                if (patchTelemetry) patchTelemetry.innerHTML = '<span class="text-emerald">03 FREIGABE // SAP S/4HANA (BAPI_INCOMINGINVOICE_CREATE) GEBUCHT (0.38ms)</span>';
                showToast('Beleg erfolgreich an SAP S/4HANA übergeben');

                setTimeout(() => {
                  nodeSap?.classList.remove('firing');
                }, 1000);
              }, 250);
            }, 300);
          }, 250);
        }, 150);
      });
    }

    // 3. SEPA IBAN Modulo-97 Machine
    const sepaInput = document.getElementById('sepa-input');
    const corruptBtn = document.getElementById('btn-sepa-corrupt');
    const validBtn = document.getElementById('btn-sepa-valid');
    const formulaText = document.getElementById('sepa-formula-text');
    const statusPill = document.getElementById('sepa-status-pill');

    function calculateIbanMod97(raw) {
      const clean = (raw || '').replace(/[^A-Z0-9]/gi, '').toUpperCase();
      if (clean.length < 15) return { isValid: false, remainder: -1, clean };
      const rearranged = clean.slice(4) + clean.slice(0, 4);
      let numeric = '';
      for (let i = 0; i < rearranged.length; i++) {
        const code = rearranged.charCodeAt(i);
        if (code >= 65 && code <= 90) {
          numeric += (code - 55).toString();
        } else {
          numeric += rearranged[i];
        }
      }
      try {
        const rem = Number(BigInt(numeric) % 97n);
        return { isValid: rem === 1, remainder: rem, clean };
      } catch (e) {
        return { isValid: false, remainder: -1, clean };
      }
    }

    function updateSepaUI() {
      if (!sepaInput) return;
      const res = calculateIbanMod97(sepaInput.value);
      if (res.isValid) {
        if (statusPill) {
          statusPill.className = 'math-status-pill pass';
          statusPill.textContent = 'VALID';
        }
        if (formulaText) {
          formulaText.textContent = `98 - (${res.clean.slice(0, 10)}... % 97) = 1 (PASS)`;
        }
      } else {
        if (statusPill) {
          statusPill.className = 'math-status-pill fail';
          statusPill.textContent = 'CORRUPTED';
        }
        if (formulaText) {
          formulaText.textContent = `REST = ${res.remainder} != 1 (SYNTAX-BREACH)`;
        }
      }
    }

    if (sepaInput) {
      sepaInput.addEventListener('input', () => {
        updateSepaUI();
        sound.playClick();
      });
    }

    if (corruptBtn) {
      corruptBtn.addEventListener('click', () => {
        if (!sepaInput) return;
        sepaInput.value = 'DE89 3704 0044 0532 0130 99';
        updateSepaUI();
        sound.playAlert();
        showToast('IBAN Prüfziffer absichtlich manipuliert', 'fa-solid fa-bug text-crimson');
      });
    }

    if (validBtn) {
      validBtn.addEventListener('click', () => {
        if (!sepaInput) return;
        sepaInput.value = 'DE89 3704 0044 0532 0130 00';
        updateSepaUI();
        sound.playChime();
        showToast('Gültige SEPA IBAN geladen');
      });
    }

    // 4. Native Web Crypto SHA-256 Ledger
    const sealBtn = document.getElementById('btn-seal-now');
    const ledgerChain = document.getElementById('ledger-chain');
    const latestIdx = document.getElementById('ledger-latest-idx');
    const latestHash = document.getElementById('ledger-latest-hash');
    let blockCount = 30;

    if (sealBtn) {
      sealBtn.addEventListener('click', async () => {
        blockCount += 1;
        const payload = `BLOCK_${blockCount}_${Date.now()}_HAULITZ_VERIFIED`;
        try {
          const enc = new TextEncoder();
          const buf = await crypto.subtle.digest('SHA-256', enc.encode(payload));
          const arr = Array.from(new Uint8Array(buf));
          const hashHex = arr.map(b => b.toString(16).padStart(2, '0')).join('');

          if (latestIdx) latestIdx.textContent = `#${blockCount}`;
          if (latestHash) latestHash.textContent = hashHex.slice(0, 40) + '...';

          if (ledgerChain) {
            const newItem = document.createElement('div');
            newItem.className = 'ledger-item latest';
            newItem.innerHTML = `<span class="l-idx">#${blockCount}</span><span class="l-hash">${hashHex.slice(0, 40)}...</span>`;
            ledgerChain.appendChild(newItem);

            // Keep max 3 items
            while (ledgerChain.children.length > 3) {
              ledgerChain.removeChild(ledgerChain.children[0]);
            }
          }

          sound.playSeal();
          showToast(`Block #${blockCount} kryptografisch mit SHA-256 versiegelt!`, 'fa-solid fa-fingerprint text-purple');
        } catch (err) {
          console.error(err);
        }
      });
    }
  }

  // =========================================================================
  // 8. HIGH-THROUGHPUT STRESS TEST BENCHMARK (5,000 TPS Gauge)
  // =========================================================================
  function initBenchmarkEngine() {
    const trigger = document.getElementById('btn-bench-trigger');
    const procEl = document.getElementById('bm-processed');
    const driftEl = document.getElementById('bm-drift');
    const latencyEl = document.getElementById('bm-latency');
    const blocksEl = document.getElementById('bm-blocks');
    const canvas = document.getElementById('bench-oscilloscope');

    if (!trigger || !canvas) return;

    const ctx = canvas.getContext('2d');
    let isRunning = false;
    let processed = 0;
    let blocks = 0;
    let waveOffset = 0;

    function renderOscilloscope() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = isRunning ? 2.5 : 1.5;
      ctx.strokeStyle = isRunning ? '#10b981' : '#334155';
      ctx.beginPath();

      const slices = 60;
      const sliceWidth = canvas.width / slices;
      let x = 0;

      for (let i = 0; i <= slices; i++) {
        const amplitude = isRunning ? 26 : 5;
        const y = (canvas.height / 2) + Math.sin(i * 0.35 + waveOffset) * amplitude * Math.sin(i * 0.12);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.stroke();
      waveOffset += isRunning ? 0.35 : 0.04;
      requestAnimationFrame(renderOscilloscope);
    }

    renderOscilloscope();

    let benchmarkTimer = null;

    function startBenchmark() {
      if (isRunning) return;
      isRunning = true;
      trigger.classList.add('active');
      sound.playClick();

      benchmarkTimer = setInterval(() => {
        if (!isRunning) return;
        processed += 100; // 5000 TPS rate
        blocks += 4;
        if (procEl) procEl.textContent = processed.toLocaleString('de-DE');
        if (blocksEl) blocksEl.textContent = blocks.toLocaleString('de-DE');
        if (latencyEl) latencyEl.textContent = (0.16 + Math.random() * 0.04).toFixed(2) + ' ms';
        if (driftEl) driftEl.textContent = '0,00 € (0 ppm)';
      }, 20);
    }

    function stopBenchmark() {
      if (!isRunning) return;
      isRunning = false;
      clearInterval(benchmarkTimer);
      trigger.classList.remove('active');
      sound.playChime();
    }

    trigger.addEventListener('mousedown', startBenchmark);
    trigger.addEventListener('mouseup', stopBenchmark);
    trigger.addEventListener('mouseleave', stopBenchmark);

    trigger.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startBenchmark();
    });
    trigger.addEventListener('touchend', (e) => {
      e.preventDefault();
      stopBenchmark();
    });
  }

  // =========================================================================
  // 9. HUD COMMAND PALETTE (CMD + K)
  // =========================================================================
  function initCommandPalette() {
    const backdrop = document.getElementById('cmdk-backdrop');
    const input = document.getElementById('cmdk-input');
    const triggerBtn = document.getElementById('dock-cmdk-btn');
    const menu = document.getElementById('cmdk-menu');

    if (!backdrop || !input) return;

    function openCmdk() {
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
      input.value = '';
      input.focus();
      filterMenu('');
      sound.playClick();
    }

    function closeCmdk() {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
    }

    if (triggerBtn) {
      triggerBtn.addEventListener('click', openCmdk);
    }

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (backdrop.classList.contains('open')) {
          closeCmdk();
        } else {
          openCmdk();
        }
      } else if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        closeCmdk();
      }
    });

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeCmdk();
    });

    function filterMenu(query) {
      const q = (query || '').toLowerCase().trim();
      const items = menu ? menu.querySelectorAll('.cmdk-item') : [];
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = (!q || text.includes(q)) ? 'flex' : 'none';
      });
    }

    input.addEventListener('input', (e) => filterMenu(e.target.value));

    if (menu) {
      menu.addEventListener('click', (e) => {
        const item = e.target.closest('.cmdk-item');
        if (!item) return;
        const action = item.getAttribute('data-action');
        executeAction(action);
        closeCmdk();
      });
    }

    function executeAction(act) {
      switch (act) {
        case 'chaos-math':
          applyChaosPreset('math');
          document.getElementById('scrollytelling-track')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'chaos-iban':
          applyChaosPreset('iban');
          document.getElementById('scrollytelling-track')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'chaos-sql':
          applyChaosPreset('sql');
          document.getElementById('scrollytelling-track')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'chaos-clean':
          applyChaosPreset('clean');
          document.getElementById('scrollytelling-track')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'jump-stage':
          document.getElementById('scrollytelling-track')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'jump-instruments':
          document.getElementById('instruments')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'copy-email':
          navigator.clipboard.writeText('allensimeonfletcher@gmail.com');
          showToast('allensimeonfletcher@gmail.com kopiert!');
          sound.playChime();
          break;
        case 'toggle-audio':
          sound.toggle();
          break;
      }
    }
  }

  // =========================================================================
  // 10. COPY BUTTONS & SPECULAR LIGHTING
  // =========================================================================
  function initCopyButtonsAndSpecular() {
    const qsBtn = document.getElementById('btn-qs-copy');
    if (qsBtn) {
      qsBtn.addEventListener('click', () => {
        const cmd = 'git clone https://github.com/AllenFletcherAI/Haulitz && npm test';
        navigator.clipboard.writeText(cmd).then(() => {
          showToast('Befehl kopiert: git clone ... && npm test');
          sound.playChime();
        });
      });
    }

    const emailBtn = document.getElementById('btn-colophon-email');
    if (emailBtn) {
      emailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('allensimeonfletcher@gmail.com').then(() => {
          showToast('allensimeonfletcher@gmail.com kopiert!');
          sound.playChime();
        });
      });
    }

    const audioToggle = document.getElementById('dock-audio-btn');
    if (audioToggle) {
      audioToggle.addEventListener('click', () => {
        sound.toggle();
      });
    }

    // Specular light sheen tracking
    const monolith = document.getElementById('glass-monolith');
    if (monolith) {
      monolith.addEventListener('mousemove', (e) => {
        const rect = monolith.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        monolith.style.setProperty('--mouse-x', `${x}%`);
        monolith.style.setProperty('--mouse-y', `${y}%`);
      });
    }
  }

  // =========================================================================
  // 11. KINETIC CURSOR (NEXUSMAG & ALIEN DESIGN STANDARD)
  // =========================================================================
  function initKineticCursor() {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const label = document.getElementById('cursor-label');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function lerpCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(lerpCursor);
    }
    requestAnimationFrame(lerpCursor);

    // Interactive button hover states
    document.querySelectorAll('button, a, input, .chaos-micro-pill').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
    });

    // Audit Inspection state
    document.querySelectorAll('.font-mono-code, .layer-table td, .crypto-seal-row, .field-val').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('cursor-audit');
        if (label) label.textContent = '[+] AUDIT';
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('cursor-audit');
      });
    });
  }

  // =========================================================================
  // 12. AMBIENT PARTICLES CANVAS (Three-dimensional Spatial Backdrop)
  // =========================================================================
  function initAmbientParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.getElementById('ambient-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(45, Math.floor((width * height) / 25000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(renderParticles);
    }
    requestAnimationFrame(renderParticles);
  }

  // =========================================================================
  // 13. LENIS INERTIAL SCROLL INITIALIZATION
  // =========================================================================
  function initLenisScroll() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof window.Lenis !== 'undefined') {
      const lenis = new window.Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // =========================================================================
  // DOM READY BOOTSTRAP
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollytelling();
    initDraggableLoupe();
    initChaosConsole();
    initInstruments();
    initBenchmarkEngine();
    initCommandPalette();
    initCopyButtonsAndSpecular();
    initKineticCursor();
    initAmbientParticles();
    initLenisScroll();
  });

})();
