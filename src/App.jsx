import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import NoteApp from "./NoteApp";
import Expanse from "./Expanse";
import AssemblyGame from "./AssemblyGame";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Expanse} />
        <Route path="/notes" component={NoteApp} />
        <Route path="/assembly" component={AssemblyGame} />
      </Switch>
    </Router>
  );
}

export default App;
