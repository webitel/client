import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import WorkingConditionsAPI from '../api/workingConditions.js';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
    workdayHours: 0,
    workdayPerMonth: 0,
    pauseDuration: 0,
    vacation: 0,
    pauseTemplate: {},
    sickLeaves: 0,
    shiftTemplate: {},
    daysOff: 0,
  },
};

const WorkingConditions = new ObjectStoreModule({ resettableState, headers })
.attachAPIModule(WorkingConditionsAPI)
.generateAPIActions()
.getModule();

export default WorkingConditions;
