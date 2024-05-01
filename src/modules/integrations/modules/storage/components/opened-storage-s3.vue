<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.integrations.storage.s3') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.s3Key')"
        :v="v.itemInstance.properties.keyId"
        :value="itemInstance.properties.keyId"
        required
        @input="setItemProp({ prop: 'keyId', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.s3Access')"
        :label-props="{ hint: $t('objects.integrations.emailProfiles.passwordInfo'), hintPosition: 'right' }"
        :v="v.itemInstance.properties.accessKey"
        :value="itemInstance.properties.accessKey"
        required
        @input="setItemProp({ prop: 'accessKey', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.bucket')"
        :v="v.itemInstance.properties.bucketName"
        :value="itemInstance.properties.bucketName"
        required
        @input="setItemProp({ prop: 'bucketName', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.pathPattern')"
        :value="itemInstance.properties.pathPattern"
        @input="setItemProp({ prop: 'pathPattern', value: $event })"
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
      <wt-input
        v-if="isCustom"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.s3Endpoint')"
        :v="v.itemInstance.properties.endpoint"
        :value="itemInstance.properties.endpoint"
        required
        @input="setItemProp({ prop: 'endpoint', value: $event })"
      />
      <wt-input
        v-if="isCustom"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.storage.region')"
        :v="v.itemInstance.properties.region"
        :value="itemInstance.properties.region"
        required
        @input="setItemProp({ prop: 'region', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import storageMixin from '../mixins/storageMixin';
import AWSRegions from '../store/_internals/lookups/AWSRegions.lookup';
import DigitalOceanRegions from '../store/_internals/lookups/DigitalOceanRegions.lookup';
import Service from '../store/_internals/lookups/Service.lookup';

export default {
  name: 'OpenedStorageAws',
  mixins: [openedTabComponentMixin, storageMixin],
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

<style lang="scss" scoped>

</style>
