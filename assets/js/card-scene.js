document.addEventListener("DOMContentLoaded", () => {
    const card = document.getElementById("birthday-card");
    const cardSection = document.getElementById("card-scene");
    
    const leftContainer = document.querySelector(".type-left-box");
    const rightContainer = document.querySelector(".type-right-box");
    const continueBtn = document.getElementById("continue-btn");

    if (!leftContainer || !rightContainer) return;

    // 1. Keep the inner paragraph structures completely safe in memory
    const leftHTMLSource = leftContainer.innerHTML;
    const rightHTMLSource = rightContainer.innerHTML;

    // 2. Clear out the pages so they start blank
    leftContainer.innerHTML = "";
    rightContainer.innerHTML = "";

    let isTypingActive = false;

    // 3. The HTML-Safe Typing Core Engine
    function typeHTMLContent(container, rawHTML, callback) {
        let currentPos = 0;
        
        // Add a single live cursor element matching our text size
        const cursorNode = document.createElement("span");
        cursorNode.className = "typing-cursor";
        container.appendChild(cursorNode);

        function renderNextToken() {
            if (currentPos < rawHTML.length) {
                // If we run into an HTML tag block like <br>
                if (rawHTML.charAt(currentPos) === "<") {
                    let tagCloseIndex = rawHTML.indexOf(">", currentPos);
                    if (tagCloseIndex !== -1) {
                        let completeTag = rawHTML.substring(currentPos, tagCloseIndex + 1);
                        cursorNode.insertAdjacentHTML('beforebegin', completeTag);
                        currentPos = tagCloseIndex + 1;
                    }
                } else {
                    // Type plain characters
                    let singleChar = rawHTML.charAt(currentPos);
                    cursorNode.insertAdjacentText('beforebegin', singleChar);
                    currentPos++;
                }

                // Natural, slightly varied human typing speed (25ms - 45ms per character)
                let naturalDelay = Math.floor(Math.random() * 20) + 25;
                setTimeout(renderNextToken, naturalDelay);
            } else {
                // Done! Safely remove our tracking blinking line
                cursorNode.remove();
                if (callback) callback();
            }
        }

        renderNextToken();
    }

    // 4. Main Sequence Trigger Engine
        function startCardTypingSequence() {
            if (isTypingActive) return;
            isTypingActive = true;

            // Wait exactly 2 seconds for the card flip 3D CSS transition to finish unfolding
            setTimeout(() => {
                // STEP A: Type Left Side Letter
                typeHTMLContent(leftContainer, leftHTMLSource, () => {
                    
                    // Small natural breathing pause between pages (500ms)
                    setTimeout(() => {
                        // STEP B: Type Right Side Letter (Only starts when Left finishes)
                        typeHTMLContent(rightContainer, rightHTMLSource, () => {
                            
                            // STEP C: Entire sequence finished! Show the Continue Button after 2 seconds
                            setTimeout(() => {
                                if (continueBtn) {
                                    continueBtn.classList.add("show");
                                }
                            }, 2000); // 2000ms = 2 seconds

                        });
                    }, 500);

                });
            }, 2000);
        }
    // 5. Watch for when the card gets the ".open" class automatically from your transition script
    if (card) {
        const cardObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class" && card.classList.contains("open")) {
                    startCardTypingSequence();
                    cardObserver.disconnect(); // Stop observing once typing is moving
                }
            });
        });
        cardObserver.observe(card, { attributes: true });
    }
});