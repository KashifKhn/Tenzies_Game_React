import { useState } from "react";
import Die from "./components/Die"
import { nanoid } from "nanoid";


function App() {
  const [dice, setDice] = useState(allNewDice);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(
        {
          id: nanoid(),
          value: Math.ceil(Math.random() * 6),
          isHeld: false
        }
      )
    }
    return newDice;
  }

  function handleRollDices() {
    setDice(allNewDice)
  }

  const allDiceElements = dice.map(die => <Die key={die.id} value={die.value} />)

  return (
    <div className="App">
      <main>
        <div className="dice-container">
          {allDiceElements}
        </div>
        <button onClick={handleRollDices} className="roll-dice-btn">Roll</button>
      </main>
    </div>
  )
}

export default App
