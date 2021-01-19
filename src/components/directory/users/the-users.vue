<template>
  <wt-page-wrapper class="users" :actions-panel="false">
    <template slot="header">
      <object-header :primary-action="create">
        {{ $t('objects.directory.directory') }} |
        {{ $tc('objects.directory.users.users', 2) }}
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
                class="icon-action"
                :class="{'hidden': anySelected}"
                icon="bucket"
                :tooltip="$t('iconHints.deleteSelected')"
                @click="deleteSelected"
            ></wt-icon-btn>
            <div class="upload-csv">
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
          >
            <template slot="name" slot-scope="{ item }">
               <span class="nameLink" @click="edit(item.id)">
                 {{ item.name }}
               </span>
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
                  @change="setDND({item, value: $event})"
              ></wt-switcher>
            </template>

            <template slot="actions" slot-scope="{ item, index }">
              <wt-icon-btn
                  class="table-action"
                  icon="edit"
                  @click="edit(item.id)"
              ></wt-icon-btn>
              <wt-icon-btn
                  class="table-action"
                  icon="bucket"
                  @click="remove(index)"
              ></wt-icon-btn>
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
import tableComponentMixin from '../../../mixins/tableComponentMixin';
import tableActionsHandlerMixin from '../../../mixins/baseTableMixin/tableActionsMixin';

export default {
  name: 'the-users',
  components: {
    UploadPopup,
  },
  mixins: [tableComponentMixin, tableActionsHandlerMixin],
  data() {
    return {
      isUploadPopup: false,
      csvFile: null,
      headers: [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'username', text: this.$t('objects.directory.users.login') },
        { value: 'extensions', text: this.$t('objects.directory.users.extensions') },
        { value: 'DnD', text: this.$t('objects.directory.users.DnD'), width: '80px' },
      ],
    };
  },

  computed: {
    ...mapState('directory/users', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
  },

  methods: {
    triggerFileInput() {
      this.$refs['file-input'].click();
    },

    create() {
      this.$router.push('/directory/users/new');
    },

    getDND(value) {
      if (value && value.status) {
        return value.status.includes('dnd');
      }
      return false;
    },

    edit(id) {
      this.$router.push({
        name: 'directory-users-edit',
        params: { id },
      });
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
      loadDataList: 'LOAD_DATA_LIST',
      setSize: 'SET_SIZE',
      setSearch: 'SET_SEARCH',
      setDND: 'SET_USER_DND',
      nextPage: 'NEXT_PAGE',
      prevPage: 'PREV_PAGE',
      removeItem: 'REMOVE_ITEM',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/objects/table-page';

.upload-csv {
  .upload-csv__input {
    visibility: hidden;
  }
}
</style>
