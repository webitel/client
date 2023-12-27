<template>
  <section class="content-wrapper">
    <skill-buckets-popup
      v-if="isSkillBucketsPopup"
      :item-id="agentId"
      @close="closeBucketsPopup"
    />

    <skill-popup
      v-if="isSkillPopup"
      @close="closePopup"
    />

    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.lookups.skills.skills', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        />
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        >
          <delete-all-action
            v-if="!disableUserInput"
            :class="{'hidden': anySelected}"
            :selected-count="selectedRows.length"
            @click="deleteData(selectedRows)"
          />
          <wt-icon-btn
            v-if="!disableUserInput"
            class="icon-action"
            icon="plus"
            @click="create"
          />
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper"
    />
    <div
      v-show="dataList.length && isLoaded"
      class="table-wrapper"
    >
      <wt-table
        :data="dataList"
        :grid-actions="!disableUserInput"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template #name="{ item }">
          <div v-if="item.skill">
            {{ item.skill.name }}
          </div>
        </template>

        <template #capacity="{ item }">
          {{ item.minCapacity }} - {{ item.maxCapacity }}
        </template>

        <template #lvl="{ item }">
          {{ item.lvl }}
        </template>

        <template #buckets="{ item }">
          <div>
            {{ getFirstBucket(item.buckets) }}
            <span
              v-if="item.buckets.length > 1"
              class="hidden-num"
              @click="readBuckets(item)"
            >+{{ item.buckets.length - 1 }}</span>
          </div>
        </template>
        <template #state="{ item, index }">
          <wt-switcher
            :disabled="!hasEditAccess"
            :value="item.enabled"
            @change="patchItem({ item, index, prop: 'enabled', value: $event })"
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            action="edit"
            @click="edit(item)"
          />
          <wt-icon-action
            action="delete"
            class="table-action"
            @click="deleteData(item)"
          />
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
      />
    </div>
  </section>
</template>

<script>
import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import SkillBucketsPopup from './opened-queue-skills-buckets-popup.vue';
import SkillPopup from './opened-queue-skills-popup.vue';

const namespace = 'ccenter/queues';
const subNamespace = 'skills';

export default {
  name: 'OpenedQueueSkills',
  components: { SkillPopup, SkillBucketsPopup },
  mixins: [openedObjectTableTabMixin],
  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
    return { dummy };
  },
  data: () => ({
    namespace,
    subNamespace,
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
  cursor: pointer;
  text-decoration: underline;
}
</style>
