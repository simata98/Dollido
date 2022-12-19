import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import New from './pages/New';
import Agreement from './pages/Agreement';
import Header from "./pages/Header";
// import Board from './pages/Board';

function App() {
  return (
    <React.Fragment>
    <Header/>
      <div className="App">
        <nav>
          <Link to="/">Home | </Link>
          <Link to="/about">About | </Link>
          <Link to="/signin">signin | </Link>
          <Link to="/Agreement">signup | </Link>
          <Link to="/new">new | </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/agreement" element={<Agreement />} />
          {/* <Route path="/board" element={<Board />} /> */}
          <Route path="/new" element={<New />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
