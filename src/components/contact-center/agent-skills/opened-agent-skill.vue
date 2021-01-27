<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :primary-text="computePrimaryText"
        :primary-action="save"
        :primary-disabled="computeDisabled"
        :secondary-action="close"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>
    <template slot="main">
      <section class="object-content module-new">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
        </header>

        <form class="object-input-grid object-input-grid__1-col object-input-grid__w50">
          <wt-input
            :value="name"
            :v="$v.itemInstance.name"
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
  </wt-page-wrapper>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';
import openedObjectMixin from '../../../mixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-agent-skill',
  mixins: [openedObjectMixin],

  data: () => ({
    namespace: 'ccenter/skills',
  }),

  validations: {
    itemInstance: {
      name: { required },
    },
  },

  computed: {
    ...mapState('ccenter/skills', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
      name: (state) => state.itemInstance.name,
      description: (state) => state.itemInstance.description,
    }),

    path() {
      const baseUrl = '/contact-center/skills';
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.skills.agentSkills', 2), route: baseUrl },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
  methods: {
    ...mapActions('ccenter/skills', {
      setItemProp: 'SET_ITEM_PROPERTY',
    }),
  },
};
</script>

<style scoped>

</style>
