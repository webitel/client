import IsEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import getNamespacedState
  from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import defaultDummyPicAfterSearch
  from '../assets/dummy/adm-dummy-after-search.svg';

export function useDummy({
                           namespace,
                           showAction,
                           hiddenText,
                           dummyPic,
                           dummyText,
                           dummyPicAfterSearch = defaultDummyPicAfterSearch,
                           dummyTextAfterSearch = 'objects.emptyResultSearch',
                         }) {
  const store = useStore();
  const route = useRoute();

  const dummy = ref('');

  const dataList = computed(() => getNamespacedState(store.state, namespace).dataList);
  const search = computed(() => getNamespacedState(store.state, namespace).search);

  watch(() => dataList, () => {
    if (!dataList.value.length) {
      if (IsEmpty(route?.query) ? search.value : Object.values(route.query)
      .some((query) => query.length)) {
        return dummy.value = {
          src: dummyPicAfterSearch,
          text: dummyTextAfterSearch,
        };
      } else return dummy.value = {
        src: dummyPic,
        text: dummyText,
        showAction,
        hiddenText,
      };
    } else return dummy.value = '';
  }, { deep: true });
  return { dummy };
}
