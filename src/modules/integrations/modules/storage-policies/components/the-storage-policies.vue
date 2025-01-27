<template>
  <wt-page-wrapper class="the-storage-policies" :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        v-show="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $tc('objects.integrations.storagePolicies.storagePolicies', 2) }}
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
            <template #name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>

            <template #channels="{ item }">
              {{ $t(`objects.integrations.storagePolicies.channels.${item.channels[0]}`)}}

              <wt-tooltip
                v-if="item.channels.length > 1"
                :triggers="['click']"
              >
                <template #activator>
                  <wt-chip>
                    +{{ item.channels.length - 1 }}
                  </wt-chip>
                </template>

                <p
                  v-for="(channel) of item.channels.slice(1)"
                  :key="channel"
                > {{ $t(`objects.integrations.storagePolicies.channels.${channel}`) }} </p>
              </wt-tooltip>
            </template>

            <template #mimeTypes="{ item }">
              <wt-chip color="secondary">
                +{{ item.mimeTypes[0] }}
              </wt-chip>

              <wt-tooltip
                v-if="item.mimeTypes.length > 1"
                :triggers="['click']"
              >
                <template #activator>
                  <wt-chip>
                    +{{ item.mimeTypes.length - 1 }}
                  </wt-chip>
                </template>

                <p
                  v-for="(channel) of item.mimeTypes.slice(1)"
                  :key="channel"
                > {{ channel }} </p>
              </wt-tooltip>
            </template>

            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="item.enabled"
                @change="patchItem({ item, index, prop: 'enabled', value: $event })"
              />
            </template>

            <template #actions="{ item }">
              <wt-tooltip class="table-action">
                <template #activator>
                  <wt-icon-btn
                    v-if="hasEditAccess"
                    icon="move"
                  />
                </template>
                {{ $t('iconHints.draggable') }}
              </wt-tooltip>
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
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import Sortable, { Swap } from 'sortablejs';
import { computed } from 'vue';
import { mapActions } from 'vuex';
import { useDummy } from '../../../../../app/composables/useDummy.js';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import dummyPicDark from '../../storage/assets/adm-dummy-storage-dark.svg';
import dummyPicLight from '../../storage/assets/adm-dummy-storage-light.svg';

const namespace = 'integrations/storagePolicies';

export default {
  name: 'TheStoragePolicies',
  components: { DeleteConfirmationPopup },
  mixins: [tableComponentMixin],
  setup() {
    const dummyPic = computed(() => (darkMode.value ? dummyPicDark : dummyPicLight));
    const { dummy, darkMode } = useDummy({
      namespace,
      dummyPic,
      showAction: true,
    });

    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    // const {
    //   callSortable,
    //   mountSortable,
    //   unmountSortable
    // } = useMoveItem(dataList, this.changeItemPosition)

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
      // callSortable,
      // mountSortable,
      // unmountSortable,
    };
  },
  data: () => ({
    namespace,
    routeName: RouteNames.STORAGE_POLICIES,
    sortableConfig: {
      swap: true, // Enable swap mode
      swapClass: 'sortable-swap-highlight', // Class name for swap item (if swap mode is enabled)
      animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
      easing: 'cubic-bezier(1, 0, 0, 1)', // Easing for animation. Defaults to null. See https://easings.net/ for examples.
    },
    sortableInstance: null,
  }),

  computed: {
    path() {
      return [
        {
          name: this.$t('objects.integrations.integrations'),
        },
        {
          name: this.$tc('objects.integrations.storagePolicies.storagePolicies', 2),
          route: `/integrations/${RouteNames.STORAGE_POLICIES}`,
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      patchProperty(dispatch, payload) {
        return dispatch(`${this.namespace}/PATCH_ITEM_PROPERTY`, payload);
      },
    }),
    create() {
      this.$router.push({ name: `${RouteNames.STORAGE_POLICIES}-card`, params: { id: 'new' } });
    },
    editLink({ id }) {
      return { name: `${RouteNames.STORAGE_POLICIES}-card`, params: { id } };
    },
    setPosition(newIndex, list) {
      if (newIndex === 0) return {
        condDown: this.dataList.value[0].id,
        condUp: 0,
      };

      if (newIndex === list.length - 1) return {
        condDown: 0,
        condUp: this.dataList.value[this.dataList.value.length - 1].id,
      };

      return {
        condDown: list[newIndex - 1].id,
        condUp: list[newIndex + 1].id,
      };
    },
    initSortable(wrapper) {
      if (this.sortableInstance) {
        this.sortableInstance.destroy();
        this.sortableInstance = null;
      }

      this.sortableInstance = new Sortable(wrapper, {

        ...this.sortableConfig,

        async onEnd({ oldIndex, newIndex }) {
          const updatedDataList = [...this.dataList.value];

          const [movedItem] = updatedDataList.splice(oldIndex, 1);
          updatedDataList.splice(newIndex, 0, movedItem);

          // await ConditionsAPI.patch({
          //   parentId: dataList.value[oldIndex].id,
          //   changes: {
          //     position: setPosition(newIndex, updatedDataList),
          //   },
          // });
          // await loadData();
        },
      });
    },
    callSortable() {
      setTimeout(() => {
        const wrapper = document.querySelector('.wt-table__body');
        if (wrapper) {
          this.initSortable(wrapper);
        }
      }, 500);
    },
  },
  mounted() {
    if (!Sortable.__pluginsMounted) {
      Sortable.mount(new Swap());
      Sortable.__pluginsMounted = true;
    }

    this.callSortable();
  },
  watch: {
    dataList() {
      this.callSortable();
    },
  },
  unmounted() {
    if (this.sortableInstance) {
      this.sortableInstance.destroy();
      this.sortableInstance = null;
    }
  }
};

</script>

<style scoped>
:deep(.wt-table .sortable-swap-highlight) {
  background: var(--primary-color);
}
</style>
