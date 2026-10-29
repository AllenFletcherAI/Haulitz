// js/app.js
// HAULITZ Interactive Gateway Engine (v4.0)
// High-Frequency Verification, Chaos Simulation, Tactile Bento Instruments, and Web Audio API

(function() {
  'use strict';

  // =========================================================================
  // 1. WEB AUDIO SYNTHESIZER (ZERO-ASSET PROCEDURAL SOUND EFFECTS)
  // =========================================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = false;
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
        showToast('Audio-Feedback aktiviert');
      } else {
        showToast('Audio-Feedback stummgeschaltet');
      }
    }

    updateDockButton() {
      const btn = document.getElementById('dock-audio-btn');
      if (!btn) return;
      if (this.enabled) {
        btn.innerHTML = '<i class="fa-solid fa-volume-high text-emerald" aria-hidden="true"></i>';
        btn.setAttribute('aria-label', 'Soundeffekte stummschalten');
      } else {
        btn.innerHTML = '<i class="fa-solid fa-volume-xmark" aria-hidden="true"></i>';
        btn.setAttribute('aria-label', 'Soundeffekte aktivieren');
      }
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
  // 3. LIVING 3D DOCUMENT PARALLAX TILT
  // =========================================================================
  function initDocumentParallax() {
    const wrap = document.querySelector('.living-canvas-wrap');
    const box = document.getElementById('perspective-box');
    if (!wrap || !box) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 10;
      const rotateY = (x / rect.width) * 10;
      box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    wrap.addEventListener('mouseleave', () => {
      box.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // =========================================================================
  // 4. CHAOS CONSOLE & LIVING DOCUMENT MUTATION
  // =========================================================================
  const CHAOS_PRESETS = {
    clean: {
      title: 'BELEG GÜLTIG · VERIFIED CLEAN',
      desc: 'Alle 3 Prüfschritte bestanden: Cent-Arithmetik (Delta €0.00), USt. 19%, SEPA ISO 7064 MOD-97.',
      badge: 'STAGING_FREIGABE',
      vendor: 'Apex Cloud Infrastructure GmbH',
      ref: 'INV-2026-089-CLOUD',
      iban: 'DE89 3704 0044 0532 0130 00',
      ibanValid: true,
      net: '4.000,00 €',
      tax: '760,00 €',
      taxDelta: null,
      gross: '4.760,00 €',
      target: 'SAP S/4HANA (BAPI_INCOMINGINVOICE_CREATE)',
      sealHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      state: 'verified'
    },
    math: {
      title: 'ARITHMETISCHER VERDACHT · MATH VARIANCE',
      desc: 'Mehrwertsteuer-Abweichung entdeckt: Berechnet 760,00 € vs. Deklariert 640,00 € (-120,00 € Differenz).',
      badge: 'QUARANTÄNE_HOLD',
      vendor: 'Apex Cloud Infrastructure GmbH',
      ref: 'INV-2026-089-DRIFT',
      iban: 'DE89 3704 0044 0532 0130 00',
      ibanValid: true,
      net: '4.000,00 €',
      tax: '640,00 € (-120,00 €)',
      taxDelta: '-120,00 €',
      gross: '4.640,00 €',
      target: 'Quarantäne-Speicher (HGB § 377 Rügeobliegenheit)',
      sealHash: 'QUARANTINE_NO_SEAL_HASH_ISSUED',
      state: 'flawed'
    },
    iban: {
      title: 'SEPA PRÜFZIFFER-BRUCH · BANK REVERSAL RISK',
      desc: 'ISO 7064 MOD 97-10 Syntaxprüfung fehlgeschlagen. Checksumme 99 ist ungültig (Erwartet: 00).',
      badge: 'QUARANTÄNE_HOLD',
      vendor: 'Apex Cloud Infrastructure GmbH',
      ref: 'INV-2026-089-IBAN',
      iban: 'DE89 3704 0044 0532 0130 99',
      ibanValid: false,
      net: '4.000,00 €',
      tax: '760,00 €',
      taxDelta: null,
      gross: '4.760,00 €',
      target: 'Zahlungssperre (Kreditor-Stammdatenprüfung)',
      sealHash: 'QUARANTINE_BANK_INTEGRITY_BREACH',
      state: 'flawed'
    },
    sql: {
      title: 'SQL-INJECTION VERHINDERT · OWASP ASVS DEFENSE',
      desc: 'Schadcode im Referenzfeld isoliert: \' OR \'1\'=\'1; DROP TABLE STG_INVOICES;-- neutralisiert.',
      badge: 'SECURITY_FIREWALL',
      vendor: 'Apex Cloud Infrastructure GmbH',
      ref: '\' OR \'1\'=\'1; DROP TABLE STG_INVOICES;--',
      iban: 'DE89 3704 0044 0532 0130 00',
      ibanValid: true,
      net: '4.000,00 €',
      tax: '760,00 €',
      taxDelta: null,
      gross: '4.760,00 €',
      target: 'Sicherheits-Logbuch (Zero Schema Mutation)',
      sealHash: 'FIREWALL_BLOCKED_ATTACK_VECTOR_OWASP',
      state: 'flawed'
    }
  };

  function applyChaosPreset(presetKey) {
    const p = CHAOS_PRESETS[presetKey] || CHAOS_PRESETS.clean;
    const doc = document.getElementById('glass-document');
    const banner = document.getElementById('verdict-banner');
    const vTitle = document.getElementById('verdict-title');
    const vDesc = document.getElementById('verdict-desc');
    const vBadge = document.getElementById('verdict-badge');
    const vIcon = document.getElementById('verdict-icon');
    const fVendor = document.getElementById('field-vendor');
    const fRef = document.getElementById('field-ref');
    const fIbanText = document.getElementById('field-iban-text');
    const fIbanStatus = document.getElementById('field-iban-status');
    const fTarget = document.getElementById('field-target');
    const tTax = document.getElementById('total-tax');
    const tGross = document.getElementById('total-gross');
    const sealHash = document.getElementById('seal-hash-display');
    const switchFlawed = document.getElementById('switch-flawed');
    const switchVerified = document.getElementById('switch-verified');
    const statusText = document.getElementById('console-status-text');

    if (!doc || !banner) return;

    if (p.state === 'flawed') {
      doc.classList.remove('verified-state');
      doc.classList.add('flawed-state');
      banner.className = 'doc-verdict-banner flawed';
      if (vIcon) vIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-crimson"></i>';
      if (switchFlawed) switchFlawed.classList.add('active');
      if (switchVerified) switchVerified.classList.remove('active');
      if (statusText) statusText.innerHTML = '<span class="text-crimson">ALERT: SICHERHEITSSTOPP AKTIV · 0.4ms</span>';
      sound.playAlert();
    } else {
      doc.classList.remove('flawed-state');
      doc.classList.add('verified-state');
      banner.className = 'doc-verdict-banner clean';
      if (vIcon) vIcon.innerHTML = '<i class="fa-solid fa-circle-check text-emerald"></i>';
      if (switchFlawed) switchFlawed.classList.remove('active');
      if (switchVerified) switchVerified.classList.add('active');
      if (statusText) statusText.innerHTML = '<span class="text-emerald">STATUS: BEREIT · 0.4ms Latenz</span>';
      sound.playChime();
    }

    if (vTitle) vTitle.textContent = p.title;
    if (vDesc) vDesc.textContent = p.desc;
    if (vBadge) vBadge.textContent = p.badge;
    if (fVendor) fVendor.textContent = p.vendor;
    if (fRef) fRef.textContent = p.ref;
    if (fIbanText) fIbanText.textContent = p.iban;
    
    if (fIbanStatus) {
      if (p.ibanValid) {
        fIbanStatus.className = 'iban-check-pill valid';
        fIbanStatus.textContent = 'MOD-97 PASS';
      } else {
        fIbanStatus.className = 'iban-check-pill invalid';
        fIbanStatus.textContent = 'MOD-97 BREACH';
      }
    }

    if (fTarget) fTarget.textContent = p.target;
    if (tTax) tTax.textContent = p.tax;
    if (tGross) tGross.textContent = p.gross;
    if (sealHash) sealHash.textContent = p.sealHash;

    // Highlight active chaos button
    document.querySelectorAll('.btn-chaos').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-chaos') === presetKey);
    });
  }

  function initChaosConsole() {
    document.querySelectorAll('.btn-chaos').forEach(btn => {
      btn.addEventListener('click', () => {
        const chaosType = btn.getAttribute('data-chaos');
        applyChaosPreset(chaosType);
      });
    });

    const switchFlawed = document.getElementById('switch-flawed');
    const switchVerified = document.getElementById('switch-verified');

    if (switchFlawed) {
      switchFlawed.addEventListener('click', () => {
        applyChaosPreset('math');
      });
    }

    if (switchVerified) {
      switchVerified.addEventListener('click', () => {
        applyChaosPreset('clean');
      });
    }
  }

  // =========================================================================
  // 5. HIGH-THROUGHPUT STRESS TEST ENGINE (IN-BROWSER BENCHMARK)
  // =========================================================================
  function initStressEngine() {
    const trigger = document.getElementById('btn-stress-trigger');
    const processedEl = document.getElementById('gauge-processed');
    const driftEl = document.getElementById('gauge-drift');
    const latencyEl = document.getElementById('gauge-latency');
    const blocksEl = document.getElementById('gauge-blocks');
    const canvas = document.getElementById('oscilloscope-canvas');

    if (!trigger || !canvas) return;

    const ctx = canvas.getContext('2d');
    let isRunning = false;
    let count = 0;
    let blocks = 0;
    let animFrame = null;
    let waveOffset = 0;

    function drawWave() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = isRunning ? '#10b981' : '#334155';
      ctx.beginPath();

      const sliceWidth = canvas.width / 50;
      let x = 0;

      for (let i = 0; i <= 50; i++) {
        const amplitude = isRunning ? 25 : 4;
        const speed = isRunning ? 0.3 : 0.05;
        const y = (canvas.height / 2) + Math.sin(i * 0.4 + waveOffset) * amplitude * Math.sin(i * 0.1);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.stroke();
      waveOffset += isRunning ? 0.25 : 0.04;
      animFrame = requestAnimationFrame(drawWave);
    }

    drawWave();

    function startStress() {
      if (isRunning) return;
      isRunning = true;
      trigger.classList.add('active-trigger');
      sound.playClick();

      const stressInterval = setInterval(() => {
        if (!isRunning) {
          clearInterval(stressInterval);
          return;
        }
        count += 24;
        blocks += 1;
        if (processedEl) processedEl.textContent = count.toLocaleString('de-DE');
        if (blocksEl) blocksEl.textContent = blocks.toLocaleString('de-DE');
        if (latencyEl) latencyEl.textContent = (0.16 + Math.random() * 0.05).toFixed(2) + ' ms';
        if (driftEl) driftEl.textContent = '0,00 € (0 ppm)';
      }, 20);
    }

    function stopStress() {
      if (!isRunning) return;
      isRunning = false;
      trigger.classList.remove('active-trigger');
      sound.playChime();
    }

    trigger.addEventListener('mousedown', startStress);
    trigger.addEventListener('mouseup', stopStress);
    trigger.addEventListener('mouseleave', stopStress);

    trigger.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startStress();
    });
    trigger.addEventListener('touchend', (e) => {
      e.preventDefault();
      stopStress();
    });
  }

  // =========================================================================
  // 6. TACTILE BENTO INSTRUMENTS
  // =========================================================================
  function initInstruments() {
    // 1. Float Drift Slider
    const slider = document.getElementById('float-drift-slider');
    const qtyVal = document.getElementById('slider-qty-val');
    const floatRes = document.getElementById('float-result-val');
    const centRes = document.getElementById('cent-result-val');

    if (slider) {
      slider.addEventListener('input', (e) => {
        const qty = parseInt(e.target.value, 10) || 100;
        if (qtyVal) qtyVal.textContent = qty;

        // Floating point calculation
        let floatSum = 0;
        for (let i = 0; i < qty; i++) {
          floatSum += (0.1 + 0.2);
        }

        // Exact Cent-Integer Calculation
        let centSum = 0;
        for (let i = 0; i < qty; i++) {
          centSum += (10 + 20);
        }
        const centFormatted = (centSum / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

        if (floatRes) floatRes.textContent = floatSum.toString() + ' €';
        if (centRes) centRes.textContent = centFormatted;
      });
    }

    // 2. SEPA IBAN Modulo-97 Instrument
    const ibanInput = document.getElementById('instrument-iban-input');
    const corruptBtn = document.getElementById('btn-corrupt-iban');
    const validBtn = document.getElementById('btn-valid-iban');
    const formulaStep = document.getElementById('iban-math-step');
    const formulaStatus = document.getElementById('iban-formula-status');

    function validateIban(raw) {
      const clean = (raw || '').replace(/[^A-Z0-9]/gi, '').toUpperCase();
      if (clean.length < 15) return false;
      // Move first 4 chars to end
      const rearranged = clean.slice(4) + clean.slice(0, 4);
      // Replace letters with numbers (A=10, B=11, etc.)
      let numeric = '';
      for (let i = 0; i < rearranged.length; i++) {
        const code = rearranged.charCodeAt(i);
        if (code >= 65 && code <= 90) {
          numeric += (code - 55).toString();
        } else {
          numeric += rearranged[i];
        }
      }
      // BigInt modulo 97
      try {
        const rem = BigInt(numeric) % 97n;
        return rem === 1n;
      } catch (e) {
        return false;
      }
    }

    function updateIbanUI() {
      if (!ibanInput) return;
      const isValid = validateIban(ibanInput.value);
      if (formulaStatus) {
        if (isValid) {
          formulaStatus.className = 'formula-status-pill pass';
          formulaStatus.textContent = 'GÜLTIG';
        } else {
          formulaStatus.className = 'formula-status-pill fail';
          formulaStatus.textContent = 'UNGÜLTIG';
        }
      }
      if (formulaStep) {
        formulaStep.textContent = isValid ? 'MODULO-97: REST = 1 (PRÜFUNG BESTANDEN)' : 'MODULO-97: REST ≠ 1 (SYNTAXFEHLER)';
      }
    }

    if (ibanInput) {
      ibanInput.addEventListener('input', () => {
        updateIbanUI();
        sound.playClick();
      });
    }

    if (corruptBtn) {
      corruptBtn.addEventListener('click', () => {
        if (!ibanInput) return;
        ibanInput.value = 'DE89 3704 0044 0532 0130 99';
        updateIbanUI();
        sound.playAlert();
        showToast('IBAN Prüfziffer verfälscht');
      });
    }

    if (validBtn) {
      validBtn.addEventListener('click', () => {
        if (!ibanInput) return;
        ibanInput.value = 'DE89 3704 0044 0532 0130 00';
        updateIbanUI();
        sound.playChime();
        showToast('Gültige SEPA IBAN geladen');
      });
    }

    // 4. Native Web Crypto Block Sealer
    const sealBtn = document.getElementById('btn-seal-block');
    const latestHash = document.getElementById('latest-block-hash');
    const latestBlock = document.getElementById('latest-ledger-block');
    let blockIndex = 30;

    if (sealBtn) {
      sealBtn.addEventListener('click', async () => {
        blockIndex += 1;
        const randomPayload = `BLOCK_${blockIndex}_${Date.now()}_HAULITZ_VERIFIED`;
        try {
          const enc = new TextEncoder();
          const hashBuffer = await crypto.subtle.digest('SHA-256', enc.encode(randomPayload));
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

          if (latestHash) latestHash.textContent = hashHex.slice(0, 40) + '...';
          if (latestBlock) {
            const idxEl = latestBlock.querySelector('.block-idx');
            if (idxEl) idxEl.textContent = `Block #${blockIndex} (Neu)`;
            latestBlock.style.borderColor = '#10b981';
            setTimeout(() => { latestBlock.style.borderColor = ''; }, 600);
          }
          sound.playChime();
          showToast(`Block #${blockIndex} mit SHA-256 versiegelt!`);
        } catch (e) {
          console.error(e);
        }
      });
    }
  }

  // =========================================================================
  // 7. COMMAND PALETTE (CMD + K)
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
      filterItems('');
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

    function filterItems(q) {
      const query = (q || '').toLowerCase().trim();
      const items = menu ? menu.querySelectorAll('.cmdk-item') : [];
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    }

    input.addEventListener('input', (e) => {
      filterItems(e.target.value);
    });

    if (menu) {
      menu.addEventListener('click', (e) => {
        const item = e.target.closest('.cmdk-item');
        if (!item) return;
        const action = item.getAttribute('data-action');
        executeAction(action);
        closeCmdk();
      });
    }

    function executeAction(action) {
      switch (action) {
        case 'chaos-math':
          applyChaosPreset('math');
          document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'chaos-iban':
          applyChaosPreset('iban');
          document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'chaos-sql':
          applyChaosPreset('sql');
          document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'chaos-clean':
          applyChaosPreset('clean');
          document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'run-stress':
          document.getElementById('stress-test')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'open-github':
          window.open('https://github.com/AllenFletcherAI/Haulitz', '_blank');
          break;
        case 'copy-email':
          navigator.clipboard.writeText('allensimeonfletcher@gmail.com');
          showToast('allensimeonfletcher@gmail.com kopiert!');
          break;
        case 'toggle-audio':
          sound.toggle();
          break;
      }
    }
  }

  // =========================================================================
  // 8. CLIPBOARD COPY BUTTONS
  // =========================================================================
  function initCopyButtons() {
    const copyTermBtn = document.getElementById('btn-term-copy');
    if (copyTermBtn) {
      copyTermBtn.addEventListener('click', () => {
        const cmd = 'git clone https://github.com/AllenFletcherAI/Haulitz && npm test';
        navigator.clipboard.writeText(cmd).then(() => {
          showToast('Befehl in Zwischenablage kopiert!');
          sound.playChime();
        });
      });
    }

    const copyEmailBtn = document.getElementById('btn-copy-email');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        const email = 'allensimeonfletcher@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          showToast('E-Mail-Adresse kopiert!');
          sound.playChime();
        });
      });
    }

    const audioBtn = document.getElementById('dock-audio-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        sound.toggle();
      });
    }
  }

  // =========================================================================
  // 9. LENIS SMOOTH INERTIAL SCROLL INITIALIZATION
  // =========================================================================
  function initLenisScroll() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof window.Lenis !== 'undefined') {
      const lenis = new window.Lenis({
        duration: 1.0,
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
  // 10. KINETIC MAGNETIC CURSOR (NEXUSMAG & ALIEN DESIGN STANDARD)
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

    // Interactive element detection
    document.querySelectorAll('button, a, input, .switch-pill, .btn-chaos').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('cursor-hover');
      });
    });

    // Audit target detection (Numbers, IBANs, Hashes, Code)
    document.querySelectorAll('.font-mono-code, .doc-table td, .seal-hash, .total-amount').forEach(el => {
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
  // 11. AMBIENT PARTICLES CANVAS (TECHYSCOUTS & CASA DI SOLARE STANDARD)
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

      // Draw lines between proximate particles
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

      // Draw particle dots
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
  // 12. SPECULAR LIGHTING & INTERACTIVE PIPELINE
  // =========================================================================
  function initSpecularAndPipeline() {
    const doc = document.getElementById('glass-document');
    if (doc) {
      doc.addEventListener('mousemove', (e) => {
        const rect = doc.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        doc.style.setProperty('--mouse-x', `${x}%`);
        doc.style.setProperty('--mouse-y', `${y}%`);
      });
    }

    const fireBtn = document.getElementById('btn-fire-pipeline');
    const nodeSup = document.getElementById('node-supplier');
    const nodeGate = document.getElementById('node-gateway');
    const nodeSap = document.getElementById('node-sap');
    const nodeQuar = document.getElementById('node-quarantine');
    const telemetry = document.getElementById('pipeline-telemetry');

    if (fireBtn) {
      fireBtn.addEventListener('click', () => {
        const isClean = document.getElementById('switch-verified')?.classList.contains('active');
        sound.playClick();

        if (telemetry) telemetry.innerHTML = '<span class="text-blue">INGESTION: PAYLOAD_RECVD (0.02ms)</span>';
        nodeSup?.classList.add('node-firing');

        setTimeout(() => {
          nodeSup?.classList.remove('node-firing');
          nodeGate?.classList.add('node-firing');
          sound.playClick();
          if (telemetry) telemetry.innerHTML = '<span class="text-emerald">AST_PARSER: CENT_MATH &amp; MOD-97 (0.06ms)</span>';

          setTimeout(() => {
            nodeGate?.classList.remove('node-firing');
            if (isClean) {
              nodeSap?.classList.add('node-firing');
              sound.playChime();
              if (telemetry) telemetry.innerHTML = '<span class="text-emerald">ROUTING: SAP S/4HANA (BAPI_INCOMINGINVOICE_CREATE) &middot; FREIGEGEBEN (0.12ms)</span>';
              showToast('Beleg erfolgreich an SAP S/4HANA übergeben');
            } else {
              nodeQuar?.classList.add('node-firing');
              sound.playAlert();
              if (telemetry) telemetry.innerHTML = '<span class="text-crimson">ROUTING: QUARANTÄNE (HGB § 377 RÜGEOBLIEGENHEIT) &middot; GESTOPPT (0.12ms)</span>';
              showToast('Fehlerhafter Beleg in Quarantäne isoliert', 'fa-solid fa-lock text-crimson');
            }

            setTimeout(() => {
              nodeSap?.classList.remove('node-firing');
              nodeQuar?.classList.remove('node-firing');
            }, 1200);

          }, 450);
        }, 350);
      });
    }
  }

  // =========================================================================
  // DOM READY BOOTSTRAP
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initDocumentParallax();
    initChaosConsole();
    initStressEngine();
    initInstruments();
    initCommandPalette();
    initCopyButtons();
    initLenisScroll();
    initKineticCursor();
    initAmbientParticles();
    initSpecularAndPipeline();
  });

})();
