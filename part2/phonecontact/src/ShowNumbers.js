import React from 'react'

const Numbers = ({persons, filterstr, delHandler}) => {
  const filtered_per = persons.filter(x => 
                x.name.includes(filterstr))
    return(
      <>
        <h2>Numbers</h2>
        {filtered_per.map(x => <p>{x.name} {x.number}
         <button onClick={() => delHandler(x.id, x.name)}> delete </button></p>)}     
      </>
    )
}

export default Numbers