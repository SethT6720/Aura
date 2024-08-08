import { get, pageShowing, hs } from './help.js';

async function main() {

const startPage = get('startPage');
const startButton = get('startButton');
const gamePage = get('gamePage');

startButton.addEventListener('click', () => {
    hs(gamePage, 'switch');
});

}

window.onload = main();