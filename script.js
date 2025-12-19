document.addEventListener('DOMContentLoaded', () => {

    // --- Interactive Dialogue Flow ---
    const overlay = document.getElementById('intro-overlay');
    const audio = document.getElementById('bg-music');
    if (audio) audio.volume = 1.0;

    if (overlay) {
        initDialogueFlow(overlay, audio);
    }

    function initDialogueFlow(overlay, audio) {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';

        // Helper to play music on first interaction (iOS require interaction)
        const playMusic = () => {
            if (audio && audio.paused) {
                audio.play().catch(e => console.log("Audio autoplay failed:", e));
            }
        };

        // Clear existing content
        overlay.innerHTML = '';

        // Create Dialogue Container
        const container = document.createElement('div');
        container.className = 'dialogue-card';
        overlay.appendChild(container);

        // --- Step 1 ---
        showStep1();

        function showStep1() {
            container.innerHTML = `
                <div class="dialogue-text">Are you ready for your surprise? 🎁</div>
                <div class="dialogue-buttons">
                    <button class="btn-choice btn-yes">Yes! 😍</button>
                    <button class="btn-choice btn-no">No 🙈</button>
                </div>
            `;

            const btnYes = container.querySelector('.btn-yes');
            const btnNo = container.querySelector('.btn-no');

            // "No" Action
            btnNo.addEventListener('click', () => {
                playMusic(); // Try playing music
                container.classList.add('shake-animation');

                // Temporary change text
                const originalText = container.querySelector('.dialogue-text').innerText;
                container.querySelector('.dialogue-text').innerText = "Angne paranja patoola! 😤";
                container.querySelector('.dialogue-text').style.color = "#ff6b6b";

                setTimeout(() => {
                    container.classList.remove('shake-animation');
                    container.querySelector('.dialogue-text').innerText = originalText;
                    container.querySelector('.dialogue-text').style.color = "#fff";
                }, 1200);
            });

            // "Yes" Action
            btnYes.addEventListener('click', () => {
                playMusic();
                // Transition to Step 2
                container.style.opacity = '0';
                setTimeout(() => {
                    showStep2();
                    container.style.opacity = '1';
                }, 300);
            });
        }

        function showStep2() {
            container.innerHTML = `
                <div class="dialogue-text">Love youu muthe ❤️</div>
                <div class="dialogue-buttons">
                    <button class="btn-choice btn-primary" id="btn-love-too">Love you tooo 😘</button>
                    <button class="btn-choice btn-no" id="btn-ayikotte">Ayikotte 😒</button>
                </div>
            `;

            const btnLove = container.querySelector('#btn-love-too');
            const btnAyikotte = container.querySelector('#btn-ayikotte');

            // "Ayikotte" Action - Disappears
            btnAyikotte.addEventListener('click', (e) => {
                e.target.classList.add('hidden-btn');
            });

            // "Love you too" Action - Unlock Site
            btnLove.addEventListener('click', () => {
                // Transition to Spam Effect
                container.style.opacity = '0';
                setTimeout(() => {
                    container.remove();
                    startSpamEffect(overlay, audio);
                }, 500);
            });
        }
    }

    function startSpamEffect(overlay, audio) {
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

        const duration = 3500; // 1.5 seconds of spam
        const spawnInterval = 100; // New message every 100ms
        let intervalId;

        function createSpamMessage() {
            const msg = document.createElement('div');
            msg.classList.add('spam-msg');
            msg.innerText = phrases[Math.floor(Math.random() * phrases.length)];

            // Random Position
            const x = Math.random() * (window.innerWidth - 100);
            const y = Math.random() * (window.innerHeight - 50);

            msg.style.left = `${x}px`;
            msg.style.top = `${y}px`;

            overlay.appendChild(msg);
        }

        // Start spamming
        intervalId = setInterval(createSpamMessage, spawnInterval);

        // --- End Spam & Auto Unlock ---
        setTimeout(() => {
            clearInterval(intervalId);

            // Smoothly fade out all existing messages
            const messages = document.querySelectorAll('.spam-msg');
            messages.forEach(msg => {
                msg.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                msg.style.opacity = '0';
                msg.style.transform = 'scale(1.5)';
            });

            // Ensure Blur is there
            overlay.classList.add('overlay-blur');

            // Define unlock logic first
            const unlockSite = () => {
                // Play Music
                if (audio) {
                    // Try to play; if blocked, it will just fail silently or log error
                    audio.play().catch(e => console.log("Audio play failed (waiting for interaction):", e));
                }

                // Fade out overlay
                overlay.style.opacity = '0';
                document.body.style.overflow = '';

                setTimeout(() => {
                    overlay.remove();
                }, 1000);
            };

            // Clean up DOM after fade out AND Auto-Unlock
            setTimeout(() => {
                messages.forEach(msg => msg.remove());
                unlockSite(); // Auto unlock attempt
            }, 1000);

            // Keep backup listener just in case auto-play fails heavily or user taps impatience
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
