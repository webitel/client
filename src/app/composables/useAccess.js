import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

// eslint-disable-next-line import/prefer-default-export
export const useAccess = () => {
  const store = useStore();
  const route = useRoute();

  const hasCreateAccess = computed(() => store.getters['userinfo/HAS_CREATE_ACCESS']({ route }));
  const hasEditAccess = computed(() => store.getters['userinfo/HAS_EDIT_ACCESS']({ route }));
  const hasDeleteAccess = computed(() => store.getters['userinfo/HAS_DELETE_ACCESS']({ route }));

  /*
  hasModifyAccess depends on route meta param and wraps access logic to show if inputs should be disabled
   */
  const hasModifyAccess = computed(() => {
    const modifyMode = route.meta.modifyMode;
    if (modifyMode === 'edit') return hasEditAccess.value;
    if (modifyMode === 'create') return hasCreateAccess.value;
    return false;
  });

  const hasTableActions = computed(() => hasEditAccess || hasDeleteAccess);

  return {
    hasCreateAccess,
    hasEditAccess,
    hasDeleteAccess,

    hasModifyAccess,

    hasTableActions,
  };
};
