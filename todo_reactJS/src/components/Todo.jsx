import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const Todo = () => {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState(() => {
        const localTodos = JSON.parse(localStorage.getItem('todo'));
        return localTodos ?? [];
    });

    const [editingId, setEditingId] = useState(null);
    const [editingTask, setEditingTask] = useState('');

    // Function to add a new todo
    const addTodo = (e) => {
        e.preventDefault();
        if (task.trim() === '') {
            alert('Please enter a task');
            return;
        }
        const newTodo = [...todos, { id: nanoid(), task: task, completed: false }];
        setTodos(newTodo);
        localStorage.setItem('todo', JSON.stringify(newTodo));
        setTask('');
    };

    // Function to delete a todo
    const deleteHandler = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todo', JSON.stringify(newTodos));
    };

    // Function to toggle complete/incomplete
    const toggleComplete = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todo', JSON.stringify(updatedTodos));
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
        localStorage.setItem('todo', JSON.stringify(updatedTodos));
        setEditingId(null);
        setEditingTask('');
    };

    return (
        <div className='container mx-auto h-full flex flex-col p-5'>
            <h1 className='md:text-5xl text-3xl font-bold text-center uppercase'>Todo App ✅</h1>

            <div className='flex items-center md:flex-row flex-col md:items-start mt-20 justify-center gap-5'>
                <input
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    autoFocus
                    className='p-3 md:w-[70%] w-full border-2 rounded-md border-indigo-600'
                    type='text'
                    placeholder='Add a new task'
                />
                <button
                    onClick={addTodo}
                    className='px-6 py-2 w-full md:w-[20%] rounded-md border-none outline-none shadow-sm text-white hover:bg-indigo-700 bg-gray-800'
                >
                    Add Task
                </button>
            </div>

            {todos && (
                <div className='md:w-[70%] w-full mx-auto mt-5 p-4 flex flex-col gap-4'>
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className={`p-4 rounded-md flex justify-between items-center ${todo.completed ? 'bg-gray-400' : 'bg-green-400'
                                }`}
                        >
                            <div className='flex items-center gap-3'>
                                <input
                                    type='checkbox'
                                    checked={todo.completed}
                                    onChange={() => toggleComplete(todo.id)}
                                    className='h-4 w-4'
                                />
                                {editingId === todo.id ? (
                                    <input
                                        value={editingTask}
                                        onChange={(e) => setEditingTask(e.target.value)}
                                        className='p-3 border-2 rounded-md border-indigo-600'
                                        type='text'
                                    />
                                ) : (
                                    <li
                                        className={`list-none text-md font-semibold p-2 ${todo.completed ? 'line-through text-gray-100' : ""}
                                            }`}
                                    >
                                        {todo.task}
                                    </li>
                                )}
                            </div>
                            <div className='flex items-center justify-center gap-2'>
                                <button
                                    onClick={() => deleteHandler(todo.id)}
                                    className='bg-red-400 px-4 py-2 rounded-md text-white'
                                >
                                    Delete
                                </button>
                                {editingId === todo.id ? (
                                    <button
                                        onClick={() => saveTodo(todo.id)}
                                        className='bg-cyan-400 px-4 py-2 rounded-md text-white'
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => editToggle(todo.id, todo.task)}
                                        className='bg-indigo-400 px-4 py-2 rounded-md text-white'
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Todo;
