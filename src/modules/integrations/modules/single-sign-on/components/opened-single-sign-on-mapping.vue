<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.integrations.singleSignOn.mapping') }}
      </h3>
      <wt-icon-action
        v-if="!disableUserInput"
        action="add"
        @click="addMapping"
      />
    </header>

    <form class="opened-card-input-grid">
      <div class="variables">
        <div
          v-for="(pair, index) in modelValue?.claims"
          :key="index"
          class="value-pair"
        >
          <wt-input-text
            v-tooltip="t('objects.integrations.singleSignOn.mappingKeyHint')"
            :disabled="disableUserInput"
            v-model:model-value="pair.type"
            :placeholder="t('vocabulary.keys')"
          />
          <wt-input-text
            :disabled="disableUserInput"
            v-model:model-value="pair.value"
            :placeholder="t('vocabulary.values')"
          />
          <wt-icon-action
            v-if="!disableUserInput"
            action="delete"
            @click="removePair(index)"
          />
        </div>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import type { ApiOAuthService } from '@webitel/api-services/gen/models';
import { useI18n } from 'vue-i18n';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<ApiOAuthService>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();

const addMapping = () => {
	const mapping = [
		...(modelValue.value.claims ?? []),
		{
			type: '',
			value: '',
		},
	];
	modelValue.value.claims = mapping;
};

const removePair = (index: number) => {
	const mapping = modelValue.value.claims.filter(
		(_, currentIndex) => currentIndex !== index,
	);
	modelValue.value.claims = mapping;
};
</script>

<style scoped>
.value-pair {
  display: grid;
  align-items: center;
  margin-bottom: 20px;
  grid-template-columns: 1fr 1fr 24px;
  grid-gap: 20px;
}
</style>
