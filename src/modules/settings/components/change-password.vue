<template>
  <article class="change-password">
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('settings.changePassword') }}
      </h3>
    </header>
    <form @submit="changePassword">
      <user-password-input
        :model-value="newPassword"
        :label="$t('auth.password')"
        @update:model-value="newPassword = $event"
      />
      <wt-input
        v-model="confirmNewPassword"
        :label="$t('auth.confirmPassword')"
        :v="v$.confirmNewPassword"
        type="password"
      />
      <wt-button
        :disabled="v$.$invalid"
        :loading="isPasswordPatching"
        type="submit"
        @click.prevent="changePassword"
      >
        {{ $t('objects.save') }}
      </wt-button>
    </form>
  </article>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, sameAs } from '@vuelidate/validators';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { computed, inject, ref } from 'vue';
import { useStore } from 'vuex';
import UserPasswordInput from '../../../app/components/utils/user-password-input.vue';
import { changePassword as requestChangePassword } from '../api/settings';

const $eventBus = inject('$eventBus');

const store = useStore();

const userId = computed(() => getNamespacedState(store.state, 'userinfo').userId);

const isPasswordPatching = ref(false);
const newPassword = ref('');
const confirmNewPassword = ref('');

const v$ = useVuelidate(
  computed(() => ({
    confirmNewPassword: {
      sameAs: sameAs(newPassword),
    },
  })),
  { newPassword, confirmNewPassword },
  { $autoDirty: true },
);

async function changePassword() {
  try {
    isPasswordPatching.value = true;
    const changes = {
      password: newPassword.value,
    };
    await requestChangePassword({
      id: userId.value,
      changes,
    });
    $eventBus.$emit('notification', {
      type: 'success',
      text: 'Password is successfully updated!',
    });
  } finally {
    isPasswordPatching.value = false;
  }
}
</script>

<style lang="scss" scoped>
.change-password {

}
</style>
