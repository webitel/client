<template>
  <wt-switcher
    :model-value="allState"
    :disabled
    :label="$t('objects.lookups.skills.stateForAll')"
    @update:model-value="changeState"
  />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import QueueStateApi from '../api/queueState'
const allState = defineModel({ default: false })

interface stateSwitcherProps {
  disabled: boolean
}
interface stateSwitcherEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'onLoadItem'): void
}

withDefaults(defineProps<stateSwitcherProps>(), {
  disabled: false,
})
const emit = defineEmits<stateSwitcherEmits>()



const fetchAllState = async () => {
  try {
    const state = await QueueStateApi.getQueuesGlobalState()
    allState.value = !!state?.isAllEnabled
  } catch (e) {
    console.error(e)
  }
}

const changeState = async (value: boolean) => {
  try {
    await QueueStateApi.setQueuesGlobalState({ enabled: value })
    allState.value = value
    emit('onLoadItem')
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  fetchAllState()
})

defineExpose({
  fetchAllState,
})
</script>
<style scoped lang="scss">

</style>