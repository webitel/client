import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

import RolesAPI from '../../../../modules/permissions/modules/roles/api/roles';

export default {
	props: {
		namespace: {
			type: String,
			required: true,
		},
		subNamespace: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		newGrantee: null,
	}),
	computed: {
		...mapState({
			dataList(state) {
				return getNamespacedState(
					state,
					`${this.namespace}/${this.subNamespace}`,
				).dataList;
			},
		}),
	},
	methods: {
		...mapActions({
			addRolePermissions(dispatch, payload) {
				return dispatch(
					`${this.namespace}/${this.subNamespace}/ADD_ROLE_PERMISSIONS`,
					payload,
				);
			},
		}),
		async save() {
			try {
				await this.addRolePermissions(this.newGrantee);
				this.close();
			} catch (err) {
				throw err;
			}
		},

		// filter new roles
		async getAvailableGrantees(params) {
			const roles = await this.loadRoles(params);
			roles.items = roles.items.filter(
				(role) =>
					!this.dataList.some((usedRoles) => role.id === usedRoles.grantee.id),
			);
			return roles;
		},
		async loadRoles(params) {
			const fields = [
				'name',
				'id',
				'user',
			];
			return RolesAPI.getList({
				...params,
				fields,
			});
		},
		resetNewGrantee() {
			this.newGrantee = null;
		},
		resetNewGrantor() {
			this.newGrantor = null;
		},
		resetPopupState() {
			if (this.newGrantor) this.resetNewGrantor();
			this.resetNewGrantee();
		},
		close() {
			this.$emit('close');
			this.resetPopupState();
		},
	},
};
