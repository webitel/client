<template>
  <wt-page-wrapper
    :actions-panel="false"
  >
    <template v-slot:header>
      <wt-page-header
        :primary-action="save"
        :primary-text="saveText"
        :hide-secondary="true"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>

    <template v-slot:main>
      <section>
        <header class="content-header">
          <h3 class="content-title">{{ $t('settings.settings') }}</h3>
          <wt-icon-action
            action="add"
            @click="addSetting"
          ></wt-icon-action>
        </header>
        <div class="object-input-grid">
          <div class="variables">
            <div
              class="value-pair"
              v-for="(item, key) in itemInstance"
              :key="key"
            >
              <wt-input
                :value="item.name"
                :placeholder="$t('objects.directory.users.varKey')"
                @input="setSettingProp({index: key, prop: 'name', value: $event})"
              ></wt-input>
              <wt-input
                :value="item.value"
                :placeholder="$t('objects.directory.users.varVal')"
                @input="setSettingProp({index: key, prop: 'value', value: $event})"
              ></wt-input>
              <wt-icon-action
                action="delete"
                class="value-pair__delete-button"
                @click="deleteSetting(key)"
              ></wt-icon-action>
            </div>
          </div>
        </div>
      </section>
    </template>

  </wt-page-wrapper>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'opened-settings',
  data: () => ({
    namespace: 'system/settings',
  }),
  computed: {
    ...mapState({
      itemInstance(state) {
        return getNamespacedState(state, this.namespace).itemInstance;
      },
    }),
    path() {
      return [
        { name: this.$t('objects.system.system') },
        { name: this.$t('settings.settings'), route: this.namespace },
      ];
    },
  },
  methods: {
    ...mapActions({
      loadSettings(dispatch, payload) {
        return dispatch(`${this.namespace}/LOAD_SETTINGS`, payload);
      },
      setSettingProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_SETTING_PROPERTY`, payload);
      },
      addSetting(dispatch, payload) {
        return dispatch(`${this.namespace}/ADD_SETTING`, payload);
      },
    }),
  },
  mounted() {
    this.loadSettings();
  },
};
</script>
