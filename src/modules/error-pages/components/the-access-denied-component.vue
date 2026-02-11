<template>
  <wt-error-page
    type="403"
    @back="$router.replace('/start')"
  />
</template>

<script>
export default {
	name: 'TheAccessDeniedComponent',
};
</script>

<style lang="scss" scoped>
</style>
