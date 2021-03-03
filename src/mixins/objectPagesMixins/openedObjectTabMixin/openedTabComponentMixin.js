import { mapActions } from 'vuex';
import ObjectHeader from '@/components/object-utils/the-object-header';
import formInput from '@/components/utils/form-input';
import expansionPanel from '@/components/utils/expansion-panel';
import dropdownSelect from '@/components/utils/dropdown-select';
import validationMessage from '@/components/utils/validation-message';
import tableCheckbox from '@/components/utils/checkbox';
import switcher from '@/components/utils/switcher';
import hint from '@/components/utils/hint';
import tabs from '@/components/utils/tabs';
import tagsInput from '@/components/utils/tags-input';
import tabsComponent from '@/components/utils/tabs-component';

import openedObjectValidationMixin
  from '../../baseMixins/openedObjectValidationMixin/openedObjectValidationMixin';
import openedObjectTabAccessControlMixin from './_internals/openedObjectTabAccessControlMixin';

/**
 * @fileOverview contains openedObject tab
 *      (tab with subordinate entity, like opened-agent-general.vue) common logic
 * @param {string} this.namespace - should be passed as prop from tabs wrapper
 * @extends openedObjectValidationMixin, openedObjectTabAccessControlMixin
 */
export default {
  mixins: [openedObjectValidationMixin, openedObjectTabAccessControlMixin],
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
    tabsComponent,
  },
  props: {
    namespace: {
      type: String,
      // required: true, FIXME: MAKE ME REQUIRED AFTER REFACTOR
    },
  },
  methods: {
    ...mapActions({
      setItemProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PROPERTY`, payload);
      },
    }),
  },
};
