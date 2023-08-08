<template>
  <wt-popup
    min-width="480"
    @close="emit('cancel')"
  >
    <template v-slot:title>
      {{ $t('objects.lookups.skills.selectCapacityAndState') }}
    </template>
    <template v-slot:main>
      <form class="config-agent-skill-popup-form">
        <wt-input
          v-model="state.capacity"
          :label="$t('objects.lookups.skills.capacity')"
          type="number"
        ></wt-input>
        <wt-switcher
          v-model="state.enabled"
          :label="$t('objects.lookups.skills.state')"
          label-left
        ></wt-switcher>
      </form>
    </template>
    <template v-slot:actions>
      <wt-button
        @click="emit('select', state)"
      >{{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="emit('back')"
      >{{ $t('objects.back') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits([
  'select',
  'back',
  'cancel',
]);

const state = reactive({
  capacity: 10,
  enabled: false,
});
</script>

<style lang="scss" scoped>
.config-agent-skill-popup-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
