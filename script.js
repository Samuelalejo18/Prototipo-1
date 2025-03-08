let score = 0;
let gameInterval;
let gamePaused = false;
const keyBindings = { 'a': 1, 's': 2, 'd': 3, 'f': 4 };
const noteSpeed = 5; 
function startGame() {
    if (gameInterval) return;
    gameInterval = setInterval(spawnNote, 500);
}
function pauseGame() {
    gamePaused = !gamePaused;
    if (gamePaused) {
        clearInterval(gameInterval);
        gameInterval = null;
    } else {
        startGame();
    }
}
function spawnNote() {
    if (gamePaused) return;
    const stringIndex = Math.floor(Math.random() * 4) + 1;
    const note = document.createElement("div");
    note.classList.add("note");
    note.dataset.string = stringIndex;
    document.getElementById(`string${stringIndex}`).appendChild(note);
    animateNote(note);
}
function animateNote(note) {
    let position = 0;
    const interval = setInterval(() => {
        if (gamePaused) return;
        position += noteSpeed;
        note.style.top = position + "px";
        if (position >= 470) {
            note.remove();
            clearInterval(interval);
        }
    }, 30);
}
document.addEventListener("keydown", (event) => {
    if (keyBindings[event.key]) {
        checkHit(keyBindings[event.key]);
    }
});
function checkHit(stringIndex) {
    const string = document.getElementById(`string${stringIndex}`);
    const notes = string.getElementsByClassName("note");
    for (let note of notes) {
        let noteTop = parseInt(note.style.top);
        if (noteTop >= 440 && noteTop <= 480) {
            note.remove();
            score += 10;
            document.getElementById("score").innerText = score;
            document.getElementById(`sound${stringIndex}`).play();
            break;
        }
    }
}
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("pause-button").addEventListener("click", pauseGame);