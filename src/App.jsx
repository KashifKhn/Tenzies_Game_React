import { useEffect, useState } from "react";
import Die from "./components/Die"
import { nanoid } from "nanoid";
import Confetti from "react-confetti"


function App() {
  const [gameStart, setGameStart] = useState(false)
  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [countRoll, setCountRoll] = useState(0)
  const [bestScore, setBestScore] = useState(localStorage.getItem("bestScore") || 9999999)

  if (second > 59) {
    setMinute(oldMinute => oldMinute + 1)
    setSecond(0)
  }

  if (tenzies) {
    if (countRoll < bestScore)
      setBestScore(countRoll)
    localStorage.setItem("bestScore", bestScore)
  }

  useEffect(() => {
    const timeIntervalId = setInterval(() => {
      if (!gameStart)
        return;
      if (tenzies)
        return;
      setSecond(oldSecond => oldSecond + 1)
    }, 1000)
    return () => clearInterval(timeIntervalId);
  })

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => firstValue === die.value)
    if (allHeld && allSameValue) {
      if (bestScore > countRoll) {
        setBestScore(countRoll)
      }
      setTenzies(true)
    }
  }, [dice])

  function generateDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice())
    }
    return newDice;
  }

  function handleRollDices() {
    setCountRoll(oldCount => oldCount + 1);
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateDice()
      }))
    }
    else {
      setMinute(0)
      setSecond(0)
      setTenzies(false)
      setCountRoll(0)
      setDice(allNewDice)
      setGameStart(false)
    }
  }

  const allDiceElements = dice.map(die => <Die
    key={die.id}
    value={die.value}
    isHeld={die.isHeld}
    handleDiceHold={() => handleDiceHold(die.id)}
  />)

  function handleDiceHold(id) {
    if (!tenzies && gameStart) {
      setDice(oldDice => oldDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      }))
    }
    else 
      alert("Please start The Game")
  }

  function handleGameStart() {
    setGameStart(oldGameStart => !oldGameStart)
  }

  const winingText = `🌟🎉 Woo-hoo! 🎉🌟
  👏👏👏 Let's give it up for the CHAMPION! 🏆🥇
  🎉 Congratulations 🎉 🚀💫💥`

  const instructionsText = "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions" style={tenzies ? { fontWeight: "bold" } : {}}>
          {tenzies ? winingText : instructionsText}
        </p>
        <div className="count-container">
          <div className="current-score-container">
            <p className="bold-text">Score</p>
            <p className="current-count">{countRoll}</p>
          </div>
          <div className="timer-container">
            <p className="bold-text">Timer</p>
            <p>{String(minute).padStart(2, '0')} : {String(second).padStart(2, '0')}</p>
          </div>
          <div className="best-score-container">
            <p className="bold-text">Best Score</p>
            {bestScore === 9999999 ? <p className="current-count">0</p> : <p className="current-count">{bestScore}</p>}
          </div>
        </div>
        <div className="dice-container">
          {allDiceElements}
        </div>
        {
          gameStart ?
            <button onClick={handleRollDices} className="roll-dice-btn">
              {tenzies ? "New Game" : "Roll"}
            </button>
            :
            <button onClick={handleGameStart} className="roll-dice-btn">
              Start Game
            </button>
        }
      </main>
    </div>
  )
}

export default App
