<script setup>
	import { RouterView } from 'vue-router';
	import SiteNavigation from './components/SiteNavigation.vue';
</script>

<template>
	<div class="flex flex-col min-h-screen bg-slate-900 text-slate-400">
		<SiteNavigation />
		<RouterView v-slot="{ Component }">
			<Transition name="page" mode="out-in">
				<component :is="Component" />
			</Transition>
		</RouterView>
	</div>
</template>

<style>
	.page-enter-active,
	.page-leave-active {
		transition: all 0.6s ease;
	}
	.page-enter-from,
	.page-leave-to {
		opacity: 0;
	}
</style>
