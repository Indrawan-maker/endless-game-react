import { useState } from "react"
import  languages  from "./languages.js"
import { clsx } from "clsx"




export default function AssemblyEndgame() {


        const [currentWord, setCurrentWord] = useState("indrawan")
        const [currentKeyboard, setCurrentKeyboard] = useState([])

        const wrongGuessCount = currentKeyboard.filter( word => 
            !currentWord.includes(word)
        ).length
        console.log(wrongGuessCount)

        const displayLetter = currentWord.split("").map((word, index) => 
        <span key={index} className="letter">
            {currentKeyboard.includes(word) ? word.toUpperCase() : ""}
        </span>
        )

        const alphabet = "abcdefghijklmnopqrstuvwxyz"

        const lang = languages.map((langObj, i ) => {
            const isLost = i < wrongGuessCount
            const className = clsx("chip", isLost && "lost")
        return (
            <span style={{backgroundColor: langObj.backgroundColor, color: langObj.color}} 
            className={className} key={langObj.name}>{langObj.name}
            </span>
        )}
        )


        function handleKeyboard(letter) {
            setCurrentKeyboard(prevkybord => 
                prevkybord.includes(letter) ?
                prevkybord :
                [...prevkybord, letter])
        }
        
        const btnElement = alphabet.split("").map(alpha => {
            const isGuesess = currentKeyboard.includes(alpha)
            const isCorrect = isGuesess && currentWord.includes(alpha)
            const isWrong = isGuesess && !currentWord.includes(alpha)
            const className = clsx({
                correct: isCorrect,
                wrong: isWrong
            })
            return (
                <button key={alpha} className={className} onClick={() => handleKeyboard(alpha)}>{alpha.toUpperCase()}</button>
        )}
        )


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
            {/* <section>
                <button className="nightMode" onClick={handleNightMode}> turn Night Mode</button>
            </section> */}
        </>
    )
}
