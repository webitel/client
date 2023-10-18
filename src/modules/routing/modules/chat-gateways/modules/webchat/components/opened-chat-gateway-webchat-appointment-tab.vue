<template>
  <section>
    <header class="content-header">
      <wt-icon icon="web-chat" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat.appointment.appointment') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-switcher
        :label="$t('objects.enabled')"
        :value="itemInstance.metadata.appointment.enabled"
        @change="setAppointmentMetadata({ prop: 'enabled', value: $event })"
      ></wt-switcher>
      <div></div>
      <wt-select
        :clearable="false"
        :label="$tc('objects.ccenter.queues.queues', 1)"
        :search-method="searchQueues"
        :v="v.itemInstance.metadata.appointment.queue"
        :value="itemInstance.metadata.appointment.queue"
        @input="setAppointmentMetadata({ prop: 'queue', value: $event })"
      ></wt-select>
      <wt-select
        :clearable="false"
        :label="$tc('objects.lookups.communications.communications', 1)"
        :search-method="searchCommunications"
        :v="v.itemInstance.metadata.appointment.communicationType"
        :value="itemInstance.metadata.appointment.communicationType"
        @input="setAppointmentMetadata({ prop: 'communicationType', value: $event })"
      ></wt-select>
      <wt-select
        :clearable="false"
        :label="$t('vocabulary.duration')"
        :options="durationOptions"
        :track-by="null"
        :v="v.itemInstance.metadata.appointment.duration"
        :value="itemInstance.metadata.appointment.duration"
        @input="setAppointmentMetadata({ prop: 'duration', value: $event })"
      ></wt-select>
      <wt-input
        :label="$t('objects.routing.chatGateways.webchat.appointment.availableAgents')"
        :number-min="1"
        :v="v.itemInstance.metadata.appointment.availableAgents"
        :value="itemInstance.metadata.appointment.availableAgents"
        type="number"
        @input="setAppointmentMetadata({ prop: 'availableAgents', value: $event })"
      ></wt-input>
      <wt-input
        :label="$t('objects.routing.chatGateways.webchat.appointment.days')"
        :number-max="7"
        :number-min="1"
        :v="v.itemInstance.metadata.appointment.days"
        :value="itemInstance.metadata.appointment.days"
        type="number"
        @input="setAppointmentMetadata({ prop: 'days', value: $event })"
      ></wt-input>
      <wt-switcher
        :label="$t('objects.routing.chatGateways.webchat.appointment.showMessageField')"
        :value="itemInstance.metadata.appointment.showMessageField"
        @change="setAppointmentMetadata({ prop: 'showMessageField', value: $event })"
      ></wt-switcher>
      <div class="success-settings">
       <span class="success-settings__title">
         {{ $t('objects.routing.chatGateways.webchat.appointment.resultPageText') }}
       </span>
        <wt-switcher
          :label="$t('objects.routing.chatGateways.webchat.appointment.showDefaultHeading')"
          :value="itemInstance.metadata.appointment.showDefaultHeading"
          @change="setAppointmentMetadata({ prop: 'showDefaultHeading', value: $event })"
        ></wt-switcher>
        <wt-textarea
          :disabled="itemInstance.metadata.appointment.showDefaultHeading"
          :label="$t('objects.routing.chatGateways.webchat.appointment.headingText')"
          :value="itemInstance.metadata.appointment.successTitle"
          @input="handleInput({ prop: 'successTitle', value: $event })"
        ></wt-textarea>
        <wt-textarea
          :disabled="itemInstance.metadata.appointment.showDefaultHeading"
          :label="$t('objects.routing.chatGateways.webchat.appointment.subheadingText')"
          :value="itemInstance.metadata.appointment.successSubtitle"
          @input="handleInput({ prop: 'successSubtitle', value: $event })"
        ></wt-textarea>
      </div>
      <wt-switcher
        :label="$t('objects.routing.chatGateways.webchat.appointment.showEmailField')"
        :value="itemInstance.metadata.appointment.showEmailField"
        @change="setAppointmentMetadata({ prop: 'showEmailField', value: $event })"
      ></wt-switcher>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import QueuesAPI from '../../../../../../contact-center/modules/queues/api/queues';
import CommunicationsAPI from '../../../../../../lookups/modules/communications/api/communications';

export default {
  name: 'opened-chat-gateway-webchat-appointment-tab',
  mixins: [openedTabComponentMixin],
  data: () => ({
    durationOptions: ['15m', '30m', '45m', '60m'],
  }),
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
