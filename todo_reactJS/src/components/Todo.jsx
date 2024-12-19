import React, { useState } from "react";
import { nanoid } from "nanoid";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const localTodos = JSON.parse(localStorage.getItem("todo"));
    return localTodos ?? [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editingTask, setEditingTask] = useState("");

  // Function to add a new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }
    const newTodo = [...todos, { id: nanoid(), task: task, completed: false }];
    setTodos(newTodo);
    localStorage.setItem("todo", JSON.stringify(newTodo));
    setTask("");
  };

  // Function to delete a todo
  const deleteHandler = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todo", JSON.stringify(newTodos));
  };

  // Function to toggle complete/incomplete
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
  };

  // Function to start editing a todo
  const editToggle = (id, task) => {
    setEditingId(id);
    setEditingTask(task);
  };

  // Function to save an edited todo
  const saveTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: editingTask } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
    setEditingId(null);
    setEditingTask("");
  };

  return (
    <div className="container mx-auto p-5 flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-600 uppercase">
        Todo App ✅
      </h1>

      {/* Input Section */}
      <div className="flex flex-col md:flex-row items-center mt-10 md:justify-center gap-5">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          autoFocus
          className="p-3 w-full md:w-2/3 border-2 rounded-md border-indigo-400 shadow focus:outline-none focus:ring focus:ring-indigo-500"
          type="text"
          placeholder="Add a new task"
        />
        <button
          onClick={addTodo}
          className="px-6 py-3 w-full md:w-auto text-white bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600 transition"
        >
          Add Task
        </button>
      </div>

      {/* Todos Section */}
      {todos.length > 0 && (
        <div className="mt-8 flex flex-col items-center">
          <div className="w-full md:w-2/3 space-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`p-4 rounded-lg flex justify-between items-center shadow-md ${
                  todo.completed
                    ? "bg-gray-300 border-l-4 border-green-500"
                    : "bg-white border-l-4 border-indigo-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="h-5 w-5 text-green-500 rounded"
                  />
                  {editingId === todo.id ? (
                    <input
                      value={editingTask}
                      onChange={(e) => setEditingTask(e.target.value)}
                      className="p-2 border rounded-md shadow-md w-full focus:outline-none"
                    />
                  ) : (
                    <p
                      className={`text-lg font-medium ${
                        todo.completed ? "line-through text-gray-500" : "text-gray-700"
                      }`}
                    >
                      {todo.task}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteHandler(todo.id)}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-md shadow hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  {editingId === todo.id ? (
                    <button
                      onClick={() => saveTodo(todo.id)}
                      className="px-4 py-2 text-sm text-white bg-green-500 rounded-md shadow hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => editToggle(todo.id, todo.task)}
                      className="px-4 py-2 text-sm text-white bg-indigo-400 rounded-md shadow hover:bg-indigo-500 transition"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
