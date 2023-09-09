<template>
  <section class="content-wrapper">
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.system.changelogs.logs.logs', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <!--    <wt-dummy-->
    <!--      v-if="dummy && isLoaded"-->
    <!--      :src="dummy.src"-->
    <!--      :text="dummy.text && $t(dummy.text)"-->
    <!--      class="dummy-wrapper"-->
    <!--    ></wt-dummy>-->
    <div
      v-show="isLoaded"
      class="table-wrapper"
    >
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="false"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template v-slot:action="{ item }">
          {{ item.action }}
        </template>
        <template v-slot:date="{ item }">
          {{ new Date(+item.date).toLocaleString() }}
        </template>
        <template v-slot:user="{ item }">
          <wt-item-link
            v-if="item.user"
            :id="item.user.id"
            :route-name="usersRouteName"
          >{{ item.user.name }}
          </wt-item-link>
        </template>
        <template v-slot:userId="{ item }">
          <wt-item-link
            v-if="item.user"
            :id="item.user.id"
            :route-name="usersRouteName"
          >{{ item.user.id }}
          </wt-item-link>
        </template>
        <template v-slot:object="{ item }">
          {{ item.object.name }}
        </template>
        <template v-slot:record="{ item }">
          {{ item.record }}
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
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
// import { useDummy } from '../../../../../../../app/composables/useDummy';

const namespace = 'system/changelogs';
const subNamespace = 'logs';

export default {
  name: 'opened-changelog-logs',
  mixins: [openedObjectTableTabMixin],
  data: () => ({
    namespace,
    subNamespace,
    usersRouteName: RouteNames.USERS,
  }),

  /* https://my.webitel.com/browse/WTEL-3697 */
  /* Temporarily disabled functionality due to problems with pagination */

  // setup() {
  //   const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
  //   return { dummy };
  // },
  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
