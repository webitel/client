<template>
  <wt-switcher
    :model-value="allState"
    :disabled="disabled || isLoading"
    :label="$t('objects.lookups.skills.stateForAll')"
    @update:model-value="changeState"
  />
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

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

const store = useStore()

const isAllEnabled = computed(() => store.getters['ccenter/queues/globalState/IS_ALL_ENABLED'])
const isLoading = computed(() => store.getters['ccenter/queues/globalState/IS_LOADING'])

const fetchGlobalState = async () => {
  try {
    await store.dispatch('ccenter/queues/globalState/FETCH_GLOBAL_STATE')
    allState.value = isAllEnabled.value
  } catch (e) {
    console.error(e)
  }
}

const changeState = async (value: boolean) => {
  try {
    await store.dispatch('ccenter/queues/globalState/SET_GLOBAL_STATE', { enabled: value })
    allState.value = value
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