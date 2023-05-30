/**
 * @fileOverview implements work with validation
 */
export default {
  props: {
    v: {
      type: Object,
    },
  },

  methods: {
    checkValidations(validatedInstance = 'itemInstance') {
      const v = this.v$ ? this.v$ : this.v;
      v[validatedInstance].$touch();
      // if its still pending or an error is returned do not submit
      return v[validatedInstance].$pending
        || v[validatedInstance].$error;
    },
  },
};
