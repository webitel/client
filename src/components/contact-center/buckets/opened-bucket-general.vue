<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid object-input-grid__1-col object-input-grid__w50">
      <wt-input
        :value="name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="description"
        :label="$t('objects.description')"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-bucket-general',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('ccenter/buckets', {
      name: (state) => state.itemInstance.name,
      description: (state) => state.itemInstance.description,
    }),
  },
};
</script>

<style scoped>

</style>
