import Service from '../store/_internals/lookups/Service.lookup';

export default {
	computed: {
		endpoint() {
			return this.itemInstance?.properties?.endpoint;
		},

		service() {
			if (this.endpoint === Service.AWS.endpoint) {
				return Service.AWS;
			}
			if (this.endpoint === Service.DO.endpoint) {
				return Service.DO;
			}
			return Service.CUSTOM;
		},
	},
};
