<template>
  <wt-popup
    class="reset-members-popup"
    min-width="480"
    @close="close"
  >
    <template slot="title">{{ $t('objects.ccenter.members.resetMembers.resetMembers') }}</template>
    <template v-slot:main>
      <p>
        {{ $t('objects.ccenter.members.resetMembers.description') }}
      </p>
    </template>
    <template slot="actions">
      <wt-button
        color="secondary"
        :disabled="isResetting"
        @click="cancel"
      >{{ $t('reusable.cancel') }}
      </wt-button>
      <wt-button
        color="danger"
        :loading="isResetting"
        @click="confirm"
      >{{ $t('objects.ccenter.members.resetMembers.reset') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
export default {
  name: 'reset-members-popup',
  props: {
    callback: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    isResetting: false,
  }),
  computed: {
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
          type: 'info',
          text: this.$t('objects.ccenter.members.resetMembers.successResetCount', { count }),
        });
      } catch (err) {
        throw err;
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

</style>
