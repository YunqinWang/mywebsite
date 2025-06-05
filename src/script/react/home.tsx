import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { theme } from "../style/theme";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import * as d3 from "d3";
import React, { JSX } from "react";
import {
	Icon_map,
	Icon_ts,
	Icon_js,
	Icon_py,
	Icon_react,
	Icon_nodejs,
	Icon_webpack,
	Icon_d3,
	Icon_gql,
	Icon_sass,
	Icon_csharp,
	Icon_c,
	Icon_go,
	Icon_qgis,
	Icon_arcgis,
	Icon_figma,
	Icon_photoshop,
	Icon_indesign,
	Icon_illustrator,
	Icon_pr,
	Project_map,
	Project_data,
	Project_game,
	Project_design,
	Project_crawler,
	Project_geo,
} from "../util/icon_loader";
import _timelineData from "../data/timeline.json";
import Stack from "@mui/material/Stack";
import { Tag } from "./component";

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
		.attr("xlink:href", Icon_map)
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
	const margins = { s: 50, e: 200, y: 20 };
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
		.style("font-size", "15px");

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
		.style("font-size", "12px");
}

function NavMenuItem({ title, target }: { title: string; target: string }) {
	// return (
	// 	<Box>
	// 		<Typography variant="h4" color="#fff">
	// 			{title}
	// 		</Typography>
	// 	</Box>
	// );
	const Item = styled(Button)(({ theme }) => ({
		backgroundColor: "none",
		...theme.typography.h4,
		padding: theme.spacing(1),
		textAlign: "center",
		color: "rgb(218, 218, 218)",
		"&:hover": {
			color: theme.palette.secondary.light,
		},
	}));
	return (
		<Item
			onClick={() => {
				// document
				// 	.getElementById(target)
				// 	?.scrollIntoView({ behavior: "smooth" });

				let t = document.getElementById(target);
				if (t != undefined) {
					const offset = 100;
					const topPos =
						t.getBoundingClientRect().top + window.scrollY - offset;
					window.scrollTo({ top: topPos, behavior: "smooth" });
				}
			}}
		>
			{title}
		</Item>
	);
}

function SkillLogos({
	logoGroups,
}: {
	logoGroups: { img: any; name: string }[];
}) {
	let row = logoGroups.map((l) => {
		return (
			<div style={{ width: "50px" }}>
				<div className="w-100 d-flex justify-content-center">
					<img
						src={l.img}
						style={{
							width: "30px",
							height: "30px",
							objectFit: "contain",
						}}
					></img>
				</div>
				<Typography
					className="text-center"
					variant="body2"
					color={theme.palette.grey[400]}
				>
					{l.name}
				</Typography>
			</div>
		);
	});

	return (
		<Stack direction="row" spacing={2} className="m-auto mb-4">
			{row}
		</Stack>
	);
}

function SectionTitle({ title }: { title: string }) {
	return (
		<Typography
			className="my-2 p-1"
			variant="h3"
			color={theme.palette.primary.dark}
			component={"div"}
			style={{ backgroundColor: theme.palette.primary.light }}
			id={title.toLowerCase().replaceAll(" ", "-")}
		>
			{title}
		</Typography>
	);
}

function ProjecrtCard({
	image,
	title,
	description,
	tags,
	link,
}: {
	image: any;
	title: string;
	description: string;
	tags: { title: string; color: string }[];
	link: string;
}) {
	return (
		<Card sx={{ maxWidth: 600 }}>
			<CardActionArea
				onClick={() => {
					window.open(link, "_blank");
				}}
			>
				<CardMedia
					component="img"
					height="180"
					image={image}
					alt={title}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "text.secondary", height: "80px" }}
					>
						{description}
					</Typography>
					{(() => {
						return tags.map((t) => {
							return <Tag title={t.title} color={t.color} />;
						});
					})()}
				</CardContent>
			</CardActionArea>
		</Card>
	);
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
			<div className="mb-4">
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
						position: "sticky",
						top: 0,
						zIndex: 1000,
					}}
				>
					<Grid
						container
						spacing={2}
						alignItems="center"
						className="h-100 w-50 m-auto"
					>
						<Grid size={4}>
							<NavMenuItem title="About Me" target="about-me" />
						</Grid>
						<Grid size={4}>
							<NavMenuItem
								title="My Experience"
								target="my-experience"
							/>
						</Grid>
						<Grid size={4}>
							<NavMenuItem
								title="My Projects"
								target="my-projects"
							/>
						</Grid>
					</Grid>
				</Box>

				<Box className="w-75 m-auto">
					<Box className="my-4">
						<Typography
							variant="h2"
							color={theme.palette.primary.main}
						>
							{"Hi :)"}
						</Typography>
						<Typography variant="body1">
							Welcome to my webiste!
						</Typography>
					</Box>
					<SectionTitle title="About Me" />
					<Box>
						<Typography variant="body1">
							I'm a{" "}
							<span className="highlight">
								{" "}
								frontend developer{" "}
							</span>
							with
							<span className="highlight"> 3 years </span>
							of experience, specializing in{" "}
							<span className="highlight">
								map-centric applications and asset management
								web platforms
							</span>
							.I also have extensive experience developing
							dashboards driven by data analytics.
							<br />
							My core stack includes React, TypeScript,
							JavaScript, Webpack, and Python with additional
							experience in D3 library, Node.js, scss, and C#.
							Beyond frontend work, I also have experience in
							diverse backend and systems projects — including a
							MapReduce engine in Go, network programming in C++.
						</Typography>

						<Box className="d-flex flex-column justify-content-center">
							<SkillLogos
								logoGroups={[
									{ img: Icon_ts, name: "TypeScript" },
									{ img: Icon_js, name: "JavaScript" },
									{ img: Icon_py, name: "Python" },
									{ img: Icon_react, name: "React" },
									{ img: Icon_webpack, name: "Webpack" },
									{ img: Icon_nodejs, name: "NodeJS" },
									{ img: Icon_gql, name: "Graphql" },
									{ img: Icon_d3, name: "D3" },
									{ img: Icon_sass, name: "Sass" },
									{ img: Icon_csharp, name: "C#" },
									{ img: Icon_c, name: "C++" },
									{ img: Icon_go, name: "Go" },
								]}
							/>
						</Box>
						<Typography variant="body1">
							I also bring strong expertise in
							<span className="highlight">
								{" "}
								GIS analytics and visualization
							</span>
							, with proficiency in QGIS, ArcGIS, and writing
							Python scripts to do automated data-driven spatial
							analysis.
						</Typography>
						<Box className="d-flex flex-column justify-content-center">
							<SkillLogos
								logoGroups={[
									{ img: Icon_qgis, name: "QGIS" },
									{ img: Icon_arcgis, name: "ArcGIS" },
								]}
							/>
						</Box>
						<Typography variant="body1">
							Before turning into a developer, I had a background
							in
							<span className="highlight">
								{" "}
								computational design
							</span>
							, which nurtured my design skills and aesthetic
							feelings. I built my design portfolio with Figma and
							Adobe Suites, inlcuding Photoshop, InDesign,
							Illustrator, and Premiere. Feel free to check{" "}
							<span>
								{" "}
								<a
									className="highlight-link"
									href="https://drive.google.com/file/d/152SlyeCKmgt5qgHj4R1O7QAZdcXAXVNl/view?usp=drive_link"
									target="_blank"
								>
									my design portfolio
								</a>
							</span>{" "}
							as well!
						</Typography>
						<Box className="d-flex flex-column justify-content-center">
							<SkillLogos
								logoGroups={[
									{ img: Icon_figma, name: "Figma" },
									{ img: Icon_photoshop, name: "Photoshop" },
									{ img: Icon_indesign, name: "Indesign" },
									{
										img: Icon_illustrator,
										name: "Illutrator",
									},
									{ img: Icon_pr, name: "Premiere" },
								]}
							/>
						</Box>
					</Box>
					<SectionTitle title="My Experience" />
					<Box>
						<Typography variant="body1">
							I am currecntly working as a frontend developer at
							Precision Systems Inc.
							<br />I have Master of Science Degree in Computer
							Scienve from Georgia Tech and Master of Science
							Degree in Computational Architecture from Cornell.
						</Typography>
					</Box>

					<svg
						id="timeline-svg"
						ref={timelineSvgRef}
						style={{ width: "100%", height: "500px" }}
					></svg>
					<SectionTitle title="My Projects" />
					<Grid
						container
						rowSpacing={3}
						columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					>
						{(() => {
							let data = [
								// {
								// 	image: Project_map,
								// 	title: "Map App",
								// 	description:
								// 		"The interactive map invites you to travel with me together! I have pinned my photography work during travelling to the map and attached little stories to them.",
								// 	tags: [
								// 		{
								// 			title: "TypeScript",
								// 			color: "#E8AE00",
								// 		},
								// 		{
								// 			title: "React",
								// 			color: "#613F89",
								// 		},
								// 		{
								// 			title: "Openlayers",
								// 			color: "#808A43",
								// 		},
								// 		{
								// 			title: "Azure",
								// 			color: "#AE1A77",
								// 		},
								// 	],
								// 	link: "",
								// },
								{
									image: Project_geo,
									title: "Geo Data Visualization",
									description:
										"This project visualizes shooting incidents across New York City using an interactive map to highlight geospatial patterns in public safety. Leveraging the D3.js library, I projected the incident data onto a custom map, enabling users to explore spatial trends and hotspots effectively.",
									tags: [
										{ title: "D3", color: "#317498" },
										{
											title: "Javascript",
											color: "#C28E09",
										},
									],
									link: "https://yunqinwang.github.io/d3-Project2/",
								},

								{
									image: Project_data,
									title: "Data Visualization",
									description:
										"The project uses the D3.js library to vividly visualize job gains and losses over the past two decades. Interactive filters allow users to explore the data by various attributes, revealing different insights and trends across time and categories.",
									tags: [
										{ title: "D3", color: "#317498" },
										{
											title: "Javascript",
											color: "#C28E09",
										},
									],
									link: "https://yunqinwang.github.io/5100-project3",
								},
								{
									image: Project_crawler,
									title: "Image Crawler",
									description:
										"The goal of this task is to perform a web crawl on a user-provided URL. The crawler will parse the web page, extract all image elements, and return a JSON array containing the URLs of all images found on the page.",
									tags: [{ title: "Java", color: "#963F36" }],
									link: "https://github.com/YunqinWang/image-crawler",
								},
								{
									image: Project_game,
									title: "Mobile Game Design",
									description:
										"The trailer for the mobile game No Screws Attached showcases gameplay and serves as a promotional advertisement. I created a variety of design assets for the trailer using Adobe Creative Suite and Figma, contributing to both the visual storytelling and brand presentation.",
									tags: [
										{ title: "Adobe", color: "#DE5320" },
										{
											title: "Figma",
											color: "#4F6FB8",
										},
									],
									link: "https://www.youtube.com/watch?v=wRDfUqbCJvo&ab_channel=StickyKeysStudios",
								},
								{
									image: Project_design,
									title: "Design Portfolio",
									description:
										"I created this portfolio during my master's program at Cornell University. It showcases my graphic design work, studio and elective projects, and published designs. The collection reflects my growth as a designer and highlights a diverse range of creative and technical skills.",
									tags: [
										{ title: "Adobe", color: "#DE5320" },
									],
									link: "https://drive.google.com/file/d/152SlyeCKmgt5qgHj4R1O7QAZdcXAXVNl/view?usp=drive_link",
								},
							];
							return data.map((d, index) => {
								return (
									<Grid
										key={index}
										size={{ xs: 2, sm: 4, md: 4 }}
									>
										<ProjecrtCard
											image={d.image}
											title={d.title}
											description={d.description}
											tags={d.tags}
											link={d.link}
										/>
									</Grid>
								);
							});
						})()}
					</Grid>
				</Box>
			</div>
		</ThemeProvider>
	);
}
