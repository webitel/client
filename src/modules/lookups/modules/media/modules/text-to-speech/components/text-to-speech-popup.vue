<template>
  <div class="tts">
    <wt-icon-btn v-show="!isOpened" v-tooltip="$t('objects.lookups.media.tts.hint')" icon="tts-download"
      @click="openPopup" />

    <wt-popup :shown="isOpened" size="sm" @close="closePopup">
      <template #title>
        {{ $t('reusable.tts') }}
      </template>
      <template #main>
        <form class="object-input-grid object-input-grid__1-col">
          <wt-input-text v-model:model-value="draft.name" :label="$t('reusable.name')" :v="v$.draft.name" />
          <wt-select v-model="draft.profile" :clearable="false"
            :label="$t('objects.integrations.cognitiveProfiles.cognitiveProfiles', 1)" :search-method="searchProfiles"
            :v="v$.draft.profile" />
          <wt-select v-model="draft.textType" :clearable="false"
            :label="$t('objects.lookups.media.tts.textType.textType')" :options="textTypeOptions" track-by="value" />
          <wt-select v-model="draft.language" :clearable="false" :label="$t('vocabulary.language')"
            :options="TtsMicrosoftLanguage" :track-by="null" />
          <wt-select v-model="draft.voice" :clearable="false" :label="$t('vocabulary.voice')"
            :options="TtsMicrosoftVoice" :track-by="null" />
          <wt-select v-model="draft.format" :clearable="false" :label="$t('vocabulary.format')" :track-by="null"
            disabled />
          <wt-textarea v-model:model-value="draft.text" :label="$t('vocabulary.text')" :v="v$.draft.text" />
        </form>
      </template>
      <template #actions>
        <div class="tts__footer-wrapper">
          <wt-player v-if="audioUrl" :autoplay="false" :closable="false" :download="false" :src="audioUrl"
            position="static" />
          <div class="tts__footer-actions-wrapper">
            <wt-button v-if="audio" :disabled="disabled" :loading="isSaving" wide @click="save">
              {{ $t('reusable.save') }}
            </wt-button>
            <wt-button :color="audio ? 'secondary' : 'primary'" :disabled="disabled" :loading="isGenerating" wide
              @click="generate">
              {{ $t('reusable.generate') }}
            </wt-button>
            <wt-button color="secondary" wide @click="closePopup">
              {{ $t('reusable.close') }}
            </wt-button>
          </div>
        </div>
      </template>
    </wt-popup>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { StorageServiceType } from 'webitel-sdk';
import TtsMicrosoftLanguage from 'webitel-sdk/esm2015/enums/cloud-providers/microsoft/microsoft-language.enum';

import validationMixin from '../../../../../../../app/mixins/baseMixins/openedObjectValidationMixin/openedObjectValidationMixin';
import CognitiveProfilesAPI from '../../../../../../integrations/modules/cognitive-profiles/api/cognitiveProfiles';
import MediaAPI from '../../../api/media';
import TextToSpeechAPI from '../api/TextToSpeechAPI';
import TtsMicrosoftVoice from '../enums/TtsMicrosoftVoice.enum';
import TtsTextType from '../lookups/TtsTextType.lookup';

const getModel = () => ({
  name: '',
  profile: {},
  textType: TtsTextType[0],
  language: TtsMicrosoftLanguage['en-US'],
  voice: TtsMicrosoftVoice[0],
  text: '',
  format: 'wav',
});

export default {
  name: 'TextToSpeechPopup',
  mixins: [validationMixin],
  setup: () => ({
    // Reasons for use $stopPropagation
    // https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
    v$: useVuelidate({ $stopPropagation: true }),
  }),
  data: () => ({
    isOpened: false,
    draft: {},
    textTypeOptions: TtsTextType,
    TtsMicrosoftLanguage: Object.values(TtsMicrosoftLanguage),
    TtsMicrosoftVoice,
    audio: null,
    audioUrl: '',
    isGenerating: false,
    isSaving: false,
  }),
  validations: {
    draft: {
      name: { required },
      profile: { required },
      text: { required },
    },
  },
  computed: {
    disabled() {
      return this.checkValidations('draft');
    },
    mediaId() {
      return this.$route.params.mediaId;
    },
  },
  watch: {
    mediaId: {
      handler(value) {
        if (value === 'new') this.openPopup();
      },
      immediate: true
    },
    isOpened: {
      handler() {
        this.draft = getModel();
      },
      immediate: true,
    },
  },
  methods: {
    openPopup() {
      this.$emit('opened');
      this.$router.push({
        ...this.$route,
        params: { mediaId: 'new' }
      })
      this.isOpened = true;
    },
    closePopup() {
      this.$router.go(-1);
      this.isOpened = false;
      this.audio = null;
      this.audioUrl = '';
    },
    async generate() {
      try {
        this.isGenerating = true;
        this.audioUrl = '';
        const params = {
          profileId: this.draft.profile.id,
          textType: this.draft.textType.value,
          language: this.draft.language,
          voice: this.draft.voice,
          format: this.draft.format,
          text: this.draft.text,
        };
        this.audio = await TextToSpeechAPI.getTts(params);
        this.audioUrl = TextToSpeechAPI.getTtsStreamUrl(params, true);
      } finally {
        this.isGenerating = false;
      }
    },
    async save() {
      try {
        this.isSaving = true;
        const file = new File([this.audio], `${this.draft.name}.wav`, {
          type: 'audio/wav',
        });
        await MediaAPI.add({
          itemInstance: file,
        });
        this.closePopup();
      } finally {
        this.isSaving = false;
      }
    },
    searchProfiles(params) {
      const fields = ['id', 'name', 'provider'];
      const service = StorageServiceType.TTS;
      return CognitiveProfilesAPI.getLookup({
        ...params,
        fields,
        service,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tts {
  line-height: 0;
}

.tts__footer-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--popup-actions-padding);
}

.tts__footer-actions-wrapper {
  display: flex;
  gap: var(--popup-actions-padding);
}
</style>
