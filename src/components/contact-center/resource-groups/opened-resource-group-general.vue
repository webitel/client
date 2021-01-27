<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :value="communication"
        :v="v.itemInstance.communication"
        :label="$tc('objects.lookups.communications.communications', 1)"
        :search="loadDropdownOptionsList"
        :internal-search="false"
        :clearable="false"
        required
        @input="setItemProp({ prop: 'communication', value: $event })"
      ></wt-select>
      <wt-textarea
        :value="description"
        :label="$t('objects.description')"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getCommunicationsList } from '../../../api/lookups/communications/communications';
import openedTabComponentMixin from '../../../mixins/openedTabComponentMixin';

export default {
  name: 'opened-resource-group-general',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('ccenter/resGroups', {
      name: (state) => state.itemInstance.name,
      communication: (state) => state.itemInstance.communication,
      description: (state) => state.itemInstance.description,
    }),
  },

  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getCommunicationsList(0, 10, search);
      return response.list.map((comm) => ({
        name: comm.name,
        id: comm.id,
      }));
    },
  },
};
</script>
