<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ t('objects.permissions.permissionsRole') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-select
        :close-on-select="false"
        :disabled="disableUserInput"
        :label="t('objects.permissions.permissionsRole')"
        :search-method="RolesAPI.getLookup"
        :value="itemInstance.roles"
        multiple
        @input="setItemProp({ path: 'roles', value: $event })"
      />
    </div>
  </section>
</template>

<script setup>
import { useCardStore } from '@webitel/ui-sdk/src/store/new/index.js';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useAccessControl } from '../../../../../app/mixins/baseMixins/accessControlMixin/useAccessControl.js';
import RolesAPI from '../../../../permissions/modules/roles/api/roles';

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
</script>
