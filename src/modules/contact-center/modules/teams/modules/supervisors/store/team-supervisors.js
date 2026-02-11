import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import TeamSupervisorsAPI from '../api/teamSupervisors';
import headers from './_internals/headers';

const resettableItemState = {
	itemInstance: {
		agent: {},
	},
};

const teamSupervisors = new NestedObjectStoreModule({
	resettableItemState,
	headers,
})
	.attachAPIModule(TeamSupervisorsAPI)
	.generateAPIActions()
	.getModule();

export default teamSupervisors;
