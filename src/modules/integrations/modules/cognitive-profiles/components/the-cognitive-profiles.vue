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
      <create-cognitive-profile-popup
        :shown="isCognitiveProfilePopup"
        @close="isCognitiveProfilePopup = false"
      />
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{
              $t(
                'objects.all',
                { entity: $t('objects.integrations.cognitiveProfiles.cognitiveProfiles', 2) },
              )
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
                :class="{ 'hidden': anySelected }"
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
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #provider="{ item }">
              {{ item.provider }}
            </template>
            <template #service="{ item }">
              {{ $t(`objects.${item.service.toLowerCase()}`) }}
            </template>
            <template #default="{ item, index }">
              <wt-radio
                :disabled="!item.enabled"
                :selected="item.default"
                :value="true"
                @update:selected="changeDefaultProfile({ item, index, value: $event })"
              />
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasUpdateAccess"
                :model-value="item.enabled"
                @update:model-value="changeState({ item, index, value: $event })"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                action="edit"
                :disabled="!hasUpdateAccess"
                @click="edit(item)"
              />
              <wt-icon-action
                action="delete"
                :disabled="!hasDeleteAccess"
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
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { computed } from 'vue';
import { useStore } from 'vuex';

import { useDummy } from '../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import dummyPicDark from '../assets/adm-dummy-congnitive-profiles-dark.svg';
import dummyPicLight from '../assets/adm-dummy-congnitive-profiles-light.svg';
import CognitiveProfilesRouteNames from '../router/_internals/CognitiveProfilesRouteNames.enum.js';
import CreateCognitiveProfilePopup from './create-cognitive-profile-popup.vue';

const namespace = 'integrations/cognitiveProfiles';

export default {
  name: 'TheCognitiveProfiles',
  components: {
    CreateCognitiveProfilePopup,
    DeleteConfirmationPopup,
  },
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

    const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } = useUserAccessControl();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
      hasCreateAccess,
      hasUpdateAccess,
      hasDeleteAccess,
    };
  },
  data: () => ({
    namespace,
    isCognitiveProfilePopup: false,
    routeName: RouteNames.COGNITIVE_PROFILES,
  }),

  computed: {
    path() {
      return [
        {
          name: this.$t('objects.integrations.integrations'),
        },
        {
          name: this.$t('objects.integrations.cognitiveProfiles.cognitiveProfiles', 2),
          route: '/integrations/cognitive-profiles',
        },
      ];
    },
  },

  methods: {
    create() {
      this.isCognitiveProfilePopup = true;
    },
    async changeDefaultProfile({ index, item, value }) {
      try {
        await this.patchItem({
          index,
          item,
          prop: 'default',
          value,
        });
        if (value) this.loadList();
      } catch {
        this.loadList();
      }
    },
    async changeState({ item, index, value }) {
      await this.patchItem({
        item,
        index,
        prop: 'enabled',
        value,
      });
      if (item.default && !value) {
        await this.changeDefaultProfile({
          item,
          index,
          value: false,
        });
      }
    },
  },
};
</script>

<style scoped></style>
