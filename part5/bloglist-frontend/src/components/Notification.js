import React from 'react'

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

export default Notification