import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const StatisticsLine = (props) => {
  return(
    <>
    <tr> 
      <td>{props.name} </td>
      <td>{props.value} </td>
    </tr>
  </>
  )
}
const Header = (props) => {
  return(
    <>
    <h1> {props.text}</h1>
    </>
  )
}
const Button = ({text, handler}) => {
  return(
    <>
    <button onClick={handler}>{text}</button>
    </>
  )
}
const Statistics =  ({good, bad, neutral, title}) =>{
  if (good+bad+neutral== 0){
    return(
      <>
      <Header text='No feedback'/>
      </>
    )
  }
  const total = good+bad+neutral
  const pos = good/total

  const denom = good + bad*(-1)
  const avg = denom/total
  return(
    <>
    <Header text={title}/>
      <table>
      <StatisticsLine name={'good'}
                value={good}/>
      <StatisticsLine name={'neutral'}
                value={neutral}/>
      <StatisticsLine name={'bad'}
                value={bad}/>
      <StatisticsLine name={'average'}
                value={avg}/>
      <StatisticsLine name={'positive'}
                value={pos} />
      </table>
  </>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const buttonText = 'give feedback'
  const statText = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  return (
    <div>
      <Header text={buttonText}/>
      <Button handler={handleGoodClick}
                text={'good'}/>
      <Button handler={handleNeutralClick}
                text={'neutral'}/>
      <Button handler={handleBadClick}
                text={'bad'}/>
      <Statistics title={statText}
                  good={good}
                  bad={bad}
                  neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
