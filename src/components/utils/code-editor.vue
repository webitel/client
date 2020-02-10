<template>
    <div class="editor-wrap">
        <div class="label">{{label}}</div>
        <div class="editor" ref="editor"></div>
    </div>
</template>

<script>
    import {Monaco} from '../../utils/monacoSingleton';
    const monaco = Monaco.getInstance();

    import {editor} from 'monaco-editor';
    //https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
    const config = {
        language: 'json',
        theme: 'vs',
        wordWrap: 'off',
        // lineHeight: '28px',
        autoClosingQuotes: true,
        autoClosingBrackets: true,
        automaticLayout: true,
        autoIndent: true,
        horizontal: 'scroll',
    };

    export default {
        name: "code-editor",
        props: {
            value: {
                type: [Array, Object, String],
                required: true
            },
            options: Object,
            label: {
                type: String,
                default: ''
            },
            proposals: Function,
        },

        model: {
            event: 'change'
        },

        data() {
            return {
                editor: '',
                config
            }
        },

        watch: {
            value: function (value) {
                if (this.editor) {
                    if (value !== this.editor.getValue()) {
                        this.editor.setValue(value);
                    }
                }
            },
        },

        mounted() {
            this.config.value = this.value || '[]';
            this.editor = editor.create(this.$refs.editor, config);

            this.editor.onDidChangeModelContent(event => {
                const value = this.editor.getValue();
                if (this.value !== value) {
                    this.$emit('change', value, event);
                }
            });

            this.editor.onDidChangeModelDecorations(event => {
                this.checkSyntaxError();
            });
        },

        methods: {
            checkSyntaxError() {
                const errors = editor.getModelMarkers();
                this.$emit('errorListener', !!errors.length);
            },
        },

        beforeDestroy() {
            this.editor && this.editor.dispose();
        },
    }
</script>

<style lang="scss">
    $line-numbers-current: #E5DBB9;
    $line-current: rgba(255, 193, 7, 0.2);

    .editor {
        width: 100%;
        height: 480px;
        border: 1px solid #EAE9E9;
        border-radius: $border-radius;

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

        // text code itself
        .view-lines span {
            @extend .typo-body-md;
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
            border-radius: $border-radius;
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
</style>1