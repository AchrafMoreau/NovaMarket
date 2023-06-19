import React from 'react'

export const Message = ({variant, children}) => {
  return (
    <div className={`alert ${variant}`}>
        {children}      
    </div>
  )
}

Message.defaultProps = {
    variant : "info"
}
