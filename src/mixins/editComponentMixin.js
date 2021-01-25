import { mapActions } from 'vuex';

import formInput from '@/components/utils/form-input';
import expansionPanel from '@/components/utils/expansion-panel';
import dropdownSelect from '@/components/utils/dropdown-select';
import switcher from '@/components/utils/switcher';
import tableCheckbox from '@/components/utils/checkbox';
import hint from '@/components/utils/hint';
import tabs from '@/components/utils/tabs';
import validationMessage from '@/components/utils/validation-message';
import tabsComponent from '@/components/utils/tabs-component';
import tagsInput from '@/components/utils/tags-input';
import permissionsTab from '../components/object-utils/utils/permissions-tab';

import ObjectHeader from '../components/object-utils/the-object-header.vue';
import openedObjectValidationMixin from './openedObjectValidationMixin/openedObjectValidationMixin';

/**
 * @fileOverview abstract mixin,
 * used by edit-components: main (openedObjectMixin)
 * and nested (nestedObjectMixin) mixins
 * @param {string} this.namespace - should be declared in data()
 *      and contain a string name for storeModule like 'ccenter/agents/skills'
 * @extends openedObjectValidationMixin
 */
export default {
  mixins: [openedObjectValidationMixin],
  components: {
    ObjectHeader,

    // FIXME: DELETE AFTER REFACTOR WITH WEBITEL-UI
    formInput,
    expansionPanel,
    dropdownSelect,
    validationMessage,
    checkbox: tableCheckbox,
    switcher,
    hint,
    tabs,
    tagsInput,
    permissionsTab,
    tabsComponent,
  },

  data() {
    return {
      dropdownOptionsList: [], // FIXME: DELETE AFTER REFACTOR WITH WEBITEL-UI
    };
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

    save() {
      const invalid = this.checkValidations();
      if (!invalid) {
        if (this.id) {
          this.updateItem();
        } else {
          this.addItem();
        }
      }
    },

    close() {
      // FIXME REMOVE IF() CHECK WHEN METHOD WILL BE IMPLEMENTED IN ALL OBJECT PAGES
      if (this.resetState) this.resetState();
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
