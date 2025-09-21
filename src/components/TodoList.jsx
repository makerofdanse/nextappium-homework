"use client";

import { useState } from "react";
import styles from "./TodoList.module.css";

class Task {
    static GLOBAL_ID = 0;

    constructor(name = "", description = "") {
        this.id = Task.GLOBAL_ID++;
        this.name = name;
        this.description = description;
        this.isCompleted = false;
    }
}

const getTestData = () => [
    new Task("pull for ellen joe", "spend all your polychrome on zzz banners and cry when you get a c-rank dupe"),
    new Task("achieve inner peace", "meditate while dodging sus microtransactions in gacha hell"),
    new Task("fight the gacha gods", "yell at rngesus for dropping 10 blue weapons in a row"),
    new Task("organize your bangboo", "teach your zzz bangboo to stop vibing and actually help in combat"),
    new Task("chase shiny charizard", "waste 3 hours shiny hunting in pokémon only to get a magikarp"),
    new Task("become a w-engines master", "craft the ultimate w-engine in zzz but forget to equip it"),
    new Task("avoid the grind", "stare at your 0 stamina in genshin and contemplate life choices"),
    new Task("pet every virtual cat", "find every stray in new eridu and give them existential headpats"),
    new Task("defeat the dishes", "battle the sink boss with no stamina potions left"),
    new Task("transcend gacha addiction", "delete all your apps but keep the cute character wallpapers"),
];

function LabeledInput({ label, type = "text", name, value, onChange }) {
    return (
        <div className={styles.labeledInput}>
            <label htmlFor={name}>{label}</label>
            <br />
            <input id={name} type={type} name={name} value={value} onChange={onChange} />
        </div>
    );
}

export default function TodoList() {
    const [tasks, setTasks] = useState(getTestData());
    const [newTask, setNewTask] = useState(new Task());

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTask((prev) => ({ ...prev, [name]: value }));
    };

    const addTask = (event) => {
        event.preventDefault();
        console.log("adding task ", newTask.name);
        setTasks((prev) => [...prev, newTask]);
        setNewTask(new Task());
    };

    const deleteTask = (id) => {
        console.log("deleting task by id ", id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const deleteTaskFact = (task) => () => {
        if (confirm(`Are you sure you want to delete task '${task.name}'?`)) {
            deleteTask(task.id);
        }
    };

    const completeTask = (id) => {
        console.log("completing task by id", id);
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
    };

    const deleteCompleted = () => {
        console.log("deleting completed tasks");
        setTasks((prev) => prev.filter((t) => !t.isCompleted));
    };

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("text/plain", id);
        console.log("dragging task", id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add("drag-over");
    };

    const handleDragLeave = (e) => {
        const target = e.currentTarget;
        const relatedTarget = e.relatedTarget;
        if (!relatedTarget || !target.contains(relatedTarget)) {
            target.classList.remove("drag-over");
        }
    };

    const handleDrop = (e, targetId) => {
        e.preventDefault();
        e.currentTarget.classList.remove("drag-over");
        const draggedId = e.dataTransfer.getData("text/plain");
        reorderTasks(draggedId, targetId);
    };

    const reorderTasks = (draggedId, targetId) => {
        const newTasks = [...tasks];
        const draggedIndex = newTasks.findIndex((t) => t.id == draggedId);
        const targetIndex = newTasks.findIndex((t) => t.id == targetId);
        if (draggedIndex === -1 || targetIndex === -1) return;
        const [draggedTask] = newTasks.splice(draggedIndex, 1);
        newTasks.splice(targetIndex, 0, draggedTask);
        setTasks(newTasks);
    };

    return (
        <div className={styles.todoContainer}>
            <h1 className={styles.title}>Todoer Listicle</h1>
            <form onSubmit={addTask} className={styles.newTaskForm}>
                <LabeledInput label="Task name" name="name" value={newTask.name} onChange={handleInputChange} />
                <LabeledInput
                    label="Task description"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                />
                <button type="submit" className={styles.submitButton}>
                    Add
                </button>
            </form>
            <hr className={styles.hr} />
            <button type="button" className={styles.deleteBtn} onClick={deleteCompleted}>
                Delete all completed
            </button>
            <hr className={styles.hr} />
            <ul className={styles.taskList}>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={`${styles.taskItem} ${task.isCompleted ? styles.completed : ""}`}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, task.id)}
                    >
                        <div className={styles.taskTitle}>
                            <span className={styles.taskTitleText}>{task.name}</span>
                            <div className={styles.taskTitleButtons}>
                                <button
                                    type="button"
                                    className={styles.completeBtn}
                                    onClick={() => completeTask(task.id)}
                                >
                                    {task.isCompleted ? "↩" : "✓"}
                                </button>
                                <button type="button" className={styles.deleteBtn} onClick={deleteTaskFact(task)}>
                                    🗑
                                </button>
                            </div>
                        </div>
                        {task.description && <div className={styles.taskDescription}>{task.description}</div>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
