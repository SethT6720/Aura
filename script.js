import { get, pageShowing, hs } from './help.js';

const startPage = get('startPage');
const startButton = get('startButton');
const gamePage = get('gamePage');

startButton.addEventListener('click', () => {
    hs(gamePage, 'switch');
});