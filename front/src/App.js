import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Asdf from './pages/Asdf';
import New from './pages/New';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home | </Link>
        <Link to="/about">About | </Link>
        <Link to="/signin">signin | </Link>
        <Link to="/signup">signup | </Link>
        <Link to="/asdf">Asdf | </Link>
        <Link to="/new">new | </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/asdf" element={<Asdf />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </div>
  );
}

export default App;
