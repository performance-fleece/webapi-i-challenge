import React from 'react';

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      name: '',
      bio: ''
    };
  }

  handleChange = e => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };

  updateToggle = e => {
    this.setState(prevState => ({
      isUpdating: !prevState.isUpdating
    }));
  };

  updateHandler = (e, id) => {
    e.preventDefault();
    const { name, bio } = this.state;
    const updatedUser = { name, bio };
    this.props.updateUser(id, updatedUser);
    this.updateToggle();
  };

  render() {
    return (
      <div className="user-card">
        {this.state.isUpdating ? (
          <div className="name-wrapper">
            <label>name</label>
            <input
              onChange={this.handleChange}
              placeholder="name.."
              value={this.state.name}
              name="name"
              type="text"
            />
          </div>
        ) : (
          <div className="name-wrapper">
            <p>name: {this.props.user.name}</p>
          </div>
        )}

        {this.state.isUpdating ? (
          <div className="bio-wrapper">
            <label>name</label>
            <input
              onChange={this.handleChange}
              placeholder="bio.."
              value={this.state.bio}
              name="bio"
              type="text"
            />
          </div>
        ) : (
          <div className="bio-wrapper">
            <p>name: {this.props.user.bio}</p>
          </div>
        )}

        <button onClick={() => this.props.deleteUser(this.props.user.id)}>
          Delete
        </button>
        {this.state.isUpdating ? (
          <button onClick={e => this.updateHandler(e, this.props.user.id)}>
            Update
          </button>
        ) : (
          <button onClick={this.updateToggle}>Update</button>
        )}
      </div>
    );
  }
}

export default UserCard;
