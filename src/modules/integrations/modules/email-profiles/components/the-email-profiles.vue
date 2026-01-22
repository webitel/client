<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header :hide-primary="!hasCreateAccess" :primary-action="create">
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup :shown="isDeleteConfirmationPopup" :callback="deleteCallback"
        :delete-count="deleteCount" @close="closeDelete" />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{
              $t(
                'objects.all',
                { entity: $t('objects.integrations.emailProfiles.emailProfiles', 2) },
              )
            }}
          </h3>
          <div class="table-title__actions-wrap">
            <wt-search-bar :value="search" debounce @enter="loadList" @input="setSearch" @search="loadList" />
            <wt-table-actions :icons="['refresh']" @input="tableActionsHandler">
              <delete-all-action v-if="hasDeleteAccess" :class="{ 'hidden': anySelected }"
                :selected-count="selectedRows.length" @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })" />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy v-if="dummy && isLoaded" :dark-mode="darkMode" :show-action="dummy.showAction" :src="dummy.src"
          :text="dummy.text && $t(dummy.text)" class="dummy-wrapper" @create="create" />
        <div
          v-show="dataList.length && isLoaded"
          class="table-section__table-wrapper"
        >
          <wt-table :data="dataList" :headers="headers" sortable @sort="sort">
            <template #name="{ item }">
              <adm-item-link :id="item.id" :route-name="routeName">
                {{ item.name }}
              </adm-item-link>
            </template>
            <template #flow="{ item }">
              <adm-item-link :id="item.schema.id" :route-name="RouteNames.FLOW" target="_blank">
                {{ item.schema.name }}
              </adm-item-link>
            </template>
            <template #listen="{ item, index }">
              <wt-switcher :disabled="!hasEditAccess" :model-value="item.listen"
                @update:model-value="patchItem({ item, index, prop: 'listen', value: $event })" />
            </template>
            <template #state="{ item, index }">
              <wt-switcher :disabled="!hasEditAccess" :model-value="item.enabled"
                @update:model-value="patchItem({ item, index, prop: 'enabled', value: $event })" />
            </template>
            <template #actions="{ item }">
              <wt-icon-action action="edit" :disabled="!hasEditAccess" @click="edit(item)" />
              <wt-icon-action action="delete" :disabled="!hasDeleteAccess" @click="askDeleteConfirmation({
                deleted: [item],
                callback: () => deleteData(item),
              })" />
            </template>
          </wt-table>
          <wt-pagination :next="isNext" :prev="page > 1" :size="size" debounce @change="loadList" @input="setSize"
            @next="nextPage" @prev="prevPage" />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { computed } from 'vue';
import { useStore } from 'vuex';

import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import dummyPicDark from '../assets/adm-dummy-email-profile-dark.svg';
import dummyPicLight from '../assets/adm-dummy-email-profile-light.svg';

const namespace = 'integrations/emailProfiles';

export default {
  name: 'TheEmailProfiles',
  components: { DeleteConfirmationPopup },
  mixins: [tableComponentMixin],

  setup() {
    const store = useStore();
    const darkMode = computed(() => store.getters['appearance/DARK_MODE']);
    const dummyPic = computed(() => (darkMode.value ? dummyPicDark : dummyPicLight));
    const { dummy } = useDummy({
      namespace,
      showAction: true,
      dummyPic,
      dummyText: 'objects.integrations.emptyWorkspace',
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
    routeName: RouteNames.EMAIL_PROFILES,
  }),

  computed: {
    path() {
      return [
        {
          name: this.$t('objects.integrations.integrations'),
        },
        {
          name: this.$t('objects.integrations.emailProfiles.emailProfiles', 2),
          route: '/integrations/email-profiles',
        },
      ];
    },
  },
};
</script>

<style scoped></style>
