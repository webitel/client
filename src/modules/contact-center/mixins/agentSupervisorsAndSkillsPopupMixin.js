export default {
  data: () => ({
    openedItemId: null, // "selected" id object list popup
    isSupervisorPopup: false, // object list popup
    isSkillsPopup: false, // object list popup
  }),
  computed: {
    openedItemSupervisors() {
      return this.$store.getters[`${this.namespace}/${this.subNamespace}/GET_ITEM_PROP_BY_ID`](this.openedItemId, 'supervisor');
    },
    openedItemSupervisorHeaders() {
      return [{ value: 'name', text: this.$t('reusable.name') }];
    },
    openedItemSkills() {
      return this.$store.getters[`${this.namespace}/${this.subNamespace}/GET_ITEM_PROP_BY_ID`](this.openedItemId, 'skills');
    },
    openedItemSkillsHeaders() {
      return [{ value: 'name', text: this.$t('reusable.name') }];
    },
  },
  methods: {
    readSupervisor(item) {
      this.openedItemId = item.id;
      this.openSupervisorPopup();
    },
    openSupervisorPopup() {
      this.isSupervisorPopup = true;
    },
    closeSupervisorPopup() {
      this.isSupervisorPopup = false;
      this.openedItemId = null;
    },

    readSkills(item) {
      console.log();
      this.openedItemId = item.id;
      this.openSkillsPopup();
    },
    openSkillsPopup() {
      this.isSkillsPopup = true;
    },
    closeSkillsPopup() {
      this.isSkillsPopup = false;
      this.openedItemId = null;
    },
  },
};
