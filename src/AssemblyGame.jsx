
import React, { useState } from "react"
import { languages } from "./languages"
import './AssemblyGame.css';
import { clsx } from 'clsx';
import { getFarewellText } from './utils'

export default function AssemblyGame() {
    const [currentWord, setCurrentWord] = useState('react')
    const [guessedLetters, setGuessedLetters] = useState([])
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const gameWon = currentWord.split("").every(currentLetter => guessedLetters.includes(currentLetter))
    const isGameOver = ((wrongGuessCount == languages.length ? true : false) || gameWon)
    const GameLost = isGameOver && !gameWon
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
    //create an array of lost langueges

    // console.log(getFarewellText(wrongGuessCount[wrongGuessCount.length-1]))

    /**
     * Challenge: Bid farewell to each programming language
     * as it gets erased from existance 👋😭
     * 
     * Use the `getFarewellText` function from the new utils.js
     * file to generate the text.
     * 
     * Check hint.md if you're feeling stuck, but do your best
     * to solve the challenge without the hint! 🕵️
     */

    // display the gueesed & correct letter of the word we are gussing
    const letterElements = currentWord.split("").map((letter, index) => {
        const isGussed = guessedLetters.includes(letter)
        const isCorrect = currentWord.includes(letter)
        const className = clsx({
            "span-block": isCorrect && isGussed,
            "span-none": !isGussed || !isCorrect
        })
        return (
            <span className={className} key={index}>{letter.toUpperCase()}</span>
        )
    })

    // render the langueges tabs with their color backgorund. set it to skull if lost
    const languageElements = languages.map((lang, i) => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        return (
            <span
                className={`chip ${i < wrongGuessCount ? "lost" : ""}`}
                // className="chip"
                style={styles}
                key={i}
            >
                {lang.name}
            </span>
        )
    })

    //render the alphabet keyboard buttons. set background to green or red if was correct or wrong.
    const keyboardElements = alphabet.split("").map((letter, index) => {
        const isGussed = guessedLetters.includes(letter)
        const isCorrect = currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect && isGussed,
            wrong: isGussed && !isCorrect
        })

        return (
            <button
                className={className}
                key={letter}
                onClick={() => keyboardCLicked(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    // add to the GuessedLetters array each latter that was clicked
    function keyboardCLicked(letter) {
        setGuessedLetters(prevguess => prevguess.includes(letter) ? prevguess : [...prevguess, letter])
    }
    // colors to the game won/lost div  
    const gameStatusClass = clsx("game-status", {
        won: gameWon,
        lost: GameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })

    // goodbaye to wrong languege
    const [languageNames] = useState(languages.map((lang) => lang.name));
    let displayWrongLanguege = languageNames.length >2 ? getFarewellText(languageNames[wrongGuessCount - 1]) : null

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                    programming world safe from Assembly!</p>
            </header>
            {/* game won */}
            {gameWon && <section className={gameStatusClass}>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </section>}

            {/* Game not ended */}
            {!gameWon && !lastGuessedLetter && <section className={gameStatusClass}>
            </section>}

            {/* Game lost */}
            {GameLost && <section className={gameStatusClass}>
                <h2>Game over!</h2>
                <p>You lose! Better start learning Assembly 😭</p>
            </section>}

            {/* Game lost */}
            {GameLost && <section className={gameStatusClass}>
                {wrongGuessCount}
            </section>}

            {<section className={gameStatusClass}>
            { displayWrongLanguege}
            </section>}

            <section className="language-chips">
                {languageElements}
            </section>
            <section className="word">
                {letterElements}
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            {isGameOver ? <button className="new-game">New Game</button> : null}
        </main>
    )
}
