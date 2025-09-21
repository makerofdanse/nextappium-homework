"use client";

import { useState } from "react";

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, input]);
            setInput("");
        }
    };

    return (
        <div className="p-4">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="border p-2 mr-2" />
            <button onClick={addTodo} className="bg-green-500 text-white p-2">
                Add Todo
            </button>
            <ul>
                {todos.map((todo, i) => (
                    <li key={i}>{todo}</li>
                ))}
            </ul>
        </div>
    );
}
