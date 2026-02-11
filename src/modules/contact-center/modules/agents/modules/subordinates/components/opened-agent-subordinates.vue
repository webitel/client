<template>
  <section class="table-section">
    <subordinate-popup @close="closeSubordinatePopup" />
    <object-list-popup :shown="!!supervisorsId" :data-list="openedItemSupervisors"
      :headers="openedItemSupervisorHeaders" :title="$t('objects.ccenter.agents.supervisors', 2)"
      @close="closeSupervisorsAndSkillsPopup" />
    <object-list-popup :shown="!!skillsId" :data-list="openedItemSkills" :headers="openedItemSkillsHeaders"
      :title="$t('objects.lookups.skills.skills', 2)" @close="closeSupervisorsAndSkillsPopup" />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.ccenter.agents.subordinates', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-search-bar :value="search" debounce @enter="loadList" @input="setSearch" @search="loadList" />
        <wt-table-actions :icons="['refresh']" @input="tableActionsHandler">
          <delete-all-action v-if="!disableUserInput" :class="{ 'hidden': anySelected }"
            :selected-count="selectedRows.length" @click="deleteData(selectedRows)" />
          <wt-icon-btn v-if="!disableUserInput" class="icon-action" icon="plus" @click="create" />
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy v-if="dummy && isLoaded" :src="dummy.src" :dark-mode="darkMode" :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper" />
    <div
      v-show="dataList.length && isLoaded"
      class="table-section__table-wrapper"
    >
      <wt-table :data="dataList" :grid-actions="!disableUserInput" :headers="headers" sortable @sort="sort">
        <template #name="{ item }">
          <wt-item-link :link="editLink(item)" target="_blank">
            {{ item.name }}
          </wt-item-link>
        </template>
        <template #supervisor="{ item }">
          <one-plus-many :collection="item.supervisor" @input="setSupervisorQuery(item)" />
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
import ObjectListPopup from '../../../../../../../app/components/utils/object-list-popup/object-list-popup.vue';
import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import agentSupervisorsAndSkillsPopupMixin from '../../../../../mixins/agentSupervisorsAndSkillsPopupMixin';
import SubordinatePopup from './opened-agent-subordinates-popup.vue';

const namespace = 'ccenter/agents';
const subNamespace = 'subordinates';

export default {
	name: 'OpenedAgentSubordinates',
	components: {
		SubordinatePopup,
		ObjectListPopup,
	},
	mixins: [
		openedObjectTableTabMixin,
		agentSupervisorsAndSkillsPopupMixin,
	],
	setup() {
		const { dummy } = useDummy({
			namespace: `${namespace}/${subNamespace}`,
			hiddenText: true,
		});
		return {
			dummy,
		};
	},
	data: () => ({
		namespace,
		subNamespace, // used in mixin map actions
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
		addItem() {
			return this.$router.push({
				...this.route,
				params: {
					subordinateId: 'new',
				},
			});
		},
		editItem(item) {
			return this.$router.push({
				...this.route,
				params: {
					subordinateId: item.id,
				},
			});
		},
		closeSubordinatePopup() {
			return this.$router.go(-1);
		},
	},
};
</script>

<style lang="scss" scoped></style>
