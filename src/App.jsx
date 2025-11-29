import { useState, useEffect } from "react";
import axios from "axios";

import './css/main.css';
import './css/corner.css';
import './App.css';

function App() {
  // Theme state
  const [theme, setTheme] = useState("standard");
  // Todos state
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Fetch todos from JSONPlaceholder on mount
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=3")
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
        title: input,
        completed: false,
      });
      setTodos([res.data, ...todos]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle completion
  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    try {
      const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map(t => t.id === id ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={theme} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Header Section */}
      <div id="header">
        <div className="flexrow-container">
          <div className="standard-theme theme-selector" onClick={() => setTheme("standard")} />
          <div className="light-theme theme-selector" onClick={() => setTheme("light")} />
          <div className="darker-theme theme-selector" onClick={() => setTheme("darker")} />
        </div>

        <h1 id="title">
          Just do it.
          <div id="border" />
        </h1>
      </div>

      {/* Form Section */}
      <div id="form">
        <form onSubmit={addTodo}>
          <input
            className="todo-input"
            type="text"
            placeholder="Add a task."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="todo-btn" type="submit">I Got This!</button>
        </form>
      </div>

      {/* Todo List */}
      <div id="myUnOrdList">
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo ${theme}-todo`}>
              <span
                style={{ textDecoration: todo.completed ? "line-through" : "none" }}
              >
                {todo.title}
              </span>
              <button className="check-btn" onClick={() => toggleTodo(todo.id)}>✔</button>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>🗑</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Top-left corner section */}
      <div className="version">
        <div className="demo version-section">
          <a href="https://github.com/lordwill1/todo-list" className="github-corner">
            <svg
              width={80}
              height={80}
              viewBox="0 0 250 250"
              style={{
                fill: "#151513",
                color: "#fff",
                position: "absolute",
                top: 0,
                border: 0,
                left: 0,
                transform: "scale(-1, 1)"
              }}
            >
              <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
              <path
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor"
                style={{ transformOrigin: "130px 106px" }}
                className="octo-arm"
              />
              <path
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor"
                className="octo-body"
              />
            </svg>
          </a>
        </div>

        <div>
          <p>
            <span id="datetime" />
          </p>
        </div>
      </div>

    </div>
  );
}

export default App;
