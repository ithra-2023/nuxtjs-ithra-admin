<script lang="ts" setup>
	const { user } = useUserStore();
	const { signOut } = useAuth();
</script>
<template>
	<div class="flex h-full flex-col justify-between">
		<ul class="space-y-1">
			<li>
				<a href="" class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"> General </a>
			</li>

			<li>
				<details class="group [&_summary::-webkit-details-marker]:hidden">
					<summary
						class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700">
						<span class="text-sm font-medium"> Teams </span>

						<span class="shrink-0 transition duration-300 group-open:-rotate-180">
							<UIcon name="i-heroicons-chevron-down" />
						</span>
					</summary>

					<ul class="mt-2 space-y-1 px-4">
						<li><a href="" class="block rounded-lg px-4 py-2 text-sm font-medium">Banned Users</a></li>
						<li><a href="" class="block rounded-lg px-4 py-2 text-sm font-medium">Calendar</a></li>
					</ul>
				</details>
			</li>

			<li><a href="" class="block rounded-lg px-4 py-2 text-sm font-medium">Billing</a></li>

		
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
