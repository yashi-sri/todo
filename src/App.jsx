import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import List from "./components/list";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputText, setInputText] = useState("");
  const [editId, setEditId] = useState(null);

  // Handle adding or updating
  const handleSubmit = () => {
    if (inputText.trim() === "") return;

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: inputText.trim() } : todo
        )
      );
      setEditId(null);
      toast.success("Todo edited");
    } else {
      const newTodo = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      toast.success("Todo added");
    }

    setInputText("");
  };

  // Handle deleting
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Todo deleted");
  };

  // Handle preparing a todo for editing
  const handleEditTodo = (todo) => {
    setEditId(todo.id);
    setInputText(todo.text);
  };

  // Handle toggling completion status
  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="h-full max-w-screen-xl w-full m-5">
      <p className="text-center font-bold text-2xl">Todo App</p>

      <div className="flex gap-3 justify-center mt-5 p-3">
        <input
          type="text"
          placeholder="title"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border rounded-md pl-3 duration-300 focus:ring-1 ring-gray-600 outline-none"
        />
        <button
          onClick={handleSubmit}
          className="p-2 px-4 rounded-md duration-300 bg-gray-200 hover:bg-gray-600 text-gray-600 hover:text-gray-200"
        >
          {editId ? "Update" : "Add"}{" "}
        </button>
      </div>

      {/* Todo List */}
      <div className="flex justify-center">
        <ul className="p-3 flex flex-col items-center gap-2 rounded-md">
          {todos.map((todo) => (
            <List
              key={todo.id}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleToggleComplete={handleToggleComplete}
              handleEditTodo={handleEditTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
