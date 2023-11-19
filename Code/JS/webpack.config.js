const path = require("path");

module.exports = {
	entry: "./main.js",
	output: {
		path: path.resolve(__dirname, "../"),
		filename: "bundle.js",
	},
	mode: "production",
	module: {
		rules: [
			{
				loader: "babel-loader",
				test: /\.js$|jsx/,
				exclude: /node_modules/,
			},
		],
	},
};
