<template>
  <wt-popup
    v-bind="$attrs"
    size="sm"
    min-width="480"
    @close="close"
  >
    <template #title>
      {{ title }}
    </template>
    <template #main>
      <section>
        <wt-table
          :data="dataList"
          :grid-actions="false"
          :headers="tableHeaders"
          :selectable="false"
        >
          <template #name="{ item }">
            <adm-item-link
              v-if="item.id && routeName"
              :id="item.id"
              :route-name="routeName"
              target="_blank"
            >
              {{ item.name }}
            </adm-item-link>
            <span v-else>
              {{ item.name }}
            </span>
          </template>
        </wt-table>
      </section>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

interface Props {
  title?: string;
  dataList?: Array<any>;
  headers?: Array<{ value: string; text: string }>;
  routeName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  dataList: () => [],
  headers: null,
  routeName: null,
});

const emit = defineEmits<{
  close: [];
}>();

const { t } = useI18n();

const tableHeaders = computed(() => {
  const defaultHeaders = [
    {
      value: 'name',
      text: t('reusable.name'),
    },
  ];
  return props.headers || defaultHeaders;
});

const close = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
</style>
