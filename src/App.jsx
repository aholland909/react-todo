import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = () => {
    const item = {
      id: uuidv4(),
      value: newTodo,
      completed: false,
    };
    setTodos((oldItem) => [item, ...oldItem,]);
    setNewTodo("");
  };

  const completeTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo app</h1>
        <div>
          <input
            type="text"
            placeholder="Add todo!"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={() => addNewTodo()}>Add</button>
        </div>
        <ol className="todo-container">
          {todos
            .filter((todo) => todo.completed === false)
            .map((todo) => {
              return (
                <div key={todo.id} className="todos">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => completeTodo(todo.id)}
                  ></input>
                  <li>{todo.value}</li>
                </div>
              );
            })}
        </ol>
        <h2>Done</h2>
        <ol className="todo-container">
          {todos
            .filter((todo) => todo.completed === true)
            .map((todo) => {
              return (
                <div key={todo.id} className="todos">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => completeTodo(todo.id)}
                  ></input>
                  <li>{todo.value}</li>
                </div>
              );
            })}
        </ol>
      </header>
    </div>
  );
};

export default App;
