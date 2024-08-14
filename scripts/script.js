import { get, pageShowing, hs, createEle, clickEvent } from './help.js';

//Delay for async funcs
const sleep = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

//Declare element variables
const startPage = get('startPage');
const gamePage = get('gamePage');
const auraCounter = get('auraCounter');
const auraButton = get('getAura');
const looksmaxxingPage = get('looksmaxxingPage');
const looksmaxxingCounter = get('looksmaxxingCounter');

//Declare Flags
let maxxingUnlocked = false;


//Declare game variables
let aura = 8;
let looksmaxxing = 0;




//Navigation stuff
const startButton = get('startButton');
const gametoMaxxing = get('gametoMaxxing');
const maxxingtoGame = get('maxxingtoGame');

clickEvent(startButton, function x() {
    hs(gamePage, 'switch', startPage);
    startButton.removeEventListener('click', x);
});

clickEvent(gametoMaxxing, function x() {
    hs(looksmaxxingPage, 'switch', gamePage);
});

clickEvent(maxxingtoGame, function x() {
    hs(gamePage, 'switch', looksmaxxingPage);
});




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

clickEvent(auraButton, function x() {
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
