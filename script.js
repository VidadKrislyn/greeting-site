const giftBox = 
document.getElementById("gift-box");

const giftScene = document.getElementById("gift-scene");
const cardScene = document.getElementById("card-scene");

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

const birthdayCard = document.getElementById("birthday-card");