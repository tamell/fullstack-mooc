import React from 'react'

const FilterForm = ({str, handler}) => {
    return(
      <form>
          <div> filter shown with
          <input value={str} 
              onChange={handler}/>
          </div>
      </form>
    )
  }

  export default FilterForm