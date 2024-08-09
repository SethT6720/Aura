import { get, pageShowing, hs, createEle } from './help.js';

const startPage = get('startPage');
const startButton = get('startButton');
const gamePage = get('gamePage');

startButton.addEventListener('click', function x() {
    hs(gamePage, 'switch');
    startButton.removeEventListener('click', x);
});
