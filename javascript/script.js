const dino = document.querySelector(".dinossauro");
const background = document.querySelector(".background");

let position = 100;
let isJumping = false;
let points = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {

    isJumping = true; 

    let upInterval = setInterval(() => {
        if (position >= 250) {
            clearInterval(upInterval);

            // Descendo
            let downInterval = setInterval(() => {
                if(position <= 100) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
        // Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (randomTime < 700) {
        randomTime = 700;
    }

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 160) {
                clearInterval(leftInterval);
                document.body.innerHTML = '<h1 class="game-over">Fim de jogo</br><button class="reload" type="button" value="Refresh Button" onClick="window.location.reload()">Jogar de novo</button></h1>';
            } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);