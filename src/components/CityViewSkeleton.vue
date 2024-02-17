<script setup>
	import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
</script>
<template>
	<div class="flex flex-col flex-1">
		<div class="flex flex-col items-center py-8">
			<AnimatedPlaceholder class="w-full mb-2 max-w-72" />
			<AnimatedPlaceholder class="w-full mb-8 max-w-72" />
			<AnimatedPlaceholder class="w-full h-24 mb-8 max-w-72" />
			<AnimatedPlaceholder class="w-full mb-8 max-w-72" />
			<AnimatedPlaceholder class="w-full h-16 max-w-72" />
		</div>
		<div class="flex flex-col items-center py-8">
			<AnimatedPlaceholder class="w-full h-24 max-w-screen-2xl" />
		</div>
		<div class="flex flex-col items-center py-8">
			<AnimatedPlaceholder class="w-full h-24 max-w-screen-2xl" />
		</div>
	</div>
</template>
