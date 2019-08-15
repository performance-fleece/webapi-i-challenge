import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { getUsers, addUser, deleteUser, updateUser } from './actions';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

class App extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    return (
      <div className="App">
        <UserForm addUser={this.props.addUser} />
        <UserList
          users={this.props.users}
          deleteUser={this.props.deleteUser}
          updateUser={this.props.updateUser}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(
  mapStateToProps,
  { getUsers, addUser, deleteUser, updateUser }
)(App);
