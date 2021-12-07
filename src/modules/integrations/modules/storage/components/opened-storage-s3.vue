<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.integrations.storage.s3') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="itemInstance.properties.keyId"
        :v="v.itemInstance.properties.keyId"
        :label="$t('objects.integrations.storage.s3Key')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'keyId', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.properties.accessKey"
        :v="v.itemInstance.properties.accessKey"
        :label="$t('objects.integrations.storage.s3Access')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'accessKey', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.properties.bucketName"
        :v="v.itemInstance.properties.bucketName"
        :label="$t('objects.integrations.storage.bucket')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'bucketName', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.properties.pathPattern"
        :label="$t('objects.integrations.storage.pathPattern')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'pathPattern', value: $event })"
      ></wt-input>
      <wt-select
        :value="service"
        :options="serviceOptions"
        :label="$t('objects.integrations.storage.service')"
        :disabled="disableService"
        track-by="value"
        @input="setService"
      ></wt-select>
      <wt-select
        v-if="!isCustom"
        :value="itemInstance.properties.region"
        :v="v.itemInstance.properties.region"
        :options="regionOptions"
        :label="$t('objects.integrations.storage.region')"
        :disabled="disableUserInput"
        track-by="value"
        :clearable="false"
        required
        @input="setItemProp({ prop: 'region', value: $event })"
      ></wt-select>
      <wt-input
        v-if="isCustom"
        :value="itemInstance.properties.endpoint"
        :v="v.itemInstance.properties.endpoint"
        :label="$t('objects.integrations.storage.s3Endpoint')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'endpoint', value: $event })"
      ></wt-input>
      <wt-input
        v-if="isCustom"
        :value="itemInstance.properties.region"
        :v="v.itemInstance.properties.region"
        :label="$t('objects.integrations.storage.region')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'region', value: $event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import AWSRegions from '../store/_internals/lookups/AWSRegions.lookup';
import DigitalOceanRegions from '../store/_internals/lookups/DigitalOceanRegions.lookup';
import Service from '../store/_internals/lookups/Service.lookup';

export default {
  name: 'opened-storage-aws',
  mixins: [openedTabComponentMixin],
  computed: {
    ...mapState('integrations/storage', {
      id: (state) => state.itemId,
    }),

    serviceOptions() {
      return Object.values(Service).map((services) => services);
    },

    endpoint() {
      return this.itemInstance.properties.endpoint;
    },

    isCustom() {
      return !(this.endpoint === Service.AWS.endpoint || this.endpoint === Service.DO.endpoint);
    },

    service() {
      if (this.endpoint === Service.AWS.endpoint) {
        return Service.AWS.name;
      }
      if (this.endpoint === Service.DO.endpoint) {
        return Service.DO.name;
      }
      return Service.CUSTOM.name;
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
      return this.disableUserInput || this.id;
    },
  },

  methods: {
    ...mapActions('integrations/storage', {
      setItemProp: 'SET_ITEM_PROPERTIES_PROPERTY',
    }),

    setService(value) {
      this.setItemProp({
        prop: 'endpoint',
        value: value.endpoint,
      });
      this.setItemProp({
        prop: 'region',
        value: this.isCustom ? '' : {},
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
