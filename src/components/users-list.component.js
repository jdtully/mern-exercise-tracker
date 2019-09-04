import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const User = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.usergender}</td>
    <td>{props.user.userage}</td>
    <td>
      <Link to={"/users/edit/" + props.user._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);

    this.state = { users: [], pageNo: 1, total: 0, offset: 0, limit: 10 };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users?page=" + this.state.pageNo)
      .then(response => {
        this.setState({
          users: response.data.docs,
          offset: response.data.offset,
          limit: response.data.limit,
          total: response.data.total,
          pageNo: response.data.offset / response.data.total + 1
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  gotoNextPage() {
    axios
      .get("http://localhost:5000/users?page=" + (this.state.pageNo + 1))
      .then(response => {
        this.setState({
          users: response.data.docs,
          offset: response.data.offset,
          limit: response.data.limit,
          total: response.data.total,
          pageNo: response.data.offset / response.data.total + 1
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  gotoPreviousPage() {
    axios
      .get("http://localhost:5000/users?page=" + (this.state.pageNo - 1))
      .then(response => {
        this.setState({
          users: response.data.docs,
          offset: response.data.offset,
          limit: response.data.limit,
          total: response.data.total,
          pageNo: response.data.offset / response.data.total + 1
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  deleteUser(id) {
    axios.delete("http://localhost:5000/users/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    });
  }

  userList() {
    return this.state.users.map(currentuser => {
      return (
        <User
          user={currentuser}
          deleteUser={this.deleteUser}
          key={currentuser._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        <table className="table tablesorter">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
        <div>page {this.state.pageNo}</div>

        <button onClick={this.gotoPreviousPage}>PreviousPage</button>
        <button onClick={this.gotoNextPage}>Next Page</button>
      </div>
    );
  }
}
