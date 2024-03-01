<template>
  <section>
    <header class="content-header">
      <wt-icon
        icon="web-chat"
        icon-prefix="messenger"
        size="sm"
      />
      <h3 class="content-title">
        {{ $t('objects.routing.chatGateways.webchat.appointment.appointment') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-switcher
        :label="$t('objects.enabled')"
        :value="itemInstance.metadata.appointment.enabled"
        :disabled="disableUserInput"
        @change="setAppointmentMetadata({ prop: 'enabled', value: $event })"
      />
      <div />
      <wt-select
        :clearable="false"
        :label="$tc('objects.ccenter.queues.queues', 1)"
        :search-method="searchQueues"
        :v="v.itemInstance.metadata.appointment.queue"
        :value="itemInstance.metadata.appointment.queue"
        :disabled="disableUserInput"
        @input="setAppointmentMetadata({ prop: 'queue', value: $event })"
      />
      <wt-select
        :clearable="false"
        :label="$tc('objects.lookups.communications.communications', 1)"
        :search-method="searchCommunications"
        :v="v.itemInstance.metadata.appointment.communicationType"
        :value="itemInstance.metadata.appointment.communicationType"
        :disabled="disableUserInput"
        @input="setAppointmentMetadata({ prop: 'communicationType', value: $event })"
      />
      <wt-select
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('vocabulary.duration')"
        :options="durationOptions"
        :v="v.itemInstance.metadata.appointment.duration"
        :value="duration"
        track-by="value"
        @input="setAppointmentMetadata({ prop: 'duration', value: $event.value })"
      />
      <wt-input
        :label="$t('objects.routing.chatGateways.webchat.appointment.availableAgents')"
        :number-min="1"
        :v="v.itemInstance.metadata.appointment.availableAgents"
        :value="itemInstance.metadata.appointment.availableAgents"
        :disabled="disableUserInput"
        type="number"
        @input="setAppointmentMetadata({ prop: 'availableAgents', value: $event })"
      />
      <wt-input
        :label="$t('objects.routing.chatGateways.webchat.appointment.days')"
        :number-max="7"
        :number-min="1"
        :v="v.itemInstance.metadata.appointment.days"
        :value="itemInstance.metadata.appointment.days"
        :disabled="disableUserInput"
        type="number"
        @input="setAppointmentMetadata({ prop: 'days', value: $event })"
      />
      <wt-switcher
        :label="$t('objects.routing.chatGateways.webchat.appointment.showMessageField')"
        :value="itemInstance.metadata.appointment.showMessageField"
        :disabled="disableUserInput"
        @change="setAppointmentMetadata({ prop: 'showMessageField', value: $event })"
      />
      <div class="success-settings">
        <span class="success-settings__title">
          {{ $t('objects.routing.chatGateways.webchat.appointment.resultPageText') }}
        </span>
        <wt-switcher
          :label="$t('objects.routing.chatGateways.webchat.appointment.showDefaultHeading')"
          :value="itemInstance.metadata.appointment.showDefaultHeading"
          :disabled="disableUserInput"
          @change="setAppointmentMetadata({ prop: 'showDefaultHeading', value: $event })"
        />
        <wt-textarea
          :disabled="itemInstance.metadata.appointment.showDefaultHeading || disableUserInput"
          :label="$t('objects.routing.chatGateways.webchat.appointment.headingText')"
          :value="itemInstance.metadata.appointment.successTitle"
          @input="handleInput({ prop: 'successTitle', value: $event })"
        />
        <wt-textarea
          :disabled="itemInstance.metadata.appointment.showDefaultHeading || disableUserInput"
          :label="$t('objects.routing.chatGateways.webchat.appointment.subheadingText')"
          :value="itemInstance.metadata.appointment.successSubtitle"
          @input="handleInput({ prop: 'successSubtitle', value: $event })"
        />
      </div>
      <wt-switcher
        :label="$t('objects.routing.chatGateways.webchat.appointment.showEmailField')"
        :value="itemInstance.metadata.appointment.showEmailField"
        :disabled="disableUserInput"
        @change="setAppointmentMetadata({ prop: 'showEmailField', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import QueuesAPI from '../../../../../../contact-center/modules/queues/api/queues';
import StatisticTimeList
  from '../../../../../../contact-center/modules/queues/store/_internals/lookups/StatisticTime.lookup';
import CommunicationsAPI from '../../../../../../lookups/modules/communications/api/communications';

export default {
  name: 'OpenedChatGatewayWebchatAppointmentTab',
  mixins: [openedTabComponentMixin],
  computed: {
    duration: {
      get() {
        return this.durationOptions.find((duration) => {
          return duration.value === this.itemInstance.metadata.appointment.duration;
        });
      },
      set(value) {
        this.setAppointmentMetadata({ prop: 'duration', value: value.value })
      },
    },
    durationOptions() {
      return StatisticTimeList.slice(0, 4).map((time) => ({
        value: `${time.value}m`,
        name: this.$t(`reusable.time.${time.name}`),
      }));
    },
  },
  methods: {
    ...mapActions({
      setAppointmentMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_WEBCHAT_APPOINTMENT_METADATA`, payload);
      },
    }),
    searchQueues: QueuesAPI.getLookup,
    searchCommunications: CommunicationsAPI.getLookup,
    handleInput({ prop, value }) {
      this.setAppointmentMetadata({ prop, value: value.trimStart().replace(/\s{2,}/g, ' ') });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../css/chat-gateways';

.success-settings {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  &__title {
    @extend %typo-heading-3;
  }
}
</style>
