<template>
  <section class="table-section">
    <skill-popup @close="closePopup" />

    <header class="table-title">
      <h3 class="table-title__title">
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
          <adm-item-link v-if="item.skill" :id="item.skill.id" :route-name="skillsRoute">
            {{ item.skill.name }}
          </adm-item-link>
        </template>
        <template #capacity="{ item }">
          {{ item.capacity }}
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
import { mapActions } from 'vuex';

import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from "../../../../../../../app/router/_internals/RouteNames.enum.js";
import SkillPopup from './opened-agent-skills-popup.vue';

const namespace = 'ccenter/agents';
const subNamespace = 'skills';

export default {
  name: 'OpenedAgentSkills',
  components: { SkillPopup },
  mixins: [openedObjectTableTabMixin],
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
    isSkillPopup: false,
    isDeleteConfirmation: false,
    skillsRoute: RouteNames.SKILLS,
  }),
  methods: {
    ...mapActions({
      patchItem(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/PATCH_ITEM_PROPERTY`, payload);
      },
    }),
    addItem() {
      return this.$router.push({ params: { skillId: 'new' } });
    },
    editItem(item) {
      return this.$router.push({ params: { skillId: item.id } });
    },
    closePopup() {
      this.resetItemState();
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
