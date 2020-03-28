import React from 'react'

const FilterForm = ({str, handler}) => {
    return(
      <form>
          <div> find countries
          <input value={str} 
              onChange={handler}/>
          </div>
      </form>
    )
  }

  export default FilterForm