<template>
  <wt-error-page
    type="404"
    @back="$router.replace('/start')"
  ></wt-error-page>
</template>

<script>
export default {
  name: 'the-not-found-component',
};
</script>

<style lang="scss" scoped>
</style>
