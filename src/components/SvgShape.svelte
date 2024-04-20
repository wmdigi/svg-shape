<svelte:options customElement="svg-shape" />

<script>
	import { onMount } from 'svelte';

	let el;

	export let tl = 0,
		tr = 0,
		bl = 0,
		br = 0,
		w = 0,
		h = 0,
		border = 1,
		borderColor = "",
		borderFrom = '',
		borderTo = '',
		bg = '',
		bgFrom = '',
		bgTo = '',
		style = ''

	let d = '';

	let background = `url("data:image/svg+xml;<svg version='1.1'
	id='shape-1'
	preserveAspectRatio='none'
	xmlns='http://www.w3.org/2000/svg'
	xmlns:xlink='http://www.w3.org/1999/xlink'
	viewBox='0 0 ${w} ${h}'>
		<path
			stroke-width='${border}'
			fill='url(#super-shape-bg-gradient)'
			stroke='url(#super-shape-border-gradient)'
			d='M 0,${h/2} C 0,0 0,0 ${w/2},0 S ${w},0 ${w},${h/2} ${w},${h} ${w/2},${h} 0,${h} 0,${h/2}'>
			<defs>
				<linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="super-shape-bg-gradient">
					<stop offset="0%" stop-color='${bgFrom || bg}' />
					<stop offset="100%" stop-color='${bgTo || bg}' />
				</linearGradient>
				<linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="super-shape-border-gradient">
					<stop offset="0%" stop-color='${borderFrom || borderColor}' />
					<stop offset="100%" stop-color='${borderTo || borderColor}' />
				</linearGradient>
			</defs>
	</svg>");`

	// Compute the path 'd' attribute reactively
	$: if (el) {
		const rect = el.getBoundingClientRect();
		w = rect.width;
		h = rect.height;
		
		const adjust = border / 2;
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
	}

	function updateShape() {
		// This function will now only update the viewBox, as 'd' is reactively managed
	}

	$: updateShape(); // Ensure viewBox updates on resize
</script>

<div bind:this={el} style={style}>
	<svg
		viewBox={`0 0 ${w} ${h}`}
		preserveAspectRatio="none"
		style="width: 100%; height: 100%; display: block; position: absolute; inset: 0; z-index: 0;"
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
	<div style="z-index: 1; position: relative; width: 100%; height: 100%;">
		<slot />
	</div>
</div>

<style>
	svg path {
		transition: fill 0.5s;
	}
</style>