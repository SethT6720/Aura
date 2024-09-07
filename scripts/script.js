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

//Drop Skill Buttons
const chaiTea = get('doubleMeditate');
const yogaMat = get('doubleMeditate2');
const mindDivide = get('autoMeditator');

const respecSkills = get('respecSkills');

//Declare Skill vars
let layerTwoUnlock = false;

let chaiTeaBought = false;
let chaiTeaBonus = 0;
let yogaMatBought = false;
let yogaMatBonus = 1;
let mindDivideBought = false;
let mindDivideXPerSec = 0;

//Declare Flags
let condensingUnlocked = false;
let dropsInStats = false;

//Declare game variables
let aura = 49;
let auraPerMeditate = 1;
let meditatePerSec = 0;
let currentlyDoing = 'None'
let currentlyDoingProgress = 0;
let drops = 0;
let totalDrops = 0;


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

function updateOtherThings() {
    stuffChecker('apc');
    stuffChecker('mps');
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

function upgradeChecker() {
    if (chaiTeaBought) {chaiTeaBonus = 1;}
    if (yogaMatBought) {yogaMatBonus = 2;}
    if (mindDivideBought) {mindDivideXPerSec = 1;}
}

function skillsBought() {
    function x(ele) {
        let bool = ele.classList.includes('bought');
        return bool;
    }

    if (x(chaiTea)) {
        chaiTeaBought = true;
    } else {
        chaiTeaBought = false;
    }
    if (x(yogaMat)) {
        yogaMatBought = true;
    } else {
        yogaMatBought = false;
    }
    if (x(mindDivide)) {
        mindDivideBought = true;
    } else {
        mindDivideBought = false;
    }

    upgradeChecker();
}

function whatSkills() {
    let layer1 = document.getElementsByClassName('layerOneSkill');
    let layer1Bought = document.getElementsByClassName('layerOneSkill bought');

    if (layer1.length === layer1Bought.length) {
        let list = document.getElementsByClassName('layerTwoSkill hide');
        for (let i = 0; i < list.length; i++) {
            list[0].classList.remove('hide');
        }
    }
}

function stuffChecker(what) {
    switch (what) {
        case 'apc':
            auraPerMeditate = (1 + chaiTeaBonus) * yogaMatBonus;
            break;
        case 'mps':
            meditatePerSec = mindDivideXPerSec;
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


function afford(currency, price) {
    if (currency >= price) {
        return true
    } else {
        return false;
    }
}




//Game code

clickEvent(auraButton, function x() {
    aura += auraPerMeditate;
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

clickEvent(chaiTea, function x() {
    let price = 1;
    let currency = 'drops';
    let able = afford(drops, price);

    if (able) {
        chaiTea.removeEventListener('click', x);
        drops -= price;
        chaiTea.classList.add('bought');
        sendCons('You have purchased a lifetime supply of Chai Tea');
    } else {
        sendCons(`You need ${price} ${currency} to purchase this skill`);
    }
});

clickEvent(yogaMat, function x() {
    let price = 1;
    let currency = 'drops';
    let able = afford(drops, price);

    if (able) {
        yogaMat.removeEventListener('click', x);
        drops -= price;
        yogaMat.classList.add('bought');
        sendCons('You have purchased a Yoga Mat');
    } else {
        sendCons(`You need ${price} ${currency} to purchase this skill`);
    }
});

clickEvent(mindDivide, function x() {
    let price = 1;
    let currency = 'drops';
    let able = afford(drops, price);

    if (able) {
        mindDivide.removeEventListener('click', x);
        drops -= price;
        mindDivide.classList.add('bought');
        sendCons('You have learned how to Divide your Mind');
    } else {
        sendCons(`You need ${price} ${currency} to purchase this skill`);
    }
});

clickEvent(respecSkills, function x() {

});




//Main and Meditate per second

async function medPerSec() {
    while (true) {
        if (meditatePerSec <= 10 && meditatePerSec !== 0) {
            aura += auraPerMeditate;
            await sleep(1000 / meditatePerSec);
        } else if (meditatePerSec > 10) {
            aura += (auraPerMeditate * meditatePerSec / 10)
            await sleep(100);
        } else {
            await sleep(250);
        }
    }
}

async function main() {
    while(1 > 0) {
        updateCounters();
        updateOtherThings();
        flagChecker();
        whatSkills();
        skillsBought();
        await sleep(100);
    }
}

main();
medPerSec();
