import { useEffect, useState } from "react";
import Die from "./components/Die"
import { nanoid } from "nanoid";
import Confetti from "react-confetti"


function App() {
  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => firstValue === die.value)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("you WOn")
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
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateDice()
      }))
    }
    else {
      setTenzies(false)
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
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
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
