import RouteNames from '../../../router/_internals/RouteNames.enum';

export default {
	data: () => ({
		RouteNames,
	}),
	methods: {
		editLink({ id }) {
			const routeName = this.routeName || this.tableObjectRouteName;
			return {
				name: `${routeName}-card`,
				params: {
					id,
				},
			};
		},
	},
};
