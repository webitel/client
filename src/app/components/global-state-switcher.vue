<template>
  <wt-switcher
    :model-value="globalState"
    :disabled="disabled"
    :label="$t('objects.lookups.skills.stateForAll')"
    controlled
    @update:model-value="changeState"
  />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

const globalState = defineModel({ default: false })

interface stateSwitcherProps {
  disabled: boolean
}
interface stateSwitcherEmits {
  (e: 'update:model-value', value: boolean): void
  (e: 'onLoadItem'): void
  (e: 'onLoadGlobalState'): void
}

withDefaults(defineProps<stateSwitcherProps>(), {
  disabled: false,
})
const emit = defineEmits<stateSwitcherEmits>()

const changeState = async (value: boolean) => {
  try {
    globalState.value = value
    emit('update:model-value', value)
    emit('onLoadItem')
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  emit('onLoadGlobalState')
})

</script>
<style scoped lang="scss">

</style>