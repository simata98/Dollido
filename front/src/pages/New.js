// import './App.css';
// https://my-json-server.typicode.com/typicode/demo/posts
// http://127.0.0.1:8000/accounts/user/

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from "react";

function App() {
    const onLogout = () => {
        const token = localStorage.getItem("token");
        if (token) {
          localStorage.clear();
          window.location.replace("/Signin");
        }
    }
    
    console.log(localStorage)

    if (localStorage.getItem("token")) {
        return (
            <div className='App'>
                <Box m={1} //margin
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button variant="contained" color="primary" sx={{ height: 40 }} onClick={onLogout}>
                        로그아웃
                    </Button>
                </Box>
                <h1>TODO setTodoList</h1>
                <form>
                    <input name='Email' />
                    <input name='Password1' />
                    <input name='Password2' />
                    <input type='submit' value='제출' />
                </form>
            </div>
        );
    }
    
    else {
        window.location.replace("/Signin");
        alert("로그인이 필요합니다.");
    }
}

export default App;