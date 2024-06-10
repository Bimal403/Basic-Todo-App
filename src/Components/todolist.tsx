import { useState } from "react";
import "../todolist.scss";
import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
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
    <>
      <div className="todo-container">
        <div className="todo-container-left">
          <FaCheckCircle style={{ color: "purple" }} />

          {isEditing ? (
            <input
              type="text"
              value={newText}
              style={{ fontSize: "1.3rem" }}
              onChange={(e) => setNewText(e.target.value)}
            />
          ) : (
            <div style={{ fontSize: "1.3rem" }}>
              {text ? text : "sample text"}
            </div>
          )}
        </div>

        <div className="buttons">
          {isEditing ? (
            <button onClick={handleSave}> Save</button>
          ) : (
            <button onClick={handleEdit}>
              <CiEdit />
            </button>
          )}
          <button onClick={() => removeTodo(index)}>
            <MdDelete style={{ color: "grey" }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
