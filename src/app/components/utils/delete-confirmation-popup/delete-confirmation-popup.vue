<template>
  <wt-popup
    class="delete-confirmation-popup"
    min-width="480"
    @close="close"
  >
    <template slot="title">{{ $t('objects.deleteConfirmation.title') }}</template>
    <template v-slot:main>
      <p>
        {{ deleteMessage }}
        {{ $t('objects.deleteConfirmation.undoneActionAlert') }}
      </p>
    </template>
    <template slot="actions">
      <wt-button
        color="secondary"
        :disabled="isDeleting"
        @click="cancel"
      >{{ $t('reusable.cancel') }}
      </wt-button>
      <wt-button
        color="danger"
        :loading="isDeleting"
        @click="confirm"
      >{{ $t('reusable.delete') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
export default {
  name: 'delete-confirmation-popup',
  props: {
    payload: {
      type: Object,
      default: () => ({
        deleteCount: 1,
      }),
    },
  },
  data: () => ({
    isDeleting: false,
  }),
  computed: {
    deleteMessage() {
      if (this.payload.deleteCount === 0) {
        return this.$tc(
          'objects.deleteConfirmation.askingAlert',
          2,
          null,
          { count: this.$t('objects.deleteConfirmation.deleteAll') },
        );
      }
      return this.$tc(
        'objects.deleteConfirmation.askingAlert',
        this.payload.deleteCount === 1 ? 1 : 2,
        null,
        { count: this.payload.deleteCount },
      );
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async confirm() {
      try {
        this.isDeleting = true;
        this.$emit('confirm');
        await this.payload.callback();
      } catch (err) {
        throw err;
      } finally {
        this.isDeleting = false;
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
