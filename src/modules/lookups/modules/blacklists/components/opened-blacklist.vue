<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import Numbers from '../modules/numbers/components/opened-blacklist-numbers.vue';
import General from './opened-blacklist-general.vue';

export default {
  name: 'OpenedBlacklist',
  components: { General, Numbers },
  mixins: [openedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),

  data: () => ({
    namespace: 'lookups/blacklists',
  }),
  validations: {
    itemInstance: {
      name: { required },
    },
  },

  computed: {
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.general'),
          value: 'general',
        },
        {
          text: this.$tc('objects.lookups.blacklist.number', 2),
          value: 'numbers',
        },
      ];

      const permissions = {
        text: this.$tc('objects.permissions.permissions', 2),
        value: 'permissions',
      };

      if (this.id) tabs.push(permissions);
      return tabs;
    },

    path() {
      const baseUrl = '/lookups/blacklist';
      return [
        {
          name: this.$t('objects.lookups.lookups'),
        },
        {
          name: this.$tc('objects.lookups.blacklist.blacklist', 2),
          route: baseUrl,
        },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
