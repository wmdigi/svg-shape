<script>
</script>

<div class="text-white w-full h-screen flex flex-col items-center justify-center gap-4">
	<div class=" w-[450px] h-[450px] flex items-center justify-center relative border border-white/5 shadow-md rounded bg-neutral-900">
		<div class="box w-[128px] h-[128px] "></div>
	</div>

	<h1 class="text-clamp-xs font-bold uppercase">{`<svg-shape>`}</h1>
	<p class="opacity-50">With our custom features</p>
</div>

<style global>
	.box {
		background: paint(squircle);
		--squircle-radius: 60px;
		--squircle-fill: red;
		--squircle-outline: 0px;
		--squircle-smooth: 0.6;
	}
</style>