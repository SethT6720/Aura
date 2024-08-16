import { get, pageShowing, hs, createEle, clickEvent } from './help.js';

//Delay for async funcs
const sleep = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

//Declare element variables
const startPage = get('startPage');
const gamePage = get('gamePage');
const statsAuraCounter = get('statsAuraCounter');
const statsCurrentlyDoing = get('statsCurrentlyDoing');
const auraCounter = get('auraCounter');
const auraButton = get('getAura');
const looksmaxxingPage = get('looksmaxxingPage');
const looksmaxxingCounter = get('looksmaxxingCounter');
const searchButton = get('searchButton');
const currentlyDoingpBar = get('currentlyDoingpBar');
const currentlyDoingpBarProgress = get('currentlyDoingpBarProgress');

//Declare Flags
let maxxingUnlocked = false;


//Declare game variables
let aura = 8;
let currentlyDoing = 'None'
let currentlyDoingProgress = 0
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
    statsAuraCounter.innerText = aura;
    statsCurrentlyDoing.innerText = currentlyDoing;
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
        searchButton.classList.remove('hide');
    }
}

async function pBar(Bar, Progress, time) {
    let hidden = false;
    let eachPercent = time / 100;
    let percent = Progress.style.width;
    percent = 0 + '%';

    if (Bar.classList.contains('hide')) {
        hidden = true;
        Bar.classList.remove('hide');
    }
    for (let i = 0; i < 100; i++) {
        await sleep(eachPercent);
        percent = (i + 1) + '%';
    }
}


//Game code

clickEvent(auraButton, function x() {
    aura++;
});

clickEvent(searchButton, function x() {
    pBar(currentlyDoingpBar, currentlyDoingpBarProgress, 10000);
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
