<template>
  <wt-page-wrapper :actions-panel="false" class="queues">
    <template v-slot:header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>
    <template v-slot:main>
      <queue-popup
        v-if="isQueueSelectPopup"
        @close="isQueueSelectPopup = false"
      ></queue-popup>
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.ccenter.queues.allQueues') }}</h3>
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

            <template v-slot:type="{ item }">
              {{ $t(QueueTypeProperties[item.type].locale) }}
            </template>
            <template v-slot:activeCalls="{ item }">
              {{ item.active }}
            </template>
            <template v-slot:waiting="{ item }">
              {{ item.waiting }}
            </template>
            <template v-slot:priority="{ item } ">
              {{ item.priority }}
            </template>
            <template v-slot:team="{ item } ">
              <wt-item-link
                v-if="item.team"
                :link="itemTeamLink(item)"
                target="_blank"
              >
                {{ item.team.name }}
              </wt-item-link>
            </template>
            <template v-slot:state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="item.enabled"
                @change="patchItem({ item, index, prop: 'enabled', value: $event})"
              ></wt-switcher>
            </template>
            <template v-slot:actions="{ item }">
              <wt-tooltip class="table-action">
                <template v-slot:activator>
                  <wt-icon-btn
                    icon="queue-member"
                    @click="openMembers(item)"
                  ></wt-icon-btn>
                </template>
                {{ $t('iconHints.members') }}
              </wt-tooltip>
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item, index)"
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
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import QueuePopup from './create-queue-popup.vue';

const namespace = 'ccenter/queues';

export default {
  name: 'the-queues',
  mixins: [tableComponentMixin],
  components: { QueuePopup },
  data: () => ({
    namespace,
    isQueueSelectPopup: false,
    QueueTypeProperties,
    routeName: RouteNames.QUEUES,
  }),

  setup() {
    const { dummy } = useDummy({ namespace, showAction: true });
    return { dummy };
  },

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
