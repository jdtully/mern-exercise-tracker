import React, { Component } from "react";
import axios from "axios";

export default class EditUsers extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
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
          usergender: response.data.usergender,
          userage: response.data.userage
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  handleOptionChange(e) {
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
        "http://localhost:5000/users/update/" + this.props.match.params.id,
        user
      )
      .then(res => console.log(res.data));
    window.location = "/users/";
  }

  render() {
    return (
      <div>
        <h3>Edit User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
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
              type="text"
              className="form-control"
              value={this.state.userage}
              onChange={this.onChangeUserage}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Update user"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
