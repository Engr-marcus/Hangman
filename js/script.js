const hangmanImage = document.querySelector(".hangman_container img")
const keyboardDiv = document.querySelector(".keyboard");
const guessText = document.querySelector(".guesses_text b");
const gameModal = document.querySelector(".game_modal");
const wordDisplay = document.querySelector(".word_display");
const playAgain = document.querySelector(".play_again");


let currentWord, correctLetter = [], wrongGuessCount = 0;
let maxGuesses = 6;

const resetGame = () => {
    correctLetter = [];
    wrongGuessCount = 0;
    hangmanImage.src = `image/${wrongGuessCount}.png`
    guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("active");

}

const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint_text b").innerText = hint;
    resetGame();
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
}

const gameOver = (isVictory) =>{
    setTimeout(() => {
        const modalText = isVictory ? 'You found the word: ' : 'The correct word was: ';
        gameModal.querySelector("img").src = `image/${isVictory ? 'happy' : 'sad'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.classList.add("active");
    }, 300)
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetter.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    }
    else{
        wrongGuessCount++;
        hangmanImage.src = `image/${wrongGuessCount}.png`
    }
    button.disabled = true;
    guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetter.length === currentWord.length) return gameOver(true);
}

 

for(i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    var clickedLetter = String.fromCharCode(i)
    button.addEventListener("click", e => initGame(e.target, button.innerHTML));
}

getRandomWord();
playAgain.addEventListener("click", getRandomWord)