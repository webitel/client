import { mapActions } from 'vuex';
import openedObjectValidationMixin from '../openedObjectValidationMixin/openedObjectValidationMixin';

/**
 * @fileOverview abstract mixin,
 * used by edit-components: main (openedObjectMixin)
 * and nested (nestedObjectMixin) mixins
 * @param {string} this.namespace - should be declared in data()
 *      and contain a string name for storeModule like 'ccenter/agents/skills'
 * @extends openedObjectValidationMixin, openedObjectAccessControlMixin
 */
export default {
  mixins: [openedObjectValidationMixin],
  destroyed() {
    this.resetState();
  },

  computed: {
    computePrimaryText() {
      // if it's a new item
      // OR any fields have changed
      return !this.id || this.itemInstance._dirty
        ? this.$t('objects.save') : this.$t('objects.saved');
    },

    computeDisabled() {
      // if there's a validation problem
      // OR it's edit and any fields haven't changed
      return this.checkValidations() || (!this.itemInstance._dirty && !!this.id);
    },

    computeTitle() {
      return this.$route.params.id && this.$route.params.id !== 'new'
        ? this.$t('objects.edit') : this.$t('objects.new');
    },
  },

  methods: {
    ...mapActions({
      loadItem(dispatch, payload) {
        return dispatch(`${this.namespace}/LOAD_ITEM`, payload);
      },
      addItem(dispatch, payload) {
        return dispatch(`${this.namespace}/ADD_ITEM`, payload);
      },
      updateItem(dispatch, payload) {
        return dispatch(`${this.namespace}/UPDATE_ITEM`, payload);
      },
      resetState(dispatch, payload) {
        return dispatch(`${this.namespace}/RESET_ITEM_STATE`, payload);
      },
    }),

    async save() {
      const invalid = this.checkValidations();
      if (!invalid) {
        if (this.id) {
          await this.updateItem();
        } else {
          try {
            await this.addItem();
            if (this.id) {
              const routeName = this.$route.name.replace('-new', '-edit');
              await this.$router.replace({ name: routeName, params: { id: this.id } });
            }
          } catch (err) {
            throw err;
          }
        }
      }
    },
  },
};
