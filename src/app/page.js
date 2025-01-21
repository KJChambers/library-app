import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';
import LibraryImage from '@/assets/library.jpg';

export default function Home() {
	return (
		<>
			<header className={styles.header}>
				<div className={styles.image}>
					<Image src={LibraryImage} alt="Image of a Library" />
				</div>
				<div>
				<div className={styles.hero}>
					<h1>Your own library, made perfectly for you</h1>
					<p>Track your books, your way, anytime, anywhere.</p>
				</div>
				<div className={styles.cta}>
					<Link href="/community">Join the Community</Link>
					<Link href="/sign-up">Sign Up</Link>
				</div>
				</div>
			</header>
			<main>
				<section className={styles.section}>
					<h2>How it works</h2>
					<p>
						Getting started is simple. Just Sign Up and add books to your 
						personal library, and begin tracking your reading progress. You 
						can log the start and finish dates, mark books as read, and even 
						add custom details like genres or ratings. Everything is organised 
						in one easy-to-navigate space.
					</p>
				</section>
				<section className={styles.section}>
					<h2>Why use it?</h2>
					<p>
						This platform is all about making your reading journey personal. You 
						can customise your library with fields that are important to you, 
						like favourite quotes or book discovery notes. It's perfect for those 
						who want to keep a detailed record of their reading activity.
					</p>
					<p>
						Plus, future features like tailored recommendations will make it even 
						more useful. Stay organised, track your progress, and make your reading 
						experience truly yours.
					</p>
				</section>
			</main>
    	</>
  	);
}
