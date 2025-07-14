import { useState } from "react"
import  languages  from "./languages.js"
import { clsx } from "clsx"




export default function AssemblyEndgame() {


        const [night, setNight] = useState(true)
        const [currentWord, setCurrentWord] = useState("react")
        const [currentKeyboard, setCurrentKeyboard] = useState([])

        const letter = Array.from(currentWord)
        const displayLetter = letter.map(word => <span key={word}>{word.toUpperCase()}</span>)

        const alphabet = "abcdefghijklmnopqrstuvwxyz"

        const lang = languages.map(langObj => 
        <div style={{backgroundColor: langObj.backgroundColor, color: langObj.color}} key={langObj.name}>{langObj.name}</div>
        )


        function handleKeyboard(letter) {
            setCurrentKeyboard(prevkybord => 
                prevkybord.includes(letter) ?
                prevkybord :
                [...prevkybord, letter])
        }
        
        const btnElement = alphabet.split("").map(alpha => {
            const isGuesses = currentWord.includes(alpha)
            const isLetter = currentKeyboard.includes(alpha)
            
            const result = clsx({
                "correct": isGuesses && !isLetter,
                "wrong": isGuesses && isLetter
            })

            return (
                <button key={alpha} className={result} onClick={() => handleKeyboard(letter)}>{alpha.toUpperCase()}</button>
        )}
        )

        function handleNightMode(boolean) {
            setNight(prevValue => !prevValue)
        }






    return (
        <>
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
            </header>
            <section className="game-status">
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </section>
            <section className="lang-wrapper">
            {lang}
            </section>
            <section className="word-wrapper">
                {displayLetter}
            </section>
            <section className="btn-wrapper">
                {btnElement}
            </section>
            <section className="ng-wrapper">
                <button className="btn-three">New Game</button>
            </section>
        </main>
            <section>
                <button className="nightMode" onClick={handleNightMode}> turn Night Mode</button>
            </section>
        </>
    )
}
