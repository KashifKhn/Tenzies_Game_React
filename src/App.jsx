import { useState } from "react";
import Die from "./components/Die"


function App() {
  const [dice, setDice] = useState(allNewDice);
  
  function allNewDice () {
    const newDice = [];
    for(let i=0; i<10; i++) {
      newDice.push(Math.ceil(Math.random() * 6))
    }
    return newDice;
  }

  function handleRollDices () {
    setDice(allNewDice)
  }

  const allDiceElements = dice.map(die => <Die value={die}/>)

  console.log(allNewDice())
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
