import Link from 'next/link';
import styles from './page.module.css';
import bookIcon from '../../assets/icons/icons8-book-100.png'
import communityIcon from '../../assets/icons/icons8-community-100.png';
import eventIcon from '../../assets/icons/icons8-event-100.png';
import Image from 'next/image';

export default function CommunityPage() {
    return (
        <>
            <header className={styles.header}>
                <h1>One shared passion: <span className={styles.highlight}>Books</span></h1>
                <p>Join our community and share your favourite books!</p>
                <div className={styles.discord}>
                    <Link href="https://discord.gg/HcyVdJeBXX">Join Our Discord</Link>
                </div>
            </header>
            <main className={styles.main}>
                <h2>Community Perks</h2>

                <ul className={styles.perks}>
                    <li>
                        <Image src={bookIcon} alt="An icon of a book." />
                        <p>Share & discord books</p>
                    </li>
                    <li>
                        <Image src={communityIcon} alt="An icon of two people." />
                        <p>Find new friends & like-minded people</p>
                    </li>
                    <li>
                        <Image src={eventIcon} alt="An icon of an event calendar." />
                        <p>Participate in exclusive events</p>
                    </li>
                </ul>
            </main>
        </>
    );
}