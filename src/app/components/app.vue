<template>
  <router-view
    :class="locale /* root element class to control fonts on each locale */"
    v-if="userId"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, provide } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useUserinfoStore } from '../../modules/userinfo/userinfoStore';
import {createUserAccessControl} from "../composables/useUserAccessControl";

const store = useStore();
const { locale } = useI18n();

const darkMode = computed(() => store.getters['appearance/DARK_MODE']);

provide('darkMode', darkMode);

const userinfoStore = useUserinfoStore();
createUserAccessControl(useUserinfoStore);

const userId = storeToRefs(userinfoStore);
const { initialize } = userinfoStore;

initialize();
</script>

<style>

</style>
