<script lang="ts" setup>
	const { user } = useUserStore();
	const { signOut } = useAuth();
    // current route name
    const routeName = useRoute().name?.toString().toLowerCase();
    // current route path
    const routePath = useRoute().path;
    console.log('routeName', routeName);
    console.log('routePath', routePath);
</script>
<template>
	<div class="flex h-full flex-col justify-between">
		<ul class="space-y-1">
			<li><NuxtLink to="/admin"        class="block rounded-lg px-4 py-2 text-sm font-medium" active-class="bg-gray-100 text-gray-700">Events</NuxtLink></li>
			<li><NuxtLink to="/reviews" class="block rounded-lg px-4 py-2 text-sm font-medium" active-class="bg-gray-100 text-gray-700">Reviews</NuxtLink></li>
            <li><NuxtLink to="" class="block rounded-lg px-4 py-2 text-sm font-medium" active-class="bg-gray-100 text-gray-700">General Settings</NuxtLink></li>

		
		</ul>

		<div class="sticky inset-x-0 rounded bottom-0 shadow space-y-2 p-3 bg-white text-gray-800 hover:bg-gray-50">
			<a class="flex items-center justify-center gap-2">
				<UAvatar :src="user.photoURL" />
				<p class="text-xs block">
					<strong class="block font-medium">{{ user.displayName }}</strong>
					<span> {{ user.email }} </span>
				</p>
			</a>
			<UButton
				block
				class="border-0"
				color="red"
				variant="solid"
				@click="signOut()"
				label="تسجيل خروج"
				icon="i-heroicons-arrow-left-on-rectangle" />
		</div>
	</div>
</template>
