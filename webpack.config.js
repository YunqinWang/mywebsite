const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		main: ["/src/script/index.ts"],
	},
	stats: { colors: true },
	resolve: {
		extensions: [".tsx", ".jsx", ".ts", ".js", ".json"],
	},
	output: {
		path: path.resolve(__dirname, "dist/js/"),
		publicPath: "js/",
		filename: (pathData) => {
			return `[name].js`;
		},
		clean: true,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `../css/[name].${"[contenthash:8]."}css`,
		}),
	],
	module: {
		rules: [
			{ test: /\.(tsx|ts)$/i, loader: "ts-loader" },
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
};
