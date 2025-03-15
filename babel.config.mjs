const config = api => {
	api.cache(true);

	const presets = [
		["@babel/preset-react", { runtime: "automatic" }],
		"@babel/preset-env"
	];
	const plugins = [];

	return { presets, plugins };
};

export default config;
