<template>
  <wt-popup
    class="reset-members-popup"
    size="sm"
    min-width="480"
    @close="close"
  >
    <template #title>
      {{ $t('objects.ccenter.members.resetMembers.resetMembers') }}
    </template>
    <template #main>
      <div class="reset-members-popup--description">
        <p
          v-if="!!membersQuantity"
          class="reset-members-popup--description-main"
        >
          {{ $t('objects.ccenter.members.resetMembers.description', {
            dateFrom: dateRange.from,
            dateTo: dateRange.to
          }) }}
        </p>
        <p
          class="reset-members-popup--description-count"
        >
          {{ $t(`objects.ccenter.members.resetMembers.${!!membersQuantity ? 'descriptionCount' : 'emptyDescription'}`, {
            count: membersQuantity
          }) }}
        </p>
      </div>
    </template>
    <template #actions>
      <wt-button
        :disabled="isResetting"
        color="secondary"
        @click="cancel"
      >
        {{ $t(!!membersQuantity ? 'reusable.cancel' : 'objects.ok') }}
      </wt-button>
      <wt-button
        v-if="!!membersQuantity"
        :loading="isResetting"
        color="error"
        @click="confirm"
      >
        {{ $t('objects.ccenter.members.resetMembers.reset') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
export default {
	name: 'ResetMembersPopup',
	inject: [
		'$eventBus',
	],
	props: {
		callback: {
			type: Function,
			required: true,
		},
		dateRange: {
			type: Object,
		},
		membersQuantity: {
			type: Number,
		},
	},
	data: () => ({
		isResetting: false,
	}),
	computed: {},
	methods: {
		close() {
			this.$emit('close');
		},
		async confirm() {
			try {
				this.isResetting = true;
				const response = await this.callback();
				const { count = 0 } = response;
				this.$eventBus.$emit('notification', {
					type: 'success',
					text: this.$t(
						'objects.ccenter.members.resetMembers.successResetCount',
						{
							count,
						},
					),
				});
			} finally {
				this.isResetting = false;
				this.close();
			}
		},
		cancel() {
			this.$emit('cancel');
			this.close();
		},
	},
};
</script>

<style scoped>
.reset-members-popup--description {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin: var(--spacing-md) 0;
  white-space: pre-line;
  text-align: center;
}
</style>
