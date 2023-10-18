<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :value="itemInstance.name"
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.login')"
        :v="v.itemInstance.username"
        :value="itemInstance.username"
        required
        @input="setItemProp({ prop: 'username', value: $event })"
      ></wt-input>

      <password-input
        :disabled="disableUserInput"
        :v="v.itemInstance.password"
        :value="itemInstance.password"
        required
        @input="setItemProp({ prop: 'password', value: $event })"
      ></password-input>

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.extensions')"
        :value="itemInstance.extension"
        @input="setItemProp({ prop: 'extension', value: $event })"
      ></wt-input>

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.email')"
        :value="itemInstance.email"
        @input="setItemProp({ prop: 'email', value: $event })"
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
