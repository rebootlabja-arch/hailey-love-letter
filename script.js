
// =============================================
// HAILEY'S LOVE LETTER
// Complete Website Functionality
// =============================================


// =============================================
// 1. GET HTML ELEMENTS
// =============================================

const envelope = document.getElementById("envelope");
const openLetter = document.getElementById("openLetter");

const intro = document.getElementById("intro");
const letterScene = document.getElementById("letterScene");
const questionScene = document.getElementById("questionScene");

const showQuestion = document.getElementById("showQuestion");

const yesButton = document.getElementById("yesButton");
const talkButton = document.getElementById("talkButton");
const answerMessage = document.getElementById("answerMessage");


// =============================================
// 2. GET AUDIO ELEMENTS
// =============================================

const audioLetter = document.getElementById("audioLetter");
const audioQuestion = document.getElementById("audioQuestion");
const audioYes = document.getElementById("audioYes");

let currentAudio = null;
let fadeInterval = null;
let fadeTimeout = null;


// =============================================
// 3. AUTOMATIC SOUNDTRACK
// =============================================

function playMusic(nextAudio, delay = 0) {

    if (!nextAudio) return;

    // Don't restart a song that's already playing
    if (currentAudio === nextAudio) return;

    clearInterval(fadeInterval);
    clearTimeout(fadeTimeout);

    const previousAudio = currentAudio;

    // Prepare the next song
    nextAudio.pause();
    nextAudio.currentTime = 0;
    nextAudio.volume = 0;

    currentAudio = nextAudio;

    // Start playback directly from the user's click
    // This helps avoid browser autoplay restrictions
    const playback = nextAudio.play();

    playback.then(() => {

        // Give the envelope animation time to finish
        fadeTimeout = setTimeout(() => {

            let progress = 0;

            const fadeDuration = 1200;
            const fadeStep = 50;

            fadeInterval = setInterval(() => {

                progress += fadeStep / fadeDuration;

                if (progress > 1) {
                    progress = 1;
                }

                // Fade in the new song
                nextAudio.volume = progress;

                // Fade out the previous song
                if (previousAudio) {

                    previousAudio.volume = 1 - progress;

                }

                // Finish the transition
                if (progress >= 1) {

                    clearInterval(fadeInterval);

                    nextAudio.volume = 1;

                    if (previousAudio) {

                        previousAudio.pause();
                        previousAudio.currentTime = 0;
                        previousAudio.volume = 1;

                    }

                }

            }, fadeStep);

        }, delay);

    }).catch((error) => {

        console.error("Soundtrack playback failed:", error);

    });

}


// =============================================
// 4. OPEN THE ENVELOPE
// =============================================

let letterOpening = false;

function revealLetter() {

    if (letterOpening) return;

    letterOpening = true;

    envelope.classList.add("opened");

    // Start the first song quietly while the envelope opens
    playMusic(audioLetter, 900);

    setTimeout(() => {

        intro.classList.add("hidden");
        letterScene.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 900);

}

envelope.addEventListener("click", revealLetter);
openLetter.addEventListener("click", revealLetter);


// =============================================
// 5. REVEAL THE FINAL QUESTION
// =============================================

showQuestion.addEventListener("click", () => {

    letterScene.classList.add("hidden");
    questionScene.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Transition to the second song
    playMusic(audioQuestion);

});


// =============================================
// 6. HER ANSWER
// =============================================

yesButton.addEventListener("click", () => {

    answerMessage.textContent =
        "You have no idea how happy you've made me. I love you, Hailey. ❤️";

    yesButton.disabled = true;
    talkButton.disabled = true;

    // Transition to the final song
    playMusic(audioYes);

});


talkButton.addEventListener("click", () => {

    answerMessage.textContent =
        "Take all the time you need, my darling. I just wanted you to know how much you mean to me. ❤️";

    // The current song continues playing

});


// =============================================
// 7. CLEAN UP WHEN LEAVING THE PAGE
// =============================================

window.addEventListener("pagehide", () => {

    clearInterval(fadeInterval);
    clearTimeout(fadeTimeout);

    [audioLetter, audioQuestion, audioYes].forEach((audio) => {

        if (!audio) return;

        audio.pause();

    });

});


// =============================================
// END OF HAILEY'S LOVE LETTER
// =============================================
