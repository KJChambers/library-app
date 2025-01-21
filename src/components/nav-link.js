'use client';

import Link from "next/link";
import styles from "./nav-link.module.css";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
    const path = usePathname();

    return (
            <Link className={path === href ? `${styles.link} ${styles.active}` : styles.link} href={href}>{children}</Link>
    );
}