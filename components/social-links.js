import {
	FaFacebookSquare,
	FaLinkedin,
	FaInstagramSquare,
	FaGithubSquare
} from "react-icons/fa";

export default function SocialLinks({ profileData }) {
	const socialLinks = [
		{
			platform: "facebook",
			icon: FaFacebookSquare,
			colour: "text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
		},
		{
			platform: "linkedin",
			icon: FaLinkedin,
			colour: "text-sky-600 hover:text-sky-500 dark:text-sky-500 dark:hover:text-sky-600"
		},
		{
			platform: "instagram",
			icon: FaInstagramSquare,
			colour: "text-fuchsia-600 hover:text-fuchsia-500 dark:text-fuchsia-500 dark:hover:text-fuchsia-600"
		},
		{
			platform: "github",
			icon: FaGithubSquare,
			colour: "text-slate-800 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-500"
		}
	];

	return (
		<div className="mt-2 flex flex-wrap items-center">
			{socialLinks.map(({ platform, icon: Icon, colour }) =>
				profileData.socials[platform] ? (
					<a
						key={platform}
						href={profileData.socials[platform]}
						target="_blank"
						rel="noopener noreferrer"
						className={`block p-2 ${colour}`}
					>
						<Icon className="size-6" />
					</a>
				) : null
			)}
		</div>
	);
}
