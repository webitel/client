<template>
  <wt-popup class="token-created-popup" @close="close">
    <template slot="title">
      {{ $t('objects.directory.users.tokenPopupHeader') }}
    </template>
    <template slot="main">
      <div class='token-created-popup__token__wrapper'>
        <div class='token-created-popup__token__token'>{{ token }}</div>
      </div>
      <h4 class='token-created-popup__text'>{{ $t('objects.directory.users.tokenPopupText') }}</h4>
    </template>
    <template slot="actions">
      <wt-button @click="copy">
        {{ $t('objects.directory.users.tokenPopupCopy') }}
      </wt-button>
      <wt-button class='button-save' color="secondary" @click="saveTxt">
        {{ $t('objects.directory.users.tokenPopupSave') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { mapState } from 'vuex';
import clipboardCopy from 'clipboard-copy';
import { downloadAsTXT } from '../../../utils/download';

export default {
  name: 'opened-user-token-created-popup',

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
.token-created-popup__token__wrapper {
  width: 75%;
  padding: 20px;
  margin: 10px auto 30px;
  border: 2px solid var(--false-color);
  border-radius: 10px;
}

.token-created-popup__token__token {
  @extend %typo-strong-md;
  text-align: center;
}

.token-created-popup__text {
  @extend %typo-body-lg;
}
</style>
