import React from 'react'

const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff"
  }
  return (
    <div
      style={styles}
      className='die-face'
      onClick={props.handleDiceHold}
    >
      <h2 className='die-num'>{props.value}</h2>
    </div>
  )
}

export default Die