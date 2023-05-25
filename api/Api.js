import { Audio } from 'expo-av';

export const fetchData = (url) => {
    console.log(`Fetching data from ${url}`);
    return fetch(url)
}

async function playSound(asset){
    const { sound } = await Audio.Sound.createAsync( asset );
    await sound.playAsync();
}

async function playSelectionSound(){
    await playSound( require('../assets/selection.mp3') );
}

async function playAnswerSound(){
    await playSound( require('../assets/answer.mp3') );
}

async function playNextSound(){
    await playSound( require('../assets/next.mp3') );
}

async function playClapsSound(){
    await playSound( require('../assets/claps.mp3') );
}

export {
    playSelectionSound,
    playAnswerSound,
    playNextSound,
    playClapsSound
}
