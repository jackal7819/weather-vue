<script setup>
	import { RouterLink, RouterView } from 'vue-router';
	import SiteNavigation from './components/SiteNavigation.vue';
</script>

<template>
	<div class='flex flex-col min-h-screen bg-slate-900 text-slate-400'>
		<SiteNavigation />
		<RouterView />
	</div>
</template>
