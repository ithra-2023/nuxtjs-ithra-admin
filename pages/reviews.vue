<script lang="ts" setup>
	const q = ref('');
	const isLoading = ref(false);
	const selected = ref<IEvent[]>([]);
	const eventsStore = useEventsStore();
	const events = computed(() => eventsStore.events);

    // extract reviews from events. reviews is a firebase property of an event, 
    // that is an array of maps, the map key is the user id, and the content are review and rating, rating is a number from 1 to 5
    // sample:
    /*
        {
    "id": "2GySXrSgYiKjLrLijxJ3",
    "area": "مستقر",
    "entity": "مؤسسة بوتقة",
    "end_date": {
        "seconds": 1699045200,
        "nanoseconds": 0
    },
    "ll": "26.343629431730974,50.147866771164544",
    "category": "العمارة",
    "start_time": "3:00",
    "end_time": "20:00",
    "title": "التفكير في الخلق: نهج نحو التفكير المفاهيمي",
    "city": "الدمام",
    "reviews": {
        "hkLjPSzOHdMTpyR7klhbNTS1Vym1": {
            "rating": 4,
            "review": "An awesome event"
        }
    },
    "language": [
        "العربية",
        " الإنجليزية"
    ],
    "start_date": {
        "seconds": 1699045200,
        "nanoseconds": 0
    }
}
    */
    const reviews = computed(() => {
        const reviews: any[] = [];
        events.value.forEach((event: any) => {
            if (event.reviews) {
                Object.keys(event.reviews).forEach((userId) => {
                    const review = event.reviews[userId];
                    reviews.push({
                        ...review,
                        eventId: event.id,
                        eventTitle: event.title,
                        userId,
                    });
                });
            }
        });
        return reviews;
    });

    console.log('reviews', reviews.value); 


    const columns = [
        { key: 'eventTitle', label: 'eventTitle', sortable: true, class: 'w-30 max-w-xs' },
        { key: 'review', label: 'review', sortable: true, class: 'w-30 max-w-xs' },
        { key: 'rating', label: 'rating', sortable: true, class: 'w-10 max-w-xs' },
        { key: 'userId', label: 'userId', sortable: true, class: 'w-10 max-w-xs' },
        { key: 'eventId', label: 'eventId', sortable: true, class: 'w-10 max-w-xs' },
    ];

	async function downloadXlsx() {
		const { downloadExcel } = useExcel();
		await downloadExcel(selected.value);
	}

	const filteredRows = computed(() => {
		if (!q.value) {
			return reviews.value;
		}

		return reviews.value.filter((keyword: any) => {
			return Object.values(keyword).some((value) => {
				return String(value).toLowerCase().includes(q.value.toLowerCase());
			});
		});
	});


	const refreshEvents = async () => {
		isLoading.value = true;
		await eventsStore.refreshEvents();
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
								<UButton :loading="isLoading" @click="refreshEvents" variant="outline" color="gray">Refresh</UButton>
							</div>
							<div>
								<UInput v-model="q" placeholder="إبحث" />
							</div>
							<div v-if="selected.length > 0" class="space-x-2">
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
