<template>
  <section class="table-section">
    <skill-buckets-popup :shown="!!agentBucketsId" @close="closeBucketsPopup" />

    <skill-popup @close="closePopup" />

    <header class="table-title">
      <h3 class="table-title__title typo-heading-3">
        {{ $t('objects.lookups.skills.skills', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-search-bar :value="search" debounce @enter="loadList" @input="setSearch" @search="loadList" />
        <wt-table-actions :icons="['refresh']" @input="tableActionsHandler">
          <delete-all-action v-if="!disableUserInput" :class="{ 'hidden': anySelected }"
            :selected-count="selectedRows.length" @click="deleteData(selectedRows)" />
          <wt-icon-btn v-if="!disableUserInput" class="icon-action" icon="plus" @click="create" />
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy v-if="dummy && isLoaded" :src="dummy.src" :dark-mode="darkMode" :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper" />
    <div
      v-show="dataList.length && isLoaded"
      class="table-section__table-wrapper"
    >
      <wt-table :data="dataList" :grid-actions="!disableUserInput" :headers="headers" sortable @sort="sort">
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
            <span v-if="item.buckets.length > 1" class="hidden-num typo-body-2" @click="setBucketQuery(item)">+{{
              item.buckets.length - 1 }}</span>
          </div>
        </template>
        <template #state="{ item, index }">
          <wt-switcher :disabled="!hasEditAccess" :model-value="item.enabled"
            @update:model-value="patchItem({ item, index, prop: 'enabled', value: $event })" />
        </template>
        <template #actions="{ item }">
          <wt-icon-action action="edit" @click="editItem(item)" />
          <wt-icon-action action="delete" @click="deleteData(item)" />
        </template>
      </wt-table>
      <wt-pagination :next="isNext" :prev="page > 1" :size="size" debounce @change="loadList" @input="setSize"
        @next="nextPage" @prev="prevPage" />
    </div>
  </section>
</template>

<script>
import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import bucketsPopupMixin from "../mixins/bucketsPopupMixin.js";
import SkillBucketsPopup from './opened-queue-skills-buckets-popup.vue';
import SkillPopup from './opened-queue-skills-popup.vue';

const namespace = 'ccenter/queues';
const subNamespace = 'skills';

export default {
  name: 'OpenedQueueSkills',
  components: { SkillPopup, SkillBucketsPopup },
  mixins: [openedObjectTableTabMixin, bucketsPopupMixin],
  setup() {
    const { dummy } = useDummy({
      namespace: `${namespace}/${subNamespace}`,
      hiddenText: true,
    });
    return { dummy };
  },
  data: () => ({
    namespace,
    subNamespace,
    isSkillBucketsPopup: null,
    isDeleteConfirmation: false,
  }),
  methods: {
    addItem() {
      this.$router.push({
        ...this.$route,
        params: { skillId: 'new' }
      })
    },
    editItem(item) {
      this.$router.push({
        ...this.$route,
        params: { skillId: item.id }
      })
    },
    closePopup() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.hidden-num {
  margin-left: 33px;
  cursor: pointer;
  text-decoration: underline;
}
</style>
