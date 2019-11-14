<template>
    <div class="editor" ref="editor"></div>
</template>

<script>
    import {editor} from 'monaco-editor';
//https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
    const config = {
        language: 'json',
        theme: 'vs',
        wordWrap: 'on',
        lineHeight: '28px',
        autoClosingQuotes: true,
        autoClosingBrackets: true,
    };

    export default {
        name: "code-editor",
        props: {
            value: {
                type: String,
                required: true
            },
            options: Object,
        },

        model: {
            event: 'change'
        },

        data() {
            return {
                editor: '',
                config: config
            }
        },

        mounted() {
            this.config.value = this.value || '{}';
            this.editor = editor.create(this.$refs.editor, config);
        },

        beforeDestroy() {
            this.editor && this.editor.dispose();
        }
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
                    line-height: 28px;
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
                    margin-top: 6px;
                }
            }
        }

        .view-overlays .current-line {
            padding: 0 6px;
            background: $line-current;
            border: none !important;
        }

        // text code cursor
        .cursor {
            height: 16px !important;
            margin-top: 6px;
        }

        // text code itself
        .view-lines span {
            @extend .typo-body-md;
        }

        // scrollbar hints canvas
        .decorationsOverviewRuler {
            display: none;
        }

        // scrollbar
        .slider {
            width: 10px !important;
            left: auto !important;
            right: 0;
            background-color: $srollbar-thumb-color;
            border-radius: $border-radius;
        }
    }
</style>1