<template>
  <section class="content-wrapper">
    <object-list-popup
      v-if="isSupervisorPopup"
      :data-list="openedItemSupervisors"
      :headers="openedItemSupervisorHeaders"
      :title="$tc('objects.ccenter.agents.supervisors', 2)"
      @close="closeSupervisorPopup"
    ></object-list-popup>
    <object-list-popup
      v-if="isSkillsPopup"
      :data-list="openedItemSkills"
      :headers="openedItemSkillsHeaders"
      :title="$tc('objects.lookups.skills.skills', 2)"
      @close="closeSkillsPopup"
    ></object-list-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.agents.agents', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        ></wt-search-bar>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :text="$t(dummy.text)"
      class="dummy-wrapper"
    ></wt-dummy>
    <div
      v-show="dataList.length && isLoaded"
      class="table-wrapper">
      <wt-table
        :data="dataList"
        :grid-actions="false"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template v-slot:name="{ item }">
          <wt-item-link
            :link="editLink(item)"
            target="_blank">
            {{ item.name }}
          </wt-item-link>
        </template>
        <template v-slot:supervisor="{ item }">
          <one-plus-many
            :collection="item.supervisor"
            @input="readSupervisor(item)"
          ></one-plus-many>
        </template>
        <template v-slot:state="{ item }">
          <wt-indicator
            :color="statusIndicatorColor[snakeToCamel(item.status)]"
            :text="statusIndicatorText[snakeToCamel(item.status)]"
          ></wt-indicator>
        </template>
        <template v-slot:skills="{ item }">
          <one-plus-many
            :collection="item.skills"
            @input="readSkills(item)"
          ></one-plus-many>
        </template>
        <template v-slot:actions="{ item }">
          <wt-icon-action
            action="edit"
            @click="edit(item)"
          ></wt-icon-action>
          <wt-icon-action
            action="delete"
            class="table-action"
            @click="callDelete(item)"
          ></wt-icon-action>
        </template>
      </wt-table>
      <wt-pagination
        :next="isNext"
        :prev="page > 1"
        :size="size"
        debounce
        @change="loadList"
        @input="setSize"
        @next="nextPage"
        @prev="prevPage"
      ></wt-pagination>
    </div>
  </section>
</template>

<script>
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import ObjectListPopup from '../../../../../../../app/components/utils/object-list-popup/object-list-popup.vue';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import agentStatusMixin from '../../../../../mixins/agentStatusMixin';
import agentSupervisorsAndSkillsPopupMixin from '../../../../../mixins/agentSupervisorsAndSkillsPopupMixin';
import { useDummy } from '../../../../../../../app/composables/useDummy';

const namespace = 'ccenter/queues';
const subNamespace = 'agents';

export default {
  name: 'opened-queue-agents',
  mixins: [openedObjectTableTabMixin, agentSupervisorsAndSkillsPopupMixin, agentStatusMixin],
  components: { ObjectListPopup },
  data: () => ({
    namespace,
    subNamespace,
    tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing
    isDeleteConfirmation: false,
  }),
  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}` });
    return { dummy };
  },
  methods: {
    snakeToCamel,
  },
};
</script>

<style lang="scss" scoped>
</style>
