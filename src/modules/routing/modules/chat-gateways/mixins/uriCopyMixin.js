import path from 'path';
import CopyInput from '../../../../../app/components/utils/copy-input.vue';

export default {
  components: { CopyInput },
  methods: {
    modifyUriCopy(value) {
      const base = window.location.origin;
      return new URL(path.join(process.env.VUE_APP_CHAT_URL, value), base).toString();
    },
  },
};
