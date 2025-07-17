import React from 'react';
import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "./languages"
import { getFarewellText, getRandomWord } from "./utils"
import Confetti from "react-confetti"
import { useWindowSize } from 'react-use'



export default function AssemblyEndgame() {

    const { width, height } = useWindowSize();
    // State values
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])
    console.log(currentWord)

    // Derived values
    const numGuessesLeft = languages.length - 1
    const wrongGuessCount =
        guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const isGameWon =
        currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= numGuessesLeft
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"


    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    function startNewGame() {
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
    }

    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", isLanguageLost && "lost")
        return (
            <span
                className={className}
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const letterElements = currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })

    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        return (
            <button
                className={className}
                key={letter}
                disabled={isGameOver}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p className="farewell-message">
                    {getFarewellText(languages[wrongGuessCount - 1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Jago juga! 🎉</p>
                </>
            )
        }
        if (isGameLost) {
            return (
                <>
                    <h2 className="h2-lose">Game over!</h2>
                    <p className="lose">Mending ngoding PHP 🤣🤣🤣</p>
                </>
            )
        }

        return null
    }

    return (
        <>


            {

                isGameWon &&
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={500}
                    gravity={0.3}
                    recycle={false}
                />

            }
            <main>
                <header>
                    <h1>Tebak Nama: kawan</h1>
                    <p>Tebak nama kawan kamu, dengan batas salah kurang dari 8 huruf</p>
                </header>

                <section
                    aria-live="polite"
                    role="status"
                    className={gameStatusClass}
                >
                    {renderGameStatus()}
                </section>

                <section className="language-chips">
                    {languageElements}
                </section>

                <section className="word">
                    {letterElements}
                </section>

                {/* Combined visually-hidden aria-live region for status updates */}
                <section
                    className="sr-only"
                    aria-live="polite"
                    role="status"
                >
                    <p>
                        {currentWord.includes(lastGuessedLetter) ?
                            `Yah bener ${lastGuessedLetter} ya itu kata katanya.` :
                            `Sorry bang, ${lastGuessedLetter} salah.`
                        }
                        You have {numGuessesLeft} attempts left.
                    </p>
                    <p>Current word: {currentWord.split("").map(letter =>
                        guessedLetters.includes(letter) ? letter + "." : "blank.")
                        .join(" ")}</p>

                </section>

                <section className="keyboard">
                    {keyboardElements}
                </section>

                {isGameOver &&
                    <button
                        className="new-game"
                        onClick={startNewGame}
                    >Main Lagi</button>}
            </main>
        </>
    )
}
