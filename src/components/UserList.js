import React from 'react'
import UserCard from './UserCard'

const UserList = ({ users, isFetching, deleteUser, editUser }) => {
  // Generate the UserCard for each user
  const userList = users.map((user) =>
    <UserCard user={user} key={user.id} deleteUser={deleteUser} editUser={editUser} />
  )

  // card-group is the layout wrapper for Bootstrap
  // 4 cards. Add ternary operator to conditionally
  // show Loading... if in the process of fetching.
  return (
    <div className="container">
      <h1>User List</h1>
      <div className="card-group">
        {isFetching ? <p>Loading...</p> : userList}
      </div>
    </div>
  )
}

export default UserList
