import React from 'react'

const Input = (props) => {
  const classNames = `form-control ${props.className}`

  return (
    <input className={classNames} {...props} />
  )
}

Input.defaultProps = {
  type: 'text'
}

export default Input
