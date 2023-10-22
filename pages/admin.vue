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

	const { events } = useEventsStore();
	console.log(events);

	// print object keys
	console.log(Object.keys(events[0]));
	let mystrings = '';

	Object.keys(events[0]).forEach((key) => {
		mystrings += `{key: '${key}', label: '${key}'},`;
	});

	console.log(mystrings);
	const q = ref('');

	const filteredRows = computed(() => {
		if (!q.value) {
			return events;
		}

		return events.filter((keyword) => {
			return Object.values(keyword).some((value) => {
				return String(value).toLowerCase().includes(q.value.toLowerCase());
			});
		});
	});

	const selected = ref([]);

	watch(selected, (val) => {
		console.log(val);
	});

	const columns = [
		{ key: 'id', label: 'id', sortable: true },
		{ key: 'title', label: 'title', sortable: true },
		{ key: 'category', label: 'category', sortable: true },
		{ key: 'city', label: 'city', sortable: true },

		{ key: 'area', label: 'area', sortable: true },
		{ key: 'entity', label: 'entity', sortable: true },
		{ key: 'language', label: 'language', sortable: true },
		{ key: 'll', label: 'll', sortable: true },
		{ key: 'start_date', label: 'start_date', sortable: true },
		{ key: 'end_date', label: 'end_date', sortable: true },
		{ key: 'start_time', label: 'start_time', sortable: true },
		{ key: 'end_time', label: 'end_time', sortable: true },
	];

    const deleteEvents = async () => {
        const { deleteEvent } = useEventsStore();
        
        selected.value.forEach(async (id) => {
            await deleteEvent(id);
        });
        console.log('deleted');
    }




</script>
<template>
	<div class="text-white py-4">
		<div class="max-w-7xl mx-auto bg-white text-slate-500 p-6 rounded">
			<div class="flex flex-col space-y-2">
				<div>Welcome {{ user.displayName }}</div>
				<div><MyButton color="red" @click="signOut()" title="تسجيل خروج" /></div>
				<UInput v-model="q" placeholder="إبحث" />
				<div v-if="selected.length > 0" class="space-x-2">
                    <UButton @click="deleteEvents" color="red">Delete</UButton>
					<UButton color="blue" @click="selected = []">Clear</UButton>
				</div>
				<div class="flex-[1] overflow-auto">
					<UTable v-model="selected" :columns="columns" :rows="filteredRows" />
				</div>
			</div>
		</div>
	</div>
</template>
