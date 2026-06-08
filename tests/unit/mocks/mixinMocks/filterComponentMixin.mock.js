const filterComponentMixinMock = () => ({
	computed: {
		filterSchema: () => ({
			// label feeds $t(); real i18n rejects undefined, so provide a key
			locale: {
				label: 'reusable.all',
			},
		}),
	},
	global: {
		mocks: {
			$route: {
				query: {},
			},
		},
	},
});

export default filterComponentMixinMock;
