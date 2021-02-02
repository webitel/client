import accessControlMixin from '../../../baseMixins/accessControlMixin/accessControlMixin';

export default {
  mixins: [accessControlMixin],
  computed: {
    hasTableActions() {
      return this.isEditAccess || this.isDeleteAccess;
    },
  },
};
