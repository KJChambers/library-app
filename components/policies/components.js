function Title({ children }) {
	return <h1 className="text-3xl font-bold">{children}</h1>;
}

function LastUpdate({ children }) {
	return <h2 className="font-semibold text-gray-600">{children}</h2>;
}

function HorizontalLine() {
	return <hr className="my-6 text-gray-400" />;
}

function SectionHeading({ children }) {
	return <h2 className="text-xl font-bold">{children}</h2>;
}

function List({ children, bold = true }) {
	return (
		<ul className={`ms-3 list-inside list-disc space-y-1 text-sm ${bold ? "font-semibold" : ""}`}>
			{children}
		</ul>
	);
}

export { Title, LastUpdate, HorizontalLine, SectionHeading, List };