import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { theme } from "../style/theme";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import * as d3 from "d3";
import React from "react";

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
							{ label: "Email", value: "wyq0307qyw@gmail.com" },
							{
								label: "Github",
								value: "https://github.com/YunqinWang",
							},
							{
								label: "LinkedIn",
								value: "https://www.linkedin.com/in/fiona-yunqin-wang-4343971a4/",
							},
						];
						let items = data.map((d) => {
							return (
								<Grid container spacing={3}>
									<Grid size={3}>
										<Typography
											variant="body1"
											gutterBottom
										>
											{d.label}
										</Typography>
									</Grid>
									<Grid size={9}>
										<Typography
											variant="body1"
											gutterBottom
										>
											{d.value}
										</Typography>
									</Grid>
								</Grid>
							);
						});
						return <div>{items}</div>;
					})()}
				</Box>
			</Box>
		</ThemeProvider>
	);
}
