import React from "react";
import Axios from './Axios';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";

const Home = () => {
    return (
            <div className="App">
                메인 화면 입니다.
                <Routes>
                    <Route path="/Axios">
                        <Axios />
                    </Route>
                </Routes>
            </div>
    )
};

export default Home;

