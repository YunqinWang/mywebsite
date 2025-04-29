import { createTheme } from "@mui/material/styles";
import { blueGrey, blue, grey, amber, deepOrange } from "@mui/material/colors";

let theme = createTheme({
	palette: {
		primary: {
			light: "#DDCDEA",
			main: "#A082B9",
			dark: "#4C3261",
			contrastText: "#fff",
		},
		secondary: {
			light: "#FFC6AD",
			main: "#FD804A",
			dark: "#BD4916",
			contrastText: "#fff",
		},
	},
});

theme = createTheme(theme, {
	palette: {
		info: {
			main: theme.palette.secondary.main,
		},
	},
});

export { theme };
