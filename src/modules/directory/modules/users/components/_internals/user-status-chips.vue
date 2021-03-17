<template>
  <div class="user-status-chips">
    <wt-badge
      class="user-status-chips__chips"
      :color="isWeb ? 'main' : 'outline'"
    >Web</wt-badge>
    <wt-badge
      class="user-status-chips__chips"
      :color="isSip ? 'main' : 'outline'"
    >SIP</wt-badge>
    <wt-badge
      class="user-status-chips__chips"
      :color="isDlg ? 'main' : 'outline'"
    >Dlg</wt-badge>
    <wt-badge
      class="user-status-chips__chips"
      :color="isDnd ? 'main' : 'outline'"
    >DnD</wt-badge>
  </div>
</template>

<script>
export default {
  name: 'user-status-chips',
  props: {
    presence: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    status() {
      return this.presence.status || '';
    },
    isSip() {
      return this.status.includes('sip');
    },
    isWeb() {
      return this.status.includes('web');
    },
    isDnd() {
      return this.status.includes('dnd');
    },
    isDlg() {
      return this.status.includes('dlg');
    },
  },
};
</script>

<style lang="scss" scoped>
.user-status-chips {
  display: grid;
  grid-template-columns: repeat(4, 50px);
  grid-gap: 10px;
}

.user-status-chips__chips {
  text-align: center;
}
</style>
