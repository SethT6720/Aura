import { get, pageShowing, hs, createEle } from './help.js';

//Delay for async funcs
const sleep = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

//Decalre element variables
const startPage = get('startPage');
const startButton = get('startButton');
const gamePage = get('gamePage');
const numberCounter = get('numberCounter');


//Declare game variables
let number = 9;


//Start button listener
startButton.addEventListener('click', function x() {
    hs(gamePage, 'switch');
    startButton.removeEventListener('click', x);
});

//Function to update all counters
function updateCounters() {
    numberCounter.innerText = number;
}



async function main() {
    while(1 > 0) {
        updateCounters();
        await sleep(100);
    }
}

main();