import accessControlMixin from '../../../baseMixins/accessControlMixin/accessControlMixin';

export default {
  mixins: [accessControlMixin],
  computed: {
    disableUserInput() {
      return !this.isEditAccess && !this.isCreateAccess;
    },
  },
};
