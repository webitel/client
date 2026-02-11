import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import QueueSkillsAPI from '../api/queueSkills';
import headers from './_internals/headers';

const resettableItemState = {
	itemInstance: {
		skill: {},
		lvl: 0,
		minCapacity: 0,
		maxCapacity: 10,
		buckets: [],
		enabled: true,
	},
};
const state = {
	buckets: [],
};

const actions = {
	GET_ITEM_BUCKETS: async (context, id) => {
		const item = await context.state.dataList.filter(
			(item) => item.id === id,
		)[0];
		await context.commit('SET_BUCKETS', item.buckets || []);
	},
};

const mutations = {
	SET_BUCKETS(state, payload) {
		state.buckets = payload;
	},
};

const getters = {
	GET_ITEM_BUCKETS: (state) => (id) => {
		const item = state.dataList.filter((item) => item.id === id)[0];
		return item.buckets || [];
	},
};

const queueSkills = new NestedObjectStoreModule({
	resettableItemState,
	headers,
})
	.attachAPIModule(QueueSkillsAPI)
	.generateAPIActions()
	.getModule({
		state,
		actions,
		mutations,
		getters,
	});

export default queueSkills;
