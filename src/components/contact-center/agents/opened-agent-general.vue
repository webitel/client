<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-select
        :value="user"
        :v="v.itemInstance.user"
        :label="$tc('objects.directory.users.users', 1)"
        :search="loadDropdownOptionsList"
        :internal-search="false"
        :clearable="false"
        required
        @input="setItemProp({ prop: 'user', value: $event })"
      ></wt-select>

      <wt-input
        :value="progressiveCount"
        :v="v.itemInstance.progressiveCount"
        :label="$t('objects.ccenter.agents.progressiveCount')"
        type="number"
        required
        @input="setItemProp({ prop: 'progressiveCount', value: +$event })"
      ></wt-input>

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
import { getAgentUsersOptions } from '../../../api/contact-center/agents/agents';
import openedTabComponentMixin from '../../../mixins/openedTabComponentMixin';

export default {
  name: 'opened-agent-general',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('ccenter/agents', {
      user: (state) => state.itemInstance.user,
      progressiveCount: (state) => state.itemInstance.progressiveCount,
      description: (state) => state.itemInstance.description,
    }),
  },

  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getAgentUsersOptions(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
