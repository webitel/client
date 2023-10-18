<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>

    <template v-slot:main>
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.lookups.pauseCause.allPauseCause') }}</h3>
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
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="callDelete(selectedRows)"
              ></delete-all-action>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <wt-dummy
          v-if="dummy && isLoaded"
          :show-action="dummy.showAction"
          :src="dummy.src"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
          @create="create"
        ></wt-dummy>
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :grid-actions="hasTableActions"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template v-slot:limit="{ item }">
              {{ prettifyPauseCauseLimit(item.limitMin) }}
            </template>
            <template v-slot:allowAdmin="{ item, index }">
              <wt-checkbox
                :disabled="!hasEditAccess"
                :selected="item.allowAdmin"
                @change="changeAdminPermissions({ item, index, value: $event })"
              ></wt-checkbox>
            </template>
            <template v-slot:allowSupervisor="{ item, index }">
              <wt-checkbox
                :disabled="!hasEditAccess"
                :selected="item.allowSupervisor"
                @change="changeSupervisorPermissions({ item, index, value: $event })"
              ></wt-checkbox>
            </template>
            <template v-slot:allowAgent="{ item, index }">
              <wt-checkbox
                :disabled="!hasEditAccess"
                :selected="item.allowAgent"
                @change="changeAgentPermissions({ item, index, value: $event })"
              ></wt-checkbox>
            </template>
            <template v-slot:actions="{ item }">
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              ></wt-icon-action>
              <wt-icon-action
                v-if="hasDeleteAccess"
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
  </wt-page-wrapper>
</template>

<script>
import { mapActions } from 'vuex';
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

const namespace = 'lookups/pauseCause';

export default {
  name: 'the-agent-pause-cause',
  mixins: [tableComponentMixin],

  data: () => ({
    namespace,
    routeName: RouteNames.PAUSE_CAUSE,
  }),

  setup() {
    const { dummy } = useDummy({ namespace, showAction: true });
    return { dummy };
  },
  computed: {
    path() {
      return [
        { name: this.$t('objects.lookups.lookups') },
        { name: this.$t('objects.lookups.pauseCause.pauseCause'), route: '/lookups/pause-cause' },
      ];
    },
  },
  methods: {
    ...mapActions({
      changeAdminPermissions(dispatch, payload) {
        return dispatch(`${this.namespace}/CHANGE_ADMIN_PERMISSIONS`, payload);
      },
      changeSupervisorPermissions(dispatch, payload) {
        return dispatch(`${this.namespace}/CHANGE_SUPERVISOR_PERMISSIONS`, payload);
      },
      changeAgentPermissions(dispatch, payload) {
        return dispatch(`${this.namespace}/CHANGE_AGENT_PERMISSIONS`, payload);
      },
    }),
    prettifyPauseCauseLimit(limit) {
      return `${limit} ${this.$t('objects.lookups.pauseCause.min')}`;
    },
  },
};
</script>

<style scoped>

</style>
