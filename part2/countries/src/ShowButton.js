import React from 'react'

const ShowButton = ({name, handler}) =>{
const lambda = () => handler(name)
  return(
    <>
  <button onClick={lambda} >
    show
  </button>
  </>
  )
}

export default ShowButton