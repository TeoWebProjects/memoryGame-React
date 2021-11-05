import { useEffect, useState } from 'react'
import Card from './components/Card/Card'
import Bat from './images/bat.png'
import Ninja from './images/ninjablade.png'
import Fangs from './images/fangs.png'
import Twister from './images/twister.png'
import Police from './images/police-officer-head.png'
import Golem from './images/robot-golem.png'

const cardImages = [{ src: Bat }, { src: Ninja }, { src: Fangs }, { src: Twister }, { src: Police }, { src: Golem }]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [win, setWin] = useState(false)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [start, setStart] = useState(false)

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), isFlipped: false }))

    setCards(shuffleCards)
  }

  const handleStart = () => {
    setStart(true)
    const allCards = document.querySelectorAll('.front')
    allCards.forEach((card) => {
      card.style.transform = 'rotateY(0deg)'
    })

    setInterval(() => {
      allCards.forEach((card) => {
        card.style.transform = 'rotateY(90deg)'
      })
    }, 2000)
  }

  const handleChoice = (card) => {
    if (choiceOne) {
      setChoiceTwo(card)
      card.isFlipped = true
    } else {
      setChoiceOne(card)
      card.isFlipped = true
    }
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turns + 1)
  }

  const playAgain = () => {
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
    setStart(false)
    setWin(false)
    shuffleCards()
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        resetTurn()
      } else {
        setTimeout(() => {
          choiceOne.isFlipped = false
          choiceTwo.isFlipped = false
          resetTurn()
        }, 750)
      }
      let winCon = 0
      cards.forEach((card) => {
        if (card.isFlipped === true) {
          winCon++
        }
      })

      if (winCon === 12) {
        setWin(true)
      }
    }
  }, [choiceOne, choiceTwo, cards])

  return (
    <>
      <div className="container">
        <div className="header">Memory Game</div>
        {!start ? (
          <button className="startGame" onClick={handleStart}>
            Start
          </button>
        ) : null}

        <div className="cards">
          {cards.map((card) => (
            <Card key={card.id} card={card} handleChoice={handleChoice} isFlipped={card.isFlipped} isStart={start} />
          ))}
        </div>
        <div className="turns">Turns: {turns}</div>
        {win ? (
          <div className="win">
            <div className="winText">You Won in {turns} turns!</div>
            <button className="playAgain" onClick={playAgain}>
              Play Again!
            </button>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default App
