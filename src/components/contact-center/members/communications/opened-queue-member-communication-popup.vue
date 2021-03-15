<template>
  <wt-popup min-width="480" @close="close">
    <template slot="title">
      {{ $tc('objects.lookups.communications.communications', 1) }}
    </template>
    <template slot="main">
      <form class="object-input-grid object-input-grid__1-col">
        <wt-input
          v-model="itemInstance.destination"
          :v="$v.itemInstance.destination"
          :label="$t('objects.ccenter.members.destination')"
          required
        ></wt-input>
        <wt-select
          v-model="itemInstance.type"
          :v="$v.itemInstance.type"
          :label="$tc('objects.lookups.communications.communications', 1)"
          :search="loadCommTypes"
          :internal-search="false"
          :clearable="false"
          required
        ></wt-select>
        <wt-select
          v-model="itemInstance.resource"
          :label="$tc('objects.ccenter.res.res', 1)"
          :search="loadResources"
          :internal-search="false"
        ></wt-select>
        <wt-input
          v-model="itemInstance.display"
          :label="$t('objects.ccenter.members.display')"
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
    <template slot="actions">
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
import deepCopy from 'deep-copy';
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapState } from 'vuex';
import { getResourceList } from '../../../../api/contact-center/resources/resources';
import { getCommunicationsList } from '../../../../api/lookups/communications/communications';
import nestedObjectMixin from '../../../../mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import getNamespacedState from '../../../../store/helpers/getNamespacedState';

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
    },
  }),
  validations: {
    itemInstance: {
      destination: { required },
      type: { required },
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
        console.info(this.commList[this.editedIndex]);
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
    async loadCommTypes(search) {
      const response = await getCommunicationsList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
    async loadResources(search) {
      const response = await getResourceList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
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
