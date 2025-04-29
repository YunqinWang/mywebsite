import Box from "@mui/material/Box";
import { theme } from "../style/theme";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import * as d3 from "d3";
import React from "react";

function drawBanner(svgId: string, boxSize: { width: number; height: number }) {
	let svgChart = d3.select(`svg#${svgId}`);
	let mainG = svgChart
		.append("g")
		.attr("transform", `translate(${0}, ${boxSize.height})`);

	let movein = function (t: number, start: number, end: number) {
		return `translate(${start + t * (end - start)} 0)`;
	};

	let smallR = boxSize.width * 0.28;
	let smallCircleG = mainG.append("g");

	smallCircleG
		.append("circle")
		.attr("fill", "#FFD21E")
		.attr("stroke-width", 0)
		.attr("cy", -smallR * 0.1)
		.attr("r", smallR)
		.style("opacity", 0.3)
		.style("filter", "drop-shadow(20px 4px 20px rgb(61, 30, 0))");

	smallCircleG
		.append("text")
		.text("Fiona Wang")
		.style("font-size", "60px")
		.attr("fill", "#fff")
		.attr("transform", `translate(${-smallR * 0.25},${-smallR * 0.15})`);

	smallCircleG
		.transition()
		.duration(2000)
		.ease(d3.easeElasticOut.period(0.4))
		.attrTween("transform", () => {
			const start = -smallR;
			const end = smallR * 0.4;
			return function (t) {
				return movein(t, start, end);
			};
		});

	let largeR = boxSize.width * 0.37;
	let largeCircleG = mainG.append("g");

	largeCircleG
		.append("circle")
		.attr("fill", "#0004FF")
		.attr("stroke-width", 0)
		.attr("cy", -largeR * 0.45)
		.attr("r", largeR)
		.style("opacity", 0.2)
		.style("filter", "drop-shadow(25px 4px 20px rgb(8, 5, 47))");

	largeCircleG
		.transition()
		.duration(3000)
		.ease(d3.easeElasticOut.period(0.3))
		.attrTween("transform", () => {
			const start = boxSize.width + largeR;
			const end = largeR * 1.62;
			return function (t) {
				return movein(t, start, end);
			};
		});
}
export function HomePage() {
	const svgRef = React.useRef(null);

	React.useEffect(() => {
		if (svgRef.current != null) {
			let boxSize = (
				svgRef.current as HTMLDivElement
			).getBoundingClientRect();
			drawBanner("banner-svg", boxSize);
		}
	}, [svgRef.current]);
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					width: "100%",
					height: "85vh",
					background:
						"linear-gradient(0deg,rgba(93, 33, 7, 1) 0%, rgba(255, 98, 30, 1) 100%);",
					overflow: "hidden",

					// "&:hover": {
					// 	bgcolor: "primary.dark",
					// },
				}}
			>
				<svg
					id="banner-svg"
					ref={svgRef}
					style={{ width: "100%", height: "100%" }}
				></svg>
			</Box>
		</ThemeProvider>
	);
}
