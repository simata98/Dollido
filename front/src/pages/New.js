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

    const onSubmitHandler = (e) =>{
        e.preventDefault();

        const email = e.target.Email.value;
        const password1 = e.target.Password1.value;
        const password2 = e.target.Password2.value;
        fetch('http://localhost:8000/accounts/registration/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password1,
                password2,
            })
        });
    };
    
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
            <form onSubmit={onSubmitHandler}>
                <input name='Email' />
                <input name='Password1' />
                <input name='Password2' />
                <input type='submit' value='제출' />
            </form>
        </div>
    );
}

export default App;