import React, { useState, useEffect} from 'react'
import FilterForm from './FilterForm'
import NumberForm from './NumberForm'
import Numbers from './ShowNumbers'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  let classname = ''
  if (message.startsWith('Error')){
     classname = 'error'
  }
  else{
     classname = 'notify'
  }
  return (
    <div className={classname}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filterstr, setFilter] = useState('')
  const [notifyMessage, setNotifyMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initNumbers =>{setPersons(initNumbers)})
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
    }
    let savename = true
    let oldID = 10000
    persons.forEach(person => 
      {if (person.name === newName){
        savename = false
        oldID = person.id
      }
    })
    if (savename)
    {
      personService
      .create(PersonObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotifyMessage( `Phone number of '${newName}' has been saved to server`)       
        setTimeout(() => { 
         setNotifyMessage(null)},
          5000)
      })
    }
    else
    {
      const message = `${newName} is already added to phonebook,
                       replace the old number with a new one?`
      const result = window.confirm(message)
      if (result) {
        PersonObject.id = oldID
        personService
        .updateObj(PersonObject)
        .then(response =>{
          console.log(response)
          setNotifyMessage( `Phone number of '${newName}' has been changed`)       
          setTimeout(() => { 
          setNotifyMessage(null)},
            5000)
        })
      }
    }
    setNewName('')
    setNewNumber('')
  }
  const delNumber = (id, name) => {
    const message = `Delete ${name} ?`
    console.log(id)
    const result = window.confirm(message)
    if (result) {
      personService
      .delPerson(id)
      .then(delcode =>{
        console.log(delcode)
      })
      .then(()=>{
        setNotifyMessage( `Phone number of '${name}' has been removed from server`)       
        setTimeout(() => { 
         setNotifyMessage(null)},
          5000)
      })
      .catch(error => {
        setNotifyMessage(`Error: Phone number of '${name}' has been removed from server earlier` )
        setTimeout(() => { 
          setNotifyMessage(null)},
           5000)
      })
      const remPersons = persons.filter(x => x.id != id)
      console.log(remPersons)
      setPersons(remPersons)
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifyMessage} />
      <FilterForm str={filterstr}
                  handler={handleFilter}/>
      <h2>add new contact</h2>
      <NumberForm name={newName}
                  number= {newNumber}
                  handleadd= {addPerson}
                  handlename={handleNewName}
                  handlenumber= {handleNewNumber} />
      <Numbers persons={persons}
              filterstr={filterstr}
              delHandler={delNumber}/>
    </div>
  )

}

export default App