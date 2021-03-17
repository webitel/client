import { mapActions } from 'vuex';

import formInput from '@/components/utils/form-input';
import dropdownSelect from '@/components/utils/dropdown-select';
import tableCheckbox from '@/components/utils/checkbox';
import tagsInput from '@/components/utils/tags-input';

import ObjectHeader from '../../../components/object-utils/the-object-header.vue';
import Permissions from '../../../components/object-utils/permissions-tab/permissions-tab.vue';
import openedObjectValidationMixin
  from '../../baseMixins/openedObjectValidationMixin/openedObjectValidationMixin';
import openedObjectAccessControlMixin from './_internals/openedObjectAccessControlMixin';

/**
 * @fileOverview abstract mixin,
 * used by edit-components: main (openedObjectMixin)
 * and nested (nestedObjectMixin) mixins
 * @param {string} this.namespace - should be declared in data()
 *      and contain a string name for storeModule like 'ccenter/agents/skills'
 * @extends openedObjectValidationMixin, openedObjectAccessControlMixin
 */
export default {
  // FIXME: MOVE ACCESS_CONTROL MIXIN IMPORT TO OPENED_OBJECT_MIXIN
  //  AFTER COMPLETE OBJECT PAGES REFACTOR
  mixins: [openedObjectAccessControlMixin, openedObjectValidationMixin],
  components: {
    ObjectHeader,
    Permissions, // FIXME MOVE TO openedObjectMixin AFTER REFACTOR

    // FIXME: DELETE AFTER REFACTOR WITH WEBITEL-UI
    formInput,
    dropdownSelect,
    checkbox: tableCheckbox,
    tagsInput,
  },

  data() {
    return {
      dropdownOptionsList: [], // FIXME: DELETE AFTER REFACTOR WITH WEBITEL-UI
    };
  },

  destroyed() {
    // FIXME REMOVE IF() CHECK WHEN METHOD WILL BE IMPLEMENTED IN ALL OBJECT PAGES
    if (this.resetState) this.resetState();
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

    close() {
      this.$router.go(-1);
    },

    /* FIXME AFTER REFACTOR WITH HIGHER-LEVEL MIXINS
         (openedObject and nested object) due to different implementation */
    closePopup() {
      this.popupTriggerIf = false;
      this.loadDataList();
    },
  },
};
