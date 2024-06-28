import accessControlMixin from "../../../baseMixins/accessControlMixin/accessControlMixin";

export default {
	mixins: [accessControlMixin],
	computed: {
		disableUserInput() {
			if (this.$route.name.includes("-edit")) return !this.hasEditAccess;
			return !this.hasCreateAccess;
		},
	},
};
