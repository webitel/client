<template>
    <section class="header-wrap">
        <header class="object-header">
            <h2 class="object__title tt-capitalize">
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
import btn from '@/components/utils/btn';
import divider from '@/components/utils/divider';

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
    .object-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 101px;
        padding: 0 28px 0 44px;
    }

    .object__title {
        @extend .typo-heading-lg;

        margin: 0;
        letter-spacing: 0.15px;
    }
</style>
