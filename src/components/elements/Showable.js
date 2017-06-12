import React from 'react'

const Showable = ({show, children}) => {
  if (!show) {
    return null
  }

  return <div>{children}</div>
}

export default Showable
