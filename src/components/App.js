import React from 'react'
import JumbotronFluid from './elements/JumbotronFluid'
import UserList from './UserList'
import UserForm from './UserForm'

const App = ({ users, isFetching, error, onSaveUser, onDeleteUser, onEditUser, user }) => (
  <div className="App">
    <JumbotronFluid
      heading="User CRUD"
      lead="Using an API for User CRUD operations in React Applications"
    />
    <UserList
      users={users}
      isFetching={isFetching}
      deleteUser={onDeleteUser}
      editUser={onEditUser}

    />
    <br />
    <UserForm
      onSubmit={onSaveUser}
      error={error}
      user={user}
    />
  </div>
)

export default App
