import React from "react";
import ReactDOM from "react-dom/client";

export class ReactBase {
	protected domContainerId: string;

	private domContainer: null | HTMLElement = null;
	private root: ReactDOM.Root | null = null;

	constructor(domContainerId: string) {
		this.domContainerId = domContainerId;
	}

	async renderApp(
		component: (arg: any) => React.JSX.Element,
		componentArg: any
	) {
		this.domContainer = document.getElementById(
			this.domContainerId
		) as HTMLDivElement;
		console.log(this.domContainerId, this.domContainer);
		if (!this.domContainer) return;
		this.root = ReactDOM.createRoot(this.domContainer);
		const e = React.createElement;
		this.root.render(e(component, componentArg));
	}

	renderFooter(
		component: (arg: any) => React.JSX.Element,
		componentArg: any
	) {
		let footerContainer = document.getElementsByTagName(
			"footer"
		)[0] as HTMLDivElement;
		let root = ReactDOM.createRoot(footerContainer);
		const e = React.createElement;

		root.render(e(component, componentArg));
	}
}
