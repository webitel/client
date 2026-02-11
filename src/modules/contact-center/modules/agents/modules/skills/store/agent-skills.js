import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import AgentSkillAPI from '../api/agentSkills';
import headers from './_internals/headers';

const resettableItemState = {
	itemInstance: {
		skill: '',
		capacity: 10,
		enabled: true,
	},
};

const agentSkills = new NestedObjectStoreModule({
	resettableItemState,
	headers,
})
	.attachAPIModule(AgentSkillAPI)
	.generateAPIActions()
	.getModule();

export default agentSkills;
