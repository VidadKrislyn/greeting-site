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


// =========================================================================
// CARD SCENE TO CAKE SCENE TRANSITION (SLOW CARD FADE)
// =========================================================================

/* Go to Cake Scene */
continueBtn.addEventListener("click", () => {
    // 1. Instantly hide the button so it doesn't linger on screen
    continueBtn.classList.remove("show");

    // 2. Snap the birthday card shut (takes 2 seconds)
    birthdayCard.classList.remove("open");

    // 3. Wait exactly 2000ms for the cover to finish folding back to center
    setTimeout(() => {
        
        // 4. Find the card wrapper and trigger our slow fade out
        const cardWrapper = document.querySelector(".card-wrapper");
        if (cardWrapper) {
            cardWrapper.classList.add("slow-card-fade");
        }

        // 5. Wait exactly 2000ms for the card to completely vanish into thin air
        setTimeout(() => {

            // 6. Clean background switch straight to the Cake Scene
            cardScene.classList.add("hidden");
            if (cardWrapper) cardWrapper.classList.remove("slow-card-fade");

            cakeScene.classList.remove("hidden");
            cakeScene.classList.add("fade-in");

            /* Start Birthday Song */
            birthdaySong.volume = 0.5;
            birthdaySong.play();

            /* 35 seconds (9 sec before end) */
            setTimeout(() => {
                birthdayTitle.innerText = "Get ready to blow the candles!!!";
            }, 35000);

            /* 38 seconds (6 sec before end) */
            setTimeout(() => {
                startCountdown();
            }, 38000);

        }, 2000); // 2000ms fade duration for the card wrapper

    }, 2000); // Wait 2s for the card to snap shut first
});