<template>
  <wt-popup
    v-bind="$attrs"
    size="sm"
    :shown="!!communicationIndex"
    @close="close"
  >
    <template #title>
      {{ $tc('objects.lookups.communications.communications', 1) }}
    </template>
    <template #main>
      <form class="object-input-grid object-input-grid__1-col">
        <wt-input
          v-model="itemInstance.destination"
          :label="$t('objects.ccenter.members.destination')"
          :v="v$.itemInstance.destination"
          required
        />
        <wt-select
          v-model="itemInstance.type"
          :clearable="false"
          :label="$tc('objects.lookups.communications.communications', 1)"
          :search-method="loadCommTypes"
          :v="v$.itemInstance.type"
          required
        />
        <wt-select
          v-model="itemInstance.resource"
          :label="$tc('objects.ccenter.res.res', 1)"
          :search-method="loadResources"
        />
        <wt-input
          v-model="itemInstance.display"
          :label="$t('objects.ccenter.members.display')"
        />
        <wt-input
          v-model="itemInstance.dtmf"
          :label="$t('objects.ccenter.members.dtmf')"
          :v="v$.itemInstance.dtmf"
        />
        <wt-input
          v-model="itemInstance.priority"
          :label="$t('objects.ccenter.members.priority')"
          type="number"
        />
        <wt-textarea
          v-model:model-value="itemInstance.description"
          :label="$t('objects.description')"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="computeDisabled"
        @click="save"
      >
        {{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import deepCopy from 'deep-copy';
import { mapActions, mapState } from 'vuex';

import nestedObjectMixin from '../../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import CommunicationsAPI from '../../../../../../../lookups/modules/communications/api/communications';
import ResourcesAPI from '../../../../../resources/api/resources';
import { digitsDtmfOnly } from '../../validation/dtmf';

const getDefaultItemInstance = () => ({
  destination: '',
  display: '',
  priority: 0,
  type: {},
  resource: {},
  description: '',
  dtmf: '',
});

export default {
  name: 'OpenedAgentSkillsPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    // Reasons for use $stopPropagation
    // https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
    v$: useVuelidate({ $stopPropagation: true }),
  }),
  data: () => ({
    namespace: 'ccenter/queues/members',
    itemInstanceValue: getDefaultItemInstance(),
  }),
  validations: {
    itemInstance: {
      destination: { required },
      type: { required },
      dtmf: { digitsDtmfOnly },
    },
  },

  computed: {
    ...mapState({
      commList(state) {
        return getNamespacedState(state, `${this.namespace}`).itemInstance
          .communications;
      },
    }),
    // override mixin map state
    itemInstance: {
      get() {
        return this.itemInstanceValue;
      },
      set(value) {
        console.log(value);
        this.itemInstanceValue = value;
      },
    },
    computeDisabled() {
      return this.checkValidations();
    },
    communicationIndex() {
      return this.$route.params.communicationIndex;
    },
  },

  methods: {
    ...mapActions({
      addItem(dispatch, payload) {
        return dispatch(`${this.namespace}/ADD_MEMBER_COMMUNICATION`, payload);
      },
      updateItem(dispatch, payload) {
        return dispatch(
          `${this.namespace}/UPDATE_MEMBER_COMMUNICATION`,
          payload,
        );
      },
    }),
    initEditedValue() {
      if (this.communicationIndex !== 'new') {
        this.itemInstance = deepCopy(this.commList[this.communicationIndex]);
      }
    },
    save() {
      if (this.communicationIndex !== 'new') {
        this.updateItem({
          index: this.communicationIndex,
          item: this.itemInstance,
        });
      } else {
        this.addItem(this.itemInstance);
      }
      this.close();
    },
    loadCommTypes(params) {
      return CommunicationsAPI.getLookup(params);
    },
    loadResources(params) {
      return ResourcesAPI.getLookup(params);
    },
    loadItem() {},
    resetItemInstance() {
      this.itemInstance = getDefaultItemInstance();
    },
    resetState() {
      this.resetItemInstance();
    },
  },
  watch: {
    communicationIndex: {
      handler(index) {
        index ? this.initEditedValue() : this.resetState();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
