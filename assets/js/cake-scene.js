// Cake Elements
const birthdayTitle = document.querySelector(".birthday-title");
const blowBtn = document.getElementById("blow-btn");
const flames = document.querySelectorAll(".flame");
const smokes = document.querySelectorAll(".smoke");

// Audio
const birthdaySong = document.getElementById("birthday-song-1");
const clapSound = document.getElementById("clap-sound");
const birthdaySong2 = document.getElementById("birthday-song-2");

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

function celebrateBirthday(){

    micActive = false;

    blowStrength = 0;

    birthdaySong.volume = 0.5;

    birthdaySong.pause();

    extinguishCandles();

    birthdayTitle.innerText =
        "YAYYYYY 🎉";

    clapSound.currentTime = 0;

    clapSound.volume = 1;

    clapSound.play();

    setTimeout(() => {

        birthdaySong2.volume = 0;

        birthdaySong2.currentTime = 0;

        birthdaySong2.play();

        let fadeInterval =
            setInterval(() => {

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