import React from 'react'


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
    return (
      <div>
          {parts.map(part => <Part part={part.name}
                                    ex={part.exercises}/>)}
      </div>
    )
  }
  const Total = (props) => {
    const exs = props.course.parts.map(part=>part.exercises)
    const total = 
        exs.reduce( (s, p) => s+p )
    return(
      <>
         <p>Number of exercises {total}</p>
      </>
    )
  }
  const Course = ({course}) => {
    return (
      <>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </>
    )
  }

  export default Course