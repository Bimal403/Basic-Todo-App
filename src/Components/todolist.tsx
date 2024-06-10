import { useState } from "react";
import "../todolist.css";
import { FC } from "react";
interface TodoProps {
  text: string;
  index: number;
  removeTodo: (index: number) => void;
  editTodo: (index: number, newText: string) => void;
}
const Todo: FC<TodoProps> = ({ text, index, removeTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(text);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    editTodo(index, newText);
    setIsEditing(false);
  };

  return (
    <div className="todo">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <div>{text ? text : "sample text"}</div>
      )}
      <div className="buttons">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={() => removeTodo(index)}>Delete</button>
      </div>
    </div>
  );
};

export default Todo;
