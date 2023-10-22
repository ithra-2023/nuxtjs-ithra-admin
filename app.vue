<script setup lang="ts">
	import { initFlowbite } from 'flowbite';
	useHead({
		title: 'Admin Panel - Sharqiyah Gets Creative',
	});
    const {boot} = useEventsStore();
	await boot();

</script>
<template>
	<main class="bg-orange-600">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</main>
</template>
