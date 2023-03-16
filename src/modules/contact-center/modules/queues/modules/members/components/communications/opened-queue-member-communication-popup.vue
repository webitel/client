<template>
  <wt-popup min-width="480" @close="close">
    <template v-slot:title>
      {{ $tc('objects.lookups.communications.communications', 1) }}
    </template>
    <template v-slot:main>
      <form class="object-input-grid object-input-grid__1-col">
        <wt-input
          v-model="itemInstance.destination"
          :v="v$.itemInstance.destination"
          :label="$t('objects.ccenter.members.destination')"
          required
        ></wt-input>
        <wt-select
          v-model="itemInstance.type"
          :v="v$.itemInstance.type"
          :label="$tc('objects.lookups.communications.communications', 1)"
          :search-method="loadCommTypes"
          :clearable="false"
          required
        ></wt-select>
        <wt-select
          v-model="itemInstance.resource"
          :label="$tc('objects.ccenter.res.res', 1)"
          :search-method="loadResources"
        ></wt-select>
        <wt-input
          v-model="itemInstance.display"
          :label="$t('objects.ccenter.members.display')"
        ></wt-input>
        <wt-input
          v-model="itemInstance.dtmf"
          :v="v$.itemInstance.dtmf"
          :label="$t('objects.ccenter.members.dtmf')"
        ></wt-input>
        <wt-input
          v-model="itemInstance.priority"
          :label="$t('objects.ccenter.members.priority')"
          type="number"
        ></wt-input>
        <wt-textarea
          v-model="itemInstance.description"
          :label="$t('objects.description')"
        ></wt-textarea>
      </form>
    </template>
    <template v-slot:actions>
      <wt-button
        :disabled="computeDisabled"
        @click="save"
      >{{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >{{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import deepCopy from 'deep-copy';
import { required } from '@vuelidate/validators';
import { mapActions, mapState } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import ResourcesAPI from '../../../../../resources/api/resources';
import CommunicationsAPI from '../../../../../../../lookups/modules/communications/api/communications';
import nestedObjectMixin from '../../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

const digitsDtmfOnly = v => /^[\d|w|W]*$/g.test(v)

export default {
  name: 'opened-agent-skills-popup',
  mixins: [nestedObjectMixin],
  props: {
    editedIndex: {
      type: [Number, Object], // "null" object
    },
  },
  data: () => ({
    namespace: 'ccenter/queues/members',
    itemInstanceValue: {
      destination: '',
      display: '',
      priority: 0,
      type: {},
      resource: {},
      description: '',
      dtmf: '',
    },
  }),

  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      destination: { required },
      type: { required },
      dtmf: { digitsDtmfOnly },
    },
  },
  created() {
    this.initEditedValue();
  },

  computed: {
    ...mapState({
      commList(state) {
        return getNamespacedState(state, `${this.namespace}`).itemInstance.communications;
      },
    }),
    // override mixin map state
    itemInstance: {
      get() {
        return this.itemInstanceValue;
      },
      set(value) {
        this.itemInstanceValue = value;
      },
    },
    computeDisabled() {
      return this.checkValidations();
    },
  },

  methods: {
    ...mapActions({
      addItem(dispatch, payload) {
        return dispatch(`${this.namespace}/ADD_MEMBER_COMMUNICATION`, payload);
      },
      updateItem(dispatch, payload) {
        return dispatch(`${this.namespace}/UPDATE_MEMBER_COMMUNICATION`, payload);
      },
    }),
    initEditedValue() {
      if (Number.isInteger(this.editedIndex)) {
        this.itemInstance = deepCopy(this.commList[this.editedIndex]);
      }
    },
    save() {
      if (Number.isInteger(this.editedIndex)) {
        this.updateItem({
          index: this.editedIndex,
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
    loadItem() {
    },
    resetState() {
    },
  },
};
</script>

<style scoped>

</style>
