<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('vocabulary.host')"
        :v="v.itemInstance.host"
        :value="itemInstance.host"
        required
        @input="setItemProp({ prop: 'host', value: $event })"
      ></wt-input>
      <wt-select
        :clearable="false"
        :disabled="disableUserInput"
        :label="$tc('objects.routing.flow.flow', 1)"
        :search-method="loadFlows"
        :v="v.itemInstance.schema"
        :value="itemInstance.schema"
        required
        @input="setItemProp({ prop: 'schema', value: $event })"
      ></wt-select>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('vocabulary.login')"
        :v="v.itemInstance.login"
        :value="itemInstance.login"
        required
        @input="setItemProp({ prop: 'login', value: $event })"
      ></wt-input>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.mailbox')"
        :v="v.itemInstance.mailbox"
        :value="itemInstance.mailbox"
        required
        @input="setItemProp({ prop: 'mailbox', value: $event })"
      ></wt-input>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.imapPort')"
        :number-max="65535"
        :number-min="0"
        :v="v.itemInstance.imapPort"
        :value="itemInstance.imapPort"
        required
        type="number"
        @input="setItemProp({ prop: 'imapPort', value: $event })"
      ></wt-input>
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.emailProfiles.smtpPort')"
        :number-max="65535"
        :number-min="0"
        :v="v.itemInstance.smtpPort"
        :value="itemInstance.smtpPort"
        required
        type="number"
        @input="setItemProp({ prop: 'smtpPort', value: $event })"
      ></wt-input>
      <wt-input
        :disabled="disableUserInput"
        :value="itemInstance.password"
        :label="$t('objects.password')"
        @input="setItemProp({ prop: 'password', value: $event })"
      ></wt-input>
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :value="itemInstance.description"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../../routing/modules/flow/api/flow';

export default {
  name: 'opened-email-profile-general',
  mixins: [openedTabComponentMixin],
  data: () => ({}),
  methods: {
    loadFlows(params) {
      return FlowsAPI.getLookup(params);
    },
  },
};
</script>

<style scoped>

</style>
