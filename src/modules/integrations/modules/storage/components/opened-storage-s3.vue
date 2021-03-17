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
        v-if="!this.id"
        :value="service"
        :options="serviceOptions"
        :label="$t('objects.integrations.storage.service')"
        :disabled="disableUserInput"
        track-by="value"
        @input="setService"
      ></wt-select>
      <wt-select
        v-if="service.value !== 'custom'"
        :value="itemInstance.properties.region"
        :v="v.itemInstance.properties.region"
        :options="computeRegionOptions"
        :label="$t('objects.integrations.storage.region')"
        :disabled="disableUserInput"
        track-by="value"
        :clearable="false"
        required
        @input="setItemProp({ prop: 'region', value: $event })"
      ></wt-select>
      <wt-input
        v-if="service.value === 'custom'"
        :value="itemInstance.properties.endpoint"
        :v="v.itemInstance.properties.endpoint"
        :label="$t('objects.integrations.storage.s3Endpoint')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'endpoint', value: $event })"
      ></wt-input>
      <wt-input
        v-if="service.value === 'custom'"
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
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import AWSRegions from '../store/_internals/lookups/AWSRegions.lookup';
import DigitalOceanRegions from '../store/_internals/lookups/DigitalOceanRegions.lookup';

export default {
  name: 'opened-storage-aws',
  mixins: [openedTabComponentMixin],
  data: () => ({
    service: {},
    serviceOptions: [
      { name: 'AWS S3 Bucket', value: 'aws' },
      { name: 'Digital Ocean Spaces', value: 'do' },
      { name: 'Custom', value: 'custom' }],
    AWSRegions,
    DigitalOceanRegions,
  }),

  created() {
    if (!this.id) this.setService({ name: 'AWS S3 Bucket', value: 'aws' });
  },

  computed: {
    ...mapState('integrations/storage', {
      id: (state) => state.itemId,
    }),

    computeRegionOptions() {
      if (this.itemInstance.properties.endpoint.includes('aws')) {
        return this.AWSRegions;
      }
      if (this.itemInstance.properties.endpoint.includes('digitalocean')) {
        return this.DigitalOceanRegions;
      }
      return [];
    },
  },

  methods: {
    ...mapActions('integrations/storage', {
      setItemProp: 'SET_ITEM_PROPERTIES_PROPERTY',
    }),

    setService(value) {
      this.service = value;
      if (this.service.value === 'aws') {
        this.setItemProp({ prop: 'endpoint', value: 'amazonaws.com' });
        this.setItemProp({ prop: 'region', value: {} });
      } else if (this.service.value === 'do') {
        this.setItemProp({ prop: 'endpoint', value: 'digitaloceanspaces.com' });
        this.setItemProp({ prop: 'region', value: {} });
      } else {
        this.setItemProp({ prop: 'endpoint', value: '' });
        this.setItemProp({ prop: 'region', value: '' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
