"use client";

import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/todolist">Todo List</Link>
                </li>
                <li>
                    <Link href="/calendar">Calendar</Link>
                </li>
            </ul>
        </nav>
    );
}
