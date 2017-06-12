import React from 'react'
import Input from './elements/Input'
import InputGroup from './elements/InputGroup'
import Button from './elements/Button'
import Alert from './elements/Alert'
import Showable from './elements/Showable'



class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      avatar: '',
      id: '',
    }
    this.onSubmit = this.props.onSubmit.bind(this)
    this.error = this.props.error
  }

  updateField = (e) => {
    this.setState({
      [e.target.getAttribute('name')]: e.target.value
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.user);
  }


  // ({ onSubmit, error, user })
  render() {
    const error = this.error
    const { first_name, last_name, avatar } = this.state
    return (
      <form className="container" onSubmit={this.onSubmit} >
    <h1>Add New User</h1>
    <Showable show={error}>
      <Alert type="danger">
        Oops, there was a problem...
      </Alert>
    </Showable>
    <InputGroup name="first_name" labelText="First Name">
      <Input name="first_name" onChange={this.updateField} value={first_name}/>
    </InputGroup>
    <InputGroup name="last_name" labelText="Last Name">
      <Input name="last_name" value={last_name} onChange={this.updateField} />
    </InputGroup>
    <InputGroup name="avatar" labelText="Photo Link">
      <Input name="avatar" value={avatar} onChange={this.updateField} />
    </InputGroup>
    <Button type="submit" color="primary">Save User</Button>
  </form>
    )

  }
}


export default UserForm
