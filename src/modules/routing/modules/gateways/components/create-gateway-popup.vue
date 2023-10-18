<template>
  <selection-popup
    :options="options"
    :selected="selected"
    :title="$t('objects.routing.gateways.newGateway')"
    @change="selectOption"
    @close="close"
    @select="createGateway"
  ></selection-popup>
</template>

<script>
import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup.vue';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'create-gateway-popup',
  components: { SelectionPopup },
  data: () => ({
    selected: null,
  }),

  created() {
    this.selectOption(this.options[0]);
  },

  computed: {
    options() {
      const register = {
        value: 'reg',
        title: this.$t('objects.routing.gateways.SIPregistrations'),
        usage: this.$t('objects.routing.gateways.SIPregistrationsDescription'),
      };
      const trunking = {
        value: 'trunk',
        title: this.$t('objects.routing.gateways.SIPtrunking'),
        usage: this.$t('objects.routing.gateways.SIPtrunkingDescription'),
      };
      return [register, trunking];
    },
  },

  methods: {
    selectOption(option) {
      this.selected = option;
    },
    createGateway() {
      if (this.selected) {
        this.$router.push({ name: `${RouteNames.GATEWAYS}-${this.selected.value}-new` });
      }
    },
    close() {
      this.$emit('close');
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
