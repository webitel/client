import { AgentsAPI } from '@webitel/api-services/api';
import HistoryStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/HistoryStoreModule/HistoryStoreModule';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import queues from '../modules/queues/store/agent-queues';
import skills from '../modules/skills/store/agent-skills';
import subordinates from '../modules/subordinates/store/agent-subordinates';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		user: {},
		team: {},
		supervisor: [],
		auditor: [],
		region: {},
		progressiveCount: null,
		chatCount: 1,
		taskCount: 1,
		extraChatCount: 0,
		isSupervisor: false,
		screenControl: false,
		greetingMedia: {},
	},
};

const actions = {
	RESET_ITEM_STATE: async (context) => {
		context.commit('RESET_ITEM_STATE');
		context.dispatch(
			'ccenter/agents/queues/RESET_STATE',
			{},
			{
				root: true,
			},
		);
		context.dispatch(
			'ccenter/agents/skills/RESET_STATE',
			{},
			{
				root: true,
			},
		);
		context.dispatch(
			'ccenter/agents/subordinates/RESET_STATE',
			{},
			{
				root: true,
			},
		);
	},
};

// HistoryStoreModule keeps its own flat from/to in state (bound to the popup's
// datepickers), but getAgentHistory expects them nested under `joinedAt`, so
// the two get bridged here rather than reshaping the shared base module.
// TODO: delete this wrapper (and HistoryStoreModule/agent-history-popup.vue's
// legacy Vuex plumbing) once this table is migrated to createTableStore +
// ui-datalist filters, which send joinedAt in this shape natively.
const getAgentHistory = ({ from, to, ...state }) =>
	AgentsAPI.getAgentHistory({
		...state,
		joinedAt: {
			from,
			to,
		},
	});

const history = new HistoryStoreModule()
	.generateGetListAction(getAgentHistory)
	.getModule();

const agents = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(AgentsAPI)
	.generateAPIActions()
	.setChildModules({
		history,
		skills,
		queues,
		subordinates,
	})
	.getModule({
		actions,
	});

export default agents;
