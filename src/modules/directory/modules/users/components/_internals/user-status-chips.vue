<template>
  <div class="user-status-chips">
    <wt-chip
      :color="isWeb ? 'main' : 'secondary'"
      class="user-status-chips__chips"
    >Web
    </wt-chip>
    <wt-chip
      :color="isSip ? 'main' : 'secondary'"
      class="user-status-chips__chips"
    >SIP
    </wt-chip>
    <wt-chip
      :color="isDlg ? 'main' : 'secondary'"
      class="user-status-chips__chips"
    >Dlg
    </wt-chip>
    <wt-chip
      :color="isDnd ? 'main' : 'secondary'"
      class="user-status-chips__chips"
    >DnD
    </wt-chip>
  </div>
</template>

<script>
export default {
	name: 'UserStatusChips',
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
  grid-template-columns: repeat(4, 70px);
  grid-gap: 10px;
}

.user-status-chips__chips {
  justify-content: center;
}
</style>
