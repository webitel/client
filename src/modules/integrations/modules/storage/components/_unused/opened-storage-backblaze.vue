<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.integrations.storage.backblaze') }}
      </h3>
    </header>
    <form class="object-input-grid">
      <form-input
        v-model="account"
        :label="$t('objects.integrations.storage.backblazeAccount')"
        :v="v.itemInstance.account"
        required
      />
      <form-input
        v-model="key"
        :label="$t('objects.integrations.storage.backblazeKey')"
        :v="v.itemInstance.key"
        required
      />
      <form-input
        v-model="bucket"
        :label="$t('objects.integrations.storage.bucket')"
        :v="v.itemInstance.bucket"
        required
      />
      <form-input
        v-model="bucketId"
        :label="$t('objects.integrations.storage.backblazeBucketId')"
        :v="v.itemInstance.bucketId"
        required
      />
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedStorageBackblaze',
  mixins: [openedTabComponentMixin],

  computed: {
    key: {
      get() {
        return this.$store.state.integrations.storage.itemInstance.key;
      },
      set(value) {
        this.setItemProp({
          prop: 'key',
          value,
        });
      },
    },
    access: {
      get() {
        return this.$store.state.integrations.storage.itemInstance.access;
      },
      set(value) {
        this.setItemProp({
          prop: 'access',
          value,
        });
      },
    },
    bucket: {
      get() {
        return this.$store.state.integrations.storage.itemInstance.bucket;
      },
      set(value) {
        this.setItemProp({
          prop: 'bucket',
          value,
        });
      },
    },
    region: {
      get() {
        return this.$store.state.integrations.storage.itemInstance.region;
      },
      set(value) {
        this.setItemProp({
          prop: 'region',
          value,
        });
      },
    },
  },

  methods: {
    ...mapActions('integrations/storage', {
      setItemProp: 'SET_ITEM_PROPERTY',
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
