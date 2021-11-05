import React from 'react'
import CardBack from '../../images/cardback.png'
const Card = ({ card, handleChoice, isFlipped, isStart }) => {
  const handleClick = (e) => {
    e.preventDefault()
    handleChoice(card)
  }

  return (
    <div className="con">
      <img src={CardBack} alt="carback" className={isStart ? 'back isEnable' : 'back'} onClick={handleClick} />
      <img src={card.src} alt="bat" className={isFlipped ? 'front isFlipped' : 'front'} />
    </div>
  )
}

export default Card
