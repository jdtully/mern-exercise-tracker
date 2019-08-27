import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
//import EditUser from "./components/edit-user.component";
import UserList from "./components/users-list.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/exercise/edit/:id" component={EditExercise} />
        <Route path="/exercise/add" component={CreateExercise} />
        <Route path="/users/add" component={CreateUser} />
        <Route path="/users/" component={UserList} />
      </div>
    </Router>
  );
}

export default App;
