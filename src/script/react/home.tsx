import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { theme } from "../style/theme";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import * as d3 from "d3";
import React from "react";
import Icon from "../../image/map.png";

function drawBanner(svgId: string, boxSize: { width: number; height: number }) {
	let svgChart = d3.select(`svg#${svgId}`);
	let mainG = svgChart
		.append("g")
		.attr("transform", `translate(${0}, ${boxSize.height})`);

	let movein = function (t: number, start: number, end: number) {
		return `translate(${start + t * (end - start)} 0)`;
	};

	let largeR = boxSize.width * 0.37;
	let largeCircleG = mainG.append("g");

	largeCircleG
		.append("circle")
		.attr("fill", "#0004FF")
		.attr("stroke-width", 0)
		.attr("cy", -largeR * 0.45)
		.attr("r", largeR)
		.style("opacity", 0.15)
		.style("filter", "drop-shadow(25px 4px 20px rgb(220, 220, 220))");

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

	largeCircleG
		.append("image")
		.attr("xlink:href", Icon)
		.attr("x", -largeR)
		.attr("y", -largeR * 2)
		.attr("width", largeR * 2)
		.attr("height", largeR * 3)
		.attr("clip-path", "url(#circle-clip)")
		.attr("opacity", 0.7);
	svgChart
		.append("defs")
		.append("clipPath")
		.attr("id", "circle-clip")
		.append("circle")
		.attr("r", largeR)
		.attr("cx", 0)
		.attr("cy", -largeR * 0.45); // match group center

	let smallR = boxSize.width * 0.28;
	let smallCircleG = mainG.append("g");

	smallCircleG
		.append("circle")
		.attr("fill", "#FFD21E")
		.attr("stroke-width", 0)
		.attr("cy", -smallR * 0.1)
		.attr("r", smallR)
		.style("opacity", 0.4)
		.style("filter", "drop-shadow(20px 4px 20px rgb(255, 255, 255))");

	smallCircleG
		.append("text")
		.text("Fiona Wang")
		.style("font-size", "60px")
		.style("font-family", "Inter")
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
	const beam = smallCircleG
		.append("polygon")
		.attr(
			"points",
			`${-smallR * 0.42},0 ${smallR * 0.6},${-largeR * 0.68} \
			${smallR * 0.6},0`
		) // simple triangular beam
		.attr("fill", "url(#beamGradient)")
		.attr("opacity", 0.8)
		.style("filter", "blur(2px)");

	beam.transition()
		.duration(2000)
		.attrTween("transform", function () {
			return function (t) {
				const angle = 0 - t * 50;
				return `rotate(${angle})`;
			};
		});
	const defs = svgChart.append("defs");

	const gradient = defs
		.append("linearGradient")
		.attr("id", "beamGradient")
		.attr("x1", "50%")
		.attr("y1", "0%")
		.attr("x2", "50%")
		.attr("y2", "100%");

	gradient
		.append("stop")
		.attr("offset", "0%")
		.attr("stop-color", "yellow")
		.attr("stop-opacity", 0.6);

	gradient
		.append("stop")
		.attr("offset", "100%")
		.attr("stop-color", "transparent");

	defs.append("filter")
		.attr("id", "beamBlur")
		.append("feGaussianBlur")
		.attr("stdDeviation", 3)
		.style("filter", "url(#beamBlur)");
}

function NavMenuItem({ title }: { title: string }) {
	// return (
	// 	<Box>
	// 		<Typography variant="h4" color="#fff">
	// 			{title}
	// 		</Typography>
	// 	</Box>
	// );
	const Item = styled(Box)(({ theme }) => ({
		backgroundColor: "none",
		...theme.typography.h3,
		padding: theme.spacing(1),
		textAlign: "center",
		color: "rgb(218, 218, 218)",
	}));
	return <Item>{title}</Item>;
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
					height: "75vh",
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
			<Box
				sx={{
					width: "100%",
					height: "64px",
					bgcolor: "primary.dark",
				}}
			>
				<Grid
					container
					spacing={2}
					alignItems="center"
					className="h-100 w-50 m-auto"
				>
					<Grid size={4}>
						<NavMenuItem title="About Me" />
					</Grid>
					<Grid size={4}>
						<NavMenuItem title="My Projects" />
					</Grid>
					<Grid size={4}>
						<NavMenuItem title="My Life" />
					</Grid>
				</Grid>
			</Box>

			<Box>
				<h3>Hello!</h3>
			</Box>
		</ThemeProvider>
	);
}
