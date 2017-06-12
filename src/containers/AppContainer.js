import React, { Component } from 'react'
import App from '../components/App'
import serialize from 'form-serialize'

class AppContainer extends Component {
  constructor() {
    super()

    // Initialize users in state as an empty array and
    // set isFetching to false.
    this.state = {
      users: [],
      isFetching: false,
      error: null,
      user: {},
      edit: false
    }
  }

  componentDidMount() {
    // Before performing the fetch, set isFetching to true
    this.setState({ isFetching: true })

    // After component mounts, call the API to get the
    // users, then update state which triggers re-render.
    // Add a delay to the URL and reset isFetching upon
    // completion of the request.
    fetch('https://reqres.in/api/users?delay=1')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          users: json.data,
          isFetching: false,
        })
      })
  }

  onSaveUser = (e) => {
    e.preventDefault()


    const form = e.target
    const body = serialize(form, { hash: true })

    // Create headers to set the content type to json
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    // Set options, and stringify the body to JSON
    const options = {
      headers,
      method: 'POST',
      body: JSON.stringify(body),
    }

    if (this.state.edit) {
      this.saveUserEdits(form, body, options);

    } else {
      // Before performing the fetch, set isFetching to true
      this.setState({ isFetching: true })

      fetch('https://reqres.in/api/users', options)
        .then((response) => {
          // If response not okay, throw an error
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`)
          }

          // Otherwise, extract the response into json
          return response.json()
        })
        .then((json) => {
          // Update the user list and isFetching.
          // Reset the form in a callback after state is set.
          this.setState({
            isFetching: false,
            users: [
              ...this.state.users,
              json,
            ],
          }, () => { form.reset() })
        })
        .catch((error) => {
          // Set error in state & log to console
          console.log(error)
          this.setState({
            isFetching: false,
            error,
          })
        })
    }

  }

  onDeleteUser = (e) => {
    e.preventDefault();
    const options = {
      method: 'DELETE'
    }
    const id = e.target.getAttribute('data-user-id')
    fetch('https://reqres.in/api/users/' + id, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('User could not be deleted')
        }
        return response
      })
      .then((json) => {
        this.setState({
          users: this.state.users.filter((user) => {
            return (user.id !== id)
          })
        })
        console.log('User deleted')
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onEditUser = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('data-user-id')
    fetch('https://reqres.in/api/users/' + id, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not retrieve user information')
        }
        return response.json()
      })
      .then(json => {
        this.setState({
          user: json.data,
          edit: true
        })
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }

  saveUserEdits = (form, data, options) => {
    options.method = 'PUT';
    var index = this.state.users.findIndex(user => {
      return user.id === this.state.user.id
    })
    fetch('https://reqres.in/api/users/' + this.state.user.id, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not update user')
        }
        return response.json()
      })
      .then((json) => {
        // we shouldn't do this, but we'll cheat a bit for this exercise
        data.id = this.state.user.id
        this.state.users[index] = data
        this.setState({
          user: {
            first_name: '',
            last_name: '',
            avatar: '',
          },
          edit: false,
        }, () => { form.reset() })
      })
      .catch(error => {
        console.log('Error', error);
      })

  }


  render() {
    return (
      <App onSaveUser={this.onSaveUser} onDeleteUser={this.onDeleteUser} onEditUser={this.onEditUser} {...this.state} />
    )
  }
}

export default AppContainer
