<template>
  <wt-popup
    overflow
    width="480"
    @close="close"
  >
    <template #title>
      {{ item ? t('reusable.edit') : t('reusable.new') }}
      {{ t('objects.system.globalVariables.globalVariables', 1).toLowerCase() }}
    </template>
    <template #main>
      {{ props.item }}
      <wt-input
        v-model="draft.name"
        :v="v$.draft.name"
        :clearable="false"
        :label="t('objects.key')"
        required
      />
      isSwitcherOn: {{ isSwitcherOn }} inputType: {{ inputType }}
      <wt-input
        v-model="draft.value"
        :v="v$.draft.value"
        :clearable="false"
        :label="t('vocabulary.values', 1)"
        required
      />
      <wt-switcher
        :value="draft.encrypt"
        :disabled="isSwitcherOn"
        :label="t('objects.system.globalVariables.encrypted')"
        @change="draft.encrypt = $event"
      />
    </template>
    <template #actions>
      <wt-button
        :disabled="v$.$invalid"
        :loading="isLoading"
        @click="save"
      >
        {{ t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>

import { computed, onBeforeMount, onUpdated, reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import GlobalVariablesAPI from '../api/global-variables';

const { t } = useI18n();
const store = useStore();

const props = defineProps({
  item: {
      // if item is passed, that's an edit
      type: [Object, null],
    },
    namespace: {
      type: String,
      required: true,
    },
});

const emit = defineEmits(['close']);

const isLoading = ref(false);
const isSaving = ref(false);
const inputType = ref(null);

const getDefaultDraft = () => ({
  name: '',
  value: '',
  encrypt: false,
});

const draft = reactive(getDefaultDraft());

const isSwitcherOn = computed(() => {
  return props.item ? !!props.item.encrypt : false;
});

// const inputType = computed(() => {
//   console.log('isSwitcherOn:', isSwitcherOn)
//   return isSwitcherOn ? 'password' : 'text';
// });

const v$ = useVuelidate(computed(() => {
  return {
    draft: {
      name: { required },
      value: { required },
    },
  };
}), { draft }, { $autoDirty: true });

function initDraft() {
  draft.name = props.item.name;
  draft.value = props.item.value;
  draft.encrypt = props.item.encrypt || false;
}

v$.value.$touch();

if (props.item) initDraft();

// inputType.value = isSwitcherOn ? 'password' : 'text';

async function save() {
  try {
    isSaving.value = true;
    if (props.item) {
      console.log('draft:', draft);
      await updateItem(draft);
    } else {
      await addItem(draft);
    }
    close();
  } finally {
    isSaving.value = false;
  }
}

function addItem(item) {
  console.log('addItem item:', item);
  return GlobalVariablesAPI.add({ itemInstance: item });
}

function updateItem(item) {
  return GlobalVariablesAPI.update({
    itemInstance: item,
    itemId: props.item.id
  });
}

function close() {
  emit('close');
}

</script>

<style>

</style>
