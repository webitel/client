<!--THIS IS AN ABSTRACT COMPONENT TO EXTEND-->
<template>
    <div class="popup-wrap">
        <aside class="popup" :class="{'overflow': overflow}">
            <header class="content-header">
                <h3 class="content-title">{{title}}</h3>
            </header>

            <section
                    class="content-body"
                    :class="{'no-gutters': noGutters}"
            >
                <slot></slot>
            </section>

            <divider/>

            <div class="btn-controls">
                <btn class="secondary-btn" @click.native="close">close</btn>
                <btn
                        class="btn primary-btn"
                        :disabled="primaryDisabled"
                        @click.native="primaryAction"
                >
                    {{this.primaryText}}
                </btn>
            </div>
        </aside>
        <div class="popup-bg"></div>
    </div>
</template>

<script>
    import btn from '@/components/utils/btn';
    import divider from '@/components/utils/divider';

    export default {
        name: "popup",
        components: {
            divider,
            btn,
        },
        props: {
            title: {
                type: String,
                default: 'Upload..'
            },

            overflow: {
                type: Boolean,
                default: false,
            },

            noGutters: {
                type: Boolean,
                default: false
            },

            primaryText: {
                type: String,
                default: 'Add new',
            },

            primaryAction: {
                type: Function
            },

            primaryDisabled: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss">
    .popup-wrap {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 900;
    }

    .popup-bg {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.25);
        z-index: 0;
    }

    .popup {
        @extend .scrollbar;
        @extend .box-shadow;

        position: absolute;
        top: 50%;
        left: 50%;
        width: 738px;
        max-height: 80vh;
        padding: 27px 0;
        background: #fff;
        transform: translate(-50%, -50%);
        border-radius: $border-radius;
        overflow-y: auto;
        z-index: 10;

        &.overflow {
            overflow: visible;
        }

        .content-header {
            margin: 0 44px 28px;
        }

        .content-body {
            padding: 0 44px;

            &.no-gutters {
                padding: 0;
            }
        }

        .btn-controls {
            text-align: right;
            margin: 26px 44px 0;
        }
    }
</style>