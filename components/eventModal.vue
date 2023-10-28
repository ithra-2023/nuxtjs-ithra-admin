<script lang="ts" setup>
const props = defineProps(['event', 'show']);

const isOpen = ref(false);

if (props.isOpen) {
    console.log('props.isOpen', props.isOpen);
  isOpen.value = true;
}

const cardUi = {
    base: 'h-full flex flex-col',
    rounded: '',
    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    body: {
    base: 'grow'
    }
}
</script>
<template>
  <div>
    <UButton label="Open" @click="isOpen = true" />
    <UModal v-model="isOpen" fullscreen>
      <UCard :ui="cardUi" >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              تعديل فعالية {{ event?.name }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>
        <div class="h-full">
            المحتوى
            </div>
        <template #footer>
            <UButton block size="xl" color="green" class="w-full">حفظ</UButton>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

