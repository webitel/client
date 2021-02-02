import accessControlMixin from '../../../baseMixins/accessControlMixin/accessControlMixin';

export default {
  mixins: [accessControlMixin],
  computed: {
    hasSaveActionAccess() {
      if (this.$route.name.includes('-edit')) return this.isEditAccess;
      return this.isCreateAccess;
    },
  },
};
