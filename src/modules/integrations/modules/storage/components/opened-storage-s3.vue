<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.integrations.storage.s3') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.s3Key')"
        :v="v.itemInstance.properties.keyId"
        :model-value="itemInstance.properties.keyId"
        required
        @update:model-value="setItemProp({ prop: 'keyId', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.s3Access')"
        :label-props="{ hint: $t('objects.directory.passwordInfo'), hintPosition: 'right' }"
        :v="v.itemInstance.properties.accessKey"
        :model-value="itemInstance.properties.accessKey"
        required
        @update:model-value="setItemProp({ prop: 'accessKey', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.bucket')"
        :v="v.itemInstance.properties.bucketName"
        :model-value="itemInstance.properties.bucketName"
        required
        @update:model-value="setItemProp({ prop: 'bucketName', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.pathPattern')"
        :model-value="itemInstance.properties.pathPattern"
        @update:model-value="setItemProp({ prop: 'pathPattern', value: $event })"
      />
      <wt-select
        :disabled="disableService"
        :label="$t('objects.service')"
        :options="serviceOptions"
        :value="service"
        track-by="value"
        @input="setService"
      />
      <wt-select
        v-if="!isCustom"
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.region')"
        :options="regionOptions"
        :v="v.itemInstance.properties.region"
        :value="itemInstance.properties.region"
        required
        track-by="value"
        @input="setItemProp({ prop: 'region', value: $event })"
      />
      <wt-input-text
        v-if="isCustom"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.s3Endpoint')"
        :v="v.itemInstance.properties.endpoint"
        :model-value="itemInstance.properties.endpoint"
        required
        @update:model-value="setItemProp({ prop: 'endpoint', value: $event })"
      />
      <wt-input-text
        v-if="isCustom"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.region')"
        :v="v.itemInstance.properties.region"
        :model-value="itemInstance.properties.region"
        required
        @update:model-value="setItemProp({ prop: 'region', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import storageMixin from '../mixins/storageMixin';
import AWSRegions from '../store/_internals/lookups/AWSRegions.lookup';
import DigitalOceanRegions from '../store/_internals/lookups/DigitalOceanRegions.lookup';
import Service from '../store/_internals/lookups/Service.lookup';

export default {
  name: 'OpenedStorageAws',
  mixins: [openedTabComponentMixin, storageMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
  computed: {
    ...mapState('integrations/storage', {
      id: (state) => state.itemId,
    }),

    serviceOptions() {
      return Object.values(Service);
    },

    isCustom() {
      return !(this.endpoint === Service.AWS.endpoint || this.endpoint === Service.DO.endpoint);
    },

    regionOptions() {
      if (this.endpoint.includes(Service.AWS.endpoint)) {
        return AWSRegions;
      }
      if (this.endpoint.includes(Service.DO.endpoint)) {
        return DigitalOceanRegions;
      }
      return [];
    },

    disableService() {
      return this.disableUserInput || !!this.id;
    },
  },

  methods: {
    ...mapActions('integrations/storage', {
      setItemProp: 'SET_ITEM_PROPERTIES_PROPERTY',
    }),

    setService({ endpoint }) {
      this.setItemProp({
        prop: 'endpoint',
        value: endpoint,
      });
      this.setItemProp({
        prop: 'region',
        value: '',
      });
    },
  },
};
</script>

<style
  lang="scss"
  scoped
></style>
