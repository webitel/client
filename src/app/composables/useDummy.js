import { watch, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import IsEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import getNamespacedState
  from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import Dummy from '../assets/dummy/adm-dummy.svg';
import DummyAfterSearch from '../assets/dummy/adm-dummy-after-search.svg';

export function useDummy(
  namespace,
  myDimmyPic,
  myDummyPicAfterSearch,
  myDummyLocale,
  myDummyLocaleAfterSearch,
) {
  const store = useStore();
  const route = useRoute();

  let dummyValue = ref('');
  const dummyPic = myDimmyPic || Dummy;
  const dummyPicAfterSearch = myDummyPicAfterSearch || DummyAfterSearch;
  const dummyLocale = myDummyLocale || 'objects.emptyWorkspace';
  const dummyLocaleAfterSearch = myDummyLocaleAfterSearch || 'objects.emptyResultSearch';

  const dataList = computed(() => getNamespacedState(store.state, namespace).dataList);
  const search = computed(() => getNamespacedState(store.state, namespace).search);

  watch(() => dataList, () => {
    if (!dataList.value.length) {
      if (IsEmpty(route?.query) ? search.value : Object.values(route.query)
      .some((query) => query.length)) {
        return dummyValue.value = {
          src: dummyPicAfterSearch,
          locale: dummyLocaleAfterSearch,
        };
      } else return dummyValue.value = {
        src: dummyPic,
        locale: dummyLocale,
      };
    } else return dummyValue.value = '';
  }, { deep: true });
  return { dummyValue };
};
