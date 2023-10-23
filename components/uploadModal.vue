<script lang="ts" setup>
import { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';

	const isOpen = ref(false);
    const state = ref({
        file: undefined,
    })

    async function submit (event: FormSubmitEvent<any>) {
        // Do something with data
        console.log(event.data)
    }




</script>
<template>
	<UModal v-model="isOpen">
		<UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header> Title </template>

			<!-- Content -->
			<h2>Hala Hala</h2>
			<UForm :state="state" @submit="submit">
				<UFormGroup label="Email" name="email">
					<UInput type="file" v-model="state.file" />
				</UFormGroup>


				<UButton type="submit"> Submit </UButton>
			</UForm>

			<template #footer> Footer </template>
		</UCard>
	</UModal>
</template>
