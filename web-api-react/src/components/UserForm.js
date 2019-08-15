import React from 'react';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bio: ''
    };
  }

  handleChange = e => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newuser = this.state;
    this.props.addUser(e, newuser);
    this.setState({
      name: '',
      bio: ''
    });
  };

  render() {
    return (
      <div className="user-form">
        <form>
          <div>
            <label>name</label>
            <input
              onChange={this.handleChange}
              placeholder="name.."
              value={this.state.name}
              name="name"
              type="text"
            />
          </div>
          <div>
            <label>bio</label>
            <input
              onChange={this.handleChange}
              placeholder="bio.."
              value={this.state.bio}
              name="bio"
              type="text"
            />
          </div>
        </form>
        <button onClick={this.handleSubmit}>AddUser</button>
      </div>
    );
  }
}

export default UserForm;
