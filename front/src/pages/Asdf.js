import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const SERVER_URL = 'http://127.0.0.1:8000/accounts/registration/';

function Asdf() {
    const [todoList, setTodoList] = useState("");

    const fetchData = async () => {
        const response = await axios.get('SERVER_URL');
        setTodoList(response.data);
    };

    useEffect(() => {
        fetchData()
    }, []);

    const onSubmitHander = async (e) => {
        e.preventDefault();
        const email = e.traget.email.value;
        axios.post(SERVER_URL, { email });
        fetchData();
    };


    return(
        <div className='asdf'>
            <h1>Json Date</h1>
            <form onSubmit={onSubmitHander}>
                <input name='email' />
                <input type='submit' value='추가' />
            </form>

            {todoList.map((todo) => (
                <div Key={todo.email}>
                    <div>{todo.email}</div>
                    {/* <div>{todo.userId}</div>
                    <div>{todo.title}</div>
                    <div>{todo.completed}</div> */}
                </div>
            ))}
        </div>
    );
}
export default Asdf;
// "userId": 1,
// "id": 1,
// "title": "delectus aut autem",
// "completed": false