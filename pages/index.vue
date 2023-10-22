<script setup lang="ts">
	const { loginWithAuthProvider, signOut } = useAuth();
	const { user } = useUserStore();
	const userIsAdmin = ref(false);

	if (user) {
		if (await isAdmin(user.uid)) {
			userIsAdmin.value = true;
		}
	}

	console.log(userIsAdmin.value);

	definePageMeta({
		middleware: [
            async function (to, from) {
                const { user } = useUserStore();
				if (!user) {
					return navigateTo('/login');
				}
			},
			async function (to, from) {
                const { user } = useUserStore();
	            const userIsAdmin = await isAdmin(user.uid)
                console.log('from inside', userIsAdmin.value);
				if (userIsAdmin) {
					return navigateTo('/admin');
				}
			},
		],
	});
</script>

<template>
	<div class="flex flex-col justify-center items-center text-white h-full">
		<div class="bg-white text-slate-500 p-6 rounded">
			<div>
				You are not an admin, please ask admin to add
				<code class="py-1 px-0.5 border border-slate-500 bg-slate-300 rounded-sm font-mono">{{ user.uid }}</code>
			</div>
		</div>
	</div>
</template>
