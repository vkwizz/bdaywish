document.addEventListener('DOMContentLoaded', () => {

    // --- Intro Overlay Logic ---
    const overlay = document.getElementById('intro-overlay');

    if (overlay) {
        const phrases = [
            "love you da ❤️",
            "sorry vaveee 🥺",
            "miss you da 💖",
            "good morning muthe ☀️",
            "my cutiee koraaa 😽",
            "ente chundari vavaya 💃",
            "sir paavama 🥺",
            "kutapiiiiii 💕",
            "shemikeda kutttapi 🙏",
            "ummmma 😘",
            "my world 🌍",
            "mine 💍"
        ];

        // Prevent scrolling
        document.body.style.overflow = 'hidden';

        const duration = 1500; // 6 seconds
        const spawnInterval = 100; // New message every 100ms
        let intervalId;

        function createSpamMessage() {
            const msg = document.createElement('div');
            msg.classList.add('spam-msg');
            msg.innerText = phrases[Math.floor(Math.random() * phrases.length)];

            // Random Position
            const x = Math.random() * (window.innerWidth - 100); // subtract approx width
            const y = Math.random() * (window.innerHeight - 50); // subtract approx height

            msg.style.left = `${x}px`;
            msg.style.top = `${y}px`;

            // Random Color Removed - enforced pink in CSS
            // const hue = Math.random() * 360;
            // msg.style.backgroundColor = `hsla(${hue}, 70%, 60%, 0.8)`;

            overlay.appendChild(msg);
        }

        // --- Background Music Logic ---
        // --- Background Music Logic ---
        const audio = document.getElementById('bg-music');
        if (audio) {
            audio.volume = 1.0;

            const tryPlay = () => {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Autoplay blocked. Waiting for interaction.");
                    });
                }
            };

            // Attempt immediately
            tryPlay();

            // Re-attempt on any user interaction (essential for iOS)
            const unlockAudio = () => {
                if (audio.paused) {
                    audio.play().then(() => {
                        // Remove listeners once playing
                        document.removeEventListener('click', unlockAudio);
                        document.removeEventListener('touchstart', unlockAudio);
                        document.removeEventListener('scroll', unlockAudio);
                        document.removeEventListener('keydown', unlockAudio);
                    }).catch(e => console.error(e));
                }
            };

            document.addEventListener('click', unlockAudio);
            document.addEventListener('touchstart', unlockAudio);
            document.addEventListener('scroll', unlockAudio);
            document.addEventListener('keydown', unlockAudio);
        }

        // Start spamming
        intervalId = setInterval(createSpamMessage, spawnInterval);

        // Start spamming
        intervalId = setInterval(createSpamMessage, spawnInterval);

        // --- End Spam & Show "Tap to Open" ---
        setTimeout(() => {
            clearInterval(intervalId);

            // Smoothly fade out all existing messages
            const messages = document.querySelectorAll('.spam-msg');
            messages.forEach(msg => {
                msg.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                msg.style.opacity = '0';
                msg.style.transform = 'scale(1.5)'; // Slight expansion effect
            });

            // Add Blur Effect (CSS transition handles smoothness)
            overlay.classList.add('overlay-blur');

            // Create "Tap to begin" message
            const prompt = document.createElement('div');
            prompt.classList.add('tap-prompt');
            prompt.innerText = "Tap anywhere ❤️";
            overlay.appendChild(prompt);

            // Clean up DOM after fade out
            setTimeout(() => {
                messages.forEach(msg => msg.remove());
            }, 1000);

            // One-time click to unlock everything
            const unlockSite = () => {
                // Play Music
                if (audio) {
                    audio.play().catch(e => console.log("Audio play failed:", e));
                }

                // Fade out overlay
                overlay.style.opacity = '0';
                document.body.style.overflow = '';

                setTimeout(() => {
                    overlay.remove();
                }, 1000);
            };

            // Listen for click anywhere on the overlay
            overlay.addEventListener('click', unlockSite);

        }, duration);
    }



    // Intersection Observer for Quotes (Staggered)
    const quoteCards = document.querySelectorAll('.quote-card, .dialogue-box');
    const quoteObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay based on index to create stagger effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // 150ms delay between each
                quoteObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1
    });

    quoteCards.forEach(card => {
        quoteObserver.observe(card);
    });

    // Floating Hearts Animation in Hero
    const heroHeartsContainer = document.getElementById('hero-hearts');

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';

        // Randomize heart properties
        const size = Math.random() * 20 + 10 + 'px';
        const left = Math.random() * 100 + '%';
        const duration = Math.random() * 5 + 3 + 's';
        const delay = Math.random() * 5 + 's';

        heart.style.left = left;
        heart.style.fontSize = size;
        heart.style.animationDuration = duration;
        heart.style.animationDelay = delay;

        // Style the heart
        heart.style.position = 'absolute';
        heart.style.bottom = '-50px';
        heart.style.color = 'rgba(194, 30, 86, 0.6)';
        heart.style.animationName = 'floatUp';
        heart.style.animationTimingFunction = 'linear';
        heart.style.animationIterationCount = 'infinite';

        heroHeartsContainer.appendChild(heart);

        // Remove after animation to clean DOM (not needed with infinite, but good practice if not infinite)
        // For infinite, we just keep them. Let's limit count.
    }

    // Create a set number of hearts
    for (let i = 0; i < 20; i++) {
        createHeart();
    }

    // Inject keyframes for hearts if not in CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    // --- Interactive Cake Logic ---
    const candle = document.querySelector('.candle');
    const flame = document.querySelector('.flame');
    const cakeContainer = document.querySelector('.cake-container');

    // Check if candle is already blown out
    let isBlownOut = false;

    // --- Interactive Envelope ---
    const letterModal = document.getElementById('letter-modal');
    const envelope = document.querySelector('.envelope');

    function showLetter() {
        if (!letterModal) return;
        letterModal.classList.remove('hidden');
        letterModal.classList.add('show');

        // Trigger envelope opening animation after a slight delay
        setTimeout(() => {
            if (envelope) envelope.classList.add('open');
        }, 500);
    }

    function hideLetter(e) {
        // Close only if clicking the backdrop (not the letter itself)
        if (e.target === letterModal) {
            letterModal.classList.remove('show');
            letterModal.classList.add('hidden');
            // Reset envelope state for re-opening
            if (envelope) envelope.classList.remove('open');
        }
    }

    if (letterModal) {
        letterModal.addEventListener('click', hideLetter);
    }


    // Helper to blow out candle
    function blowOutCandle() {
        if (isBlownOut) return;
        isBlownOut = true;

        // Animate Flame Out
        flame.style.opacity = '0';
        flame.style.transform = 'scale(0.5)';

        // Hide Instruction Text
        const instruction = document.querySelector('.instruction-text');
        if (instruction) instruction.style.opacity = '0';

        // Also remove glow effect if present in CSS
        flame.style.animation = 'none';

        // Add smoke effect
        const smoke = document.createElement('div');
        smoke.classList.add('smoke');
        candle.appendChild(smoke);

        // Show Smoke
        smoke.style.display = 'block';
        setTimeout(() => {
            smoke.style.opacity = '0';
        }, 2000);

        // --- TRIGGER ENVELOPE INSTEAD OF ALERT ---
        setTimeout(() => {
            showLetter();
        }, 1200); // Wait for smoke effect a bit
    }

    // Tap Interaction for Cake
    if (cakeContainer) {
        cakeContainer.addEventListener('click', () => {
            blowOutCandle();
        });

        // Also allow touching the candle directly
        candle.addEventListener('click', (e) => {
            e.stopPropagation();
            blowOutCandle();
        });
    }
});
