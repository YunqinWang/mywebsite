import { createTheme } from "@mui/material/styles";
import { blueGrey, blue, grey, amber, deepOrange } from "@mui/material/colors";
import "../../style/theme.scss";

let theme = createTheme({
	palette: {
		primary: {
			light: "#DDCDEA",
			main: "#A082B9",
			dark: "#503962",
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
	typography: {
		fontFamily: "Montserrat",
		h3: {
			fontSize: 22,
		},
		h4: {
			fontSize: 18,
		},
		h5: {
			fontSize: 16,
			fontWeight: 500,
		},

		h6: {
			fontSize: 14,
		},
		body1: {
			fontSize: 12,
		},
	},
});

export { theme };
