<template>
  <wt-switcher
    :model-value="allState"
    :disabled="disabled || isLoading"
    :label="$t('objects.lookups.skills.stateForAll')"
    @update:model-value="changeState"
  />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const allState = defineModel({ default: false })

interface stateSwitcherProps {
  disabled: boolean
  isLoading: boolean
}
interface stateSwitcherEmits {
  (e: 'update:model-value', value: boolean): void
  (e: 'onLoadItem'): void
  (e: 'onLoadGlobalState'): void
}

withDefaults(defineProps<stateSwitcherProps>(), {
  disabled: false,
  isLoading: false,
})
const emit = defineEmits<stateSwitcherEmits>()

const store = useStore()

const fetchGlobalState = async () => {
  emit('onLoadGlobalState')
}

const changeState = async (value: boolean) => {
  try {
    allState.value = value
    emit('update:model-value', value)
    emit('onLoadItem')
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  fetchGlobalState()
})

</script>
<style scoped lang="scss">

</style>