<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{
              $t('objects.all', {
                entity: $tc('objects.system.globalVariables.globalVariables', 2).toLowerCase(),
              })
            }}
          </h3>
        </header>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>

import tableComponentMixin from '/src/app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin.js';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useDummy } from '/src/app/composables/useDummy';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

const namespace = 'system/global-variables';

export default {
  name: 'TheGlobalVariables',
  mixins: [tableComponentMixin],

  // setup() {
  //   const { dummy } = useDummy({ namespace, showAction: true });
  //   const {
  //     isVisible: isDeleteConfirmationPopup,
  //     deleteCount,
  //     deleteCallback,
  //
  //     askDeleteConfirmation,
  //     closeDelete,
  //   } = useDeleteConfirmationPopup();
  //
  //   return {
  //     dummy,
  //     isDeleteConfirmationPopup,
  //     deleteCount,
  //     deleteCallback,
  //
  //     askDeleteConfirmation,
  //     closeDelete,
  //   };
  // },

  data: () => ({
    // namespace,
    isGlobalVariablesPopup: false,
    path() {
      return [
        { name: this.$t('objects.system.system') },
        { name: this.$tc('objects.system.globalVariables.globalVariables', 1), route: '/system/global-variables' },
      ];
    },
  }),
  methods: {},
}
</script>
