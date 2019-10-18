<template>
    <header class="object-header">
        <div class="object-header__title-wrap">
            <i
                    class="object-back icon-icon_arrow-left icon-action"
                    v-if="close"
                    @click="back"
            ></i>

            <h2 class="object-title">
                <slot></slot>
            </h2>
        </div>

        <div class="btn-controls">
            <btn
                    class="btn primary-btn"
                    v-if="primaryAction"
                    @click.native="primaryAction"
            >
                {{this.primaryText}}
            </btn>
        </div>
    </header>
</template>

<script>
    import btn from '../../components/utils/btn';

    export default {
        name: 'page-header',
        components: {
            btn,
        },
        props: {
            primaryText: {
                type: String,
                default: 'Add new',
            },
            primaryAction: {
                type: Function
            },
            close: {
                type: Boolean,
                default: false,
            }
        },

        methods: {
            back() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .object-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 28px;
        margin-bottom: 28px;

        background: #fff;
        border-radius: $border-radius;
    }

    .object-header__title-wrap {
        display: flex;

        .object-back {
            margin-right: 20px;
            color: #000;
        }
    }

    .object-title {
        @extend .typo-heading-lg;

        margin: 0;
        letter-spacing: 0.15px;

        span {
            @extend .typo-heading-lg;
        }
    }
</style>
