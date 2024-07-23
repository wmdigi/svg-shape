<script>
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { HighlightSvelte } from "svelte-highlight";
	import { shapes } from './shapes';

	let code = '',
	randomIndex = 0,
	shape = spring(shapes[3], {
		stiffness: 0.05,
		damping: 0.5
	});

	function toRgba(rgbaArray) {
		if (!rgbaArray || !Array.isArray(rgbaArray) || rgbaArray.length !== 4) {
			console.error('Invalid RGBA array:', rgbaArray);
			return 'rgba(0,0,0,1)';
		}

		return `rgba(${rgbaArray.join(', ')})`;
	};

	function updateShape(index) {
		shape.set(shapes[index]);

		code = `
		<svg-shape
			bgFrom="${toRgba(shapes[index].bgFrom)}"
			bgTo="${toRgba(shapes[index].bgTo)}"
			borderTo="${toRgba(shapes[index].borderFrom)}"
			borderFrom="${toRgba(shapes[index].borderTo)}"
			tr="${shapes[index].tr}"
			bl="${shapes[index].bl}"
			br="${shapes[index].br}"
			tl="${shapes[index].tl}"
			border="${shapes[index].border}"
		/>
		`;
	}

	onMount(() => {
		let flip = setInterval(() => {
			randomIndex = (randomIndex + 1) % shapes.length; // Increment and wrap around
			updateShape(randomIndex);
		}, 2000);

		return () => clearInterval(flip);
	});
</script>

<div class="text-white w-full h-screen flex flex-col items-center justify-center gap-4">
	<div class="flex flex-col md:flex-row">
		<div class="relative w-[375px] sm:w-[450px] h-[450px] items-center justify-center flex">
			<svg-shape
				bgFrom={toRgba($shape.bgFrom)}
				bgTo={toRgba($shape.bgTo)}
				borderTo={toRgba($shape.borderFrom)}
				borderFrom={toRgba($shape.borderTo)}
				tr={$shape.tr}
				bl={$shape.bl}
				br={$shape.br}
				tl={$shape.tl}
				border={$shape.border}
				class="relative overflow-hidden"
				style={`width: ${$shape.w}px; height: ${$shape.h}px; border-radius: ${$shape.radius}px;`}
			/>
			<svg-shape
				bgFrom={toRgba($shape.bgFrom)}
				bgTo={toRgba($shape.bgTo)}
				borderTo={toRgba($shape.borderFrom)}
				borderFrom={toRgba($shape.borderTo)}
				tr={$shape.tr}
				bl={$shape.bl}
				br={$shape.br}
				tl={$shape.tl}
				border={$shape.border}
				class="absolute top-1/2 left-1/2 z-0 opacity-30"
				style={`filter: blur(24px); width: ${$shape.w}px; height: ${$shape.h}px; border-radius: ${$shape.radius}px; transform: translate3d(-50%, -45%, 0);`}
			/>
		</div>
		<div class="overflow-hidden w-[450px] relative border border-white/5 shadow-md rounded bg-neutral-900">
			<!--
			<div
				class="absolute top-1/2 left-1/2 z-0 opacity-30 bg-red-500"
				style={`width: ${$shape.w}px; height: ${$shape.h}px; border-radius: ${$shape.radius}px; transform: translate3d(-50%, -45%, 0);`}
			/>
			-->
				<HighlightSvelte
				{code}
				class="relative items-center justify-center flex bg-transparent"
				--langtag-background="transparent"
				/>
			</div>
	</div>

	<h1 class="text-clamp-xs font-bold uppercase">{`<svg-shape>`}</h1>
	<p class="opacity-50">With our custom features</p>
</div>
