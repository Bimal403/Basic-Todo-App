import { FC, useState, useEffect } from "react";
import Todo from "./Components/todolist";
import "./App.css";

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
    <div className="wrapper">
      <div className="todoapp">
        <h1 className="title">To Do List</h1>
        <div className="textfieldandbutton">
          <input
            type="text"
            placeholder="Enter your new task here"
            className="text-input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="addButton" onClick={addTodo}>
            Add
          </button>
        </div>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            text={todo}
            index={index}
            removeTodo={removeTodo}
            editTodo={editTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
