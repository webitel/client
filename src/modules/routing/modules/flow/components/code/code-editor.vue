<template>
  <div class="code-editor">
    <wt-label>{{ label }}</wt-label>
    <div
      :class="{ 'code-editor__wrapper--fullscreen': isFullscreen }"
      class="code-editor__wrapper"
    >
      <div
        ref="container"
        class="code-editor__editor"
      />
      <wt-icon-btn
        v-tooltip="t(isFullscreen ? 'iconHints.collapse' : 'iconHints.expand')"
        :icon="isFullscreen ? 'collapse' : 'expand'"
        :size="isFullscreen ? 'xl' : 'md'"
        class="code-editor__fullscreen-btn"
        @click="toggleFullscreen"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { editor, type IDisposable, languages } from 'monaco-editor';
import { storeToRefs } from 'pinia';
import {
	onMounted,
	onUnmounted,
	ref,
	shallowRef,
	useTemplateRef,
	watch,
	watchEffect,
} from 'vue';
import { useI18n } from 'vue-i18n';

import { useAppearanceStore } from '../../../../../appearance/store/appearanceStore';
import type { FlowAppAutocompleteItem } from '../../configs/flowAppAutocomplete';

const model = defineModel<string>();

const props = withDefaults(
	defineProps<{
		label?: string;
		autocomplete?: FlowAppAutocompleteItem[];
		disabled?: boolean;
	}>(),
	{
		label: '',
		autocomplete: () => [],
		disabled: false,
	},
);

const { t } = useI18n();

const appearanceStore = useAppearanceStore();
const { darkMode } = storeToRefs(appearanceStore);

const container = useTemplateRef<HTMLElement>('container');
const instance = shallowRef<editor.IStandaloneCodeEditor>();
const isFullscreen = ref(false);
let completionProvider: IDisposable | undefined;

const createEditor = (element: HTMLElement) => {
	instance.value = editor.create(element, {
		value: model.value || '[]',
		language: 'json',
		automaticLayout: true,
	});
	instance.value.onDidChangeModelContent(() => {
		model.value = instance.value?.getValue();
	});
};

const registerAutocomplete = () =>
	languages.registerCompletionItemProvider('json', {
		provideCompletionItems: (textModel, position) => {
			const { startColumn, endColumn } =
				textModel.getWordUntilPosition(position);
			const range = {
				startLineNumber: position.lineNumber,
				endLineNumber: position.lineNumber,
				startColumn,
				endColumn,
			};
			return {
				suggestions: props.autocomplete.map(
					({ label, documentation, insertText }) => ({
						label,
						documentation,
						range,
						kind: languages.CompletionItemKind.Function,
						insertText: JSON.stringify(insertText, null, 4),
					}),
				),
			};
		},
	});

onMounted(() => {
	if (!container.value) return;
	createEditor(container.value);
	completionProvider = registerAutocomplete();
});

onUnmounted(() => {
	instance.value?.dispose();
	completionProvider?.dispose();
});

// [Claude] outside edits (a reload, a reset) only; the editor's own typing already matches
watch(model, (value = '') => {
	if (value !== instance.value?.getValue()) instance.value?.setValue(value);
});

watchEffect(() => {
	instance.value?.updateOptions({
		readOnly: props.disabled,
		fontSize: isFullscreen.value ? 16 : 14,
	});
});

// [Claude] the theme is global to monaco: one call restyles every editor on the page
watchEffect(() => {
	editor.setTheme(darkMode.value ? 'vs-dark' : 'vs');
});

const toggleFullscreen = () => {
	isFullscreen.value = !isFullscreen.value;
};
</script>

<style scoped>
.code-editor__wrapper {
  position: relative;
  height: 480px;
}

.code-editor__wrapper--fullscreen {
  position: fixed;
  z-index: 1000;
  inset: 0;
  height: auto;
}

.code-editor__editor {
  height: 100%;
  border: 1px solid var(--secondary-color-50);
  border-radius: var(--border-radius);
}

.code-editor__fullscreen-btn {
  position: absolute;
  z-index: 10;
  top: 0;
  right: var(--spacing-sm); /* clears monaco's vertical scrollbar */
}
</style>
