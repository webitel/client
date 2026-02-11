<template>
  <div class="code-editor">
    <wt-label>{{ label }}</wt-label>
    <div
      :class="{ 'code-editor__wrapper--fullscreen': isFullscreen }"
      class="code-editor__wrapper"
    >
      <div
        ref="editor"
        class="code-editor__editor"
      />

      <div class="code-editor__fullscreen-btn">
        <wt-icon-btn
          v-tooltip="fullscreenIconTooltip"
          :icon="fullscreenIcon"
          :size="fullscreenIconSize"
          @click="toggleFullscreen"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { editor, languages } from 'monaco-editor';
import { markRaw } from 'vue';
import { mapState } from 'vuex';

// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html

const defaultSizeConfig = {
	fontSize: '14px',
};

const fullscreenSizeConfig = {
	fontSize: '16px',
};

const config = {
	...defaultSizeConfig,
	language: 'json',
	wordWrap: 'off',
	autoClosingQuotes: true,
	autoClosingBrackets: true,
	automaticLayout: true,
	autoIndent: true,
	horizontal: 'scroll',
	readOnly: false,
};

let autocompleteDisposed = null;

export default {
	name: 'CodeEditor',
	model: {
		event: 'change',
	},
	props: {
		value: {
			type: [
				Array,
				Object,
				String,
			],
			required: true,
		},
		options: Object,
		label: {
			type: String,
			default: '',
		},
		autocomplete: {
			type: Array,
			default: () => [],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		editor: '',
		isFullscreen: false,
	}),
	computed: {
		...mapState('appearance', {
			theme: (state) => state.theme,
		}),
		fullscreenIcon() {
			return this.isFullscreen ? 'collapse' : 'expand';
		},
		fullscreenIconSize() {
			return this.isFullscreen ? 'xl' : 'md';
		},
		fullscreenIconTooltip() {
			return this.isFullscreen
				? this.$t('iconHints.collapse')
				: this.$t('iconHints.expand');
		},
	},
	watch: {
		value(value) {
			if (this.editor) {
				if (value !== this.editor.getValue()) {
					this.editor.setValue(value);
				}
			}
		},
		theme: {
			handler() {
				this.theme === 'dark'
					? editor.setTheme('vs-dark')
					: editor.setTheme('vs');
			},
			immediate: true,
		},
	},
	mounted() {
		this.initEditor();
	},
	unmounted() {
		this.editor.dispose();
		autocompleteDisposed.dispose();
	},
	methods: {
		initEditor() {
			this.handleDisabled();
			config.value = this.value || '[]';
			// https://twitter.com/xanf_ua/status/1607423628387438593
			this.editor = markRaw(editor.create(this.$refs.editor, config));
			this.editor.onDidChangeModelContent((event) => {
				const value = this.editor.getValue();
				if (this.value !== value) {
					this.$emit('change', value, event);
				}
			});

			this.editor.onDidChangeModelDecorations((event) => {
				this.checkSyntaxError();
			});

			this.setupAutocomplete();
		},
		setupAutocomplete() {
			autocompleteDisposed = languages.registerCompletionItemProvider('json', {
				provideCompletionItems: (model, position) => {
					const word = model.getWordUntilPosition(position);
					const range = {
						startLineNumber: position.lineNumber,
						startColumn: word.startColumn,
						endLineNumber: position.lineNumber,
						endColumn: word.endColumn,
					};
					return {
						suggestions: this.autocomplete.map(
							({ label, documentation, insertText }) => ({
								label,
								range,
								kind: languages.CompletionItemKind.Function,
								documentation,
								insertText: JSON.stringify(insertText, null, 4),
							}),
						),
					};
				},
			});
		},
		toggleFullscreen() {
			this.isFullscreen = !this.isFullscreen;
			const options = this.isFullscreen
				? fullscreenSizeConfig
				: defaultSizeConfig;
			this.editor.updateOptions(options);
			this.editor.layout();
		},
		checkSyntaxError() {
			const errors = editor.getModelMarkers();
			this.$emit('errorListener', !!errors.length);
		},
		handleDisabled() {
			if (this.disabled) config.readOnly = true;
		},
	},
};
</script>

<style lang="scss" scoped>
@use '../../css/reusable' as *;
$line-numbers-current: #E5DBB9;
$line-current: rgba(255, 193, 7, 0.2);

.code-editor__wrapper {
  position: relative;
  width: 100%;
  height: 480px;

  &--fullscreen {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: auto;
    height: auto;
  }
}

.code-editor__fullscreen-btn {
  position: absolute;
  z-index: 10;
  top: 0;
  right: 15px; // default scroll width
}

.code-editor__editor {
  width: 100%;
  height: 100%;
  border: 1px solid #EAE9E9;
  border-radius: var(--border-radius);

  .margin {
    border-right: 1px solid #EAE9E9;

    .margin-view-overlays {
      // line number
      .line-numbers {
        text-align: center;
        color: #000;
      }

      // line bg
      .current-line {
        background: $line-numbers-current;
      }

      // collaps arrow
      .cldr {
        left: 34px !important;
        height: 16px !important;
      }
    }
  }

  .view-overlays .current-line {
    border: none !important;
    background: $line-current;
  }

  // scrollbar hints canvas
  .decorationsOverviewRuler {
    display: none;
  }

  .minimap {
    right: 10px;
    left: auto !important;
  }

  .slider {
    border-radius: var(--border-radius);
    background-color: $srollbar-thumb-color;
  }

  // scrollbar
  .vertical {
    background: #fff;

    &.fade {
      visibility: visible !important;
      opacity: 1;

      .slider {
        opacity: 0;
      }
    }

    .slider {
      right: 0;
      left: auto !important;
      width: 10px !important;
    }
  }

  // scrollbar
  .horizontal {
    opacity: 1;
    background: #fff;

    .slider {
      height: 10px !important;
    }
  }
}
</style>
