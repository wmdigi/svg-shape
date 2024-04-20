class SvgSquircle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `<slot></slot>`;
	}

	connectedCallback() {
		this.resizeObserver = new ResizeObserver(() => {
			this.updateShape()
		});
		this.resizeObserver.observe(this, { box : 'border-box' })
	}

	disconnectedCallback() {
		console.log("disconnected", this);
		this.resizeObserver.disconnect();
	}

	static get observedAttributes() {
		return [
			"tl",
			"tr",
			"bl",
			"br",
			"border",
			"border-from",
			"border-to",
			"border-width",
			"bg",
			"bg-from",
			"bg-to",
		];
	}

	updateShape = () => {
		const style = this.getAttribute("style") || "";

		const rect = this.getBoundingClientRect();

		console.log("Size:", rect.width, rect.height);

		const w = rect?.width;
		const h = rect?.height;
		const border = this.getAttribute("border-width") || 0;
		const borderColor = this.getAttribute("border") || "transparent";
		const borderFrom = this.getAttribute("border-from") || borderColor;
		const borderTo = this.getAttribute("border-to") || borderColor;
		const bg = this.getAttribute("bg") || "transparent";
		const bgFrom = this.getAttribute("bg-from") || bg;
		const bgTo = this.getAttribute("bg-to") || bg;

		const path = `M 0,${h/2} C 0,0 0,0 ${w/2},0 S ${w},0 ${w},${h/2} ${w},${h} ${w/2},${h} 0,${h} 0,${h/2}`;

		d = `
            M ${tl + adjust},${adjust}
            L ${rect.width - tr - adjust},${adjust}
            L ${rect.width - adjust},${tr + adjust}
            L ${rect.width - adjust},${rect.height - br - adjust}
            L ${rect.width - br - adjust},${rect.height - adjust}
            L ${bl + adjust},${rect.height - adjust}
            L ${adjust},${rect.height - bl - adjust}
            L ${adjust},${tl + adjust} 
            Z
        `;
		
		const background = `url('data:image/svg+xml,<svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><path stroke-width="${border}" fill="url(%23squircle-bg-gradient)" stroke="url(%23squircle-border-gradient)" d="${path}"></path><defs><linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="squircle-bg-gradient"><stop offset="0%" stop-color="${bgFrom || bg}" /><stop offset="100%" stop-color="${bgTo || bg}" /></linearGradient><linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="squircle-border-gradient"><stop offset="0%" stop-color="${borderFrom || borderColor}" /><stop offset="100%" stop-color="${borderTo || borderColor}" /></linearGradient></defs></svg>')`

		//this.style.background = background;
		this.setAttribute("style", `display: flex; background: ${background}; background-size: cover;`);
	};
}

if ("customElements" in window) {
	customElements.define("svg-squircle", SvgSquircle);
}
