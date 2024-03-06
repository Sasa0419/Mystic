const content = document.querySelector('.content');
const title = document.querySelector('.title');
const paragraphs = document.querySelectorAll('.hidden');


Array.from(paragraphs).forEach((para, i) => {
    console.log(para, i)
    setTimeout(() => {
        para.classList.remove("hidden");
    }, i * 3000);
})

setTimeout(() => {
    content.style.opacity = '0';
    content.style.transform = 'translateY(-50px)';
    title.style.opacity = '1';
    title.style.transform = 'translateY(-250px)';
    showNextParagraph(); 
}, 16000);

const button = document.querySelector('.button');
const originalText = 'Connexion';
const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
let clearID

function survol (){

    let randomText = '';
    for (let i = 0; i < originalText.length; i++) {
        const randomIndex = Math.floor(Math.random() * randomLetters.length);
        randomText += randomLetters[randomIndex];
    }
    button.textContent = randomText;
}




button.addEventListener('mouseover', () => {
    clearID = setInterval(survol, 20)
    survol ()
    });

button.addEventListener('mouseout', () => {
    clearInterval(clearID)
    button.textContent = originalText;
});
