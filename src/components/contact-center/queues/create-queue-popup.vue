<template>
  <wt-popup class="create-queue-popup" @close="close">
    <template slot="title">{{ $t('objects.ccenter.queues.newQueue') }}</template>

    <template slot="main">
      <ul class="popup-options">
        <li
            class="popup-options__item-wrap"
            v-for="(option, key) of options"
            :class="{'active': option === selected}"
            :key="key"
            @click="selectOption(option)"
        >
          <h4 class="popup-options__item-header">{{ option.title }}</h4>
          <wt-icon-btn
              icon="rounded-info"
              color="outline"
              :tooltip="option.description"
          ></wt-icon-btn>
        </li>
      </ul>
    </template>

    <template slot="actions">
      <wt-button
          :disabled="!selected"
          @click="createQueue"
      >{{ $t('objects.create') }}
      </wt-button>
      <wt-button
          color="secondary"
          @click="close"
      >{{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
export default {
  name: 'create-queue-popup',

  data: () => ({
    selected: null,
  }),

  computed: {
    options() {
      const outboundIVR = {
        value: 'outbound-ivr',
        title: this.$t('objects.ccenter.queues.outboundIVR'),
        description: this.$t('objects.ccenter.queues.outboundIVRDescription'),
      };
      const inbound = {
        value: 'inbound-queue',
        title: this.$t('objects.ccenter.queues.inboundQueue'),
        description: this.$t('objects.ccenter.queues.inboundQueueDescription'),
      };
      const offline = {
        value: 'offline-queue',
        title: this.$t('objects.ccenter.queues.offlineQueue'),
        description: this.$t('objects.ccenter.queues.offlineQueueDescription'),
      };
      const previewDialer = {
        value: 'preview-dialer',
        title: this.$t('objects.ccenter.queues.previewDialer'),
        description: this.$t('objects.ccenter.queues.previewDialerDescription'),
      };
      const progressiveDialer = {
        value: 'progressive-dialer',
        title: this.$t('objects.ccenter.queues.progressiveDialer'),
        description: this.$t('objects.ccenter.queues.progressiveDialerDescription'),
      };
      const predictiveDialer = {
        value: 'predictive-dialer',
        title: this.$t('objects.ccenter.queues.predictiveDialer'),
        description: this.$t('objects.ccenter.queues.predictiveDialerDescription'),
      };
      return [outboundIVR, inbound, offline, previewDialer, progressiveDialer, predictiveDialer];
    },
  },

  methods: {
    close() {
      this.$emit('close');
    },

    selectOption(option) {
      this.selected = option;
    },

    createQueue() {
      if (this.selected) {
        this.$router.push(`/contact-center/queues/${this.selected.value}/new`);
      }
    },

    isSelected(option) {
      return option === this.selected;
    },
  },

};
</script>

<style lang="scss" scoped>
.create-queue-popup {
  --min-popup-width: 600px;

  ::v-deep .wt-popup__popup {
    min-width: var(--min-popup-width);
  }
}

.popup-options {
  margin-top: 20px;
  padding-right: 10px;

  .popup-options__item-wrap {
    position: relative;
    display: flex;
    align-items: center;
    padding: 7px 10px;
    margin-bottom: 10px;
    border: 1px solid var(--form-border-color);
    border-radius: var(--border-radius);
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover, &.active {
      border-color: var(--main-accent-color);
    }

    .wt-icon-btn {
      margin-left: auto;

      ::v-deep .wt-tooltip {
        width: calc(var(--min-popup-width) * 0.75);
        top: 50%;
        right: calc(100% + 10px);
        left: auto;
        transform: translate(0, -50%);
      }
    }
  }

  .popup-options__item-header {
    @extend %typo-strong-md;
  }
}
</style>
