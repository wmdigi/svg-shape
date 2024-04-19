<script>
	import { onMount } from 'svelte';
	import { interpolateLab } from 'd3-interpolate';
	import { spring, tweened } from 'svelte/motion';
	import SvgShape from '$lib/components/SvgShape.svelte';

	let colors = {
		bgFrom: 'red',
		bgTo: 'green',
		borderFrom: 'green',
		borderTo: 'yellow'
	};

	let shapes = [
		{
			shape: {
				w: 400,
				h: 200,
				tl: 50,
				tr: 0,
				bl: 0,
				br: 0,
				border: 2,
				radius: 0,
				rotation: 0,
				bgFrom: 200,
				bgTo: 260,
				borderFrom: 190,
				borderTo: 270
			},
			colors: {
				bgFrom: 'red',
				bgTo: 'green',
				borderFrom: 'white',
				borderTo: 'black'
			}
		},
		{
			shape: {
				w: 220,
				h: 220,
				tl: 16,
				tr: 16,
				bl: 16,
				br: 16,
				border: 1,
				radius: 0,
				rotation: 0,
				bgFrom: 50,
				bgTo: 25,
				borderFrom: 95,
				borderTo: 80
			},
			colors: {
				bgFrom: 'red',
				bgTo: 'green',
				borderFrom: 'white',
				borderTo: 'black'
			}
		},
		{
			shape: {
				w: 128,
				h: 128,
				tl: 32,
				tr: 32,
				bl: 32,
				br: 32,
				border: 1,
				radius: 0,
				rotation: 45,
				bgFrom: 10,
				bgTo: 50,
				borderFrom: 15,
				borderTo: 55
			},
			colors: {
				bgFrom: 'blue',
				bgTo: 'red',
				borderFrom: 'white',
				borderTo: 'black'
			}
		},
		{
			shape: {
				w: 512,
				h: 256,
				tl: 0,
				tr: 16,
				bl: 0,
				br: 56,
				border: 0,
				radius: 16,
				rotation: 0,
				bgFrom: 40,
				bgTo: 5,
				borderFrom: 1,
				borderTo: 5
			},
			colors: {
				bgFrom: 'yellow',
				bgTo: 'black',
				borderFrom: 'white',
				borderTo: 'black'
			}
		}
	];

	let shape = spring(shapes[0].shape, {
		stiffness: 0.08,
		damping: 1
	});

	function updateShape(index) {
		shape.set(shapes[index].shape);
	}

	onMount(() => {
		setInterval(() => {
			let randomIndex = Math.floor(Math.random() * shapes.length);
			updateShape(randomIndex);
			colors = shapes[randomIndex].colors;
		}, 2000);
	});
</script>

<div class="text-white w-full h-screen flex flex-col items-center justify-center gap-4">

	<div class="relative">
		<SvgShape
			bgFrom={`hsl(${$shape.bgFrom}, 100%, 50%)`}
			bgTo={`hsl(${$shape.bgTo}, 100%, 50%)`}
			borderFrom={`hsl(${$shape.borderFrom}, 100%, 50%)`}
			borderTo={`hsl(${$shape.borderTo}, 100%, 50%)`}
			tr={$shape.tr}
			bl={$shape.bl}
			br={$shape.br}
			tl={$shape.tl}
			border={$shape.border}
			style={`position: relative; overflow: hidden; width: ${$shape.w}px; height: ${$shape.h}px; border-radius: ${$shape.radius}px; transform: rotate(${$shape.rotation}deg);`}
		/>
		<SvgShape
			bgFrom={`hsl(${$shape.bgFrom}, 100%, 50%)`}
			bgTo={`hsl(${$shape.bgTo}, 100%, 50%)`}
			borderFrom={`hsl(${$shape.borderFrom}, 100%, 50%)`}
			borderTo={`hsl(${$shape.borderTo}, 100%, 50%)`}
			tr={$shape.tr}
			bl={$shape.bl}
			br={$shape.br}
			tl={$shape.tl}
			border={$shape.border}
			style={`position: absolute; top:10%; left:0; z-index: 0; filter: blur(50px); opacity: 50%; width: ${$shape.w}px; height: ${$shape.h}px; border-radius: ${$shape.radius}px; transform: rotate(${$shape.rotation}deg);`}
		/>
	</div>

	<h1 class="text-clamp-xs font-bold uppercase">{`<svg-shape>`}</h1>
	<p class="opacity-50">With our custom features</p>
</div>

<style>
	svg-shape {
		position: relative;
		display: block;
	}
</style>
