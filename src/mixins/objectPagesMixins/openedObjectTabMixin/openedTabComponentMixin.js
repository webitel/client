import { mapState, mapActions } from 'vuex';
import ObjectHeader from '@/components/object-utils/the-object-header';
import formInput from '@/components/utils/form-input';
import dropdownSelect from '@/components/utils/dropdown-select';
import tableCheckbox from '@/components/utils/checkbox';
import tagsInput from '@/components/utils/tags-input';

import openedObjectValidationMixin
  from '../../baseMixins/openedObjectValidationMixin/openedObjectValidationMixin';
import openedObjectTabAccessControlMixin from './_internals/openedObjectTabAccessControlMixin';
import getNamespacedState from '../../../store/helpers/getNamespacedState';

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
    dropdownSelect,
    checkbox: tableCheckbox,
    tagsInput,
  },
  props: {
    namespace: {
      type: String,
      // required: true, FIXME: MAKE ME REQUIRED AFTER REFACTOR
    },
  },
  computed: {
    ...mapState({
      itemInstance(state) {
        return getNamespacedState(state, this.namespace).itemInstance;
      },
    }),
  },
  methods: {
    ...mapActions({
      setItemProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PROPERTY`, payload);
      },
    }),
  },
};
