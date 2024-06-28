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
import General from "./opened-communication-type-general.vue";

export default {
	name: "OpenedCommunicationsType",
	components: { General },
	mixins: [openedObjectMixin],

	setup: () => ({
		v$: useVuelidate(),
	}),
	data: () => ({
		namespace: "lookups/communications",
	}),
	validations: {
		itemInstance: {
			name: { required },
			code: { required },
			channel: { required },
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
			const baseUrl = "/lookups/communications";
			return [
				{ name: this.$t("objects.lookups.lookups") },
				{
					name: this.$tc("objects.lookups.communications.communications", 2),
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
