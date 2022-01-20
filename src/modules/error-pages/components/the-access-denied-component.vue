<template>
  <wt-error-page
    type="403"
    @back="$router.replace('/start')"
  ></wt-error-page>
</template>

<script>
export default {
  name: 'the-access-denied-component',
};
</script>

<style lang="scss" scoped>
</style>
