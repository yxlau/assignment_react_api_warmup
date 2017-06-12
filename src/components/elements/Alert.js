import React from 'react'

const Alert = ({type, children}) => (
  <div className={`alert alert-${type}`} role="alert">
    {children}
  </div>
)

Alert.defaultProps = {
  type: 'success'
}

export default Alert
