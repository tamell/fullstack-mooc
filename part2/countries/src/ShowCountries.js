import React, { useEffect } from 'react'
import ShowButton from './ShowButton'

const ShowWeather = ({capital, weather, setWeather}) => {

  const api_key = process.env.REACT_APP_API_KEY
  let req_url = `http://api.weatherstack.com/current/access_key=${api_key}`
  req_url += `/query=${capital}`
  useEffect(() => {
  axios
  .get(req_url)
  .then(response => {
    console.log('promise fulfilled')
    setWeather(response.data)
  })
  console.log(weather)
  }, [])
  return(
    <>
    <h2> Weather in {capital} </h2>
    </>
  )
}
const Countries = ({countries, filterstr, handler, weatherhandler}) => {
  const filtered_con = countries.filter(x => 
                x.name.includes(filterstr))
  if (filtered_con.length > 10){
    return(
      <>
      <p>Too many matches, specify another filter</p>
      </>
    )
  }
  if (filtered_con.length > 1){
    return(
      <>
        {filtered_con.map(x => 
        (<>
        <p>{x.name}
        <ShowButton handler={handler}
                    country={x.name}/>
        </p>
        </>))}     
      </>
    )
  }
  if (filtered_con.length===1){
    const country = filtered_con[0]
    const flag_address = country.flag
    console.log(country)
    return(
      <>
    <h2> {country.name}</h2>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h3>languages</h3>
    <ul>
    {country.languages.map(x => <li>{x.name}</li>)} 
    </ul>
      <img src={flag_address} width="500"/>
    <ShowWeather capital={country.capital}
                weather={weather}
                setWeather={weatherhandler}/>
      </>

    )
  }
  if (filtered_con.length < 1){
    return(
      <>
      <p>No matching countries</p>
      </>
    )
  }
  console.log(filterstr)
}

export default Countries