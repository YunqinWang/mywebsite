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
					height: "200px",
					background:
						"linear-gradient(120deg, #503962 20%, #BD4916 100%);",
					overflow: "hidden",
					// "&:hover": {
					// 	bgcolor: "primary.dark",
					// },
				}}
			>
				<Box className="m-auto w-75 text-white">
					<h5>CONTACT</h5>
					{(() => {
						let data = [
							{ label: "Email", value: "wyq0307qyw@gmail.com" },
							{ label: "Github", value: "wyq0307qyw@gmail.com" },
						];
						return data.map((d) => {
							return (
								<div className="d-flex">
									<p>{d.label}</p>
									<p>{d.value}</p>
								</div>
							);
						});
					})()}
				</Box>
			</Box>
		</ThemeProvider>
	);
}
