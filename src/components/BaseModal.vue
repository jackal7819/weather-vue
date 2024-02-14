<script setup>
	defineEmits(['toggle-modal']);
	defineProps({
		modalActive: {
			type: Boolean,
			default: false,
		},
	});
</script>

<template>
	<Teleport to="body">
		<Transition>
			<div
				v-show="modalActive"
				class="absolute top-0 left-0 flex items-center justify-center w-full h-screen px-10 md:px-20 bg-opacity-40 bg-slate-900"
			>
				<Transition name="slide-fade">
					<div
						v-if="modalActive"
						class="max-w-screen-sm p-4 rounded bg-slate-200"
					>
						<slot />
						<button
							@click="$emit('toggle-modal')"
							class="w-full px-6 py-2 mt-8 text-white duration-300 rounded bg-slate-900 hover:bg-sky-700"
						>
							Close
						</button>
					</div>
				</Transition>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
	.slide-fade-enter-active {
		transition: all 0.3s ease-out;
	}

	.slide-fade-leave-active {
		transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		transform: scale(0.8);
		opacity: 0;
	}
</style>
