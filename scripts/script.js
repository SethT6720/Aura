import { get, pageShowing, hs } from './help.js';

async function main() {

    const sleep = (ms) => new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

    await sleep(1500);

    const startPage = get('startPage');
    const startButton = get('startButton');
    const gamePage = get('gamePage');

    startButton.addEventListener('click', function x() {
        hs(gamePage, 'switch');
        startButton.removeEventListener('click', x);
    });

}

main();