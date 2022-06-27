<template>
  <div class="tts">
    <wt-icon-btn
      v-show="!isOpened"
      :tooltip="$t('reusable.tts')"
      icon="tts-download"
      @click="openPopup"
    ></wt-icon-btn>
    <wt-popup
      v-show="isOpened"
      :min-width="480"
      @close="closePopup"
    >
      <template v-slot:title>
        {{ $t('reusable.tts') }}
      </template>
      <template v-slot:main>
        <form class="object-input-grid object-input-grid__1-col">
          <wt-input
            v-model="draft.name"
            :label="$t('reusable.name')"
            :v="$v.draft.name"
          ></wt-input>
          <wt-select
            v-model="draft.profile"
            :clearable="false"
            :label="$tc('objects.integrations.cognitiveProfiles.cognitiveProfiles', 1)"
            :search-method="searchProfiles"
            :v="$v.draft.profile"
          ></wt-select>
          <wt-select
            v-model="draft.textType"
            :clearable="false"
            :label="$t('objects.lookups.media.tts.textType.textType')"
            :options="textTypeOptions"
            track-by="value"
          ></wt-select>
          <wt-select
            v-model="draft.language"
            :clearable="false"
            :label="$t('vocabulary.language')"
            :options="TtsMicrosoftLanguage"
            :track-by="null"
          ></wt-select>
          <wt-select
            v-model="draft.voice"
            :clearable="false"
            :label="$t('vocabulary.voice')"
            :options="TtsMicrosoftVoice"
            :track-by="null"
          ></wt-select>
          <wt-select
            v-model="draft.format"
            :clearable="false"
            :label="$t('vocabulary.format')"
            :track-by="null"
            disabled
          ></wt-select>
          <wt-textarea
            v-model="draft.text"
            :label="$t('vocabulary.text')"
            :v="$v.draft.text"
          ></wt-textarea>
          <wt-player
            v-if="audioUrl"
            :autoplay="false"
            :closable="false"
            :download="false"
            :src="audioUrl"
            position="static"
          ></wt-player>
        </form>
      </template>
      <template v-slot:actions>
        <wt-button
          v-if="audio"
          :disabled="disabled"
          :loading="isSaving"
          @click="save"
        >{{ $t('reusable.save') }}
        </wt-button>
        <wt-button
          :color="audio ? 'secondary' : 'primary'"
          :disabled="disabled"
          :loading="isGenerating"
          @click="generate"
        >{{ $t('reusable.generate') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="closePopup"
        >{{ $t('reusable.close') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { StorageServiceType } from 'webitel-sdk';
import validationMixin
  from '../../../../../../../app/mixins/baseMixins/openedObjectValidationMixin/openedObjectValidationMixin';
import CognitiveProfilesAPI from '../../../../../../integrations/modules/cognitive-profiles/api/cognitiveProfiles';
import MediaAPI from '../../../api/media';
import TextToSpeechAPI from '../api/TextToSpeechAPI';
import TtsMicrosoftLanguage from '../enums/TtsMicrosoftLanguage.enum';
import TtsMicrosoftVoice from '../enums/TtsMicrosoftVoice.enum';
import TtsTextType from '../lookups/TtsTextType.lookup';

const getModel = () => ({
  name: '',
  profile: {},
  textType: TtsTextType[0],
  language: TtsMicrosoftLanguage.find((lang) => lang.includes('en-US')),
  voice: TtsMicrosoftVoice[0],
  text: '',
  format: 'wav',
});

export default {
  name: 'text-to-speech-popup',
  mixins: [validationMixin],
  data: () => ({
    isOpened: false,
    draft: {},
    textTypeOptions: TtsTextType,
    TtsMicrosoftLanguage,
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
  },
  methods: {
    openPopup() {
      this.$emit('opened');
      this.isOpened = true;
    },
    closePopup() {
      this.isOpened = false;
      this.audio = null;
      this.audioUrl = '';
    },
    async generate() {
      try {
        this.isGenerating = true;
        const params = {
          profileId: this.draft.profile.id,
          textType: this.draft.textType.value,
          language: this.draft.language,
          voice: this.draft.voice,
          format: this.draft.format,
          text: encodeURIComponent(this.draft.text),
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
        const file = new File([this.audio], `${this.draft.name}.wav`, { type: 'audio/wav' });
        await MediaAPI.add({ itemInstance: file });
        this.closePopup();
      } finally {
        this.isSaving = false;
      }
    },
    searchProfiles(params) {
      const fields = ['id', 'name', 'provider'];
      const service = StorageServiceType.TTS;
      return CognitiveProfilesAPI.getLookup({ ...params, fields, service });
    },
  },
  watch: {
    isOpened: {
      handler() {
        this.draft = getModel();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.tts {
  line-height: 0;
}
</style>
