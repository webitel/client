<template>
  <wt-popup
    size="sm"
    @close="close"
  >
    <template #title>
      {{ t('reusable.tts') }}
    </template>
    <template #main>
      <form
        class="opened-card-input-grid opened-card-input-grid--1-col"
        @submit.prevent
      >
        <wt-input-text
          v-model:model-value="draft.name"
          :label="t('reusable.name')"
          :regle-validation="r$.$fields.name"
        />
        <wt-single-select
          v-model:model-value="draft.profile"
          :show-clear="false"
          :label="t('objects.integrations.cognitiveProfiles.cognitiveProfiles', 1)"
          :search-method="searchProfiles"
          :regle-validation="r$.$fields.profile"
        />
        <wt-single-select
          v-model:model-value="draft.textType"
          :show-clear="false"
          :label="t('objects.lookups.media.tts.textType.textType')"
          :options="textTypeOptions"
          option-value="value"
        />
        <wt-single-select
          v-model:model-value="draft.language"
          :show-clear="false"
          :label="t('vocabulary.language')"
          :options="Object.values(MicrosoftLanguage)"
          :data-key="null"
        />
        <wt-single-select
          :key="`${draft.profile?.provider}-${draft.language}`"
          v-model:model-value="draft.voice"
          :show-clear="false"
          :label="t('vocabulary.voice')"
          :options="voiceOptions"
          :data-key="null"
        />
        <wt-single-select
          v-model:model-value="draft.format"
          :show-clear="false"
          :label="t('vocabulary.format')"
          :data-key="null"
          disabled
        />
        <wt-textarea
          v-model:model-value="draft.text"
          :label="t('vocabulary.text')"
          :regle-validation="r$.$fields.text"
        />
      </form>
    </template>
    <template #actions>
      <div class="text-to-speech-popup__footer">
        <wt-player
          v-if="audio"
          :src="{
            src: audio,
            type: 'audio/object',
          }"
          :autoplay="false"
          :closable="false"
          :download="false"
          position="static"
        />
        <div class="text-to-speech-popup__actions">
          <wt-button
            v-if="audio"
            :disabled="r$.$invalid"
            :loading="isSaving"
            wide
            @click="save"
          >
            {{ t('reusable.save') }}
          </wt-button>
          <wt-button
            :color="audio ? ButtonColor.SECONDARY : ButtonColor.PRIMARY"
            :disabled="r$.$invalid"
            :loading="isGenerating"
            wide
            @click="generate"
          >
            {{ t('reusable.generate') }}
          </wt-button>
          <wt-button
            :color="ButtonColor.SECONDARY"
            wide
            @click="close"
          >
            {{ t('reusable.close') }}
          </wt-button>
        </div>
      </div>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { useRegleSchema } from '@regle/schemas';
import { MediaAPI } from '@webitel/api-services/api';
import {
	type TtsGoogleVoice,
	TtsGoogleVoiceList,
	TtsMicrosoftVoice,
	TtsTextType,
} from '@webitel/api-services/enums';
import {
	StorageProviderType,
	StorageServiceType,
} from '@webitel/api-services/gen/models';
import { textToSpeechSchema } from '@webitel/api-services/validations';
import { WtPlayer } from '@webitel/ui-sdk/components';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { MicrosoftLanguage } from 'webitel-sdk/enums';

import CognitiveProfilesAPI from '../../../../integrations/modules/cognitive-profiles/api/cognitiveProfiles';

const emit = defineEmits<{
	close: [];
	saved: [];
}>();

const { t } = useI18n();

const textTypeOptions = [
	{
		locale: 'vocabulary.text',
		value: TtsTextType.Text,
	},
	{
		locale: 'objects.lookups.media.tts.textType.ssml',
		value: TtsTextType.Ssml,
	},
];

type TextToSpeechDraft = {
	name: string;
	profile: {
		id?: string;
		name?: string;
		provider?: string;
	};
	textType: TtsTextType;
	language: string;
	voice: TtsMicrosoftVoice | TtsGoogleVoice;
	text: string;
	format: string;
};

const draft = ref<TextToSpeechDraft>({
	name: '',
	profile: {},
	textType: TtsTextType.Text,
	language: MicrosoftLanguage['en-US'],
	voice: TtsMicrosoftVoice.Male,
	text: '',
	format: 'wav',
});
const audio = ref<Blob | null>(null);
const isGenerating = ref(false);
const isSaving = ref(false);

const { r$ } = useRegleSchema(draft, textToSpeechSchema, {
	autoDirty: true,
});

const voiceOptions = computed<TextToSpeechDraft['voice'][]>(() => {
	const { language, profile } = draft.value;
	if (profile?.provider === StorageProviderType.Google && language) {
		const googleVoices = TtsGoogleVoiceList.filter((voice) =>
			voice.toLowerCase().includes(language.toLowerCase()),
		);
		if (googleVoices.length) return googleVoices;
	}
	return Object.values(TtsMicrosoftVoice);
});

const close = () => emit('close');

const generate = async () => {
	try {
		isGenerating.value = true;
		const { profile, textType, language, voice, format, text } = draft.value;
		audio.value = await MediaAPI.generateTts({
			profileId: profile.id ?? '',
			textType,
			language,
			voice,
			format,
			text,
		});
	} finally {
		isGenerating.value = false;
	}
};

const save = async () => {
	if (!audio.value) return;

	try {
		isSaving.value = true;
		const file = new File(
			[
				audio.value,
			],
			`${draft.value.name}.wav`,
			{
				type: 'audio/wav',
			},
		);
		await MediaAPI.upload([
			file,
		]);
		emit('saved');
		close();
	} finally {
		isSaving.value = false;
	}
};

const searchProfiles = (params: Record<string, unknown>) =>
	CognitiveProfilesAPI.getLookup({
		...params,
		fields: [
			'id',
			'name',
			'provider',
		],
		service: StorageServiceType.Tts,
	});

watch(voiceOptions, (options) => {
	if (!options.includes(draft.value.voice)) {
		draft.value.voice = options[0];
	}
});
</script>

<style scoped>
.text-to-speech-popup__footer {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--popup-actions-padding);
}

.text-to-speech-popup__actions {
  display: flex;
  gap: var(--popup-actions-padding);
}
</style>
