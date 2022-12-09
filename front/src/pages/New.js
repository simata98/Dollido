// import './App.css';
// https://my-json-server.typicode.com/typicode/demo/posts
// http://127.0.0.1:8000/accounts/user/

function App() {
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