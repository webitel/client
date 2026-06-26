<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :model-value="itemInstance.name"
        required
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-single-select
        :show-clear="false"
        :disabled="true || disableUserInput"
        :label="$t('objects.provider')"
        :v="v.itemInstance.provider"
        :model-value="itemInstance.provider"
        required
        @update:model-value="setItemProp({ prop: 'provider', value: $event })"
      />
      <wt-single-select
        :show-clear="false"
        :disabled="true || disableUserInput"
        :label="$t('objects.service')"
        :options="CognitiveProfileServices"
        :v="v.itemInstance.service"
        :model-value="itemInstance.service"
        required
        data-key="value"
        @update:model-value="setItemProp({ prop: 'service', value: $event })"
      />
      <div class="google-key">
        <wt-label :invalid="v.itemInstance.properties.key.$error">
          {{ $t('objects.key') }}*
        </wt-label>
        <div v-if="!itemInstance.properties.keyFilename">
          <wt-button
            :disabled="disableUserInput"
            :loading="isKeyLoading"
            color="secondary"
            wide
            @click="triggerFileInput"
          >
            {{ $t('reusable.upload') }}
          </wt-button>
          <input
            ref="googleKeyInput"
            accept="application/json"
            class="google-key__input"
            type="file"
            @input="handleFileInput"
          >
        </div>
        <div
          v-else
          class="google-key__file-preview-wrap"
        >
          {{ itemInstance.properties.keyFilename }}
          <wt-icon-action
            action="delete"
            @click="handleFileDelete"
          />
        </div>
      </div>
      <wt-single-select
        :show-clear="false"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.cognitiveProfiles.properties.locale')"
        :options="LanguageOptions"
        :data-key="null"
        :v="v.itemInstance.properties.locale"
        :model-value="itemInstance.properties.locale"
        required
        @update:model-value="setItemPropertiesProp({ prop: 'locale', value: $event })"
      />
      <div />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { MicrosoftLanguage } from 'webitel-sdk/enums';

import { useUserAccessControl } from '../../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CognitiveProfileServices from '../../lookups/CognitiveProfileServices.lookup';

export default {
	name: 'OpenedCognitiveProfileGoogle',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		return {
			disableUserInput,
		};
	},
	inject: [
		'$eventBus',
	],
	data: () => ({
		CognitiveProfileServices,
		LanguageOptions: Object.values(MicrosoftLanguage),
		isKeyLoading: false,
	}),
	methods: {
		...mapActions({
			setItemPropertiesProp(dispatch, payload) {
				return dispatch(`${this.namespace}/SET_ITEM_PROPERTIES_PROP`, payload);
			},
		}),
		triggerFileInput() {
			this.$refs.googleKeyInput.click();
		},
		handleFileInput(event) {
			this.isKeyLoading = true;
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const value = JSON.parse(e.target.result);
					this.setItemPropertiesProp({
						prop: 'key',
						value,
					});
					this.setItemPropertiesProp({
						prop: 'keyFilename',
						value: event.target.files[0].name,
					});
				} catch (err) {
					this.$eventBus.$emit('notification', {
						type: 'error',
						text: this.$t('errors.invalidJson'),
					});
				} finally {
					this.isKeyLoading = false;
					this.$refs.googleKeyInput.value = '';
				}
			};
			reader.readAsText(event.target.files[0]);
		},
		handleFileDelete() {
			this.setItemPropertiesProp({
				prop: 'key',
				value: '',
			});
			this.setItemPropertiesProp({
				prop: 'keyFilename',
				value: '',
			});
		},
	},
};
</script>

<style
  lang="scss"
  scoped
>
.google-key__input {
  width: 0;
  height: 0;
}

.google-key__file-preview-wrap {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
  background: var(--secondary-color);
}
</style>
