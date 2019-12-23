<template>
    <header class="object-header">
        <div class="object-header__title-wrap">
            <h2 class="object-title">
                <slot></slot>
            </h2>
        </div>

        <div class="btn-controls">
            <btn
                    class="btn secondary-btn"
                    v-if="close"
                    @click.native="back"
            >
                {{this.secondaryText}}
            </btn>
            <btn
                    class="btn primary-btn"
                    :disabled="primaryDisabled"
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
            primaryDisabled: {
                type: Boolean,
                default: false,
            },
            secondaryText: {
                type: String,
                default: 'Close',
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
        padding: 15px 28px;
        margin-bottom: 28px;

        background: #fff;
        border-radius: $border-radius;
    }

    .object-header__title-wrap {
        display: flex;
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
