import CopyInput from '../../../../../app/components/utils/copy-input.vue';

export default {
  components: { CopyInput },
  methods: {
    modifyUriCopy(value) {
      const baseUrl = window.location.origin.replace('http', 'ws');
      return `${baseUrl}/chat${value}`;
    },
  },
};
