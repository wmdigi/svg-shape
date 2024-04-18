<script>
	import { onMount } from "svelte";
	import { spring } from "svelte/motion";

	let shape = spring({
		tl: 0,
		tr:0,
		bl:0,
		br:0,
		border:0,
		border-width: 0
	}, {
		stiffness: 0.1,
		damping: 0.25
	});

	onMount(() => {
		class SvgShape extends HTMLElement {
			constructor() {
				super();
				this.attachShadow({ mode: "open" });
				this.shadowRoot.innerHTML = `
					<svg viewBox="0 0 0 0" preserveAspectRatio="none" style="width: 100%; height: 100%; display: block; position: absolute; inset: 0; z-index: 0;">
						<path d="" style="fill: url(#super-shape-bg-gradient); stroke: url(#super-shape-border-gradient); stroke-width: var(--super-shape-border-width, 0px); vector-effect: non-scaling-stroke;"></path>
						<linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="super-shape-border-gradient">
							<stop offset="0%" style="stop-color: var(--super-shape-border-from, var(--super-shape-border));" />
							<stop offset="100%" style="stop-color: var(--super-shape-border-to, var(--super-shape-border));" />
						</linearGradient>
						<linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="super-shape-bg-gradient">
							<stop offset="0%" style="stop-color: var(--super-shape-bg-from, var(--super-shape-bg));" />
							<stop offset="100%" style="stop-color: var(--super-shape-bg-to, var(--super-shape-bg));" />
						</linearGradient>
					</svg>
					<div style="z-index:1; position:relative; width:100%; height:100%">
						<slot></slot>
					</div>`;
				}
				
				connectedCallback() {
					this.updateShape();
					window.addEventListener("resize", () => this.updateShape());
				}
				
				disconnectedCallback() {
					window.removeEventListener("resize", () => this.updateShape());
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
		
		attributeChangedCallback(name, oldValue, newValue) {
			this.style.setProperty(`--super-shape-${name}`, newValue);
			this.updateShape();
		}
		
		updateShape() {
			const svg = this.shadowRoot.querySelector("svg");
			const path = this.shadowRoot.querySelector("path");
			const rect = this.getBoundingClientRect();

			this.style.setProperty("display", "block");
			this.style.setProperty("position", "relative");
			
			svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
			
			const strokeWidth = parseInt(this.getAttribute("border-width") || 0);
			const adjust = strokeWidth / 2;
			
			const tl = parseFloat(this.getAttribute("tl") || 0);
			const tr = parseFloat(this.getAttribute("tr") || 0);
			const br = parseFloat(this.getAttribute("br") || 0);
			const bl = parseFloat(this.getAttribute("bl") || 0);
			
			const d = `
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
			
			path.setAttribute("d", d);
		}
	}
	
	customElements.define('svg-shape', SvgShape);
});
</script>

<div class="text-white w-full h-screen flex flex-col items-center justify-center gap-4 ">
	<svg-shape
	bg-from="green"
	bg-to="yellow"
	tr="24"
	class="h-32 w-32 rounded-xl overflow-hidden"
	>
	</svg-shape>
	<h1 class="text-clamp-xs font-bold uppercase">Svelte starter</h1>
	<p class="opacity-50">With our custom features</p>
</div>