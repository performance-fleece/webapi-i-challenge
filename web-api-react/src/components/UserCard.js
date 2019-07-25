import React from 'react';

const UserCard = props => {
  return (
    <div className="user-card">
      <p>name: {props.user.name}</p>
      <p>bio: {props.user.bio}</p>
      <button onClick={() => props.deleteUser(props.user.id)}>Delete</button>
    </div>
  );
};

export default UserCard;
