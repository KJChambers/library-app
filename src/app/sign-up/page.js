import Link from 'next/link';
import styles from './page.module.css';
import { SignUp } from '@/lib/action';

export default function SignUpPage() {
    return (
        <>
            <header className={styles.header}>
                <h1>
                    First step, <span className={styles.highlight}>Signing Up</span>
                </h1>
                <p>
                    Already got an account?
                    <Link className={styles.login} href="../login"> Log in</Link>
                </p>
            </header>
            <main className={styles.main}>
                <form className={styles.form} action={SignUp}>
                    <div className={styles.row}>
                        <p>
                            <label htmlFor="name">Username</label>
                            <input type="text" id="name" name="name" required />
                        </p>
                        <p>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" required />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </p>
                    <p>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required />
                    </p>
                    <p className={styles.actions}>
                        <button type="submit">Sign Up</button>
                    </p>
                </form>
            </main>
        </>
    );
}