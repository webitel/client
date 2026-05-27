<template>
  <section class="table-section">
    <supervisor-popup @close="closePopup" />
    <supervisor-subordinates-popup
      :shown="isSupervisorSubordinatesPopup"
      :item-id="supervisorId"
      @close="closeSubordinates"
    />
    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.ccenter.agents.supervisors', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        />
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        >
          <wt-icon-btn
            :disabled="!hasSupervisorsUpdateAccess"
            class="icon-action"
            icon="plus"
            @click="create"
          />
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :dark-mode="darkMode"
      :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper"
    />
    <div
      v-show="dataList.length && isLoaded"
      class="table-section__table-wrapper"
    >
      <wt-table
        :data="dataList"
        :headers="headers"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template #name="{ item }">
          <wt-item-link
            :link="editLink(item)"
            target="_blank"
          >
            {{ item.name }}
          </wt-item-link>
        </template>

        <template #actions="{ item }">
          <wt-icon-btn
            v-tooltip="$t('objects.ccenter.agents.subordinates', 2)"
            icon="queue-member"
            @click="openSubordinates(item)"
          />
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
      />
    </div>
  </section>
</template>

<script>
import { WtObject } from '@webitel/ui-sdk/enums';
import { useDummy } from '../../../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import SupervisorSubordinatesPopup from './opened-team-supervisor-subordinates-popup.vue';
import SupervisorPopup from './opened-team-supervisors-popup.vue';

const namespace = 'ccenter/teams';
const subNamespace = 'supervisors';

export default {
	name: 'OpenedTeamSupervisors',
	components: {
		SupervisorPopup,
		SupervisorSubordinatesPopup,
	},
	mixins: [
		openedObjectTableTabMixin,
	],

	setup() {
		const { dummy } = useDummy({
			namespace: `${namespace}/${subNamespace}`,
			hiddenText: true,
		});

		const { hasUpdateAccess: hasSupervisorsUpdateAccess } =
			useUserAccessControl(WtObject.Agent);

		return {
			dummy,

			hasSupervisorsUpdateAccess,
		};
	},
	data: () => ({
		namespace,
		subNamespace,
		tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing
		supervisorId: null,
		isSupervisorSubordinatesPopup: false,
	}),

	methods: {
		openSubordinates({ id }) {
			this.supervisorId = id;
			this.openSubordinatesPopup();
		},
		closeSubordinates() {
			this.supervisorId = null;
			this.closeSubordinatesPopup();
		},
		addItem() {
			return this.$router.push({
				...this.route,
				params: {
					supervisorId: 'new',
				},
			});
		},
		closePopup() {
			this.$router.go(-1);
		},
		openSubordinatesPopup() {
			this.isSupervisorSubordinatesPopup = true;
		},
		closeSubordinatesPopup() {
			this.isSupervisorSubordinatesPopup = false;
		},
	},
};
</script>

<style
  lang="scss"
  scoped
></style>
