<template>
  <section>
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
      :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper"
    ></wt-dummy>
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
        <template v-slot:name="{ item }">
          <div v-if="item.skill">
            {{ item.skill.name }}
          </div>
        </template>
        <template v-slot:capacity="{ item }">
          {{ item.capacity }}
        </template>
        <template v-slot:state="{ item, index }">
          <wt-switcher
            :disabled="!hasEditAccess"
            :value="item.enabled"
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
import { mapActions } from 'vuex';
import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import SkillPopup from './opened-agent-skills-popup.vue';

const namespace = 'ccenter/agents';
const subNamespace = 'skills';

export default {
  name: 'opened-agent-skills',
  mixins: [openedObjectTableTabMixin],
  components: { SkillPopup },
  data: () => ({
    namespace,
    subNamespace,
    isSkillPopup: false,
    isDeleteConfirmation: false,
  }),
  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
    return { dummy };
  },
  methods: {
    ...mapActions({
      patchItem(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/PATCH_ITEM_PROPERTY`, payload);
      },
    }),
    openPopup() {
      this.isSkillPopup = true;
    },
    closePopup() {
      this.isSkillPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
