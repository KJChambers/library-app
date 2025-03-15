import {
	HorizontalLine,
	LastUpdate,
	List,
	SectionHeading,
	Title
} from "@/components/policies/components";

export default function PrivacyPolicy() {
	return (
		<div className="mx-auto my-7 max-w-lg space-y-3 rounded-md bg-white p-7 text-sm lg:max-w-5xl dark:bg-slate-900">
			<Title>Privacy Policy</Title>
			<LastUpdate>Last Updated: 10 Mar 2025</LastUpdate>
			<p>
				Welcome to Book Chamber (www.book-chamber.com). Your privacy is
				important to us. This Privacy Policy explains how we collect,
				use, store, and protect your personal data in compliance with
				the{" "}
				<strong>UK General Data Protection Regulation (UK GDPR)</strong>{" "}
				and the <strong>Data Protection Act 2018</strong>.
			</p>
			<p>
				In this policy, <strong>"we", "us"</strong> and{" "}
				<strong>"our"</strong> refer to{" "}
				<strong>The Book Chamber.</strong>
			</p>
			<HorizontalLine />
			<SectionHeading>1. Information We Collect</SectionHeading>
			<p>
				When you sign up for an account, we collect the following
				personal information:
			</p>
			<List>
				<li>First Name & Last Name</li>
				<li>Email Address</li>
				<li>Password</li>
				<li>Social Media Links</li>
				<li>Book-Related Data</li>
			</List>
			<p>
				We do <strong>not</strong> collect financial data or payment
				details.
			</p>
			<HorizontalLine />
			<SectionHeading>2. How We Use Your Data</SectionHeading>
			<p>We use your data to:</p>
			<List>
				<li>Create and manage your profile</li>
				<li>Authenticate users</li>
				<li>Allow users to edit and manage their book collections.</li>
			</List>
			<p>
				We do <strong>not</strong> use your data for marketing,
				personalised recommendations, or sell/share it with third
				parties.
			</p>
			<HorizontalLine />
			<SectionHeading>3. Data Storage & Security</SectionHeading>
			<p>
				Your data is stored on <strong>MongoDB Atlas Cloud</strong> (AWS
				Ireland - eu-west-1).
			</p>
			<p>Passwords are hashed before storage for security.</p>
			<p>
				MongoDB Atlas provides{" "}
				<strong>
					encryption, access controls, and security measures
				</strong>{" "}
				(see their{" "}
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.mongodb.com/products/capabilities/security"
					className="text-violet-500 hover:text-violet-700"
				>
					security documentation
				</a>{" "}
				for more details).
			</p>
			<p>
				We retain your data <strong>until you delete it</strong>.
			</p>
			<HorizontalLine />
			<SectionHeading>
				4. Your Rights & Control Over Your Data
			</SectionHeading>
			<p>Under UK GDPR, you have the following rights:</p>
			<List bold={false}>
				<li>
					<strong>Access & Modify Data</strong> - You can edit your
					profile and book details at any time.
				</li>
				<li>
					<strong>Delete Your Data</strong> - You can delete your
					account at any time.
				</li>
				<li>
					<strong>Data Portability (Coming Soon)</strong> - We are
					working on a feature to allow you to download your data. In
					the meantime, you can email us{" "}
					<a
						href="mailto:kieranc0808@gmail.com"
						className="text-violet-500 hover:text-violet-700"
					>
						here
					</a>{" "}
					for requests.
				</li>
				<li>
					<strong>Contact for Concerns</strong> - If you have
					concerns, email us{" "}
					<a
						href="mailto:kieranc0808@gmail.com"
						className="text-violet-500 hover:text-violet-700"
					>
						here.
					</a>
				</li>
			</List>
			<HorizontalLine />
			<SectionHeading>5. Age Restrictions</SectionHeading>
			<p>
				Our service is intended for users{" "}
				<strong>aged 13 and above.</strong> If you are under 13, you
				must have parental consent to use The Book Chamber. If we
				discover that we have collected data from a user under 13
				without consent, we will delete it immediately.
			</p>
			<HorizontalLine />
			<SectionHeading>6. Cookies & Tracking</SectionHeading>
			<p>We use:</p>
			<List bold={false}>
				<li>
					<strong>Vercel Analytics</strong> - To monitor site
					performance and traffic (no personal tracking).
				</li>
				<li>
					<strong>Auth.js</strong> - For authentication and login
					security.
				</li>
			</List>
			<p>You can manage cookies through your browser settings.</p>
			<HorizontalLine />
			<SectionHeading>7. Changes to This Privacy Policy</SectionHeading>
			<p>
				We may update this Privacy Policy from time to time. We will
				notify users of significant changes via our email or a notice on
				our website.
			</p>
		</div>
	);
}
