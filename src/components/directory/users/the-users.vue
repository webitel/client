<template>
  <wt-page-wrapper class="users" :actions-panel="false">
    <template slot="header">
      <object-header
        :hide-primary="!isCreateAccess"
        :primary-action="create"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>
    <template slot="main">
      <upload-popup
        v-if="isUploadPopup"
        :file="csvFile"
        @close="closeCSVPopup"
      ></upload-popup>

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
            <wt-icon-btn
                v-if="isDeleteAccess"
                class="icon-action"
                :class="{'hidden': anySelected}"
                icon="bucket"
                :tooltip="$t('iconHints.deleteSelected')"
                @click="deleteSelected"
            ></wt-icon-btn>
            <div v-if="isCreateAccess" class="upload-csv">
              <wt-icon-btn
                  icon="upload"
                  :tooltip="$t('iconHints.upload')"
                  @click="triggerFileInput"
              ></wt-icon-btn>
              <input
                  ref="file-input"
                  class="upload-csv__input"
                  type="file"
                  @change="processCSV($event)"
                  accept=".csv"
              >
            </div>
            <wt-table-actions
                :icons="['refresh']"
                @input="tableActionsHandler"
            ></wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
              :headers="headers"
              :data="dataList"
              :grid-actions="hasTableActions"
          >
            <template slot="name" slot-scope="{ item }">
               <span class="nameLink" @click="edit(item)">
                 {{ item.name }}
               </span>
            </template>
            <template slot="status" slot-scope="{ item }">
              <user-status :presence="item.presence" />
            </template>
            <template slot="username" slot-scope="{ item }">
              {{ item.username }}
            </template>
            <template slot="extensions" slot-scope="{ item }">
              {{ item.extension }}
            </template>
            <template slot="DnD" slot-scope="{ item }">
              <wt-switcher
                :value="getDND(item.presence)"
                :disabled="!isEditAccess"
                @change="setDND({item, value: $event})"
              ></wt-switcher>
            </template>
            <template slot="actions" slot-scope="{ item, index }">
              <edit-action
                v-if="isEditAccess"
                @click="edit(item)"
              ></edit-action>
              <delete-action
                v-if="isDeleteAccess"
                @click="remove(index)"
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
import { mapActions, mapState } from 'vuex';
import UploadPopup from './upload-users-popup.vue';
import UserStatus from './_internals/user-status-chips.vue';
import tableComponentMixin from '../../../mixins/tableComponentMixin';
import RouteNames from '../../../router/_internals/RouteNames.enum';

export default {
  name: 'the-users',
  mixins: [tableComponentMixin],
  components: { UploadPopup, UserStatus },
  data: () => ({
    isUploadPopup: false,
    csvFile: null,
    namespace: 'directory/users',
    routeName: RouteNames.USERS,
  }),

  computed: {
    ...mapState('directory/users', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'status', text: this.$t('objects.directory.users.status'), width: 'minmax(240px, 1fr)' },
        { value: 'username', text: this.$t('objects.directory.users.login') },
        { value: 'extensions', text: this.$t('objects.directory.users.extensions') },
        { value: 'DnD', text: this.$t('objects.directory.users.DnD'), width: '80px' },
      ];
    },
    path() {
      return [
        { name: this.$t('objects.directory.directory') },
        { name: this.$tc('objects.directory.users.users', 2), route: '/directory/users' },
      ];
    },
  },

  methods: {
    triggerFileInput() {
      this.$refs['file-input'].click();
    },

    getDND(value) {
      if (value && value.status) {
        return value.status.includes('dnd');
      }
      return false;
    },

    processCSV(event) {
      const file = event.target.files[0];
      if (file) {
        this.csvFile = file;
        this.isUploadPopup = true;
      }
    },

    closeCSVPopup() {
      this.loadList();
      this.isUploadPopup = false;
      this.$refs['file-input'].value = null;
    },

    ...mapActions('directory/users', {
      setDND: 'SET_USER_DND',
    }),
  },
};
</script>

<style lang="scss" scoped>
.upload-csv {
  .upload-csv__input {
    visibility: hidden;
  }
}
</style>
