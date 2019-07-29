<template>
    <div class="alert fs14-lh16" v-if="error">
        {{error}}
    </div>
</template>

<script>
export default {
  name: 'alert',
  props: {
    error: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
    .alert {
        position: fixed;
        top: 5px;
        right: 5px;
        width: 200px;
        padding: 20px;
        font-family: 'AvantGardeDemi', sans-serif;
        color: #fff;
        background: #FF4444;
        border-radius: 4px;
        z-index: 100;
    }
</style>
