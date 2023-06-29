import { Audio } from 'expo-av';

export const fetchData = (url) => {
    console.log(`Fetching data from ${url}`);
    return fetch(url)
}

async function playSound(asset) {
    const { sound } = await Audio.Sound.createAsync(asset);
    await sound.playAsync();
}

async function playSelectionSound() {
    await playSound(require('../assets/sounds/selection.mp3'));
}

async function playAnswerSound() {
    await playSound(require('../assets/sounds/answer.mp3'));
}

async function playNextSound() {
    await playSound(require('../assets/sounds/next.mp3'));
}

async function playClapsSound() {
    await playSound(require('../assets/sounds/claps.mp3'));
}

async function playBackgroundMusic() {
    await playSound(require('../assets/sounds/background.mp3'));
}

export {
    playSelectionSound,
    playAnswerSound,
    playNextSound,
    playClapsSound,
    playBackgroundMusic
}
