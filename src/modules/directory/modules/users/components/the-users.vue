<template>
  <wt-page-wrapper :actions-panel="false" class="users">
    <template v-slot:header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>
    <template v-slot:main>
      <upload-popup
        v-if="isUploadPopup"
        :file="csvFile"
        @close="closeCSVPopup"
      ></upload-popup>
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.directory.users.allUsers') }}</h3>
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
              <upload-file-icon-btn
                v-if="hasCreateAccess"
                accept=".csv"
                class="icon-action"
                @change="processCSV"
              ></upload-file-icon-btn>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
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
            <template v-slot:status="{ item }">
              <user-status :presence="item.presence" />
            </template>
            <template v-slot:username="{ item }">
              {{ item.username }}
            </template>
            <template v-slot:extensions="{ item }">
              {{ item.extension }}
            </template>
            <template v-slot:DnD="{ item }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="getDND(item.presence)"
                @change="setDND({item, value: $event})"
              ></wt-switcher>
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
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import UserStatus from './_internals/user-status-chips.vue';
import UploadPopup from './upload-users-popup.vue';

const namespace = 'directory/users';

export default {
  name: 'the-users',
  mixins: [tableComponentMixin],
  components: { UploadPopup, UserStatus, UploadFileIconBtn },
  data: () => ({
    isUploadPopup: false,
    csvFile: null,
    namespace,
    routeName: RouteNames.USERS,
  }),

  setup() {
    const { dummy } = useDummy({ namespace, hiddenText: true });
    return { dummy };
  },

  computed: {
    path() {
      return [
        { name: this.$t('objects.directory.directory') },
        { name: this.$tc('objects.directory.users.users', 2), route: '/directory/users' },
      ];
    },
  },

  methods: {
    ...mapActions({
      setDND(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_USER_DND`, payload);
      },
    }),

    getDND(value) {
      if (value && value.status) {
        return value.status.includes('dnd');
      }
      return false;
    },

    processCSV(files) {
      const file = files[0];
      if (file) {
        this.csvFile = file;
        this.isUploadPopup = true;
      }
    },

    closeCSVPopup() {
      this.loadList();
      this.isUploadPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
