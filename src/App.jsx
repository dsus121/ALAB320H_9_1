// App.jsx
import { useReducer } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import './App.css';

const initialState = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false,
    "isEditing": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false,
    "isEditing": false
  }
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [{ 
        id: Date.now(), 
        title: action.title, 
        completed: false, 
        isEditing: false 
      }, ...state];
    case 'TOGGLE_COMPLETE':
      return state.map(todo => 
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    case 'START_EDITING':
      return state.map(todo => 
        todo.id === action.id ? { ...todo, isEditing: true } : todo
      );
    case 'SAVE_EDIT':
      return state.map(todo => 
        todo.id === action.id ? { ...todo, title: action.newTitle, isEditing: false } : todo
      );
    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (title) => {
    if (title.trim()) {
      dispatch({ type: 'ADD_TODO', title });
    }
  };

  const toggleComplete = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', id });
  };

  const startEditing = (id) => {
    dispatch({ type: 'START_EDITING', id });
  };

  const saveEdit = (id, newTitle) => {
    dispatch({ type: 'SAVE_EDIT', id, newTitle });
  };

  return (
    <div className="app-container">
      <h1 className="todo-heading">To Do List</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList 
        todos={todos} 
        onToggleComplete={toggleComplete}
        onDelete={deleteTodo}
        onEdit={startEditing}
        onSave={saveEdit}
      />
    </div>
  );
}

export default App;