const cards = document.querySelectorAll(".card");
const validateButton = document.querySelector("#validate");
const restartButton = document.querySelector("#restart");

const resultDiv = document.querySelector(".result");

const options = ["rock", "paper", "scissors"];

const rules = {
    "rock": "scissors",
    "scissors": "paper",
    "paper": "rock"
}

let isPlaying = true;

cards.forEach(c => {
    c.addEventListener("click", selectCard);
});

validateButton.addEventListener("click", pickConcurrent);
restartButton.addEventListener("click", restart);

function selectCard(ev) {
    ev.preventDefault();

    if (!isPlaying) {
        return;
    }

    cards.forEach(c => {
        c.classList.remove("selected");
    });
    ev.target.classList.add("selected");
}

function getResult(player, concurrent) {
    const p = document.createElement("p");

    if (rules[player] === concurrent) {
        p.textContent = "You won !";
        resultDiv.classList.add("success");
    } else {
        p.textContent = "You lose !";
        resultDiv.classList.add("unsuccess");
    }

    resultDiv.appendChild(p);
    restartButton.style.display = "block";
}

function pickConcurrent(ev) {
    isPlaying = false;
    validateButton.style.display = "none";
    const playerSelection = document.querySelector(".card.selected").id;

    const remainingOption = options.filter(o => o !== playerSelection);
    const concurrent = remainingOption[Math.floor(Math.random() * remainingOption.length)];

    const concurrentDiv = document.querySelector("#" + concurrent);
    concurrentDiv.classList.add("concur");

    setTimeout(() => {
        getResult(playerSelection, concurrent)
    }, 1000);
}

function restart(ev) {
    resultDiv.innerHTML = "";
    resultDiv.className = "result";
    cards.forEach(c => {
        c.classList.remove("selected");
        c.classList.remove("concur");
        restartButton.style.display = "none";
        validateButton.style.display = "block";
    });
    isPlaying = true;
} 