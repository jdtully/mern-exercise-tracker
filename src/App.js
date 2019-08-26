import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import UsersList from "./components/users-list.component";
import EditUser from "./components/edit-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="exercise/" exact component={ExercisesList} />
        <Route path="exercise/edit/:id" component={EditExercise} />
        <Route path="exercise/create" component={CreateExercise} />
        <Route path="user/create" component={CreateUser} />
        <Route path="user/" exact component={UsersList} />
        <Route path="user/edit/:id" component={EditUser} />
      </div>
    </Router>
  );
}

export default App;
