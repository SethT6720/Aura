import { get, pageShowing, hs, createEle, clickEvent } from './help.js';

//Delay for async funcs
const sleep = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

//Declare element variables
const startPage = get('startPage');
const gamePage = get('gamePage');

const statsAuraCounter = get('statsAuraCounter');
const statsDropsCounter = get('statsDropsCounter');
const statsCurrentlyDoing = get('statsCurrentlyDoing');

const auraCounter = get('auraCounter');
const auraButton = get('getAura');

const condensingPage = get('condensingPage');
const buyDropButton = get('buyDropButton');
const dropsCounter = get('dropsCounter');

const searchButton = get('searchButton');

const currentlyDoingpBar = get('currentlyDoingpBar');
const currentlyDoingpBarProgress = get('currentlyDoingpBarProgress');
const currentlyDoingProgressCounter = get('currentlyDoingProgressCounter');

const sendMessageButton = get('sendMessage');

const cons = get('Console');

//Declare Flags
let condensingUnlocked = false;


//Declare game variables
let aura = 8;
let currentlyDoing = 'None'
let currentlyDoingProgress = 0
let drops = 0;
let totalDrops = 0




//Navigation stuff
const startButton = get('startButton');
const gameToCondensing = get('gameToCondensing');
const condensingToGame = get('condensingToGame');

clickEvent(startButton, function x() {
    hs(gamePage, 'switch', startPage);
    startButton.removeEventListener('click', x);
});

clickEvent(gameToCondensing, function x() {
    hs(condensingPage, 'switch', gamePage);
});

clickEvent(condensingToGame, function x() {
    hs(gamePage, 'switch', condensingPage);
});




//Functions

//Temp formula, prob needs balancing later
function calculateDropCost() {
    return 50^((totalDrops * .5) + 1)
}

//Function to update all counters
function updateCounters() {
    auraCounter.innerText = aura;
    statsAuraCounter.innerText = aura;
    statsCurrentlyDoing.innerText = currentlyDoing;
    statsDropsCounter.innerText = drops
    buyDropButton.innerText = calculateDropCost()
}

//Function to check flags
function flagChecker() {
    //condensing
    if (condensingUnlocked === false && aura >= 50) {
        condensingUnlocked = true;
    } else if (condensingUnlocked === true) {
        if (gameToCondensing.classList.contains('hide')) {
            gameToCondensing.classList.remove('hide');
        }
        searchButton.classList.remove('hide');
        statsDropsCounter.classList.remove('hide');
    }
}


//Progress Bar function
async function pBar(Bar, Progress, time, button, func, whatDoing, progressCounter) {
    let hidden = false;
    let eachPercent = time / 100;
    let percent = Progress.style;
    percent.width = 0 + '%';
    currentlyDoing = whatDoing;

    button?.removeEventListener('click', func);

    if (Bar.classList.contains('hide')) {
        hidden = true;
        Bar.classList.remove('hide');
    }
    for (let i = 0; i < 100; i++) {
        await sleep(eachPercent);
        percent.width = (i + 1) + '%';
        progressCounter.innerText = (i + 1) + '%';
        if (i === 99) {
            currentlyDoing = 'None';
            percent.width = 0 + '%';
            if (hidden) Bar.classList.add('hide');
            clickEvent(button, func);
            return;
        }
    }
}

//Function to send a message in the Console
function sendCons(message) {
    let children = cons.childElementCount;
    if (children >= 7) {
        cons.removeChild(cons.getElementsByTagName('p')[0]);
    }
    createEle('p', message, cons);
}


function buyDrop() {
    if (aura >= calculateDropCost()) {
        aura -= calculateDropCost()
        drops++
        totalDrops++
        sendCons('Bought a drop')
    }
    else {
        sendCons('Not enough Aura')
    }
}

//Game code

clickEvent(auraButton, function x() {
    aura++;
});

clickEvent(searchButton, function x() {
    pBar(currentlyDoingpBar, currentlyDoingpBarProgress, 10000, searchButton, x, 'Searching...', currentlyDoingProgressCounter)
    .then(() => {
        let rand = Math.floor(Math.random() * 50) + 50;
        aura += rand;
        sendCons(`You gained ${rand} aura from searching!`);
    });
});

clickEvent(sendMessageButton, function x() {
    sendCons('test numero dos');
});

clickEvent(buyDropButton, function x(){
    buyDrop()
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
