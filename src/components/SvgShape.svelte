<svelte:options
	customElement={
		{
			tag: 'svg-shape',
			extend: (customElementConstructor) => {
				return class extends customElementConstructor {
					constructor() {
						super();
						this.host = this;
					}
				};
			}
		}
	}

/>
<script>
	export let tl = 0,
		tr = 0,
		bl = 0,
		br = 0,
		border = 1,
		borderFrom = 'white',
		borderTo = 'white',
		bg = '',
		bgFrom = '',
		bgTo = '';

	let d = '',
		w = 0,
		h = 0,
		el;

	$: if (el) {  
		const rect = el.getBoundingClientRect();
		w = rect.width;
		h = rect.height;
		
		const adjust = border / 2;
		d = `M ${tl + adjust},${adjust} L ${rect.width - tr - adjust},${adjust} L ${rect.width - adjust},${tr + adjust} L ${rect.width - adjust},${rect.height - br - adjust} L ${rect.width - br - adjust},${rect.height - adjust} L ${bl + adjust},${rect.height - adjust} L ${adjust},${rect.height - bl - adjust} L ${adjust},${tl + adjust}  Z`;
	}
</script>

<svg
	bind:this={el}
	style={`display: block; position: absolute; inset: 0; z-index: 0;`}
	viewBox={`0 0 ${w} ${h}`}
	preserveAspectRatio="none"
>
	<path
		{d}
		stroke-width={border}
		style="fill: url(#super-shape-bg-gradient); stroke: url(#super-shape-border-gradient); vector-effect: non-scaling-stroke;"
	/>
	<defs>
		<linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="super-shape-bg-gradient">
			<stop offset="0%" stop-color={bgFrom || bg} />
			<stop offset="100%" stop-color={bgTo || bg} />
		</linearGradient>
		<linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="super-shape-border-gradient">
			<stop offset="0%" stop-color={borderFrom} />
			<stop offset="100%" stop-color={borderTo} />
		</linearGradient>
	</defs>
</svg>
<div style="position: relative; width: 100%; height: 100%;">
	<slot />
</div>