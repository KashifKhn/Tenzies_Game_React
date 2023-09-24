import { useEffect, useState } from "react";
import Die from "./components/Die"
import { nanoid } from "nanoid";
import Confetti from "react-confetti"


function App() {
  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [rollCount, setRollCount] = useState(0)

  if (second > 59) {
    setMinute(oldMinute => oldMinute + 1)
    setSecond(0)
  }

  useEffect(() => {
    const timeIntervalId = setInterval(() => {
      if (tenzies) {
        return;
      }
      setSecond(oldSecond => oldSecond + 1)
    }, 1000)
    return () => clearInterval(timeIntervalId);
  })
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => firstValue === die.value)
    if (allHeld && allSameValue) {
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

  console.log(rollCount)

  function handleRollDices() {
    setRollCount(oldCount => oldCount + 1);
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateDice()
      }))
    }
    else {
      setMinute(0)
      setSecond(0)
      setTenzies(false)
      setRollCount(0)
      setDice(allNewDice)
    }
  }

  const allDiceElements = dice.map(die => <Die
    key={die.id}
    value={die.value}
    isHeld={die.isHeld}
    handleDiceHold={() => handleDiceHold(die.id)}
  />)

  function handleDiceHold(id) {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      }))
    }
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
            <p className="current-count">{rollCount}</p>
          </div>
          <div className="timer-container">
            <p className="bold-text">Timer</p>
            <p>{String(minute).padStart(2, '0')} : {String(second).padStart(2, '0')}</p>
          </div>
          <div className="best-score-container">
            <p className="bold-text">Best Score</p>
            <p className="current-count">50</p>
          </div>
        </div>
        <div className="dice-container">
          {allDiceElements}
        </div>
        <button onClick={handleRollDices} className="roll-dice-btn">
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  )
}

export default App
