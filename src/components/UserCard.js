import React from 'react'

// Custom card component for each user's data
const UserCard = ({ user, deleteUser, editUser }) => {
  const { first_name, last_name, avatar, id } = user

  // Set the CSS max-width attribute directly in the
  // element. `style` accepts a JS object and the
  // attributes use camelcase. See docs for more info.
  // Also using new card class for Bootstrap 4.
  return (
    <div
      className="UserCard card"
      style={{maxWidth: '128px'}}
    >
      <img
        className="card-img-top img-fluid"
        src={avatar}
        alt="user avatar"
      />
      <div className="card-block">
        <h4>{first_name} {last_name}</h4>
        <button href="#" className="btn btn-primary" onClick={deleteUser} data-user-id={id}>Delete</button>
        <button className="btn btn-default" onClick={editUser} data-user-id={id}>Edit</button>
      </div>
    </div>
  )
}

export default UserCard
