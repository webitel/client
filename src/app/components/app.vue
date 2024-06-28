<template>
  <!--  :class="$i18n.locale" root element class to control fonts on each locale  -->
  <router-view :class="$i18n.locale" />
</template>

<script>
export default {
  name: "App",
  created() {
    this.setLanguage();
  },
  methods: {
    setLanguage() {
      const lang = localStorage.getItem("lang");
      if (lang) this.$i18n.locale = lang;
    },
  },
};
</script>

<style>

</style>
