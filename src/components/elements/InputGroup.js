import React from 'react'

const InputGroup = ({name, labelText, children}) => (
  <div className="form-group">
    <label htmlFor={name}>{labelText}</label>
    {children}
  </div>
)

export default InputGroup
