import Header from "@/components/header/header";

export default function NotFoundPage() {
	return (
		<>
			<Header />
			<div className="mx-auto my-7 w-full rounded-md bg-white p-6 text-violet-950 shadow-xs md:w-2xl lg:w-5xl dark:bg-slate-900 dark:text-violet-100">
				<h1 className="pb-5 text-center text-4xl font-bold">
					404: These aren't the droids you're looking for!
				</h1>
				<p className="text-center font-semibold">
					Beep boop... You're in the wrong place...
				</p>
			</div>
		</>
	);
};