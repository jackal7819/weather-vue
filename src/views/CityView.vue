<script setup>
	import AsyncCityView from '@/components/AsyncCityView.vue';
</script>

<template>
	<div>
		<Suspense>
			<AsyncCityView />
			<template #fallback>
				<h1 class="text-2xl text-center mt-[40vh]">Loading...</h1>
			</template>
		</Suspense>
	</div>
</template>
