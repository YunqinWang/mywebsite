import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Stack, Typography } from "@mui/material";
import { theme } from "../style/theme";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import * as d3 from "d3";
import React from "react";
import { Icon_github, Icon_gmail, Icon_linkedin } from "../util/icon_loader";

export function Tag({ title, color }: { title: string; color: string }) {
	return (
		<Typography
			gutterBottom
			variant="body2"
			className="d-inline-block px-1 text-white me-2"
			style={{ backgroundColor: color, borderRadius: "4px" }}
		>
			{title}
		</Typography>
	);
}

export function MyFooter() {
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					width: "100%",
					background:
						"linear-gradient(120deg,rgb(55, 39, 68) 20%,rgb(137, 52, 15) 100%);",
					// "&:hover": {
					// 	bgcolor: "primary.dark",
					// },
					overflow: "hidden",
				}}
			>
				<Box className="position-relative">
					<div
						style={{
							backgroundColor: "#610000",
							opacity: "20%",
							width: "500px",
							height: "500px",
							borderRadius: "50%",
							position: "absolute",
							right: "160px",
							top: "-200px",
						}}
					></div>
					<div
						style={{
							backgroundColor: "#BD8524",
							opacity: "20%",
							width: "400px",
							height: "400px",
							borderRadius: "50%",
							position: "absolute",
							right: "-50px",
							top: "50px",
						}}
					></div>
				</Box>
				<Box className="m-auto w-75 text-white py-4">
					<h5 className="mb-3">CONTACT</h5>
					{(() => {
						let data = [
							{
								label: "Email",
								value: "wyq0307qyw@gmail.com",
								image: undefined,
								showValue: true,
							},
							{
								label: "Address",
								value: "Washington, DC",
								image: undefined,
								showValue: true,
							},
							{
								label: "Github",
								value: "https://github.com/YunqinWang",
								image: Icon_github,
								showValue: true,
							},
							{
								label: "",
								value: "https://github.gatech.edu/ywang4362",
								image: Icon_github,
								showValue: true,
							},
							{
								label: "LinkedIn",
								value: "https://www.linkedin.com/in/fiona-yunqin-wang-4343971a4/",
								image: Icon_linkedin,
								showValue: false,
							},
						];
						let items = data.map((d, i) => {
							return (
								<Grid container spacing={3} key={i}>
									<Grid size={2}>
										<Typography
											variant="body1"
											marginBottom={0}
										>
											{d.label}
										</Typography>
									</Grid>
									<Grid
										size={10}
										className="d-flex align-items-center"
									>
										<div className="d-flex gap-2 align-items-center">
											{d.image ? (
												<a
													href={d.value}
													target="_blank"
													className="d-flex align-items-center"
													style={{
														background: "none",
													}}
												>
													<img
														src={d.image}
														style={{
															width: "16px",
															height: "16px",
														}}
													/>
												</a>
											) : null}
											<Typography
												variant="body1"
												marginBottom={0}
											>
												{d.showValue ? d.value : ""}
											</Typography>
										</div>
									</Grid>
								</Grid>
							);
						});
						return <Stack spacing={1}>{items}</Stack>;
					})()}
				</Box>
			</Box>
		</ThemeProvider>
	);
}
