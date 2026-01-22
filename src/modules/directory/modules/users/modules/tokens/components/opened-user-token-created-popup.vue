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
        <div class="token-created-popup__token__token typo-subtitle-2">
          {{ token }}
        </div>
      </div>
      <h4 class="token-created-popup__text typo-body-1">
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

<style
  lang="scss"
  scoped
>
.token-created-popup__token__wrapper {
  width: 75%;
  margin: 10px auto 30px;
  padding: 20px;
  border: 2px solid var(--false-color);
  border-radius: 10px;
}

.token-created-popup__token__token {
  text-align: center;
}
</style>
