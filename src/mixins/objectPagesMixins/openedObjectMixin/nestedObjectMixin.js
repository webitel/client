import { mapActions } from 'vuex';
import editComponentMixin from './editComponentMixin';

/**
 * @fileOverview contains nestedObject common logic
 *      (popup entity inside objectTab like opened-agent-skills-popup.vue)
 * @param {string} this.namespace - should be declared in data()
 *      and contain a string name for storeModule like 'ccenter/agents/skills'
 * @extends editComponentMixin
 */
export default {
  mixins: [editComponentMixin],
  created() {
    this.loadItem();
  },
  // duplicate of editComponentMixin logic
  // destroyed() {
  //   this.resetState();
  // },

  methods: {
    ...mapActions({
      setItemProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PROPERTY`, payload);
      },
    }),

    async save() {
      const invalid = this.checkValidations();
      if (!invalid) {
        try {
          if (this.id) {
            await this.updateItem();
          } else {
            await this.addItem();
          }
          this.close();
        } catch {
        }
      }
    },

    close() {
      this.$emit('close');
    },
  },
};
