import React from "react";
import { useEffect, useState } from "react";
import cookies from 'react-cookies';
import axios from 'axios';

const Home = () => {
    // const token = cookies.load('access');
    // const [isAuth, setIsAuth] = useState(false);
    // const [myname, setMyname] = useState([]);

    // useEffect(() => {
    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    //     axios.defaults.withCredentials = true
    //     axios
    //         // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
    //         .get('http://127.0.0.1:8000/accounts/auth/')
    //         .then(response => {
    //             // delete axios.defaults.headers.common['Authorization'];
    //             // setMyname(response.data.username);
    //             console.log(response)
    //         });
    // }, []);
    // useEffect(() => {
    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    //     axios
    //       // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
    //       .get('http://127.0.0.1:8000/accounts/auth/')
    //       .then(response => {
    //         delete axios.defaults.headers.common['Authorization'];
    //         console.log(response.data)
    //         setMyname(response.data);
    //       });
    //   }, [myname]);
    // console.log(myname)
    return (
        <div>
            {/* {myname} */}
        </div>
    )
};

export default Home;

