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
	<div class="page">
		<div class="flex flex-col justify-center items-center  min-h-screen">
			<div class="p-6 rounded">
                <UButton 
                size="xl" 
                class="font-normal border-0" 
                color="white" variant="solid"  
                @click="loginWithAuthProvider('google')" 
                icon="i-heroicons-user" trailing
                label="سجل دخولك بقوقل" />
			</div>
		</div>
	</div>
</template>
