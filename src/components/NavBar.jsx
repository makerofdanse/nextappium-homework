import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/" className={styles.navLink}>
                        Home
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/todolist" className={styles.navLink}>
                        Todo List
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/calendar" className={styles.navLink}>
                        Calendar
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
