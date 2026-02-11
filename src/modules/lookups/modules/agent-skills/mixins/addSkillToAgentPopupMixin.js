export default {
	methods: {
		openAddSkillToAgentPopup() {
			this.$router.push({
				query: {
					assign: true,
				},
			});
		},
		closeAddSkillToAgentPopup() {
			this.$router.go(-1);
		},
	},
};
