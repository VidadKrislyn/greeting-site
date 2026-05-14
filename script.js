// Scene Elements
const giftBox =  document.getElementById("gift-box");
const giftScene = document.getElementById("gift-scene");
const cardScene = document.getElementById("card-scene");
const birthdayCard = document.getElementById("birthday-card");
const continueBtn = document.getElementById("continue-btn");
const cakeScene = document.getElementById("cake-scene");

// Audio
const birthdaySong = document.getElementById("birthday-song-1");
const clapSound = document.getElementById("clap-sound");
const birthdaySong2 = document.getElementById("birthday-song-2");

// Cake Elements
const birthdayTitle = document.querySelector(".birthday-title");
const blowBtn = document.getElementById("blow-btn");
const flames = document.querySelectorAll(".flame");
const smokes = document.querySelectorAll(".smoke");

// Mic Variables
let micActive = false;
let blowStrength = 0;
let blowThreshold = 35;
let requiredBlowFrames = 20;

// Gift Scene to Card Scene transition
giftBox.addEventListener("click", () => {

    // Fade out Scene 1
    giftScene.classList.add("fade-out");

    setTimeout(() => {

        // Hide Scene 1
        giftScene.classList.add("hidden");

        // Show Scene 2
        cardScene.classList.remove("hidden");

        // Fade in Scene 2
        cardScene.classList.add("fade-in");

        // AUTO OPEN CARD AFTER 3 SECONDS
        setTimeout(() => {

            birthdayCard.classList.add("open");

        }, 3000);

    }, 800);

});

// Card Scene to Cake Scene transition


/* Show button after 10 seconds */
setTimeout(() => {
    continueBtn.classList.add("show");
}, 10000);

/* Go to Cake Scene */
continueBtn.addEventListener("click", () => {

    cardScene.classList.add("fade-out");

    setTimeout(() => {

        cardScene.classList.add("hidden");

        cardScene.classList.remove("fade-out");

        cakeScene.classList.remove("hidden");

        cakeScene.classList.add("fade-in");

        /* Start Birthday Song */
        birthdaySong.volume = 0.5;
        birthdaySong.play();

        /* 38 seconds (6 sec before end) */
        setTimeout(() => {

            birthdayTitle.innerText =
                "Ready to blow the candles?";

        }, 38000);

        /* 41 seconds (3 sec before end) */
        setTimeout(() => {

            startCountdown();

        }, 41000);

    }, 800);

});

// Blow Cake
function launchConfetti(){

    confetti({

        particleCount:150,

        spread:120,

        origin:{ y:0.6 }

    });

}

function extinguishCandles(){

    flames.forEach(flame => {
        flame.classList.add("out");
    });

    smokes.forEach(smoke => {
        smoke.classList.add("active");
    });

    launchConfetti();

};

if(blowBtn){

    blowBtn.addEventListener("click", () => {

        extinguishCandles();

    });

}

// Mic Permission
navigator.mediaDevices.getUserMedia({ audio:true })

.then(stream => {

    const audioContext =
        new AudioContext();

    const microphone =
        audioContext.createMediaStreamSource(stream);

    const analyser =
        audioContext.createAnalyser();

    microphone.connect(analyser);

    analyser.fftSize = 256;

    const dataArray =
        new Uint8Array(analyser.frequencyBinCount);

    function detectBlow(){

        analyser.getByteFrequencyData(dataArray);

        let volume = 0;

        for(let i = 0; i < dataArray.length; i++){

            volume += dataArray[i];

        }

        volume = volume / dataArray.length;

        //console.log(volume);


        /* =================================================
           SMART BLOW DETECTION
        ================================================= */

        if(micActive){

            if(volume > blowThreshold){

                blowStrength++;

            }else{

                blowStrength = 0;

            }

            /* Successful Blow */
            if(blowStrength >= requiredBlowFrames){

                /* Disable mic */
                micActive = false;

                /* Reset strength */
                blowStrength = 0;

                /* Restore song volume */
                birthdaySong.volume = 0.5;

                /* Stop Song 1 */
                birthdaySong.pause();

                /* Extinguish candles */
                extinguishCandles();

                /* Celebration Text */
                birthdayTitle.innerText =
                    "YAYYYYY 🎉";

                /* Play Clapping */
                clapSound.currentTime = 0;
                clapSound.volume = 1;

                clapSound.play();

                /* Start Song 2 after 5 sec */
                setTimeout(() => {

                    birthdaySong2.volume = 0;

                    birthdaySong2.currentTime = 0;

                    birthdaySong2.play();

                    let fadeInterval =
                        setInterval(() => {

                        /* Fade out clapping */
                        if(clapSound.volume > 0.05){

                            clapSound.volume -= 0.05;

                        }

                        /* Fade in Song 2 */
                        if(birthdaySong2.volume < 1){

                            birthdaySong2.volume += 0.05;

                        }

                        /* Finish Fade */
                        if(clapSound.volume <= 0.05){

                            clearInterval(fadeInterval);

                            clapSound.pause();

                        }

                    }, 200);

                }, 5000);

                return;

            }

        }

        requestAnimationFrame(detectBlow);

    }

    detectBlow();

})

.catch(err => {

    console.log("Microphone access denied");

});

// Countdown Function
function startCountdown(){

    let count = 3;

    birthdayTitle.innerText = count;

    const countdownInterval =
        setInterval(() => {

        count--;

        if(count > 0){

            birthdayTitle.innerText = count;

        }else{

            clearInterval(countdownInterval);

            birthdayTitle.innerText =
                "Blow! 🎤";

            /* Activate Mic */
            micActive = true;

            /* Lower music volume during blowing */
            birthdaySong.volume = 0.2;

        }

    }, 1000);

}