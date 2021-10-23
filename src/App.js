import './App.css';
import { useEffect, useRef, useState } from 'react';


function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  })
  const handleSearchData = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const newUser = { name: name, email: email }


    // send to the server data
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        const addData = data;
        const newUsers = [...users, addData]
        setUsers(newUsers)
      })



    e.preventDefault()
  }
  return (
    <div className="App">
      <h2>found:{users.length}</h2>
      <form onSubmit={handleSearchData}>
        <input type="text" ref={nameRef} name="" id="" placeholder="Search" />
        <input type="email" ref={emailRef} name="" id="" placeholder="Email" />
        <input type="submit" value="submit" />
      </form>
      <ul>
        {
          users.map(user => <li
            key={user.id}>
            Name:{user.name}
            <br />
            E-mail:{user.email}
            <br />
            Mobile-Number:{user.mobile}

          </li>


          )
        }
      </ul>
    </div>
  );
}

export default App;
