<template>
  <wt-popup
    :shown="shown && !itemInstance.token"
    size="sm"
    @close="close"
  >
    <template #title>
      {{ t('objects.directory.users.token', 2) }}
    </template>
    <template #main>
      <form @submit.prevent="generateToken">
        <wt-input
          :label="t('objects.name')"
          :value="itemInstance.usage"
          @input="setItemProp({ path: 'usage', value: $event })"
        />
      </form>
    </template>
    <template #actions>
      <wt-button @click="generateToken">
        {{ t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>

  <wt-popup
    :shown="shown && !!itemInstance.token"
    class="token-created-popup"
    @close="close"
  >
    <template #title>
      {{ t('objects.directory.users.tokenPopupHeader') }}
    </template>
    <template #main>
      <div class="token-created-popup__token__wrapper">
        <div class="token-created-popup__token__token">
          {{ itemInstance.token }}
        </div>
      </div>
      <h4 class="token-created-popup__text">
        {{ t('objects.directory.users.tokenPopupText') }}
      </h4>
    </template>
    <template #actions>
      <wt-button @click="copy(itemInstance.token)">
        {{ t('objects.directory.users.tokenPopupCopy') }}
      </wt-button>
      <wt-button
        class="button-save"
        color="secondary"
        @click="saveTxt(itemInstance.token)"
      >
        {{ t('objects.directory.users.tokenPopupSave') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { useCardStore } from '@webitel/ui-sdk/store';
import clipboardCopy from 'clipboard-copy';
import { computed, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { downloadAsTXT } from '../../../../../../../app/utils/download.js';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const store = useStore();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const {
  namespace: cardNamespace,
  itemInstance,
  resetState,
  setItemProp,
} = useCardStore(props.namespace);

const shown = computed(() => !!route.params.tokenId);

const userName = computed(() => store.state.directory.users.itemInstance.name);

const generateToken = () => store.dispatch(`${cardNamespace}/ADD_TOKEN`);

const copy = (token) => {
  clipboardCopy(token);
};

const saveTxt = (token) => {
  const filename = `${userName.value}-token`;
  downloadAsTXT(token, filename);
};

const close = () => {
  const params = { ...route.params };
  delete params.tokenId;

  return router.push({
    ...route,
    params,
  });
};

watch(shown, (value) => {
  if (!value) resetState();
});
</script>

<style lang="scss" scoped>
.token-created-popup__token__wrapper {
  width: 75%;
  margin: 10px auto 30px;
  padding: 20px;
  border: 2px solid var(--false-color);
  border-radius: 10px;
}

.token-created-popup__token__token {
  @extend %typo-subtitle-2;
  text-align: center;
}

.token-created-popup__text {
  @extend %typo-body-1;
}
</style>
