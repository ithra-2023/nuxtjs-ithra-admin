<script lang="ts" setup>
const props = defineProps(['event']);

const show = ref(false);

const openModal = () => {
  show.value = true;
};


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
    
  </div>
</template>

