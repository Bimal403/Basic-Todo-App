import { FC, useState, useEffect } from "react";
import React from "react";
import Todo from "./Components/todolist";
import "./App.scss";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  function addTodo() {
    if (task.trim() !== "") {
      setTodos([...todos, task]);
      setTask("");
    }
  }
  function removeTodo(index: number) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  }
  function editTodo(index: number, newText: string) {
    const newTodos = todos.map((todo, i) => (i === index ? newText : todo));
    setTodos(newTodos);
  }
  return (
    <div className="container">
      <div className="todoapp">
        <h2 className="todoapp-title">Todo App</h2>
        <div className="my-wrapper">
          <div className="todoapp-text-button">
            <input
              type="text"
              placeholder="Enter your new task here"
              className="todoapp-textonly"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="todoapp-buttononly" onClick={addTodo}>
              Add
            </button>
          </div>
          <div className="todo-wrapper ">
            {todos.map((todo, index) => (
              <React.Fragment key={index}>
                <Todo
                  key={index}
                  text={todo}
                  index={index}
                  removeTodo={removeTodo}
                  editTodo={editTodo}
                />

                <hr className="divider" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
