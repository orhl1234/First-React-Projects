import React, { useState, useEffect, useRef } from "react";
import NoteApp from './NoteApp'
import Expanse from './Expanse'
import AssemblyGame from './AssemblyGame'
import './App.css'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav-bar">
      <Link to="/">Expanse</Link>
      <Link to="/notes">Notes</Link>
      <Link to="/assembly">Assembly</Link>
    </div>
  );
}


export default Navbar;