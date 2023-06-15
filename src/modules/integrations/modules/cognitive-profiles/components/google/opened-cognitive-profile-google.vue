<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :clearable="false"
        :disabled="true || disableUserInput"
        :label="$t('objects.provider')"
        :v="v.itemInstance.provider"
        :value="itemInstance.provider"
        required
        @input="setItemProp({ prop: 'provider', value: $event })"
      ></wt-select>
      <wt-select
        :clearable="false"
        :disabled="true || disableUserInput"
        :label="$t('objects.service')"
        :options="CognitiveProfileServices"
        :v="v.itemInstance.service"
        :value="itemInstance.service"
        required
        track-by="value"
        @input="setItemProp({ prop: 'service', value: $event })"
      ></wt-select>
      <div class="google-key">
        <wt-label
          :invalid="v.itemInstance.properties.key.$error"
        >{{ $t('objects.key') }}*
        </wt-label>
        <div v-if="!keyFilename">
          <wt-button
            color="secondary"
            :disabled="disableUserInput"
            :loading="isKeyLoading"
            wide
            @click="triggerFileInput"
          >{{ $t('reusable.upload') }}
          </wt-button>
          <input
            ref="googleKeyInput"
            class="google-key__input"
            type="file"
            accept="application/json"
            @input="handleFileInput"
          >
        </div>
        <div
          v-else
          class="google-key__file-preview-wrap"
        >
          {{ keyFilename }}
          <wt-icon-action
            action="delete"
            @click="handleFileDelete"
          ></wt-icon-action>
        </div>
      </div>
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.integrations.cognitiveProfiles.properties.locale')"
        :options="LanguageOptions"
        :value="itemInstance.properties.locale"
        :v="v.itemInstance.properties.locale"
        :clearable="false"
        :track-by="null"
        required
        @input="setItemPropertiesProp({ prop: 'locale', value: $event })"
      ></wt-select>
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :value="itemInstance.description"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { MicrosoftLanguage } from 'webitel-sdk/esm2015/enums';
import openedTabComponentMixin
  from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CognitiveProfileServices from '../../lookups/CognitiveProfileServices.lookup';

export default {
  name: 'opened-cognitive-profile-google',
  mixins: [openedTabComponentMixin],
  inject: ['$eventBus'],
  data: () => ({
    CognitiveProfileServices,
    LanguageOptions: Object.values(MicrosoftLanguage),
    keyFilename: '',
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
          this.setItemPropertiesProp({ prop: 'key', value });
          this.keyFilename = event.target.files[0].name;
        } catch (err) {
          this.$eventBus.$emit('notification', { type: 'error', text: this.$t('errors.invalidJson') });
        } finally {
          this.isKeyLoading = false;
          this.$refs.googleKeyInput.value = '';
        }
      };
      reader.readAsText(event.target.files[0]);
    },
    handleFileDelete() {
      this.setItemPropertiesProp({ prop: 'key', value: '' });
      this.keyFilename = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.google-key__input {
  width: 0;
  height: 0;
}

.google-key__file-preview-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--secondary-color-50);
  border-radius: var(--border-radius);
  flex-wrap: nowrap;
}
</style>
