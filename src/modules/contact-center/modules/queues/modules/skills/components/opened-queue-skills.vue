<template>
  <section class="content-wrapper">
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
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        >
          <delete-all-action
            v-if="!disableUserInput"
            :class="{'hidden': anySelected}"
            :selected-count="selectedRows.length"
            @click="callDelete(selectedRows)"
          ></delete-all-action>
          <wt-icon-btn
            v-if="!disableUserInput"
            class="icon-action"
            icon="plus"
            @click="create"
          ></wt-icon-btn>
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :text="$t(dummy.text)"
      class="dummy-wrapper"
    ></wt-dummy>
    <div
      v-show="dataList.length && isLoaded"
      class="table-wrapper">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
        sortable
        @sort="sort"
      >
        <template v-slot:name="{ item }">
          <div v-if="item.skill">
            {{ item.skill.name }}
          </div>
        </template>

        <template v-slot:capacity="{ item }">
          {{ item.minCapacity }} - {{ item.maxCapacity }}
        </template>

        <template v-slot:lvl="{ item }">
          {{ item.lvl }}
        </template>

        <template v-slot:buckets="{ item }">
          <div>{{ getFirstBucket(item.buckets) }}
            <span class="hidden-num"
                  @click="readBuckets(item)"
                  v-if="item.buckets.length > 1"
            >+{{ item.buckets.length - 1 }}</span>
          </div>
        </template>
        <template v-slot:state="{ item, index }">
          <wt-switcher
            :value="item.enabled"
            :disabled="!hasEditAccess"
            @change="patchItem({ item, index, prop: 'enabled', value: $event })"
          ></wt-switcher>
        </template>
        <template v-slot:actions="{ item }">
          <wt-icon-action
            action="edit"
            @click="edit(item)"
          ></wt-icon-action>
          <wt-icon-action
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

<script>
import SkillBucketsPopup from './opened-queue-skills-buckets-popup.vue';
import SkillPopup from './opened-queue-skills-popup.vue';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import { useDummy } from '../../../../../../../app/composables/useDummy';

const namespace = 'ccenter/queues';
const subNamespace = 'skills';

export default {
  name: 'opened-queue-skills',
  mixins: [openedObjectTableTabMixin],
  components: { SkillPopup, SkillBucketsPopup },
  data: () => ({
    namespace,
    subNamespace,
    isSkillBucketsPopup: null,
    isSkillPopup: false,
    agentId: 0,
    isDeleteConfirmation: false,
  }),
  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
    return { dummy };
  },
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
