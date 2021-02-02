import accessControlMixin from '../../../baseMixins/accessControlMixin/accessControlMixin';

export default {
  mixins: [accessControlMixin],
  computed: {
    hasSaveActionAccess() {
      return this.isEditAccess || this.isDeleteAccess;
    },
  },
};
