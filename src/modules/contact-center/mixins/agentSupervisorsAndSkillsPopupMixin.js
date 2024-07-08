import {mapActions} from 'vuex';

export default {
  data: () => ({
    openedItemId: null, // "selected" id object list popup
  }),
  computed: {
    isSkillsQuery() {
      return this.$route.query.skills;
    },
    isSupervisorQuery() {
      return this.$route.query.supervisor;
    },
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
    setSupervisorQuery(item) {
      this.$router.push({
        ...this.$route,
        query: {supervisor: item.id}
      })
    },
    setSkillsQuery(item) {
      this.$router.push({
        ...this.$route,
        query: {skills: item.id}
      })
    },
    setId(id) {
      this.openedItemId = id;
    },
    closeSupervisorsAndSkillsPopup() {
      this.$router.go(-1);
      this.openedItemId = null;
    },
  },
  watch: {
    isSkillsQuery: {
       handler(id) {
         if (id) this.setId(id);
      }
    },

    isSupervisorQuery: {
      handler(id) {
        if (id) this.setId(id);
      }
    },
  },
};
