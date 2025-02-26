import { useState,useReducer } from 'react'

import Header from "./Header"
import Checkbox from "./Checkbox"
import AddTask from "./components/AddTodo"
import './App.css'


const initialState = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Build a To-Do App", completed: false }
];

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'toggle':
      return state.map(task =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    case 'remove':
      return state.filter(task => task.id !== action.id);
    default:
      throw new Error();
  }
}

function App() {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      dispatch({ type: 'add', text: taskText });
      setTaskText("");
    }
  }

  
  return (
    <>
      <center className="todo-container">
        <Header />
        <AddTask />
        <Checkbox />
      </center>

    </>
  )
}

export default App
