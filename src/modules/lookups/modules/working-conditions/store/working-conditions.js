import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import WorkingConditionsAPI from '../api/workingConditions.js';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		description: '',
	},
};

const WorkingConditions = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(WorkingConditionsAPI)
	.generateAPIActions()
	.getModule();

export default WorkingConditions;
