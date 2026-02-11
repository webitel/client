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
		touchValidations() {
			if (this.v$) this.v$.$touch();
			if (this.v) this.v.$touch();
		},

		checkValidationStatus() {
			const v = this.v$ || this.v;
			// if its still pending or an error is returned do not submit
			if (v) return v.$pending || v.$error;
			return false;
		},

		checkValidations() {
			this.touchValidations();
			return this.checkValidationStatus();
		},
	},
};
