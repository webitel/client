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
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import openedObjectMixin from "../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin";
import General from "./opened-bucket-general.vue";

export default {
  name: "OpenedBucket",
  components: { General },
  mixins: [openedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: "lookups/buckets",
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
          text: this.$t("objects.general"),
          value: "general",
        },
      ];
      return tabs;
    },

    path() {
      const baseUrl = "/lookups/buckets";
      return [
        {
          name: this.$t("objects.lookups.lookups"),
        },
        {
          name: this.$tc("objects.lookups.buckets.buckets", 2),
          route: baseUrl,
        },
        {
          name: this.id ? this.pathName : this.$t("objects.new"),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
};
</script>

<style scoped>

</style>
