import styles from "./main-header.module.css";
import NavLink from "./nav-link";

export default function MainHeader() {
    return (
        <header className={styles.header}>
          <nav className={styles.nav}>
            <ul>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/sign-up">Sign Up</NavLink>
                <NavLink href="/community">Community</NavLink>
            </ul>
          </nav>
        </header>
    );
}