import React from 'react';
import { Routes, Route} from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Agreement from './pages/Agreement';
import MyDataGrid from './pages/Mydatagrid';
import Header from "./components/Header";
import Board from "./pages/Board";
import Dollidolist from "./pages/Dollidolist";
import Dollidodetail from "./pages/Dollidodetail";
import AddDollido from "./pages/AddDollido";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/agreement" element={<Agreement />} />
          <Route path="/mydataGrid" element={<MyDataGrid />} />
          <Route path="/header" element={<Header />} />
          <Route path="/board" element={<Board />} />
          <Route path="/dollidolist" element={<Dollidolist />} />
          <Route path="/dollidodetail" element={<Dollidodetail />} />
          <Route path="/adddollido" element={<AddDollido />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
