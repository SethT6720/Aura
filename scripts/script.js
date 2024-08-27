import { get, pageShowing, hs, createEle, clickEvent } from './help.js';

//Delay for async funcs
const sleep = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

//Declare element variables
const startPage = get('startPage');
const oGamePage = get('overarchingGamePage');
const gamePage = get('gamePage');

const statsAuraCounter = get('statsAuraCounter');
const statsDropsCounter = document.createElement('span');
const statsCurrentlyDoing = get('statsCurrentlyDoing');

const auraCounter = get('auraCounter');
const auraButton = get('getAura');

const condensingPage = get('condensingPage');
const buyDropButton = get('buyDropButton');
const dropsCounter = get('dropsCounter');
const tDropsCounter = get('totalDropsCounter');

const searchButton = get('searchButton');

const currentlyDoingpBar = get('currentlyDoingpBar');
const currentlyDoingpBarProgress = get('currentlyDoingpBarProgress');
const currentlyDoingProgressCounter = get('currentlyDoingProgressCounter');

const stats = get('statsDisplay');
const cons = get('Console');

//Drop Upgrade Buttons
const chaiTea = get('')


//Declare Flags
let condensingUnlocked = false;
let dropsInStats = false;

//Declare game variables
let aura = 8;
let currentlyDoing = 'None'
let currentlyDoingProgress = 0
let drops = 0;
let totalDrops = 0

//Declare Upgrade vars
let chaiTeaBought = false;


//Navigation stuff
const startButton = get('startButton');
const gameToCondensing = get('gameToCondensing');
const condensingToGame = get('condensingToGame');

clickEvent(startButton, function x() {
    hs(oGamePage, 'switch', startPage);
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
    let nextDrop = 50 ** ((totalDrops * 0.5) + 1);
    return nextDrop;
}

//Function to update all counters
function updateCounters() {
    let nextDrop = calculateDropCost();
    let nextDropFixed = nextDrop.toFixed(0);
    let auraFixed = aura.toFixed(0);
    let dropsFixed = drops.toFixed(0);
    let tDropsFixed = totalDrops.toFixed(0);


    auraCounter.innerText = auraFixed;
    statsAuraCounter.innerText = `Aura: ${auraFixed}`;
    statsCurrentlyDoing.innerText = `Currently Doing: ${currentlyDoing}`;
    statsDropsCounter.innerText = `Drops: ${dropsFixed}`;
    buyDropButton.innerText = `${nextDropFixed} Aura`;
    dropsCounter.innerText = dropsFixed;
    tDropsCounter.innerText = tDropsFixed;
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
    if (condensingUnlocked && !dropsInStats) {
        dropsInStats = true;

        const br = document.createElement('br');
        const dropsPH = get('dropsCounterPH');
        const brPH = get('dropsBrPH');

        stats.replaceChild(statsDropsCounter, dropsPH);
        stats.replaceChild(br, brPH);
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


function afford(currency, ) {

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
