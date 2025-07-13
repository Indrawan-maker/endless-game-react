import { useState } from "react"
import  languages  from "./languages.js"




export default function AssemblyEndgame() {

        console.log(languages)
        const [currentWord, setCurrentWord] = useState("react")

        const letter = Array.from(currentWord)
        const displayLetter = letter.map(word => <span>{word.toUpperCase()}</span>)

        const lang = languages.map(langObj => 
        <div style={{backgroundColor: langObj.backgroundColor, color: langObj.color}}>{langObj.name}</div>
        )


    return (
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
        </main>
    )
}
