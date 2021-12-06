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
  data: () => ({
    selectedService: {},
  }),

  computed: {
    ...mapState('integrations/storage', {
      id: (state) => state.itemId,
    }),

    serviceOptions() {
      return Object.values(Service).map((option) => ({
        name: option.name,
        value: option.value,
      }));
    },

    endpoint() {
      return this.itemInstance.properties.endpoint;
    },

    isCustom() {
      return !(this.endpoint === Service.aws.endpoint || this.endpoint === Service.do.endpoint);
    },

    service() {
      if (this.endpoint === Service.aws.endpoint) {
        return Service.aws.name;
      }
      if (this.endpoint === Service.do.endpoint) {
        return Service.do.name;
      }
      return Service.custom.name;
    },

    regionOptions() {
      if (this.endpoint.includes(Service.aws.endpoint)) {
        return AWSRegions;
      }
      if (this.endpoint.includes(Service.do.endpoint)) {
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
      this.selectedService = value;
      if (this.selectedService.value === Service.aws.value) {
        this.setItemProp({
          prop: 'endpoint',
          value: Service.aws.endpoint,
        });
        this.setItemProp({
          prop: 'region',
          value: {},
        });
      } else if (this.selectedService.value === Service.do.value) {
        this.setItemProp({
          prop: 'endpoint',
          value: Service.do.endpoint,
        });
        this.setItemProp({
          prop: 'region',
          value: {},
        });
      } else {
        this.setItemProp({
          prop: 'endpoint',
          value: '',
        });
        this.setItemProp({
          prop: 'region',
          value: '',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
