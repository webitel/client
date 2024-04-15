<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :value="itemInstance.name"
        @input="setItemProp({ prop: 'name', value: $event })"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.login')"
        :v="v.itemInstance.username"
        :value="itemInstance.username"
        required
        @input="setItemProp({ prop: 'username', value: $event })"
      />

      <generate-value-input
        :label="$t('objects.password')"
        :label-props="{ hint: $t('objects.directory.passwordInfo'), hintPosition: 'right' }"
        :placeholder="$t('objects.password')"
        :disabled="disableUserInput"
        :v="v.itemInstance.password"
        :value="itemInstance.password"
        required
        @input="setItemProp({ prop: 'password', value: $event })"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.directory.users.extensions')"
        :value="itemInstance.extension"
        @input="setItemProp({ prop: 'extension', value: $event })"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.email')"
        :value="itemInstance.email"
        @input="setItemProp({ prop: 'email', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import GenerateValueInput from '../../../../../app/components/utils/generate-value-input.vue';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedUserGeneral',
  components: { GenerateValueInput },
  mixins: [openedTabComponentMixin],
};
</script>

<style lang="scss" scoped>
</style>
