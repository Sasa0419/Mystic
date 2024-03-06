let score = parseInt(localStorage.getItem('score')) || 0;

const scoreElement = document.getElementById("score");

let boutonA = document.getElementById('a');
let boutonB = document.getElementById('b');
let boutonC = document.getElementById('c');
let boutonD = document.getElementById('d');
let boutonE = document.getElementById('e');
let boutonF = document.getElementById('f');
let boutonG = document.getElementById('g');
let boutonH = document.getElementById('h');
let boutonI = document.getElementById('i');
let boutonJ = document.getElementById('j');

boutonA.addEventListener("click", () => {
    score -= 5;
    if (score < 0) {
        score = 0;
    }
    localStorage.setItem('score', score);
    window.location.href = "game_over.php";
    scoreElement.innerText = "Score : " + score;
}
);

boutonB.addEventListener("click", () => {

    score -= 5;
    if (score < 0) {
        score = 0;
    }
    localStorage.setItem('score', score);
    window.location.href = "game_over.php";
    scoreElement.innerText = "Score : " + score;
}
);

boutonD.addEventListener("click", () => {

    score -= 5;
    if (score < 0) {
        score = 0;
    }
    localStorage.setItem('score', score);
    window.location.href = "game_over.php";
    scoreElement.innerText = "Score : " + score;
}
);

boutonE.addEventListener("click", () => {

    score -= 5;
    if (score < 0) {
        score = 0;
    }
    localStorage.setItem('score', score);
    window.location.href = "game_over.php";
    scoreElement.innerText = "Score : " + score;
}
);

boutonF.addEventListener("click", () => {

    score -= 5;
    if (score < 0) {
        score = 0;
    }
    localStorage.setItem('score', score);
    window.location.href = "game_over.php";
    scoreElement.innerText = "Score : " + score;
}
);

boutonH.addEventListener("click", () => {

    score -= 5;
    if (score < 0) {
        score = 0;
    }
    localStorage.setItem('score', score);
    window.location.href = "game_over.php";
    scoreElement.innerText = "Score : " + score;
}
);


boutonI.addEventListener("click", () => {

    score -= 5;
    if (score < 0) {
        score = 0;
    }
    localStorage.setItem('score', score);
    window.location.href = "game_over.php";
    scoreElement.innerText = "Score : " + score;
}
);

boutonJ.addEventListener("click", () => {

    score -= 5;
    if (score < 0) {
        score = 0;
    }
    localStorage.setItem('score', score);
    window.location.href = "game_over.php";
    scoreElement.innerText = "Score : " + score;
}
);

boutonC.addEventListener("click", () => {

    score += 5;
    localStorage.setItem('score', score);
    scoreElement.innerText = "Score : " + score;
    window.location.href = "bonus.php?score=" + score;
});

boutonG.addEventListener("click", () => {


    score += 5;
    localStorage.setItem('score', score);
    scoreElement.innerText = "Score : " + score;
    window.location.href = "bonus.php?score=" + score;
});