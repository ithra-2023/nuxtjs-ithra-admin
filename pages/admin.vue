<script lang="ts" setup>
	const q = ref('');
	const isLoading = ref(false);
	const selected = ref<IEvent[]>([]);
	const eventsStore = useEventsStore();
	const events = computed(() => eventsStore.events);

	const columns = [
		{ key: 'title', label: 'title', sortable: true, class: 'w-30 max-w-xs' },
		{ key: 'category', label: 'category', sortable: true, class: 'w-15 max-w-xs' },
		{ key: 'city', label: 'city', sortable: true, class: 'w-15 max-w-xs' },
		{ key: 'entity', label: 'entity', sortable: true, class: 'w-30 max-w-xs' },
		{ key: 'start_time', label: 'start_time', sortable: true, class: 'w-10 max-w-xs' },
		{ key: 'end_time', label: 'end_time', sortable: true, class: 'w-10 max-w-xs' },
		{ key: 'language', label: 'language', sortable: true, class: 'w-20 max-w-xs' },
	];

	async function downloadXlsx() {
		const { downloadExcel } = useExcel();
		await downloadExcel(selected.value);
	}

	const filteredRows = computed(() => {
		if (!q.value) {
			return events.value;
		}

		return events.value.filter((keyword) => {
			return Object.values(keyword).some((value) => {
				return String(value).toLowerCase().includes(q.value.toLowerCase());
			});
		});
	});

	const deleteEvents = async () => {
		const { deleteEvent } = useEventsStore();

		console.log(selected.value[0].id);

		selected.value.forEach(async (item) => {
			console.log('deleting', item.id);
			await deleteEvent(item.id);
		});

		selected.value = [];
		console.log('deleted');
	};

	const refreshEvents = async () => {
		isLoading.value = true;
		const { refreshEvents } = useEventsStore();
		await refreshEvents();
		isLoading.value = false;
	};

	definePageMeta({
		middleware: [
			async function (to, from) {
				const { user } = useUserStore();
				if (!user) {
					return navigateTo('/login');
				}
			},
		],
	});

	watch(selected, (val: IEvent[]) => {
		if (val.length > 0) console.log(val[0].id);
	});



</script>
<template>
	<div class="min-h-screen flex flex-col h-screen">
		<NavsHeader />
		<section class="py-4 flex-1 overflow-hidden">
			<UContainer class="h-full">
				<div class="grid grid-cols-9 gap-4 h-full">
					<NavsSide class="text-white" />
					<div class="main-content col-span-8 overflow-hidden h-full">
						<div class="p-4 w-full space-y-4 flex flex-col bg-white text-slate-500 rounded h-full">
							<div class="flex justify-end space-x-2">
								<UButton :loading="isLoading" @click="refreshEvents" variant="outline" color="gray">Refresh</UButton><UploadModal />
							</div>
							<div>
								<UInput v-model="q" placeholder="إبحث" />
							</div>
							<div v-if="selected.length > 0" class="space-x-2">
								<UButton @click="deleteEvents" color="red">Delete</UButton>
								<UButton color="blue" @click="selected = []">Clear</UButton>
								<UButton @click="downloadXlsx" color="green">Download</UButton>
							</div>
							<div class="flex-1 w-full overflow-auto">
								<UTable class="text-sm max-w-full" v-model="selected" :columns="columns" :rows="filteredRows" />
							</div>
						</div>
					</div>
				</div>
			</UContainer>
		</section>

		<NavsFooter />
	</div>
</template>
