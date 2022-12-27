<template>
  <section>
    <header class="content-header">
      <wt-icon icon="web-chat" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat.appointment.appointment') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-switcher
        :value="itemInstance.metadata.appointment.enabled"
        :label="$t('objects.enabled')"
        @change="setAppointmentMetadata({ prop: 'enabled', value: $event })"
      ></wt-switcher>
      <div></div>
      <wt-select
        :value="itemInstance.metadata.appointment.queue"
        :label="$tc('objects.ccenter.queues.queues', 1)"
        :clearable="false"
        :v="v.itemInstance.metadata.appointment.queue"
        :search-method="searchQueues"
        @input="setAppointmentMetadata({ prop: 'queue', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.metadata.appointment.communicationType"
        :label="$tc('objects.lookups.communications.communications', 1)"
        :clearable="false"
        :v="v.itemInstance.metadata.appointment.communicationType"
        :search-method="searchCommunications"
        @input="setAppointmentMetadata({ prop: 'communicationType', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.metadata.appointment.duration"
        :label="$t('vocabulary.duration')"
        :clearable="false"
        :v="v.itemInstance.metadata.appointment.duration"
        :options="durationOptions"
        :track-by="null"
        @input="setAppointmentMetadata({ prop: 'duration', value: $event })"
      ></wt-select>
      <wt-input
        :value="itemInstance.metadata.appointment.days"
        :v="v.itemInstance.metadata.appointment.days"
        :label="$t('objects.routing.chatGateways.webchat.appointment.days')"
        type="number"
        :number-min="1"
        :number-max="7"
        @input="setAppointmentMetadata({ prop: 'days', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.metadata.appointment.availableAgents"
        :v="v.itemInstance.metadata.appointment.availableAgents"
        :label="$t('objects.routing.chatGateways.webchat.appointment.availableAgents')"
        type="number"
        :number-min="1"
        @input="setAppointmentMetadata({ prop: 'availableAgents', value: $event })"
      ></wt-input>
      <wt-switcher
        :value="itemInstance.metadata.appointment.showMessageField"
        :label="$t('objects.routing.chatGateways.webchat.appointment.showMessageField')"
        @change="setAppointmentMetadata({ prop: 'showMessageField', value: $event })"
      ></wt-switcher>
      <wt-textarea
        :value="itemInstance.metadata.appointment.successMessage"
        :label="$t('objects.routing.chatGateways.webchat.appointment.successMessage')"
        @input="setAppointmentMetadata({ prop: 'successMessage', value: $event })"
      ></wt-textarea>
      <wt-switcher
        :value="itemInstance.metadata.appointment.showEmailField"
        :label="$t('objects.routing.chatGateways.webchat.appointment.showEmailField')"
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
  },
};
</script>

<style lang="scss" scoped>
@import '../../../css/chat-gateways';

</style>
