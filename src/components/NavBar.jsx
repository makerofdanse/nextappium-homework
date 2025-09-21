"use client";

import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-blue-500 p-4 text-white">
            <ul className="flex space-x-4">
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
