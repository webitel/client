<template>
  <section>
    <skill-buckets-popup
      v-if="isSkillBucketsPopup"
      :itemId="this.agentId"
      @close="closeBucketsPopup"
    ></skill-buckets-popup>

    <skill-popup
      v-if="isSkillPopup"
      @close="closePopup"
    ></skill-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.lookups.skills.skills', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        ></wt-search-bar>
        <wt-icon-btn
          v-if="!disableUserInput"
          :class="{'hidden': anySelected}"
          :tooltip="actionPanelDeleteTooltip"
          class="icon-action"
          icon="bucket"
          @click="callDelete(selectedRows)"
        ></wt-icon-btn>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="plus"
          @click="create"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
        sortable
        @sort="sort"
      >
        <template slot="name" slot-scope="{ item }">
          <div v-if="item.skill">
            {{ item.skill.name }}
          </div>
        </template>

        <template slot="capacity" slot-scope="{ item }">
          {{ item.minCapacity }} - {{ item.maxCapacity }}
        </template>

        <template slot="lvl" slot-scope="{ item }">
          {{ item.lvl }}
        </template>

        <template slot="buckets" slot-scope="{ item }">
          <div>{{ getFirstBucket(item.buckets) }}
            <span class="hidden-num"
                  @click="readBuckets(item)"
                  v-if="item.buckets.length > 1"
            >+{{ item.buckets.length - 1 }}</span>
          </div>
        </template>
        <template slot="state" slot-scope="{ item, index }">
          <wt-switcher
            :value="item.enabled"
            :disabled="!hasEditAccess"
            @change="patchItem({ item, index, prop: 'enabled', value: $event })"
          ></wt-switcher>
        </template>
        <template slot="actions" slot-scope="{ item }">
          <edit-action
            @click="edit(item)"
          ></edit-action>
          <delete-action
            @click="callDelete(item)"
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
import SkillBucketsPopup from './opened-queue-skills-buckets-popup.vue';
import SkillPopup from './opened-queue-skills-popup.vue';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-queue-skills',
  mixins: [openedObjectTableTabMixin],
  components: { SkillPopup, SkillBucketsPopup },
  data: () => ({
    subNamespace: 'skills',
    isSkillBucketsPopup: null,
    isSkillPopup: false,
    agentId: 0,

    isDeleteConfirmation: false,
  }),

  methods: {
    getFirstBucket(buckets) {
      if (buckets.length > 0) {
        return buckets[0].name;
      }
      return '';
    },

    readBuckets(item) {
      this.agentId = item.id;
      this.isSkillBucketsPopup = true;
    },

    openPopup() {
      this.isSkillPopup = true;
    },

    closePopup() {
      this.isSkillPopup = false;
    },

    closeBucketsPopup() {
      this.isSkillBucketsPopup = false;
      this.resetItemState();
    },
  },
};
</script>

<style lang="scss" scoped>
.hidden-num {
  @extend %typo-body-2;

  margin-left: 33px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
