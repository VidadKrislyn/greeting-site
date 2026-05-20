// Cake Elements
const birthdayTitle = document.querySelector(".birthday-title");

let flames = [];
let smokes = [];

// Audio
const birthdaySong = document.getElementById("birthday-song-1");
const clapSound = document.getElementById("clap-sound");
const birthdaySong2 = document.getElementById("birthday-song-2");

// Track celebration looping state
let fireworksIntervalToken = null;

// Blow Cake
function launchConfetti(){
    confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.6 }
    });
}

// FULL SCREEN FIREWORKS LOOP (Utilizes your loaded canvas-confetti bundle)
function startFireworksDisplay() {
    const duration = 25 * 1000; // Run massive skyburst cycles for 25 seconds
    const animationEnd = Date.now() + duration;
    
    // Confetti structural color options mapping to firework minerals
    const fireworkColors = ["#FF0055", "#00FFCC", "#FFCC00", "#9900FF", "#FF5E00"];

    fireworksIntervalToken = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(fireworksIntervalToken);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Burst Right Edge side generator
        confetti({
            particleCount: particleCount,
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            origin: { x: Math.random() * 0.4 + 0.6, y: Math.random() * 0.4 + 0.1 },
            colors: fireworkColors
        });
        
        // Burst Left Edge side generator
        confetti({
            particleCount: particleCount,
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            origin: { x: Math.random() * 0.4, y: Math.random() * 0.4 + 0.1 },
            colors: fireworkColors
        });
    }, 450); // Burst sequence refresh pacing
}

// BALLOONS FLYING POPULATION GENERATOR
function releaseFlyingBalloons() {
    const totalBalloonsCount = 35; 
    const neonPalettes = ["#FF5C97", "#FF7597", "#E0AAFF", "#C77DFF", "#9D4EDD", "#3A86FF", "#FFBE0B", "#FF006E"];

    for (let i = 0; i < totalBalloonsCount; i++) {
        setTimeout(() => {
            const balloon = document.createElement("div");
            balloon.className = "balloon-container";

            // Spread out balloons horizontally across the whole viewport window width
            const randomXPosition = Math.random() * 100; // Viewport width %
            const randomScale = Math.random() * 0.4 + 0.8; // Varying structural sizes
            const randomColor = neonPalettes[Math.floor(Math.random() * neonPalettes.length)];
            const variantSpeed = Math.random() * 3 + 5; // Flight duration speed (5s to 8s)

            // Inject custom element styling variables
            balloon.style.left = `${randomXPosition}vw`;
            balloon.style.color = randomColor;
            balloon.style.backgroundColor = randomColor;
            balloon.style.transform = `scale(${randomScale})`;
            balloon.style.animationDuration = `${variantSpeed}s`;

            document.body.appendChild(balloon);

            // Clean up nodes out of the DOM tree after flight completion
            setTimeout(() => {
                balloon.remove();
            }, variantSpeed * 1000);

        }, i * 350); // Small, natural launch delays so they don't form a flat line wall
    }
}

function extinguishCandles(){
    flames.forEach(flame => {
        flame.classList.add("out");
    });

    smokes.forEach(smoke => {
        smoke.classList.add("active");
    });

    launchConfetti();
}

// Countdown Function
function startCountdown(){
    let count = 3;
    birthdayTitle.innerText = count;

    const countdownInterval = setInterval(() => {
        count--;

        if(count > 0){
            birthdayTitle.innerText = count;
        }else{
            clearInterval(countdownInterval);
            birthdayTitle.innerText = "Blow! 🎤";

            /* Activate Mic */
            micActive = true;

            /* Lower music volume during blowing */
            birthdaySong.volume = 0.2;
        }
    }, 1000);
}

function celebrateBirthday(){
    micActive = false;
    blowStrength = 0;
    birthdaySong.volume = 0.5;
    birthdaySong.pause();

    extinguishCandles();

    birthdayTitle.innerText = "YAYYYYY 🎉";

    // KICK OFF NEW VISUAL CELEBRATIONS INSTANTLY AT BLOWOUT!
    startFireworksDisplay();
    releaseFlyingBalloons();

    clapSound.currentTime = 0;
    clapSound.volume = 1;
    clapSound.play();

    setTimeout(() => {
        birthdaySong2.volume = 0;
        birthdaySong2.currentTime = 0;
        birthdaySong2.play();

        let fadeInterval = setInterval(() => {
            if(clapSound.volume > 0.05){
                clapSound.volume -= 0.05;
            }

            if(birthdaySong2.volume < 1){
                birthdaySong2.volume += 0.05;
            }

            if(clapSound.volume <= 0.05){
                clearInterval(fadeInterval);
                clapSound.pause();
            }
        }, 200);
    }, 5000);
}

async function loadCakeSVG(){
    const response = await fetch("assets/components/cake.html");
    const svg = await response.text();

    document.getElementById("cake-svg-wrapper").innerHTML = svg;

    flames = document.querySelectorAll(".flame");
    // Catch your cake file smoke layouts if present inside components setup
    smokes = document.querySelectorAll(".smoke"); 
}

loadCakeSVG();