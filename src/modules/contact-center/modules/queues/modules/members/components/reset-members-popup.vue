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
          v-if="descriptionMainText"
          class="reset-members-popup--description-main"
        >
          {{ descriptionMainText }}
        </p>
        <p class="reset-members-popup--description-count">
          {{ descriptionCountText }}
        </p>
      </div>
    </template>
    <template #actions>
      <wt-button
        :disabled="isResetting"
        color="secondary"
        @click="cancel"
      >
        {{ $t(!!quantity ? 'reusable.cancel' : 'objects.ok') }}
      </wt-button>
      <wt-button
        v-if="!!quantity"
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
import { ActionOptions } from '../types/ActionOptions';

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
		quantity: {
			type: Number,
		},
		scope: {
			type: String,
			default: ActionOptions.All,
		},
	},
	data: () => ({
		isResetting: false,
	}),
	computed: {
		descriptionMainText() {
			if (!this.quantity) return '';
			if (this.scope === ActionOptions.Selected) {
				return this.$t(
					'objects.ccenter.members.resetMembers.descriptionSelected',
				);
			}
			return this.$t('objects.ccenter.members.resetMembers.description', {
				dateFrom: this.dateRange.from,
				dateTo: this.dateRange.to,
			});
		},
		descriptionCountText() {
			return this.$t(
				`objects.ccenter.members.resetMembers.${this.quantity ? 'descriptionCount' : 'emptyDescription'}`,
				{
					count: this.quantity,
				},
			);
		},
	},
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
