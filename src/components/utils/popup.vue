<!--THIS IS AN ABSTRACT COMPONENT TO EXTEND-->
<template>
    <div class="popup-wrap">
        <aside class="popup">

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
                <btn class="secondary-btn"@click.native="close">close</btn>
                <btn
                        :disabled="!disableAction"
                        @click.native="primaryBtnAction">{{primaryBtnText}}</btn>
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

            noGutters: {
                type: Boolean,
                default: false
            },

            primaryBtnText: {
                type: String,
                default: 'save'
            },

            primaryBtnAction: {
                type: Function,
                default: () => this.close()
            },

            disableAction: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .popup-wrap {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
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
        padding: 27px 44px;
        background: #fff;
        transform: translate(-50%, -50%);
        border-radius: $border-radius;
        overflow-y: auto;
        z-index: 10;
    }

    .content-header {
        margin: 0 0 28px;
    }

    .content-body {
        &.no-gutters {
            padding: 0;
        }
    }

    .btn-controls {
        text-align: right;
        margin: 26px 0 0;
    }
</style>