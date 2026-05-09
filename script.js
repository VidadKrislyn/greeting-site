const giftBox = 
document.getElementById("gift-box");

const giftScene = document.getElementById("gift-scene");
const cardScene = document.getElementById("card-scene");

giftBox.addEventListener("click", () => {

    //Hide Gift Scene
    giftScene.classList.add("hidden");

    //Show Card Scene
    cardScene.classList.remove("hidden");
});