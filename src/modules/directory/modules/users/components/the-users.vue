<template>
  <wt-page-wrapper class="users" :actions-panel="false">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
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
              <upload-file-icon-btn
                v-if="hasCreateAccess"
                class="icon-action"
                accept=".csv"
                @change="processCSV"
              ></upload-file-icon-btn>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <wt-dummy
          v-if="dummyValue && isLoaded"
          :src="dummyValue.src"
          :locale="dummyValue.locale"
          class="dummy-wrapper"
        ></wt-dummy>
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <item-link :link="editLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template v-slot:status="{ item }">
              <user-status :presence="item.presence"/>
            </template>
            <template v-slot:username="{ item }">
              {{ item.username }}
            </template>
            <template v-slot:extensions="{ item }">
              {{ item.extension }}
            </template>
            <template v-slot:DnD="{ item }">
              <wt-switcher
                :value="getDND(item.presence)"
                :disabled="!hasEditAccess"
                @change="setDND({item, value: $event})"
              ></wt-switcher>
            </template>
            <template v-slot:actions="{ item }">
              <edit-action
                v-if="hasEditAccess"
                @click="edit(item)"
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
import { mapActions } from 'vuex';
import UploadPopup from './upload-users-popup.vue';
import UserStatus from './_internals/user-status-chips.vue';
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import DummyAfterSearch from '../../../../../app/assets/dummy/adm-dummy-after-search.svg';

export default {
  name: 'the-users',
  mixins: [tableComponentMixin],
  components: { UploadPopup, UserStatus, UploadFileIconBtn },
  data: () => ({
    isUploadPopup: false,
    csvFile: null,
    namespace: 'directory/users',
    routeName: RouteNames.USERS,
  }),

  computed: {
    path() {
      return [
        { name: this.$t('objects.directory.directory') },
        { name: this.$tc('objects.directory.users.users', 2), route: '/directory/users' },
      ];
    },
    dummyValue() {
      if (this.search && !this.dataList.length) {
        return {
          src: DummyAfterSearch,
          locale: this.$t('objects.emptyResultSearch'),
        };
      } return '';
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
.users {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.dummy-wrapper {
  height: 100%;
}
</style>
