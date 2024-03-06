// Récupérez le score à partir de localStorage ou initialisez-le à zéro
let score = parseInt(localStorage.getItem('score')) || 0;

// Récupérez l'élément score par son ID
const scoreElement = document.getElementById("score");



const evilButton = document.getElementById('evil-button')
const OFFSET = 100

evilButton.addEventListener('click', () => {
  score += 5;
  localStorage.setItem('score', score);
  scoreElement.innerText = "Score : " + score;
  window.location.href = "game19.php";
})

document.addEventListener('mousemove', (e) => {
  const x = e.pageX
  const y = e.pageY
  const buttonBox = evilButton.getBoundingClientRect()
  const horizontalDistanceFrom = distanceFromCenter(buttonBox.x, x, buttonBox.width)
  const verticalDistanceFrom = distanceFromCenter(buttonBox.y, y, buttonBox.height)
  const horizontalOffset = buttonBox.width / 2 + OFFSET
  const verticalOffset = buttonBox.height / 2 + OFFSET
  if (Math.abs(horizontalDistanceFrom) <= horizontalOffset && Math.abs(verticalDistanceFrom) <= verticalOffset) {
    setButtonPosition(
      buttonBox.x + horizontalOffset / horizontalDistanceFrom * 10,
      buttonBox.y + verticalOffset / verticalDistanceFrom * 10
    )
  }
})


function setButtonPosition(left, top) {
  const windowBox = document.body.getBoundingClientRect();
  const buttonBox = evilButton.getBoundingClientRect();
  const OFFSET = 10; // Remplacez 10 par la valeur de décalage souhaitée

  // Définir une limite en right (droite)
  if (distanceFromCenter(left, windowBox.left, buttonBox.width) < 0) {
    left = windowBox.right - buttonBox.width - OFFSET;
  }
  if (left > windowBox.right) {
    left = windowBox.right - buttonBox.width - OFFSET;
  }

  // Définir une limite en bottom (bas)
  if (distanceFromCenter(top, windowBox.top, buttonBox.height) < 0) {
    top = windowBox.bottom - buttonBox.height - OFFSET;
  }
  if (top > windowBox.bottom) {
    top = windowBox.bottom - buttonBox.height - OFFSET;
  }

  evilButton.style.left = `${left}px`;
  evilButton.style.top = `${top}px`;

  console.log(" ~ file: script.js:45 ~ setButtonPosition ~ evilButton:", evilButton);
}

function distanceFromCenter(boxPosition, mousePosition, boxSize) {
  return boxPosition - mousePosition + boxSize / 2
}
