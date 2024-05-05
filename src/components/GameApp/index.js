import {Component} from 'react'
import ThumbnailItem from '../ThumbnailItem'

import './index.css'

class GameApp extends Component {
  constructor(props) {
    super(props)
    this.timer = undefined
    const {tabsList} = props

    this.state = {
      randomNum: 0,
      selected: tabsList[0].tabId,
      time: 60,
      score: 0,
      gameOver: false,
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  restart = () => {
    const {tabsList} = this.props
    const {tabId} = tabsList[0]

    this.setState({
      randomNum: 0,
      selected: tabId,
      time: 60,
      score: 0,
      gameOver: false,
    })
    this.startTimer()
  }

  startTimer = () => {
    const {imagesList} = this.props
    const randomNum = Math.floor(Math.random() * imagesList.length)

    this.setState({randomNum})

    this.timer = setInterval(() => {
      this.setState(pre => ({time: pre.time - 1}))
      const {time} = this.state

      if (time === 0) {
        this.setState({gameOver: true})
        clearInterval(this.timer)
      }
    }, 1000)
  }

  onTabChange = event => {
    this.setState({selected: event.target.value})
  }

  onClickThumbnail = value => {
    const {imagesList} = this.props
    const {randomNum} = this.state
    const randomImg = imagesList[randomNum]

    if (randomImg.id === value) {
      this.setState(prev => ({
        score: prev.score + 1,
        randomNum: Math.floor(Math.random() * imagesList.length),
      }))
    } else {
      clearInterval(this.timer)
      this.setState({gameOver: true})
    }
  }

  renderMainContainer = () => {
    const {tabsList, imagesList} = this.props
    const {selected, randomNum} = this.state
    const {imageUrl} = imagesList[randomNum]
    return (
      <>
        <img className="display-image" src={imageUrl} alt="match" />

        <ul className="tab-con">
          {tabsList.map(each => (
            <li key={each.tabId}>
              <button
                type="button"
                className={
                  selected === each.tabId ? 'tab-btns selected-tab' : 'tab-btns'
                }
                onClick={this.onTabChange}
                value={each.tabId}
              >
                {each.displayText}
              </button>
            </li>
          ))}
        </ul>
        <ul className="thumbnail-con">
          {imagesList
            .filter(item => item.category === selected)
            .map(e => (
              <ThumbnailItem
                imagesListItem={e}
                key={e.id}
                onClickThumbnail={this.onClickThumbnail}
              />
            ))}
        </ul>
      </>
    )
  }

  renderGameOverCard = () => {
    const {score} = this.state
    return (
      <div className="game-over-con">
        <img
          className="trophy"
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
        />
        <p className="score-title">YOUR SCORE</p>
        <h1 className="score">{score}</h1>
        <button type="button" className="play-again-btn" onClick={this.restart}>
          <img
            className="play-again-img"
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
          />
          PLAY AGAIN
        </button>
      </div>
    )
  }

  render() {
    const {time, score, gameOver} = this.state

    return (
      <div className="main-container">
        <div className="nav-bar">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
          />
          <ul className="nav-items-con">
            <li>
              <p className="nav-item">
                Score:<span className="nav-span"> {score}</span>
              </p>
            </li>

            <li className="timer-con">
              <img
                className="timer-logo"
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
              />
              <p className="nav-span">{time} sec</p>
            </li>
          </ul>
        </div>
        <div className="container">
          <div className="content-container">
            {gameOver ? (
              <>{this.renderGameOverCard()}</>
            ) : (
              <>{this.renderMainContainer()}</>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default GameApp
