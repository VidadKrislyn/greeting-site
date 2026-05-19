// Scene Elements
const giftBox =  document.getElementById("gift-box");
const giftScene = document.getElementById("gift-scene");
const cardScene = document.getElementById("card-scene");
const birthdayCard = document.getElementById("birthday-card");
const continueBtn = document.getElementById("continue-btn");
const cakeScene = document.getElementById("cake-scene");

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
                "Get ready to blow the candles!!!";

        }, 38000);

        /* 41 seconds (3 sec before end) */
        setTimeout(() => {

            startCountdown();

        }, 41000);

    }, 800);

});