<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
          :value="name"
          :label="$t('objects.name')"
          @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
          :value="username"
          :v="v.itemInstance.username"
          :label="$t('objects.directory.users.login')"
          required
          @input="setItemProp({ prop: 'username', value: $event })"
      ></wt-input>

      <div class="input-extension-wrap">
        <wt-input
            ref="input-password"
            :value="computePasswordRepresentation"
            :label="$t('objects.password')"
            :type="passwordFieldType"
            has-show-password
            @input="setItemProp({ prop: 'password', value: $event })"
        ></wt-input>

        <div class="input-extension">
          <div class="input-extension__copy" v-show="copyTriggerShow" @click="copyToClipboard">
            <span>{{ $t('objects.copy') }}</span>

            <div class="hint" v-if="copyMessage">
              <div class="tooltip-top active">
                <!--                                <i class="icon-icon_approve"></i>-->
                <span>{{ this.copyMessage }}</span>
              </div>
            </div>
          </div>
          <i
              class="input-extension__generate icon-icon_generate"
              :title="$t('iconHints.generate')"
              @click="generatePassword"
          ></i>
        </div>
      </div>

      <wt-input
          :value="extension"
          :label="$t('objects.directory.users.extensions')"
          @input="setItemProp({ prop: 'extension', value: $event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import openedTabComponentMixin from '../../../mixins/openedTabComponentMixin';

export default {
  name: 'opened-user-general',
  mixins: [openedTabComponentMixin],
  data() {
    return {
      copyMessage: '',
      copyTriggerShow: false,
      passwordFieldType: 'password',
    };
  },

  computed: {
    ...mapState('directory/users', {
      id: (state) => state.itemId,
      name: (state) => state.itemInstance.name,
      username: (state) => state.itemInstance.username,
      password: (state) => state.itemInstance.password,
      extension: (state) => state.itemInstance.extension,
    }),

    computePasswordRepresentation() {
      return this.password.length <= 12 ? this.password : this.password.slice(0, 12);
    },
  },

  methods: {
    generatePassword() {
      const length = 12;
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      this.password = result;
      this.copyTriggerShow = true;
      this.passwordFieldType = 'text';
    },

    copyToClipboard() {
      if (this.password) {
        eventBus.$emit('copyToClipboard', this.password);
        this.copyMessage = this.$t('objects.copied');
        setTimeout(() => {
          this.copyMessage = '';
          }, 2000);
      }
      this.passwordFieldType = 'password';
    },

    ...mapActions('directory/users', {
      setItemProp: 'SET_ITEM_PROPERTY',
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
