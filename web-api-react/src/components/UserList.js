import React from 'react';
import UserCard from './UserCard';

const UserList = props => {
  return (
    <div className="user-list">
      {props.users.map(user => {
        return (
          <UserCard
            key={user.id}
            user={user}
            deleteUser={props.deleteUser}
            updateUser={props.updateUser}
          />
        );
      })}
    </div>
  );
};

export default UserList;
