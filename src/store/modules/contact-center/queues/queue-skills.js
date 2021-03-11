import QueueSkillsAPI from '../../../../api/contact-center/queues/queueSkills';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

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

const getters = {
  GET_ITEM_BUCKETS: (state) => (id) => {
    const item = state.dataList.filter(item => item.id === id)[0];
    return item.buckets;
  },
};

const queueSkills = new DefaultNestedModule(null, resettableItemState)
  .attachAPIModule(QueueSkillsAPI)
  .generateAPIActions()
  .getModule({ getters });

export default queueSkills;
