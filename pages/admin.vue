<script lang="ts" setup>
	const { signOut } = useAuth();

	const { user } = useUserStore();
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

	const eventsStore = useEventsStore();

    const events = computed(() => eventsStore.events);


	console.log(events);

	// print object keys
	//console.log(Object.keys(events[0]));
	//let mystrings = '';

	// Object.keys(events[0]).forEach((key) => {
	// 	mystrings += `{key: '${key}', label: '${key}'},`;
	// });

	//console.log(mystrings);

    // Search Query
	const q = ref('');

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

	const selected = ref<IEvent[]>([]);

	watch(selected, (val: IEvent[]) => {
        if(val.length > 0) console.log(val[0].id);
	});

	const columns = [
        // { key: 'id', label: 'id', sortable: true },

		{ key: 'title', label: 'title', sortable: true },
		{ key: 'category', label: 'category', sortable: true },
		{ key: 'city', label: 'city', sortable: true },

	//	{ key: 'area', label: 'area', sortable: true },
		{ key: 'entity', label: 'entity', sortable: true },
		{ key: 'language', label: 'language', sortable: true },
	//	{ key: 'll', label: 'll', sortable: true },
	//	{ key: 'start_date', label: 'start_date', sortable: true },
	//	{ key: 'end_date', label: 'end_date', sortable: true },
	//	{ key: 'start_time', label: 'start_time', sortable: true },
	//	{ key: 'end_time', label: 'end_time', sortable: true },
	];

	const deleteEvents = async () => {
		const { deleteEvent } = useEventsStore();
        
        console.log(selected.value[0].id)
        

		selected.value.forEach(async (item) => {
            console.log('deleting', item.id)
			await deleteEvent(item.id);
		});

        selected.value = [];
		console.log('deleted');
	};
</script>
<template>
	<div class="page flex flex-col h-screen">
		<header class="bg-orange-800 text-white">
			<UContainer>
                X
            </UContainer>
		</header>
		<section class="py-4 h-full flex-1 overflow-auto">
			<UContainer >
				<div class="grid grid-cols-5 gap-4">
					<div class="space-y-4 text-white">
						<div>Welcome {{ user.displayName }}</div>
						<div><UButton class="border-0" color="white" variant="solid" @click="signOut()" label="تسجيل خروج" icon="i-heroicons-arrow-left-on-rectangle" /></div>
					</div>
					<div class="col-span-4 ">
						<div class="p-4 bg-white text-slate-500 rounded">
							<div class="space-y-4">
								<div>
                                    <UInput v-model="q" placeholder="إبحث" />
                                </div>
								<div v-if="selected.length > 0" class="space-x-2">
									<UButton @click="deleteEvents" color="red">Delete</UButton>
									<UButton color="blue" @click="selected = []">Clear</UButton>
								</div>
								<div class="">
                                    <UTable class="text-sm" v-model="selected" :columns="columns" :rows="filteredRows" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</UContainer>
		</section>
		<footer class="bg-orange-800 text-white">
			<UContainer>
                X
            </UContainer>
		</footer>
	</div>
</template>
