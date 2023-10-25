<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="queues"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <queue-popup
        v-if="isQueueSelectPopup"
        @close="isQueueSelectPopup = false"
      />
      <delete-confirmation-popup
        v-show="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.ccenter.queues.allQueues') }}
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
                  deleted: [selectedRows],
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

            <template #type="{ item }">
              {{ $t(QueueTypeProperties[item.type].locale) }}
            </template>
            <template #activeCalls="{ item }">
              {{ item.active }}
            </template>
            <template #waiting="{ item }">
              {{ item.waiting }}
            </template>
            <template #priority="{ item } ">
              {{ item.priority }}
            </template>
            <template #team="{ item } ">
              <wt-item-link
                v-if="item.team"
                :link="itemTeamLink(item)"
                target="_blank"
              >
                {{ item.team.name }}
              </wt-item-link>
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="item.enabled"
                @change="patchItem({ item, index, prop: 'enabled', value: $event})"
              />
            </template>
            <template #actions="{ item }">
              <wt-tooltip class="table-action">
                <template #activator>
                  <wt-icon-btn
                    icon="queue-member"
                    @click="openMembers(item)"
                  />
                </template>
                {{ $t('iconHints.members') }}
              </wt-tooltip>
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item, index)"
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
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import QueuePopup from './create-queue-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableStore } from '@webitel/ui-sdk/src/modules/TableStoreModule/composables/useTableStore';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';

const namespace = 'ccenter/queues';

export default {
  name: 'TheQueues',
  components: { QueuePopup, DeleteConfirmationPopup },
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

    const { deleteData } = useTableStore(namespace);

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
      deleteData,
    };
  },
  data: () => ({
    namespace,
    isQueueSelectPopup: false,
    QueueTypeProperties,
    routeName: RouteNames.QUEUES,
  }),

  computed: {
    path() {
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.queues.queues', 2), route: '/contact-center/queues' },
      ];
    },
  },

  methods: {
    openMembers(item) {
      this.$router.push({
        name: `${RouteNames.MEMBERS}`,
        params: { queueId: item.id },
      });
    },
    itemTeamLink({ team }) {
      return {
        name: `${RouteNames.TEAMS}-edit`,
        params: { id: team.id },
      };
    },

    create() {
      this.isQueueSelectPopup = true;
    },
  },

};
</script>

<style lang="scss" scoped>
</style>
