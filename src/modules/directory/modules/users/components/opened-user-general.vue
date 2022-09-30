<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.email"
        :label="$t('objects.email')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'email', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.username"
        :v="v.itemInstance.username"
        :label="$t('objects.directory.users.login')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'username', value: $event })"
      ></wt-input>

      <password-input
        :value="itemInstance.password"
        :v="v.itemInstance.password"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'password', value: $event })"
      ></password-input>

      <wt-input
        :value="itemInstance.extension"
        :label="$t('objects.directory.users.extensions')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'extension', value: $event })"
      ></wt-input>
    </div>
  </section>
</template>

<script>
import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-user-general',
  mixins: [openedTabComponentMixin],
  components: { PasswordInput },
};
</script>

<style lang="scss" scoped>
</style>
