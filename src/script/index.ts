// import "../style/main.css";
import "../style/portfolio_main.css";
import { ReactBase } from "./react_base";
// import { HomePage } from "./react/home";
// import { MyFooter } from "./react/component";
import Portfolio from "./react/Portfolio";

document.addEventListener("DOMContentLoaded", async function () {
	let app = new ReactBase("main");
	// await app.renderApp(HomePage, {});
	await app.renderApp(Portfolio, {});

	// app.renderFooter(MyFooter, {});
});
