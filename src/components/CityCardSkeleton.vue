<script setup>
	import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
</script>

<template>
	<div
		class="flex px-3 py-6 rounded-md shadow-md shadow-slate-400 bg-sky-700"
	>
		<div class="flex flex-col flex-1 gap-2">
			<AnimatedPlaceholder class="max-w-[50%]" />
			<AnimatedPlaceholder class="max-w-[40%]" />
		</div>

		<div class="flex flex-col items-end flex-1 gap-2">
			<AnimatedPlaceholder class="max-w-[50px] w-full" />
			<AnimatedPlaceholder class="max-w-[75px] w-full" />
		</div>
	</div>
</template>
