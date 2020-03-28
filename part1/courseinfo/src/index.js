import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}
const Part = (props) =>{
  return(
    <>
      <p>
        {props.part} {props.ex}
      </p>
    </>
  )
}
const Content = (props) => {
  const parts = props.course.parts
  const [part1, part2, part3] = parts
  return (
    <div>
    <Part part={part1.name}
          ex={part1.exercises}
          />
    <Part part={part2.name}
          ex={part2.exercises}
          />
    <Part part={part3.name}
          ex={part3.exercises}
          />
    </div>
  )
}
const Total = (props) => {
  const parts = props.course.parts
  const [part1, part2, part3] = parts
  const ex1 = part1.exercises
  const ex2 = part2.exercises
  const ex3 = part3.exercises
  const n_exercises = ex1+ex2+ex3
  return(
    <>
       <p>Number of exercises {n_exercises}</p>
    </>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }  
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
