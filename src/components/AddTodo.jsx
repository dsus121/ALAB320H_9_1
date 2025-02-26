// AddTodo.jsx
import { useState } from "react";

function AddTodo({ onAdd }) {
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = () => {
    if (newTodo.trim()) { /*remove spaces*/
      onAdd(newTodo);
      setNewTodo(""); /*clear input*/
    }
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder=" enter new task "
        className="todo-input"
      />
      <button onClick={handleAdd} className="add-button">
        +
      </button>
    </div>
  );
}

export default AddTodo;