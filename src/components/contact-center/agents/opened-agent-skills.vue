<template>
  <section>
    <skill-popup
      v-if="isSkillPopup"
      @close="closePopup"
    ></skill-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.skills.skills', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        ></wt-search-bar>
        <wt-icon-btn
          :class="{'hidden': anySelected}"
          :tooltip="$t('iconHints.deleteSelected')"
          class="icon-action"
          icon="bucket"
          @click="deleteSelected"
        ></wt-icon-btn>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
        <wt-icon-btn
          class="icon-action"
          icon="plus"
          @click="create"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :data="dataList"
        :headers="headers"
      >
        <template slot="name" slot-scope="{ item }">
          <div v-if="item.skill">
            {{ item.skill.name }}
          </div>
        </template>

        <template slot="capacity" slot-scope="{ item }">
          {{ item.capacity }}
        </template>

        <template slot="actions" slot-scope="{ item, index }">
          <edit-action
            @click="edit(item)"
          ></edit-action>
          <delete-action
            @click="remove(index)"
          ></delete-action>
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

<script>
import { mapState } from 'vuex';
import SkillPopup from './opened-agent-skills-popup.vue';
import openedObjectTableTabMixin from '../../../mixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-agent-skills',
  mixins: [openedObjectTableTabMixin],
  components: { SkillPopup },
  data: () => ({
    subNamespace: 'skills',
    isSkillPopup: false,
  }),

  computed: {
    ...mapState('ccenter/agents', {
      parentId: (state) => state.itemId,
    }),
    ...mapState('ccenter/agents/skills', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
    headers() {
      return [
        { value: 'name', text: this.$tc('objects.ccenter.skills.skills', 2) },
        { value: 'capacity', text: this.$t('objects.ccenter.skills.capacity') },
      ];
    },
  },

  methods: {
    openPopup() {
      this.isSkillPopup = true;
    },

    closePopup() {
      this.isSkillPopup = false;
      this.resetItemState();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
