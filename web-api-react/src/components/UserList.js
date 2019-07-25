import React from 'react';
import UserCard from './UserCard';

const UserList = props => {
  return (
    <div className="user-list">
      {props.users.map(user => {
        return (
          <UserCard key={user.id} user={user} deleteUser={props.deleteUser} />
        );
      })}
    </div>
  );
};

export default UserList;
