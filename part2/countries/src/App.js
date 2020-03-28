import React, { useState, useEffect} from 'react'
import axios from 'axios'
import FilterForm from './FilterForm'
import Countries from './ShowCountries'


const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [filterstr, setFilter] = useState('')
  const [weather, setWeather] = useState('')
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'Countries')
  
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const handleButton = (country) =>{
    
    setFilter(country)
    console.log(filterstr)
    return(
      <>
      <Countries countries={countries}
              filterstr={filterstr}
              handler={handleButton}
              weatherhandler={setWeather}/>
      </>
    )
  }
  return (
    <div>
      <FilterForm str={filterstr}
                  handler={handleFilter}/>
      <Countries countries={countries}
              filterstr={filterstr}
              handler={handleButton}/>
    </div>
  )

}

export default App