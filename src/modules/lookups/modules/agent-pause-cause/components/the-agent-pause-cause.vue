<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        v-show="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.lookups.pauseCause.allPauseCause') }}
          </h3>
          <div class="content-header__actions-wrap">
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
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })"
              />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :show-action="dummy.showAction"
          :src="dummy.src"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
          @create="create"
        />
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
            <template #name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #limit="{ item }">
              {{ prettifyPauseCauseLimit(item.limitMin) }}
            </template>
            <template #allowAdmin="{ item, index }">
              <wt-checkbox
                :disabled="!hasEditAccess"
                :selected="item.allowAdmin"
                @change="changeAdminPermissions({ item, index, value: $event })"
              />
            </template>
            <template #allowSupervisor="{ item, index }">
              <wt-checkbox
                :disabled="!hasEditAccess"
                :selected="item.allowSupervisor"
                @change="changeSupervisorPermissions({ item, index, value: $event })"
              />
            </template>
            <template #allowAgent="{ item, index }">
              <wt-checkbox
                :disabled="!hasEditAccess"
                :selected="item.allowAgent"
                @change="changeAgentPermissions({ item, index, value: $event })"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              />
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })"
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
  </wt-page-wrapper>
</template>

<script>
import { mapActions } from 'vuex';
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

const namespace = 'lookups/pauseCause';

export default {
  name: 'TheAgentPauseCause',
  components: { DeleteConfirmationPopup },
  mixins: [tableComponentMixin],

  setup() {
    const { dummy } = useDummy({ namespace, showAction: true });
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    };
  },

  data: () => ({
    namespace,
    routeName: RouteNames.PAUSE_CAUSE,
  }),
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
