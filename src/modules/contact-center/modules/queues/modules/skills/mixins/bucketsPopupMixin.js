export default {
	computed: {
		agentBucketsId() {
			return this.$route.query.bucket;
		},
	},

	methods: {
		async getItemBuckets(id) {
			await this.$store.dispatch('ccenter/queues/skills/GET_ITEM_BUCKETS', id);
		},
		setBucketQuery(item) {
			this.$router.push({
				...this.$route,
				query: {
					bucket: item.id,
				},
			});
		},
		getFirstBucket(buckets) {
			if (buckets.length > 0) {
				return buckets[0].name;
			}
			return '';
		},
		closeBucketsPopup() {
			this.$router.go(-1);
		},
	},

	watch: {
		dataList: {
			handler(data) {
				if (data && this.agentBucketsId) {
					this.getItemBuckets(parseInt(this.agentBucketsId));
				}
			},
		},

		agentBucketsId: {
			handler(id) {
				if (id && this.dataList) this.getItemBuckets(parseInt(id));
			},
		},
	},
};
