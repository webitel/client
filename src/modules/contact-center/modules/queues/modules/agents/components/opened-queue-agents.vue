<template>
  <section class="content-wrapper">
    <object-list-popup :shown="!!supervisorsId" :data-list="openedItemSupervisors"
      :headers="openedItemSupervisorHeaders" :title="$t('objects.ccenter.agents.supervisors', 2)" @close="closePopup" />
    <object-list-popup :shown="!!skillsId" :data-list="openedItemSkills" :headers="openedItemSkillsHeaders"
      :title="$t('objects.lookups.skills.skills', 2)" @close="closePopup" />

    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.ccenter.agents.agents', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar :value="search" debounce @enter="loadList" @input="setSearch" @search="loadList" />
        <wt-table-actions :icons="['refresh']" @input="tableActionsHandler" />
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy v-if="dummy && isLoaded" :src="dummy.src" :dark-mode="darkMode" :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper" />
    <div v-show="dataList.length && isLoaded" class="table-wrapper">
      <wt-table :data="dataList" :grid-actions="false" :headers="headers" sortable @sort="sort">
        <template #name="{ item }">
          <wt-item-link :link="editLink(item)" target="_blank">
            {{ item.name }}
          </wt-item-link>
        </template>
        <template #supervisor="{ item }">
          <one-plus-many :collection="item.supervisor" @input="setSupervisorQuery(item)" />
        </template>
        <template #state="{ item }">
          <wt-indicator :color="statusIndicatorColor[snakeToCamel(item.status)]"
            :text="statusIndicatorText[snakeToCamel(item.status)]" />
        </template>
        <template #skills="{ item }">
          <one-plus-many :collection="item.skills" @input="setSkillsQuery(item)" />
        </template>
        <template #actions="{ item }">
          <wt-icon-action action="edit" @click="editItem(item)" />
          <wt-icon-action action="delete" @click="deleteData(item)" />
        </template>
      </wt-table>
      <wt-pagination :next="isNext" :prev="page > 1" :size="size" debounce @change="loadList" @input="setSize"
        @next="nextPage" @prev="prevPage" />
    </div>
  </section>
</template>

<script>
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';

import ObjectListPopup from '../../../../../../../app/components/utils/object-list-popup/object-list-popup.vue';
import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import agentStatusMixin from '../../../../../mixins/agentStatusMixin';
import agentSupervisorsAndSkillsPopupMixin from '../../../../../mixins/agentSupervisorsAndSkillsPopupMixin';

const namespace = 'ccenter/queues';
const subNamespace = 'agents';

export default {
  name: 'OpenedQueueAgents',
  components: { ObjectListPopup },
  mixins: [openedObjectTableTabMixin, agentSupervisorsAndSkillsPopupMixin, agentStatusMixin],
  setup() {
    const { dummy } = useDummy({
      namespace: `${namespace}/${subNamespace}`,
      hiddenText: true,
    });
    return { dummy };
  },
  data: () => ({
    namespace,
    subNamespace,
    tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing
    isDeleteConfirmation: false,
  }),
  watch: {
    dataList(data) {
      if (data && this.skillsId) {
        this.setOpenedItemId(this.skillsId);
      }

      if (data && this.supervisorsId) {
        this.setOpenedItemId(this.supervisorsId);
      }
    },
  },
  methods: {
    snakeToCamel,
    addItem() {
      return this.$router.push({
        ...this.route,
        params: { agentId: 'new' }
      })
    },
    editItem(item) {
      return this.$router.push({
        ...this.route,
        params: { agentId: item.id }
      })
    },
    closePopup() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
