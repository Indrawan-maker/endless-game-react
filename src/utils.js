import { words } from "./words"

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}

export function getFarewellText(language) {
    const options = [
        `jangan deketin dia dia ngoding pakai ${language}`,
        `Ngoding ${language} bikin malass`,
        `${language} detected, ampunn puhhh`,
        `Skip ${language}, otak udah dah tak kuat ni upin`,
        `ngoding ${language} bikin ngantuk`,
        `Denis sekarang bayangin kamu ngoding ${language} terus dapat lambo`,
        `Ngoding ${language}, meding scroll fesnuk`,
        `${language}? mending doomscrooling dulu`,
        `Ngoding ${language} = dapat lambo`,

    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}