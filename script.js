/**
 * PRINCESS DAY SURPRISE - COMPLETE JAVASCRIPT
 * Features:
 * - Touch & Click Ambient Heart/Sparkle Particles (Mobile Optimized)
 * - Starlight Dark Mode / Daylight Princess Theme Controller
 * - Music Auto-Start on "Click to enter ♡" with Fallback Romantic Synthesizer
 * - Phone-Friendly Scrapbook Lightbox & Fallback SVG Cards
 * - Interactive Love Reasons Cycler & Climax Unlock
 * - 3D Vintage Envelope Unfolding & Letter Presentation
 * - Seamless Experience Restart
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. THEME CONTROLLER (STARLIGHT DARK MODE / DAYLIGHT PRINCESS)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeLabel = document.getElementById('theme-label');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('princess-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    if (themeLabel) themeLabel.textContent = 'Daylight';
  } else {
    document.body.classList.remove('dark-mode');
    if (themeLabel) themeLabel.textContent = 'Night Mode';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('princess-theme', isDark ? 'dark' : 'light');
      if (themeLabel) {
        themeLabel.textContent = isDark ? 'Daylight' : 'Night Mode';
      }
      // Gentle burst from the button
      const rect = themeToggleBtn.getBoundingClientRect();
      triggerHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
    });
  }


  /* ==========================================================================
     2. AMBIENT PARTICLES CANVAS (TOUCH & CLICK HEART BURSTS)
     ========================================================================== */
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let particles = [];
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
  let dpr = window.devicePixelRatio || 1;

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    dpr = window.devicePixelRatio || 1;
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Particle Class (Hearts & Fairy Sparkles)
  class Particle {
    constructor(x, y, isBurst = false) {
      this.x = x !== undefined ? x : Math.random() * canvasWidth;
      this.y = y !== undefined ? y : canvasHeight + Math.random() * 50;
      this.size = Math.random() * (isBurst ? 14 : 10) + (isBurst ? 8 : 6);
      this.speedY = isBurst ? -(Math.random() * 3.5 + 2) : -(Math.random() * 0.8 + 0.4);
      this.speedX = (Math.random() - 0.5) * (isBurst ? 3.5 : 0.8);
      this.opacity = isBurst ? 0.98 : Math.random() * 0.4 + 0.2;
      this.fade = isBurst ? 0.018 : 0.003;
      this.type = Math.random() > 0.35 ? 'heart' : 'sparkle';
      
      const isDark = document.body.classList.contains('dark-mode');
      const lightColors = ['#f8b4c4', '#e2889e', '#fce4ec', '#d4af37', '#f4c2cc'];
      const darkColors = ['#ff7597', '#ffb3c6', '#ffd166', '#f48498', '#ff9ebe'];
      const colors = isDark ? darkColors : lightColors;
      
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.04;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.opacity -= this.fade;
      this.rotation += this.rotationSpeed;
    }

    draw() {
      if (!ctx || this.opacity <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;

      if (this.type === 'heart') {
        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(0, s / 4);
        ctx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, s / 3);
        ctx.bezierCurveTo(-s / 2, (2 * s) / 3, 0, s, 0, s * 1.25);
        ctx.bezierCurveTo(0, s, s / 2, (2 * s) / 3, s / 2, s / 3);
        ctx.bezierCurveTo(s / 2, 0, 0, 0, 0, s / 4);
        ctx.fill();
      } else {
        // Sparkle / 4-point star
        const s = this.size * 0.7;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(0, 0, s, 0);
        ctx.quadraticCurveTo(0, 0, 0, s);
        ctx.quadraticCurveTo(0, 0, -s, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(26, Math.floor(window.innerWidth / 35));
    for (let i = 0; i < count; i++) {
      const p = new Particle();
      p.y = Math.random() * canvasHeight;
      particles.push(p);
    }
  }
  initParticles();

  // Burst hearts on click or touch
  function triggerHeartBurst(clientX, clientY, count = 8) {
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(clientX, clientY, true));
    }
  }

  // Click & Pointer Event
  window.addEventListener('click', (e) => {
    triggerHeartBurst(e.clientX, e.clientY, 6);
  });

  // Touch Screen Support: Touches pop up hearts!
  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        triggerHeartBurst(t.clientX, t.clientY, 7);
      }
    }
  }, { passive: true });

  // Touch Drag Trail (Throttled for performance)
  let lastTouchTime = 0;
  window.addEventListener('touchmove', (e) => {
    const now = Date.now();
    if (now - lastTouchTime > 80 && e.touches && e.touches.length > 0) {
      lastTouchTime = now;
      const t = e.touches[0];
      triggerHeartBurst(t.clientX, t.clientY, 2);
    }
  }, { passive: true });

  // Animation Loop
  function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (particles.length < 24 && Math.random() < 0.1) {
      particles.push(new Particle());
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.opacity <= 0 || p.y < -50) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animateParticles);
  }
  animateParticles();


  /* ==========================================================================
     3. GENTLE LOADING SCREEN
     ========================================================================== */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          loadingScreen.remove();
        }, 800);
      }
    }, 600);
  });


  /* ==========================================================================
     4. ROMANTIC MUSIC PLAYER & AUTO-START
     ========================================================================== */
  const musicPill = document.getElementById('music-pill');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const bgMusic = document.getElementById('bg-music');
  const musicStatus = document.getElementById('music-status');
  let isPlaying = false;
  let audioContext = null;
  let synthInterval = null;

  // Fallback Web Audio Romantic Synthesizer
  function startFallbackRomanticMusic() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioContext) audioContext = new AudioCtx();
      if (audioContext.state === 'suspended') audioContext.resume();

      const chordProgressions = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 261.63, 293.66, 392.00], // Gsus4
      ];
      let chordIndex = 0;
      let noteIndex = 0;

      function playNote(freq, startTime, duration = 1.2) {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.06, startTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      }

      function stepMelody() {
        if (!isPlaying) return;
        const currentChord = chordProgressions[chordIndex];
        const freq = currentChord[noteIndex % currentChord.length];
        playNote(freq, audioContext.currentTime, 1.5);

        noteIndex++;
        if (noteIndex >= 4) {
          noteIndex = 0;
          chordIndex = (chordIndex + 1) % chordProgressions.length;
        }
      }

      stepMelody();
      synthInterval = setInterval(stepMelody, 800);
    } catch (e) {
      console.log('Web Audio synthesizer unavailable:', e);
    }
  }

  function stopFallbackRomanticMusic() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
    if (audioContext && audioContext.state === 'running') {
      audioContext.suspend();
    }
  }

  async function playMusic() {
    if (isPlaying) return;
    if (bgMusic && bgMusic.src) {
      try {
        await bgMusic.play();
        isPlaying = true;
        if (musicPill) musicPill.classList.add('playing');
        if (musicStatus) musicStatus.textContent = 'Playing ♫';
      } catch (err) {
        // Fallback to built-in romantic melody
        isPlaying = true;
        startFallbackRomanticMusic();
        if (musicPill) musicPill.classList.add('playing');
        if (musicStatus) musicStatus.textContent = 'Playing ♫';
      }
    }
  }

  function pauseMusic() {
    if (!isPlaying) return;
    if (bgMusic) bgMusic.pause();
    stopFallbackRomanticMusic();
    isPlaying = false;
    if (musicPill) musicPill.classList.remove('playing');
    if (musicStatus) musicStatus.textContent = 'Play Music ♡';
  }

  function toggleMusic() {
    if (!isPlaying) {
      playMusic();
    } else {
      pauseMusic();
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
    });
  }


  /* ==========================================================================
     5. SECTION TRANSITIONS & STORY NAVIGATION
     ========================================================================== */
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Welcome Screen -> "Click to enter ♡" (Starts Music Automatically!)
  const btnEnter = document.getElementById('btn-enter');
  const giftBox = document.getElementById('gift-box');

  function handleEnter() {
    // Start music on user interaction
    playMusic();

    const rect = btnEnter ? btnEnter.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0 };
    triggerHeartBurst(rect.left + rect.width / 2, rect.top, 16);

    if (giftBox) {
      giftBox.classList.add('opened');
    }

    setTimeout(() => {
      scrollToSection('section-memories');
    }, 700);
  }

  if (btnEnter) {
    btnEnter.addEventListener('click', (e) => {
      e.stopPropagation();
      handleEnter();
    });
  }

  if (giftBox) {
    giftBox.addEventListener('click', (e) => {
      e.stopPropagation();
      handleEnter();
    });
  }

  // Memories -> Reasons
  const btnToReasons = document.getElementById('btn-to-reasons');
  if (btnToReasons) {
    btnToReasons.addEventListener('click', () => {
      scrollToSection('section-reasons');
    });
  }

  // Reasons -> Letter
  const btnToLetter = document.getElementById('btn-to-letter');
  if (btnToLetter) {
    btnToLetter.addEventListener('click', () => {
      scrollToSection('section-letter');
    });
  }

  // Letter -> Final
  const btnToFinal = document.getElementById('btn-to-final');
  if (btnToFinal) {
    btnToFinal.addEventListener('click', () => {
      scrollToSection('section-final');
    });
  }

  // Restart Story Button
  const btnRestart = document.getElementById('btn-restart');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      const envelopeScene = document.getElementById('envelope-scene');
      if (envelopeScene) envelopeScene.classList.remove('opened');

      currentReasonIndex = 0;
      updateReasonDisplay();
      if (reasonsUnlockArea) reasonsUnlockArea.classList.remove('show');

      if (giftBox) giftBox.classList.remove('opened');

      scrollToSection('section-welcome');
      triggerHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 22);
    });
  }

  // Progress Dots Navigation
  const progressDots = document.querySelectorAll('.progress-dot');
  progressDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      if (targetId) scrollToSection(targetId);
    });
  });

  const sections = document.querySelectorAll('.story-section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        progressDots.forEach((dot) => {
          if (dot.getAttribute('data-target') === id) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }, { root: null, threshold: 0.35 });

  sections.forEach((sec) => sectionObserver.observe(sec));


  /* ==========================================================================
     6. SECTION 3: THINGS I LOVE ABOUT YOU (INTERACTIVE REASONS)
     ========================================================================== */
  const loveReasons = [
    "Your smile makes everything better.",
    "I love the little things you do.",
    "You make ordinary days feel special.",
    "You are my favourite notification.",
    "I love being your person.",
    "You are beautiful in every possible way.",
    "If I had to choose again, I would still choose you."
  ];

  let currentReasonIndex = 0;
  const reasonQuote = document.getElementById('reason-quote');
  const reasonCard = document.getElementById('reason-card');
  const btnHeartReveal = document.getElementById('btn-heart-reveal');
  const reasonCounterBadge = document.getElementById('reason-counter-badge');
  const trackerItems = document.querySelectorAll('.tracker-item');
  const reasonsUnlockArea = document.getElementById('reasons-unlock-area');

  function updateReasonDisplay() {
    if (!reasonQuote) return;

    if (reasonCard) reasonCard.classList.add('card-flip');

    setTimeout(() => {
      reasonQuote.textContent = loveReasons[currentReasonIndex];
      if (reasonCounterBadge) {
        reasonCounterBadge.textContent = `Reason ${currentReasonIndex + 1} of ${loveReasons.length}`;
      }

      trackerItems.forEach((item, idx) => {
        item.classList.remove('active');
        if (idx === currentReasonIndex) {
          item.classList.add('active');
        } else if (idx < currentReasonIndex) {
          item.classList.add('completed');
        }
      });

      if (reasonCard) reasonCard.classList.remove('card-flip');
    }, 200);

    if (currentReasonIndex === loveReasons.length - 1 && reasonsUnlockArea) {
      setTimeout(() => {
        reasonsUnlockArea.classList.add('show');
        triggerHeartBurst(window.innerWidth / 2, window.innerHeight * 0.7, 18);
      }, 500);
    }
  }

  if (btnHeartReveal) {
    btnHeartReveal.addEventListener('click', (e) => {
      e.stopPropagation();
      currentReasonIndex = (currentReasonIndex + 1) % loveReasons.length;
      updateReasonDisplay();

      const rect = btnHeartReveal.getBoundingClientRect();
      triggerHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 3, 10);
    });
  }


  /* ==========================================================================
     7. SECTION 4: THE LOVE LETTER (3D ENVELOPE OPENING)
     ========================================================================== */
  const envelopeScene = document.getElementById('envelope-scene');
  const btnOpenLetter = document.getElementById('btn-open-letter');
  const waxSeal = document.getElementById('wax-seal');

  function openLetter() {
    if (!envelopeScene) return;
    if (!envelopeScene.classList.contains('opened')) {
      envelopeScene.classList.add('opened');
      triggerHeartBurst(window.innerWidth / 2, window.innerHeight * 0.5, 24);

      setTimeout(() => {
        const loveLetterPaper = document.getElementById('love-letter-paper');
        if (loveLetterPaper) {
          loveLetterPaper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 700);
    }
  }

  if (btnOpenLetter) {
    btnOpenLetter.addEventListener('click', (e) => {
      e.stopPropagation();
      openLetter();
    });
  }

  if (waxSeal) {
    waxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      openLetter();
    });
  }


  /* ==========================================================================
     8. PHOTO GALLERY LIGHTBOX & MODAL
     ========================================================================== */
  const photoLightbox = document.getElementById('photo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  const scrapbookCards = document.querySelectorAll('.scrapbook-card');
  scrapbookCards.forEach((card) => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.memory-img');
      const caption = card.querySelector('.handwritten-caption');
      if (img && photoLightbox && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCaption && caption) {
          lightboxCaption.textContent = caption.textContent;
        }
        photoLightbox.classList.add('active');
        photoLightbox.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeLightbox() {
    if (photoLightbox) {
      photoLightbox.classList.remove('active');
      photoLightbox.setAttribute('aria-hidden', 'true');
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

});


/* ==========================================================================
   9. GRACEFUL IMAGE FALLBACK HANDLER
   ========================================================================== */
function handleImageError(img, index) {
  if (!img) return;
  img.onerror = null;

  const captions = [
    "Our Favourite Person",
    "That Sweetest Smile",
    "Prettiest View Always",
    "How Did I Get So Lucky",
    "Pure Happiness With You",
    "Piece of My Heart",
    "Safest Place In The World",
    "Magic in Every Second"
  ];
  const title = captions[(index - 1) % captions.length] || `Our Memory #${index}`;

  const svgFallback = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff6f8"/>
          <stop offset="50%" stop-color="#fae3eb"/>
          <stop offset="100%" stop-color="#f5ccd7"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrad)"/>
      <rect x="25" y="25" width="550" height="700" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.6"/>
      <text x="300" y="270" font-size="64" text-anchor="middle" fill="#d4af37">👑</text>
      <path d="M300 420 C300 420 220 360 220 300 C220 260 250 240 280 240 C295 240 300 255 300 255 C300 255 305 240 320 240 C350 240 380 260 380 300 C380 360 300 420 300 420 Z" fill="#d46a84" opacity="0.85"/>
      <text x="300" y="490" font-family="'Cormorant Garamond', Georgia, serif" font-size="28" font-style="italic" font-weight="600" text-anchor="middle" fill="#4a121e">
        ${title}
      </text>
      <text x="300" y="530" font-family="'Caveat', cursive, sans-serif" font-size="22" text-anchor="middle" fill="#8c6e75">
        Add your photo: images/photo${index}.jpg ♡
      </text>
    </svg>
  `;

  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgFallback.trim());
}
