<template>
  <wt-popup
    class="token-created-popup"
    v-bind="$attrs"
    @close="close"
  >
    <template #title>
      {{ $t('objects.directory.users.tokenPopupHeader') }}
    </template>
    <template #main>
      <div class="token-created-popup__token__wrapper">
        <div class="token-created-popup__token__token">
          {{ token }}
        </div>
      </div>
      <h4 class="token-created-popup__text">
        {{ $t('objects.directory.users.tokenPopupText') }}
      </h4>
    </template>
    <template #actions>
      <wt-button @click="copy">
        {{ $t('objects.directory.users.tokenPopupCopy') }}
      </wt-button>
      <wt-button
        class="button-save"
        color="secondary"
        @click="saveTxt"
      >
        {{ $t('objects.directory.users.tokenPopupSave') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import clipboardCopy from 'clipboard-copy';
import { mapState } from 'vuex';

import { downloadAsTXT } from '../../../../../../../app/utils/download';

export default {
  name: 'OpenedUserTokenCreatedPopup',

  computed: {
    ...mapState('directory/users', {
      userName: (state) => state.itemInstance.name,
    }),
    ...mapState('directory/users/tokens', {
      token: (state) => state.itemInstance.token,
    }),
  },

  methods: {
    copy() {
      clipboardCopy(this.token);
    },

    async saveTxt() {
      const filename = `${this.userName}-token`;
      downloadAsTXT(this.token, filename);
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

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
