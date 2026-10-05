import { SkillsAPI } from '@webitel/api-services/api';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import agents from '../modules/agents/store/skill-agents';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		description: '',
	},
};

const skills = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(SkillsAPI)
	.generateAPIActions()
	.setChildModules({
		agents,
	})
	.getModule();

export default skills;
