import { get, pageShowing, hs, createEle, clickEvent } from './help.js';

//Delay for async funcs
const sleep = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

//Declare element variables
const startPage = get('startPage');
const gamePage = get('gamePage');
const auraCounter = get('auraCounter');
const looksmaxxingPage = get('looksmaxxingPage');
const looksmaxxingCounter = get('looksmaxxingCounter');


//Navigation stuff
const startButton = get('startButton');
const gametoMaxxing = get('gametoMaxxing');
const maxxingtoGame = get('maxxingtoGame');

clickEvent(startButton, function x() {
    hs(gamePage, 'switch', startPage);
    startButton.removeEventListener('click', x);
});

clickEvent(gametoMaxxing, () => {
    hs(looksmaxxingPage, 'switch', gamePage);
});

clickEvent(maxxingtoGame, () => {
    hs(gamePage, 'switch', looksmaxxingPage);
});



//Declare Flags
let maxxingUnlocked = false;

//Declare game variables
let aura = 8;
let looksmaxxing = 0;




//Functions

//Function to update all counters
function updateCounters() {
    auraCounter.innerText = aura;
}

//Function to check flags
function flagChecker() {
    //looksmaxxing
    if (maxxingUnlocked === false && aura >= 50) {
        maxxingUnlocked = true;
    } else if (maxxingUnlocked === true) {
        if (gametoMaxxing.classList.contains('hide')) {
            gametoMaxxing.classList.remove('hide');
        }
    }
}




//Game code

const button1 = createEle('button', 'Click me!', gamePage, () => {
    aura++;
});




//Main
async function main() {
    while(1 > 0) {
        updateCounters();
        flagChecker();
        await sleep(100);
    }
}

main();
