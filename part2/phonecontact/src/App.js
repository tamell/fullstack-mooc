import React, { useState, useEffect} from 'react'
import axios from 'axios'
import FilterForm from './FilterForm'
import NumberForm from './NumberForm'
import Numbers from './ShowNumbers'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filterstr, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'Persons')
  
  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const addPerson = (event) =>{
    event.preventDefault()
    const PersonObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    let savename = true
    persons.forEach(person => 
      {if (person.name === newName){
        savename = false
      }
    })
    if (savename)
    {
      setPersons(persons.concat(PersonObject))     
    }
    else
    {
      const message = `${newName} is already added to phonebook`
      window.alert(message)
    }
    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm str={filterstr}
                  handler={handleFilter}/>
      <h2>add a new</h2>
      <NumberForm name={newName}
                  number= {newNumber}
                  handleadd= {addPerson}
                  handlename={handleNewName}
                  handlenumber= {handleNewNumber} />
      <Numbers persons={persons}
              filterstr={filterstr}/>
    </div>
  )

}

export default App