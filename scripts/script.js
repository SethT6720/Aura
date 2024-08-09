import { get, pageShowing, hs } from './help.js';

async function main() {

    const sleep = (ms) => new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

    const location = await page.evaluate(() => document.location.href);

    const startPage = get('startPage');
    const startButton = get('startButton');
    const gamePage = get('gamePage');

    startButton.addEventListener('click', function x() {
        hs(gamePage, 'switch');
        startButton.removeEventListener('click', x);
    });

}

main();