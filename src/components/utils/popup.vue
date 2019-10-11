<!--THIS IS AN ABSTRACT COMPONENT TO EXTEND-->

<template>
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
    }

    .content-header {
        padding: 0 44px;
        margin: 0 0 38px;
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
</style>