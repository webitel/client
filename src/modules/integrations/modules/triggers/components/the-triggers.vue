<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        v-show="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{
              $t('objects.all', {
                entity: $t('objects.integrations.triggers.triggers', 2),
              })
            }}
          </h3>
          <div class="table-title__actions-wrap">
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
                :class="{ hidden: anySelected }"
                :selected-count="selectedRows.length"
                @click="
                  askDeleteConfirmation({
                    deleted: selectedRows,
                    callback: () => deleteData(selectedRows),
                  })
                  "
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
          @create="create"
        />
        <div
          v-show="dataList.length && isLoaded"
          class="table-section__table-wrapper"
        >
          <wt-table
            :data="dataList"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              <adm-item-link
                :id="item.id"
                :route-name="routeName"
              >
                {{ item.name }}
              </adm-item-link>
            </template>
            <template #type="{ item }">
              {{ $t(`objects.integrations.triggers.${item.type}`) }}
            </template>
            <template #schema="{ item }">
              <adm-item-link
                v-if="item.schema"
                :id="item.schema.id"
                :route-name="RouteNames.FLOW"
                target="_blank"
              >
                {{ item.schema.name }}
              </adm-item-link>
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :model-value="item.enabled"
                @update:model-value="changeState({ item, index, value: $event })"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-btn
                icon="trigger-start"
                icon-prefix="adm"
                @click="startTrigger(item)"
              />
              <wt-icon-action
                action="edit"
                :disabled="!hasEditAccess"
                @click="edit(item)"
              />
              <wt-icon-action
                action="delete"
                :disabled="!hasDeleteAccess"
                @click="
                  askDeleteConfirmation({
                    deleted: [item],
                    callback: () => deleteData(item),
                  })
                  "
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
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { mapActions } from 'vuex';

import { useDummy } from '../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { TriggerTypes } from '../lookups/TriggerTypes.lookup';

const namespace = 'integrations/triggers';

export default {
  name: 'TheTriggers',
  components: { DeleteConfirmationPopup },
  mixins: [tableComponentMixin],
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

    const { hasCreateAccess, hasEditAccess, hasDeleteAccess } = useUserAccessControl();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
      hasCreateAccess,
      hasEditAccess,
      hasDeleteAccess,
    };
  },
  data: () => ({
    namespace,
    routeName: RouteNames.TRIGGERS,
    TriggerTypes,
  }),
  computed: {
    path() {
      return [
        {
          name: this.$t('objects.integrations.integrations'),
        },
        {
          name: this.$t('objects.integrations.triggers.triggers', 2),
          route: '/integrations/triggers',
        },
      ];
    },
  },
  methods: {
    async changeState({ item, index, value }) {
      await this.patchItem({
        item,
        index,
        prop: 'enabled',
        value,
      });
    },
    ...mapActions({
      startTrigger(dispatch, payload) {
        return dispatch(`${this.namespace}/START_TRIGGER`, payload);
      },
    }),
  },
};
</script>

<style scoped></style>
