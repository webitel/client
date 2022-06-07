<template>
  <wt-page-wrapper class="queues" :actions-panel="false">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
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
              @input="setSearch"
              @search="loadList"
              @enter="loadList"
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
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >
            <template slot="name" slot-scope="{ item }">
              <item-link :link="editLink(item)">
                {{ item.name }}
              </item-link>
            </template>

            <template slot="type" slot-scope="{ item }">
              {{ $t(QueueTypeProperties[item.type].locale) }}
            </template>
            <template slot="activeCalls" slot-scope="{ item }">
              {{ item.active }}
            </template>
            <template slot="waiting" slot-scope="{ item }">
              {{ item.waiting }}
            </template>
            <template slot="priority" slot-scope="{ item } ">
              {{ item.priority }}
            </template>
            <template slot="team" slot-scope="{ item } ">
              <item-link v-if="item.team" :link="itemTeamLink(item)" target="_blank">
                {{ item.team.name }}
              </item-link>
            </template>
            <template slot="state" slot-scope="{ item, index }">
              <wt-switcher
                :value="item.enabled"
                :disabled="!hasEditAccess"
                @change="patchItem({ item, index, prop: 'enabled', value: $event})"
              ></wt-switcher>
            </template>
            <template slot="actions" slot-scope="{ item }">
              <wt-tooltip class="table-action">
                <template v-slot:activator>
                  <wt-icon-btn
                    icon="queue-member"
                    @click="openMembers(item)"
                  ></wt-icon-btn>
                </template>
                  {{ $t('iconHints.members') }}
              </wt-tooltip>
              <edit-action
                v-if="hasEditAccess"
                @click="edit(item, index)"
              ></edit-action>
              <delete-action
                v-if="hasDeleteAccess"
                @click="callDelete(item)"
              ></delete-action>
            </template>
          </wt-table>
          <wt-pagination
            :size="size"
            :next="isNext"
            :prev="page > 1"
            debounce
            @next="nextPage"
            @prev="prevPage"
            @input="setSize"
            @change="loadList"
          ></wt-pagination>
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import QueuePopup from './create-queue-popup.vue';
import tableComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'the-queues',
  mixins: [tableComponentMixin],
  components: { QueuePopup },
  data: () => ({
    namespace: 'ccenter/queues',
    isQueueSelectPopup: false,
    QueueTypeProperties,
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
