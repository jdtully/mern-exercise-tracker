import React, { Component } from "react";
import axios from "axios";

export default class EditUsers extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeUsergender = this.onChangeUsergender.bind(this);
    this.onChangeUserage = this.onChangeUserage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      usergender: "",
      userage: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/users/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          usergender: response.data.description,
          userage: response.data.duration
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/users/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.user)
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeUsergender(e) {
    this.setState({
      usergender: e.target.value
    });
  }

  onChangeUserage(e) {
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
      .post(
        "http://localhost:5000/users/update" + this.props.match.params.id,
        user
      )
      .then(res => console.log(res.data));
    window.location = "/";
  }
  render() {
    return (
      <div>
        <h3>Edit User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Gender: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.usergender}
              onChange={this.onChangeUsergender}
            />
          </div>
          <div className="form-group">
            <label>Age: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.userage}
              onChange={this.onChangeUserage}
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
