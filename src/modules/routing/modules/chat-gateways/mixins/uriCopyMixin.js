import CopyInput from '../../../../../app/components/utils/copy-input.vue';

export default {
  components: { CopyInput },
  methods: {
    modifyUriCopy(value) {
      const baseUrl = window.location.origin;
      return `${baseUrl}/chat${value}`;
    },
  },
};
