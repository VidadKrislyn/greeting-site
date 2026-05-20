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
// CARD SCENE TO CAKE SCENE TRANSITION (WITH CLOSING INTERMISSION)
// =========================================================================

/* Go to Cake Scene */
continueBtn.addEventListener("click", () => {
    // 1. Instantly hide the continue button so it doesn't float over the closing cover
    continueBtn.classList.remove("show");

    // 2. Snap the birthday card shut! (This triggers your card-scene.css 2s transition backwards)
    birthdayCard.classList.remove("open");

    // 3. Wait exactly 2000ms (2 seconds) for the cover to finish folding back to center
    setTimeout(() => {
        
        // 4. Now fade out the entire card desk area background scene
        cardScene.classList.add("fade-out");

        // 5. Short 800ms fade buffer to wipe the screen clean before mounting cake assets
        setTimeout(() => {

            cardScene.classList.add("hidden");
            cardScene.classList.remove("fade-out");

            // 6. Mount and display Cake Scene (This triggers your cake stagger loops instantly!)
            cakeScene.classList.remove("hidden");
            cakeScene.classList.add("fade-in");

            /* Start Birthday Song */
            birthdaySong.volume = 0.5;
            birthdaySong.play();

            /* 38 seconds (6 sec before end) */
            setTimeout(() => {
                birthdayTitle.innerText = "Get ready to blow the candles!!!";
            }, 38000);

            /* 41 seconds (3 sec before end) */
            setTimeout(() => {
                startCountdown();
            }, 41000);

        }, 2000);

    }, 2000); // Links perfectly with the 2s transition duration in card-scene.css
});