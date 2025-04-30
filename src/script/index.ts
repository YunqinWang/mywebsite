import "../style/main.css";
import { ReactBase } from "./react_base";
import { HomePage } from "./react/home";

document.addEventListener("DOMContentLoaded", async function () {
	let app = new ReactBase("main");
	await app.renderApp(HomePage, {});
});
