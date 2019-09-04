import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      usergender: "",
      userage: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    if (!e.target.value) {
      this.setState({ username: e.target.value });
    } else {
      this.setState({
        username: e.target.value[0].toUpperCase() + e.target.value.slice(1)
      });
    }
  }

  handleOptionChange(e) {
    this.setState({
      usergender: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      userage: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      usergender: this.state.usergender,
      userage: this.state.userage
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then(res => console.log(res.data));

    window.location = "/users/";

    // this.setState({
    //   username: ""
    //  });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required="true"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={this.state.usergender === "Male"}
              onChange={this.handleOptionChange}
            />
            Male
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={this.state.usergender === "Female"}
              onChange={this.handleOptionChange}
            />
            Female
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={this.state.usergender === "Other"}
              onChange={this.handleOptionChange}
            />
            Other
          </div>
          <div className="form-group">
            <label>Age: </label>
            <input
              type="number"
              max="100"
              className="form-control"
              value={this.state.userage}
              onChange={this.onChangeAge}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
