<template>
    <section class="header-wrap">
        <header class="module-header">
            <h2 class="module__title">
                <slot></slot>
            </h2>
            <div class="module-header__controls">
                <btn
                        class="btn secondary-btn"
                        v-if="secondaryAction"
                        @click.native="secondaryAction"
                >
                    close
                </btn>
                <btn
                        class="btn"
                        @click.native="primaryAction"
                >
                    {{this.primaryText}}
                </btn>
            </div>
        </header>
        <divider/>
    </section>
</template>

<script>
    import btn from '../utils/btn';
    import divider from '../utils/divider';

    export default {
        name: 'page-header',
        components: {
            'btn': btn,
            'divider': divider,
        },
        props: {
            primaryText: {
                type: String,
                default: 'Add new'
            },
            primaryAction: {
                type: Function,
                default: () => {}
            },
            secondaryText: {
                type: String,
                default: ''
            },
            secondaryAction: {
                type: Function
            }
        }
    };
</script>

<style lang="scss" scoped>
    .module-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 28px 18px 44px;
    }

    .module__title {
        font: 20px 'AvantGardeBold';
        line-height: 24px;
        letter-spacing: 0.15px;
    }

    .module-header__controls {
        .btn {
            margin-left: 27px;
        }
    }
</style>
