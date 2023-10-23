<script lang="ts" setup>
import { sleep } from '~/utils/helpers';

	const isOpen = ref(false);
    const file = ref<File | undefined>(undefined);

    

    const submitUpload = async (file:any) =>{
        const { uploadExcel } = useExcel();
        isLoading.value = true;

        await uploadExcel(file);
        file.value = undefined;
        isLoading.value = false;
        sleep(1000);
        isOpen.value = false;
        const { refreshEvents } = useEventsStore();
        refreshEvents();
    }

    function selectedFile(event: any) {
        file.value = event.target.files[0];
    }

    const isLoading = ref(false);

</script>
<template>
	<div>
		<UButton @click="isOpen = true">Upload Excel</UButton>
		<UModal v-model="isOpen">
			<UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
				<template #header>
                    <div class="flex justify-between">
                        <span>Upload an excel</span>
                        <UButton @click="isOpen = false" color="red">Close</UButton>
                    </div>
                </template>

                <div class="p-4">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Note:</span> make sure you download a sample from existing data then adjust and upload
                    </p>
                </div>
				<div class="p-x flex items-start justify-start w-full">
					<label v-if="!file"
						for="dropzone-file"
						class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
						<div  class="flex flex-col items-center justify-center pt-5 pb-6">
							<UIcon class="text-5xl text-gray-600" name="i-heroicons-cloud-arrow-up" />
							<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
								<span class="font-semibold">Click to upload</span> or drag and drop
							</p>
							<p class="text-xs text-gray-500 dark:text-gray-400">xlsx</p>
						</div>
					</label>

                    <div v-else class="pt-5 pb-6">
                        <div>{{ file?.name }}</div>
                        <UButton color="red" @click="file = undefined">Clear</UButton>
                        

                    </div>

                    <input  @change="selectedFile" id="dropzone-file" type="file" class="hidden" />
				</div>

				<template v-if="file" #footer>
                    <UButton block @click="submitUpload(file)" label="upload" />
                </template>
			</UCard>
		</UModal>
	</div>
</template>
