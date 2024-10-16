import io from "socket.io-client";
import { useState , useEffect} from "react";

const socket = io("/");

function App() {

  const [messages, setMessages] = useState("");
  const [message, setMessage] = useState([]);
  console.log(message);

  const handleSubmit = (e) => {
    e.preventDefault();
    const NewMessage = {

      data: messages,
      from: "yo"

    }
    //console.log(messages + " from client");
    setMessage([...message,NewMessage]);
    socket.emit("message", messages);
  };

useEffect(() => {
  /* socket.on("message", data => {
    console.log(data + " backen backend");
    setMessage([...message,data]);
  }) */

  socket.on("message",receiveMessage);

  return () => {
    socket.off("message",receiveMessage)

};}, []);

const receiveMessage = (messages) => setMessage((state)=>[...state, messages]);

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <input type="text" placeholder="Enter your message" onChange={(e) => setMessages(e.target.value)} />
        <button>send</button>

      </form>
    <ul>

      {message.map((message, index) => <li key={index}>

        {message.data} : {message.from}

      </li>)}

    </ul>

    </div>
  );
}

export default App;


/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App */
