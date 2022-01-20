<template>
  <!--  :class="$i18n.locale" root element class to control fonts on each locale  -->
  <router-view :class="$i18n.locale"></router-view>
</template>

<script>

export default {
  name: 'app',
  created() {
    this.setLanguage();
  },
  methods: {
    setLanguage() {
      const lang = localStorage.getItem('lang');
      if (lang) this.$i18n.locale = lang;
    },
  },
};
</script>

<style>

</style>
