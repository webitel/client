<template>
  <div class="observer"></div>
</template>
<script>
  // https://vueschool.io/articles/vuejs-tutorials/build-an-infinite-scroll-component-using-intersection-observer-api/

  export default {
    props: {
      options: Object,
    },
    data: () => ({
      observer: null,
    }),

    watch: {
      options: {
        handler() {
          this.setObserver();
        },
        immediate: true,
      },
    },

    destroyed() {
      if (this.observer) this.observer.disconnect();
    },

    methods: {
      setObserver() {
        if (this.options && !this.observer) { // if parent rendered and we can set root within options
          this.observer = new IntersectionObserver(([entry]) => {
            console.info(entry);
            if (entry && entry.isIntersecting) {
              this.$emit('intersect');
            }
          }, this.options);
          this.observer.observe(this.$el);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
//.observer {
//  width: 100%;
//  height: 50px;
//  background: red;
//}
</style>
