<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="() => isGlobalVariablesPopup = true"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>
    <template #main>

      <delete-confirmation-popup
        v-if="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <global-variables-popup
        v-if="isGlobalVariablesPopup"
        :id="id"
        :namespace="namespace"
        @close="isGlobalVariablesPopup = false"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{
              $t('objects.all', {
                entity: $tc('objects.system.globalVariables.globalVariables', 2).toLowerCase(),
              })
            }}
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
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })"
              />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :show-action="dummy.showAction"
          :src="dummy.src"
          :dark-mode="darkMode"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
          @create="isGlobalVariablesPopup = true"
        />

        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :grid-actions="hasTableActions"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #key="{ item }">
              {{ item.name }}
            </template>
            <template #value="{ item }">
              {{ item.encrypt ? '***************' : item.value }}
            </template>
            <template #encrypt="{ item, index }">
              <wt-switcher
                :value="item.encrypt"
                :disabled="item.encrypt"
                @change="patchItem({ item, index, prop: 'encrypt', value: $event })"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              />
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })"
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
  </wt-page-wrapper>
</template>

<script>
import DeleteConfirmationPopup from "@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue";
import { useDeleteConfirmationPopup } from "@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup";
import getNamespacedState from "@webitel/ui-sdk/src/store/helpers/getNamespacedState";
import { mapActions, mapState } from "vuex";
import { useDummy } from "/src/app/composables/useDummy";
import tableComponentMixin from "/src/app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin.js";
import baseObjectMixin from "../../../../../app/mixins/baseMixins/baseObjectMixin/baseObjectMixin";
import openedObjectMixin from "../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin";
import GlobalVariablesPopup from "./global-variables-popup.vue";

const namespace = "system/globalVariables";

export default {
  name: "TheGlobalVariables",
  components: { DeleteConfirmationPopup, GlobalVariablesPopup },
  mixins: [tableComponentMixin, baseObjectMixin, openedObjectMixin],

  setup() {
    const { dummy } = useDummy({
      namespace,
      showAction: true,
    });
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    };
  },

  data: () => ({
    namespace,
    isGlobalVariablesPopup: false,
  }),
  computed: {
    ...mapState({
      id(state) {
        return getNamespacedState(state, this.namespace).itemId;
      },
    }),
    path() {
      return [
        {
          name: this.$t("objects.system.system"),
        },
        {
          name: this.$tc("objects.system.globalVariables.globalVariables", 1),
          route: "/system/global-variables",
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      setItemId(dispatch, payload) {
        return dispatch(`${namespace}/SET_ITEM_ID`, payload);
      },
    }),
    edit(item) {
      this.setItemId(item.id);
      this.isGlobalVariablesPopup = true;
    },
  },
};
</script>
