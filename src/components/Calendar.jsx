"use client";

import { useState } from "react";
import styles from "./Calendar.module.css";

export default function Calendar({ date = new Date() }) {
    const dateString = date.toISOString().split("T")[0];
    const [selectedDate, setSelectedDate] = useState(dateString);
    const [year, month] = selectedDate.split("-").map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array(firstDay).fill(null);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };
    const isDaySelected = (day) => {
        return selectedDate === `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    };

    return (
        <div className={styles.calendar}>
            <h2>Calendar</h2>
            <DateSelector label="Select any day of the chosen month" value={selectedDate} onChange={handleDateChange} />
            <hr />
            <div className={styles.calendarGrid}>
                <div className={styles.header}>Sun</div>
                <div className={styles.header}>Mon</div>
                <div className={styles.header}>Tue</div>
                <div className={styles.header}>Wed</div>
                <div className={styles.header}>Thu</div>
                <div className={styles.header}>Fri</div>
                <div className={styles.header}>Sat</div>
                {blanks.map((_, i) => (
                    <div key={`blank-${i}`} className={`${styles.day} ${styles.blank}`}></div>
                ))}
                {days.map((day) => (
                    <div key={day} className={`${styles.day} ${isDaySelected(day) ? styles.selected : ""}`}>
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
}

function DateSelector({ label = "Select date", value, onChange }) {
    return (
        <div className={styles.dateSelector}>
            <label htmlFor="dateSelector">{label}</label>&nbsp;
            <input type="date" id="dateSelector" value={value} onChange={onChange} />
        </div>
    );
}
