<template>
  <wt-filters-panel-wrapper @reset="resetFilters">
    <filter-select
      :namespace="namespace"
      :label="t('objects.system.changelogs.logs.actions', 1)"
      filter-query="action"
    />
    <filter-select
      :namespace="namespace"
      :label="t('objects.system.changelogs.objects', 1)"
      filter-query="object"
    />
    <filter-datetime
      :label="`${
        t('reusable.modifiedAt')}: ${t('reusable.from').toLowerCase()
      }`"
      :namespace="namespace"
      filter-query="from"
    />
    <filter-datetime
      :label="`${
        t('reusable.modifiedAt')}: ${t('reusable.to').toLowerCase()
      }`"
      :namespace="namespace"
      filter-query="to"
    />
  </wt-filters-panel-wrapper>
</template>

<script setup>
import FilterDatetime from '@webitel/ui-sdk/src/modules/Filters/components/filter-datetime.vue';
import FilterSelect from '@webitel/ui-sdk/src/modules/Filters/components/filter-select.vue';
import { useTableFilters } from '@webitel/ui-sdk/src/modules/Filters/composables/useTableFilters.js';
import { onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const { namespace, resetFilters } = useTableFilters(`${props.namespace}/card/logs/table`);

const { t } = useI18n();

onUnmounted(() => {
  resetFilters();
});
</script>

<style lang="scss" scoped>

</style>
