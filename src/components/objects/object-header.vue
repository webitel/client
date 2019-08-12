<template>
    <section class="header-wrap">
        <header class="module-header">
            <h2 class="module__title">
                <slot></slot>
            </h2>
            <div class="btn-controls">
                <btn
                        class="btn secondary-btn"
                        v-if="secondaryAction"
                        @click.native="secondaryAction"
                >
                    {{$t('objects.close')}}
                </btn>
                <btn
                        class="btn"
                        v-if="primaryAction"
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
    btn,
    divider,
  },
  props: {
    primaryText: {
      type: String,
      default: 'Add new',
    },
    primaryAction: {
      type: Function
    },
    secondaryText: {
      type: String,
    },
    secondaryAction: {
      type: Function,
    },
  },
};
</script>

<style lang="scss" scoped>
    @import "../../assets/css/main";

    .module-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 28px 18px 44px;
    }

    .module__title {
        @extend .typo-heading-lg;

        letter-spacing: 0.15px;
    }
</style>
