import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { theme } from "../style/theme";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import * as d3 from "d3";
import React from "react";
import Icon from "../../image/map.png";
import _timelineData from "../data/timeline.json";

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

function drawTimeline(
	svgId: string,
	boxSize: { width: number; height: number }
) {
	let svgChart = d3.select(`svg#${svgId}`);
	const margins = { s: 150, e: 300, y: 20 };
	let mainG = svgChart
		.append("g")
		.attr("transform", `translate(${margins.s}, ${margins.y + 240})`);

	let labelG = mainG.append("g");
	["Work", "Education"].forEach((d) => {
		labelG
			.append("text")
			.text(d)
			.attr("fill", d == "Work" ? "#7E5A9B" : "#BD4916")
			.attr("transform", `translate(${10},${d == "Work" ? -15 : 25})`);
	});

	const lineLen = boxSize.width - margins.s - margins.e;
	const lineGen = d3
		.line()
		.x((d) => d[0])
		.y((d) => d[1]);

	const startDate = new Date(2015, 9, 1);
	const endDate = new Date();
	const xScale = d3.scaleTime([startDate, endDate], [0, lineLen]);
	const yScale = function (d: { type: string }, index: number) {
		// return d.type == "school"
		// 	? 20 * ((index % 2) + 1)
		// 	: -10 * ((index % 2) + 1);
		let fold = (index % 2) + 1;
		return (
			(d.type == "school" ? lineHeight + evnetR : -lineHeight - evnetR) *
			fold
		);
	};

	let lineData: [number, number][] = [startDate, endDate].map((d) => {
		return [xScale(d), 0];
	});

	let lineG = mainG.append("g");
	lineG
		.append("path")
		.attr("d", `M${xScale(new Date())} 0 h 100`)
		.attr("stroke", "#FF621E")
		.style("stroke-width", 1)
		.style("stroke-dasharray", "8,3");

	lineG
		.append("path")
		.attr("d", `M${xScale(new Date()) + 90} 0 v7 l 12 -7 l -12 -7`)
		.attr("fill", "#FF621E");

	lineG
		.append("path")
		.attr("d", lineGen(lineData))
		.attr("stroke", "#FF621E")
		.style("stroke-width", 2);

	let dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;

	const scaleDateString = function (dateString: string) {
		const matched = dateString.match(dateRegex);

		let date = new Date();
		if (matched) {
			const [fullMatch, year, month, day] = matched;
			date = new Date(Number(year), Number(month) - 1, Number(day));
		}
		return xScale(date);
	};

	const getColorByType = function (d: { type: string }) {
		if (d.type == "school") return "#BD4916";
		return "#7E5A9B";
	};

	let timelineData = _timelineData.sort((a, b) => {
		if (a.type == b.type) return a.date[1].localeCompare(b.date[1]);
		return a.type.localeCompare(b.type);
	});
	let eventLine = mainG.append("g");
	eventLine
		.selectAll(".timeline-circle")
		.data(timelineData)
		.join("circle")
		.attr("class", "timeline-circle")
		.attr("cx", (d) => {
			let dateString = d.date[1];
			return scaleDateString(dateString);
		})
		.attr("r", 5)
		.attr("fill", (d) => {
			return getColorByType(d);
		});

	eventLine
		.selectAll(".timeline-circle-text")
		.data(timelineData)
		.join("text")
		.attr("class", "timeline-circle-text")
		.attr("x", (d) => scaleDateString(d.date[1]) + 10)
		.attr("y", (d) => (d.type == "school" ? 20 : -10))
		.text((d) => d.date[1])
		.attr("alignment-baseline", (d) =>
			d.type == "school" ? "text-top" : "text-bottom"
		)
		.attr("fill", (d) => getColorByType(d))
		.style("font-size", "12px");

	const lineHeight = 50;
	eventLine
		.selectAll(".timeline-event-line")
		.data(timelineData)
		.join("path")
		.attr("class", "timeline-event-line")
		.attr("d", (d) => {
			let dateString = d.date[1];
			let x = scaleDateString(dateString);
			return `M${x} 0 v${d.type == "school" ? lineHeight : -lineHeight}`;
		})
		.attr("stroke", (d) => getColorByType(d));

	const evnetR = 30;
	const defs = svgChart.append("defs");
	defs.append("filter")
		.attr("id", "blurFilter")
		.append("feGaussianBlur")
		.attr("stdDeviation", 8); // Adjust blur strength

	eventLine
		.selectAll(".timeline-event-path")
		.data(timelineData)
		.join("path")
		.attr("class", "timeline-event-path")
		.attr("d", (d, i) => {
			let startX = scaleDateString(d.date[0]);
			let endX = scaleDateString(d.date[1]);
			let y = yScale(d, i);

			if (d.type == "school") {
				return `M${startX} 0 A${
					endX - startX
				} ${y} 0 0 1 ${endX} ${y} V${0} H${startX}`; //todo
			}
			return `M${startX} 0 H${endX} V${y} A${
				endX - startX
			} ${y} 0 0 1 ${startX} ${0}`; //todo
		})
		.attr("fill", (d) => getColorByType(d))
		.attr("opacity", 0.3);

	eventLine
		.selectAll(".timeline-event-circle")
		.data(timelineData)
		.join("circle")
		.attr("class", "timeline-event-circle")
		.attr("cx", (d) => scaleDateString(d.date[1]))
		.attr("cy", (d, i) => yScale(d, i))
		.attr("r", evnetR)
		.attr("fill", (d) => getColorByType(d))
		.attr("opacity", 0.3)
		.attr("filter", "url(#blurFilter)");

	eventLine
		.selectAll(".timeline-event-text")
		.data(timelineData)
		.join("text")
		.attr("class", "timeline-event-text")
		.attr("x", (d) => scaleDateString(d.date[1]))
		.attr("y", (d, i) => {
			let y = yScale(d, i);
			return y > 0 ? y + 10 : y - 10;
		})
		.text((d) => d.event)
		.attr("fill", (d) => getColorByType(d))
		.attr("text-anchor", "middle")
		.style("font-size", "14px");

	eventLine
		.selectAll(".timeline-event-text2")
		.data(timelineData)
		.join("text")
		.attr("class", "timeline-event-text2")
		.attr("x", (d) => scaleDateString(d.date[1]))
		.attr("y", (d, i) => {
			let y = yScale(d, i);
			return y > 0 ? y + 30 : y - 30;
		})
		.text((d) => d.location)
		.attr("fill", (d) => getColorByType(d))
		.attr("text-anchor", "middle")
		.style("font-size", "14px");
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
	const bannerSvgRef = React.useRef(null);
	const timelineSvgRef = React.useRef(null);

	React.useEffect(() => {
		if (bannerSvgRef.current != null) {
			let boxSize = (
				bannerSvgRef.current as HTMLDivElement
			).getBoundingClientRect();
			drawBanner("banner-svg", boxSize);
		}
	}, [bannerSvgRef.current]);

	React.useEffect(() => {
		if (timelineSvgRef.current != null) {
			let boxSize = (
				timelineSvgRef.current as HTMLDivElement
			).getBoundingClientRect();
			drawTimeline("timeline-svg", boxSize);
		}
	}, [timelineSvgRef.current]);

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
					ref={bannerSvgRef}
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
				<svg
					id="timeline-svg"
					ref={timelineSvgRef}
					style={{ width: "100%", height: "500px" }}
				></svg>
			</Box>
		</ThemeProvider>
	);
}
