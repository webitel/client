<template>
  <div class="content-wrap">
    <object-header
      :hide-primary="!hasCreateAccess"
      :primary-action="create"
    >
      <headline-nav :path="path"></headline-nav>
    </object-header>

    <storage-popup
      v-if="popupTriggerIf"
      @close="popupTriggerIf = false"
    ></storage-popup>

    <section class="object-content">
      <header class="content-header">
        <h3 class="content-title">{{ $t('objects.integrations.storage.allStorages') }}</h3>
        <div class="content-header__actions-wrap">
          <search
            v-model="search"
            @filterData="loadList"
          ></search>
          <i
            v-if="hasDeleteAccess"
            class="icon-icon_delete icon-action"
            :class="{'hidden': anySelected}"
            :title="$t('iconHints.deleteSelected')"
            @click="deleteSelected"
          ></i>
          <i
            class="icon-icon_reload icon-action"
            :title="$t('iconHints.reload')"
            @click="loadList"
          ></i>
        </div>
      </header>

      <loader v-show="!isLoaded"></loader>

      <vuetable
        v-show="isLoaded"
        :api-mode="false"
        :fields="fields"
        :data="dataList"
      >
        <template slot="name" slot-scope="props">
          <div>
            <span class="nameLink" @click="edit(props.rowIndex)">
              {{ dataList[props.rowIndex].name }}
            </span>
          </div>
        </template>

        <template slot="type" slot-scope="props">
          <div>
            {{ computeType(dataList[props.rowIndex].type) }}
          </div>
        </template>

        <template slot="maxSize" slot-scope="props">
          <div>
            {{ dataList[props.rowIndex].maxSize }}
          </div>
        </template>

        <template slot="expireDays" slot-scope="props">
          <div>
            {{ dataList[props.rowIndex].expireDays }}
          </div>
        </template>

        <template slot="enabled" slot-scope="props">
          <switcher
            :value="!dataList[props.rowIndex].disabled"
            :disabled="!hasEditAccess"
            @input="patchProperty({index: props.rowIndex, prop: 'disabled', value: !$event})"
          ></switcher>
        </template>

        <template slot="actions" slot-scope="props">
          <i class="vuetable-action icon-icon_edit"
             v-if="hasEditAccess"
             :title="$t('iconHints.edit')"
             @click="edit(props.rowIndex)"
          ></i>
          <i class="vuetable-action icon-icon_delete"
             v-if="hasDeleteAccess"
             :title="$t('iconHints.delete')"
             @click="remove(props.rowIndex)"
          ></i>
        </template>
      </vuetable>
      <pagination
        v-show="isLoaded"
        v-model="size"
        @loadDataList="loadList"
        @next="nextPage"
        @prev="prevPage"
        :isNext="isNextPage"
        :isPrev="!!page"
        :page="page"
      ></pagination>
    </section>
  </div>
</template>

<script>
import tableComponentMixin from '@/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import { mapActions, mapState } from 'vuex';
import storagePopup from './create-storage-popup';
import { _actionsTableField_2, _checkboxTableField, _switcherWidth } from '../../../utils/tableFieldPresets';
import RouteNames from '../../../router/_internals/RouteNames.enum';

export default {
  name: 'the-storage',
  mixins: [tableComponentMixin],
  components: { storagePopup },
  computed: {
    ...mapState('integrations/storage', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      isNextPage: (state) => state.isNextPage,
    }),

    size: {
      get() {
        return this.$store.state.integrations.storage.size;
      },
      set(value) {
        this.setSize(value);
      },
    },

    search: {
      get() {
        return this.$store.state.integrations.storage.search;
      },
      set(value) {
        this.setSearch(value);
      },
    },

    fields() {
      let fields = [
        _checkboxTableField,
        { name: 'name', title: this.$t('objects.name') },
        { name: 'type', title: this.$t('objects.integrations.storage.type') },
        { name: 'maxSize', title: this.$t('objects.integrations.storage.maxSize') },
        { name: 'expireDays', title: this.$t('objects.integrations.storage.expireDays') },
        { name: 'enabled', title: this.$t('objects.enabled'), width: _switcherWidth },
      ];
      if (this.hasTableActions) fields = fields.concat(_actionsTableField_2);
      return fields;
    },
    path() {
      return [
        { name: this.$t('objects.integrations.integrations') },
        { name: this.$t('objects.integrations.storage.storage'), route: '/integrations/storage' },
      ];
    },
  },

  methods: {
    create() {
      this.popupTriggerIf = true;
    },

    edit(rowId) {
      this.$router.push({
        name: `${RouteNames.STORAGE}-edit`,
        params: {
          type: this.dataList[rowId].type,
          id: this.dataList[rowId].id,
        },
      });
    },

    computeType(type) {
      switch (type) {
        case 'local':
          return 'Local';
        case 's3':
          return 'S3 Bucket';
        case 'backblaze':
          return 'Backblaze';
        case 'dropbox':
          return 'Dropbox';
        case 'drive':
          return 'Google Drive';
      }
    },

    ...mapActions('integrations/storage', {
      loadDataList: 'LOAD_DATA_LIST',
      patchProperty: 'PATCH_ITEM_PROPERTY',
      setSize: 'SET_SIZE',
      setSearch: 'SET_SEARCH',
      nextPage: 'NEXT_PAGE',
      prevPage: 'PREV_PAGE',
      removeItem: 'REMOVE_ITEM',
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
