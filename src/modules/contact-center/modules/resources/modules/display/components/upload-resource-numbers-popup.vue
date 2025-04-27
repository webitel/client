<template>
  <wt-popup
    v-bind="$attrs"
    :shown="file"
    class="upload-popup"
    @close="close"
  >
    <template #title>
      Імпорт номерів
    </template>

    <template #main>
      <form class="upload-popup-form__form">
        <wt-input
          v-model="separator"
          :v="v$.separator"
          label="Роздільник"
          placeholder="Наприклад ; або ,"
        />

        <wt-select
          v-if="columns.length"
          v-model="selectedColumn"
          :v="v$.selectedColumn"
          :options="columns"
          label="Колонка номерів"
        />
      </form>

      <section class="upload-popup-form__preview-section">
        <wt-loader v-if="isLoading" />

        <wt-table
          v-else-if="previewRows.length && !parseError"
          :data="previewRows"
          :headers="csvTableHeaders"
          :grid-actions="false"
          :selectable="false"
          class="upload-popup-form__file-preview"
        />

        <article
          v-else-if="parseError"
          class="upload-popup-form__error-stack-trace"
        >
          {{ parseError }}
        </article>
      </section>
    </template>

    <template #actions>
      <wt-button
        :disabled="!selectedColumn || v$.$invalid"
        @click="upload"
      >
        Завантажити
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        Закрити
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import debounce from '@webitel/ui-sdk/src/scripts/debounce';
import { parse } from 'csv-parse/browser/esm/sync'; // або твоя обгортка parseCSV
import { computed, ref, watch } from 'vue';

// ---- Props
const props = defineProps({
  file: { type: File, required: true },
  parentId: { type: [String, Number], required: true },
});

// ---- Emits
const emit = defineEmits(['close']);

// ---- State
const separator = ref(';');
const selectedColumn = ref('');
const columns = ref([]);
const csvRows = ref([]);
const parseError = ref('');
const isLoading = ref(false);

// ---- Vuelidate
const rules = {
  separator: { required },
  selectedColumn: { required },
};
const v$ = useVuelidate(rules, { separator, selectedColumn });

// ---- Computed
const previewRows = computed(() => csvRows.value.slice(0, 100));

const csvTableHeaders = computed(() => {
  if (!previewRows.value.length) return [];
  return Object.keys(previewRows.value[0]).map(key => ({
    text: key,
    value: key,
  }));
});

// ---- Methods
async function processCsvFile(file) {
  isLoading.value = true;
  parseError.value = '';

  try {
    const text = await file.text();

    const firstLine = text.split('\n')[0];
    const headerRecord = parse(firstLine, {
      delimiter: separator.value,
    });

    const headers = headerRecord[0] || [];

    if (headers.length < 2) {
      throw new Error('Невірний роздільник або файл має замало колонок.');
    }

    columns.value = headers.map(header => ({
      id: header,
      name: header,
    }));

    if (!selectedColumn.value) {
      selectedColumn.value = columns.value[0]?.value || '';
    }

    const fullRecords = parse(text, {
      delimiter: separator.value,
      columns: true,
      skip_empty_lines: true,
    });

    csvRows.value = fullRecords;
  } catch (e) {
    parseError.value = e.message || 'Не вдалося прочитати CSV файл.';
    csvRows.value = [];
    columns.value = [];
    selectedColumn.value = '';
  } finally {
    isLoading.value = false;
  }
}

async function upload() {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }

  // --- Перевірка на заповненість номерів
  const invalidRows = csvRows.value.filter(row => {
    const number = row[selectedColumn.value.name.toLowerCase()];
    return !number || number.trim() === '';
  });


  if (invalidRows.length > 0) {
    alert(`Помилка: знайдено ${invalidRows.length} рядків без номера. Заповніть всі рядки перед завантаженням.`);
    return;
  }

  // --- Якщо все ок
  const formData = new FormData();
  formData.append('file', props.file);
  formData.append('delimiter', separator.value);
  formData.append('map', selectedColumn.value);

  try {
    await axios.post(
      `https://dev.webitel.com/api/displays/${props.parentId}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    close();
  } catch (error) {
    console.error('Помилка при відправці файлу:', error);
    alert('Сталася помилка при відправці!');
  }
}


function close() {
  emit('close');
}

// ---- Watchers
watch(
  () => props.file,
  async (newFile) => {
    if (newFile) await processCsvFile(newFile);
  },
  { immediate: true }
);

watch(
  separator,
  debounce(async () => {
    if (props.file) await processCsvFile(props.file);
  }, 300)
);
</script>

<style scoped>
.upload-popup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.upload-popup-form__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.upload-popup-form__file-preview {
  margin-top: 1rem;
}
.upload-popup-form__error-stack-trace {
  color: red;
  padding: 1rem;
  background-color: #ffe0e0;
  border-radius: 4px;
  margin-top: 1rem;
}
</style>
