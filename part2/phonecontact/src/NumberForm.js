import React from 'react'

const NumberForm = ({name, number, handleadd,
    handlename, handlenumber}) => {
return(
<form onSubmit={handleadd}>
    <div> name
        <input value={name} 
            onChange={handlename}/>
    </div>
    <div> number
        <input value={number} 
            onChange={handlenumber}/>
    </div>
    <div>
        <button type="submit">add</button>
    </div>
</form>
)
}

export default NumberForm