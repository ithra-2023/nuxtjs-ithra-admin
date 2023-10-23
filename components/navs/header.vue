<script lang="ts" setup></script>
<template>
	<header>
		<div class="mx-auto max-w-screen-xl px-4 py-4 text-white">
			<div class="sm:flex sm:items-center sm:justify-between">
				<div class="text-center sm:text-left">
					<h1 class="text-2xl font-bold  sm:text-3xl">Admin Panel</h1>
					<p class="mt-1.5 text-sm ">Sharqiyah Gets Creative 2023! 🎉</p>
				</div>

				<div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
					<NuxtLink to="https://github.com/ithra-2023" target="_blank"
						class="inline-flex items-center justify-center gap-1.5 rounded-lg border  px-5 py-3 text-white transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
						type="button">
						<span class="text-sm font-medium">View GitHub</span>

						<UIcon name="i-simple-icons-github" class="ms-2 " />
					</NuxtLink>


					<NuxtLink to="https://ithra.6degrees.com.sa"
						class="block rounded-lg bg-yellow-100 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-yellow-200 focus:outline-none focus:ring"
						type="button">
						
                        <span class="text-sm font-medium">View Website</span>

                        <UIcon name="i-heroicons-arrow-top-right-on-square" class="ms-2 " />
					</NuxtLink>
				</div>
			</div>
		</div>
	</header>
</template>
