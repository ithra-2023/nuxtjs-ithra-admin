<script lang="ts" setup>
    const props = defineProps(['percentage'])

    if(!props.percentage) {
        throw new Error('Percentage is required')
    }

    const uploadMessage = computed(() => {
        if(props.percentage < 100) {
            return 'Upload in progress'
        }

        return 'Upload complete'
    })

    const uploadColor = computed(() => {
        if(props.percentage < 100) {
            return 'bg-amber-200'
        }

        return 'bg-green-200'
    })

</script>
<template>
  <div class="relative pt-1">
  <div class="flex mb-2 items-center justify-between">
    <div>
      <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-{{uploadColor}}-600 bg-amber-200">
        {{ uploadMessage }}}
      </span>
    </div>
    <div class="text-right">
      <span class="text-xs font-semibold inline-block text-{{uploadColor}}-600">
        {{ percentage }}
      </span>
    </div>
  </div>
  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-{{uploadColor}}-200">
    <div :style="`width: ${percentage}%`" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-{{uploadColor}}-500"></div>
  </div>
</div>

</template>

