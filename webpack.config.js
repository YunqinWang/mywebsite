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
			// {
			// 	test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
			// 	use: [
			// 		{
			// 			loader: "file-loader",
			// 			options: {
			// 				outputPath: `./image`,
			// 				publicPath: "/image",
			// 				name: `[contenthash].[name].[ext]`,
			// 			},
			// 		},
			// 	],
			// },
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
			},

			{
				test: /\.(scss)$/,
				use: [
					{
						// Adds CSS to the DOM by injecting a `<style>` tag
						loader: "style-loader",
					},
					{
						// Interprets `@import` and `url()` like `import/require()` and will resolve them
						loader: "css-loader",
					},
					// {
					// 	// Loader for webpack to process CSS with PostCSS
					// 	loader: "postcss-loader",
					// 	options: {
					// 		postcssOptions: {
					// 			plugins: [autoprefixer],
					// 		},
					// 	},
					// },
					{
						// Loads a SASS/SCSS file and compiles it to CSS
						loader: "sass-loader",
					},
				],
			},
		],
	},
};
