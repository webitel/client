<template>
  <div class="code-editor">
    <wt-label>{{ label }}</wt-label>
    <div
      class="code-editor__wrapper"
      :class="{ 'code-editor__wrapper--fullscreen': isFullscreen }"
    >
      <div
        class="code-editor__editor"
        ref="editor"
      ></div>
      <wt-tooltip class="code-editor__fullscreen-btn">
        <template v-slot:activator>
          <wt-icon-btn
            :icon="fullscreenIcon"
            :size="fullscreenIconSize"
            @click="toggleFullscreen"
          ></wt-icon-btn>
        </template>
        {{ fullscreenIconTooltip }}
      </wt-tooltip>
    </div>
  </div>
</template>

<script>
import { editor, languages } from 'monaco-editor';
import { markRaw } from 'vue';

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
  theme: 'vs',
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
  name: 'code-editor',
  props: {
    value: {
      type: [Array, Object, String],
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
  model: {
    event: 'change',
  },
  data: () => ({
    editor: '',
    isFullscreen: false,
  }),
  watch: {
    value(value) {
      if (this.editor) {
        if (value !== this.editor.getValue()) {
          this.editor.setValue(value);
        }
      }
    },
  },
  computed: {
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

      // eslint-disable-next-line no-unused-vars
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
            suggestions: this.autocomplete
            .map(({ label, documentation, insertText }) => ({
                label,
                range,
                kind: languages.CompletionItemKind.Function,
                documentation,
                insertText: JSON.stringify(insertText, null, 4),
            })),
          };
        },
      });
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      const options = this.isFullscreen ? fullscreenSizeConfig : defaultSizeConfig;
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
  mounted() {
    this.initEditor();
  },
  destroyed() {
    this.editor.dispose();
    autocompleteDisposed.dispose();
  },
};
</script>

<style lang="scss" scoped>
$line-numbers-current: #E5DBB9;
$line-current: rgba(255, 193, 7, 0.2);

.code-editor__wrapper {
  position: relative;
  width: 100%;
  height: 480px;

  &--fullscreen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: auto;
    height: auto;
  }
}

.code-editor__fullscreen-btn {
  position: absolute;
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
        height: 16px !important;
        left: 34px !important;
      }
    }
  }

  .view-overlays .current-line {
    background: $line-current;
    border: none !important;
  }

  // scrollbar hints canvas
  .decorationsOverviewRuler {
    display: none;
  }

  .minimap {
    left: auto !important;
    right: 10px;
  }

  .slider {
    background-color: $srollbar-thumb-color;
    border-radius: var(--border-radius);
  }

  // scrollbar
  .vertical {
    background: #fff;

    &.fade {
      opacity: 1;
      visibility: visible !important;

      .slider {
        opacity: 0;
      }
    }

    .slider {
      width: 10px !important;
      left: auto !important;
      right: 0;
    }
  }

  // scrollbar
  .horizontal {
    background: #fff;
    opacity: 1;

    .slider {
      height: 10px !important;
    }
  }
}
</style>
