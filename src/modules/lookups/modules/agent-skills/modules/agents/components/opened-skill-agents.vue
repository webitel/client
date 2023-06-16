<template>
  <section>
    <wt-table
      :headers="headers"
      :data="dataList"
      :grid-actions="!disableUserInput"
      sortable
      @sort="sort"
    >
      <template v-slot:name="{ item }">
        <item-link :link="editLink(item)" target="_blank">
          {{ item.name }}
        </item-link>
      </template>
      <template v-slot:team="{ item }">
        <item-link :link="editLink(item)" target="_blank">
          {{ item.team }}
        </item-link>
      </template>
      <template v-slot:supervisor="{ item }">
        <one-plus-many
          :collection="item.supervisor"
          @input="readSupervisor(item)"
        ></one-plus-many>
      </template>
      <template v-slot:skills="{ item }">
        <one-plus-many
          :collection="item.skills"
          @input="readSkills(item)"
        ></one-plus-many>
      </template>
      <template v-slot:actions="{ item }">
        <edit-action
          @click="edit(item)"
        ></edit-action>
        <delete-action
          @click="callDelete(item)"
        ></delete-action>
      </template>
    </wt-table>
  </section>
</template>

<script>
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import agentSupervisorsAndSkillsPopupMixin from '../../../../../mixins/agentSupervisorsAndSkillsPopupMixin';
import agentStatusMixin from '../../../../../mixins/agentStatusMixin';

export default {
  name: 'opened-skill-agents',
  mixins: [openedObjectTableTabMixin, agentSupervisorsAndSkillsPopupMixin, agentStatusMixin],

  data: () => ({
    subNamespace: 'agents',
    tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing
    isAgentPopup: false,
 }),

  methods: {
    openPopup() {
      this.isAgentPopup = true;
    },
    closePopup() {
      this.isAgentPopup = false;
    },
    openSkillsPopup() {
      this.isSkillsPopup = true;
    },
    closeSkillsPopup() {
      this.isSkillsPopup = false;
    },
    snakeToCamel,
  },
};
</script>

<style lang="scss" scoped>
</style>
