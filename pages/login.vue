<script setup lang="ts">
	const { loginWithAuthProvider } = useAuth();

	definePageMeta({
		middleware: [
			function (to, from) {
				const { user } = useUserStore();
				if (user) {
					return navigateTo('/');
				}
			},
		],
	});
</script>

<template>
	<div class="flex flex-col justify-center items-center text-white h-full">
		<div class="bg-white text-slate-500 p-6 rounded">
			<MyButton color="blue" outline="true" @click="loginWithAuthProvider('google')" title="سجل دخولك بقوقل" />
		</div>
	</div>
</template>
