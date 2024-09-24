<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ t('objects.directory.license.license', 1) }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-select
        :close-on-select="false"
        :disabled="disableUserInput"
        :label="t('objects.directory.license.license', 1)"
        :search-method="loadDropdownOptionsList"
        :value="itemInstance.license"
        multiple
        @input="setItemProp({ path: 'license', value: $event })"
      />
    </div>
  </section>
</template>

<script setup>
import { useCardStore } from '@webitel/ui-sdk/src/store/new/index.js';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useAccessControl } from '../../../../../app/mixins/baseMixins/accessControlMixin/useAccessControl.js';
import LicenseAPI from '../../license/api/license.js';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
  v: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const { t } = useI18n();

const { disableUserInput } = useAccessControl();

const { itemInstance, setItemProp } = useCardStore(props.namespace);

const loadDropdownOptionsList = async (params) => {
  const fields = ['product', 'id'];
  const response = await LicenseAPI.getList({
    ...params,
    fields,
  });
  response.items = response.items.map(({ product, id }) => ({
    name: product,
    id,
  }));
  return response;
};
</script>

<style scoped>

</style>
