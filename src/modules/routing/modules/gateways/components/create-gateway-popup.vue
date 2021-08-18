<template>
  <selection-popup
    :title="$t('objects.routing.gateways.newGateway')"
    :selected="selected"
    :options="options"
    @change="selectOption"
    @select="createGateway"
    @close="close"
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
        description: this.$t('objects.routing.gateways.SIPregistrationsDescription'),
      };
      const trunking = {
        value: 'trunk',
        title: this.$t('objects.routing.gateways.SIPtrunking'),
        description: this.$t('objects.routing.gateways.SIPtrunkingDescription'),
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
