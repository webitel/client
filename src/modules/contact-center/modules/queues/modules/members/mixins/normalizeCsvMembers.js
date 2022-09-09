import CommunicationsAPI
  from '../../../../../../lookups/modules/communications/api/communications';
import QueueMembersAPI from '../api/queueMembers';

const findCommunicationIdByName = ({ communications, code }) => (
  communications.find((communication) => communication.code === code).id
);

export default {
  methods: {
    saveBulkData(data) {
      try {
        const normalizedData = this.normalizeData(data);
        return QueueMembersAPI.addBulk(this.parentId, this.file.name, normalizedData);
      } catch (err) {
        throw err;
      }
    },

    async getCommunicationTypes() {
      const communications = await CommunicationsAPI.getList({ size: 999 });
      this.allCommunications = communications.items;
    },

    normalizeData(data) {
      return data.map((item) => {
        const normalizedItem = {
          ...item,
        };

        if (normalizedItem.timezoneId) {
          normalizedItem.timezone = { id: item.timezoneId };
          delete normalizedItem.timezoneId;
        }
        if (normalizedItem.bucketId) {
          normalizedItem.bucket = { id: item.bucketId };
          delete normalizedItem.bucketId;
        }
        if (normalizedItem.variables) {
          const variablesMappings = this.mappingFields.find((field) => field.name === 'variables');
          normalizedItem.variables = item.variables.reduce((variables, variable, index) => ({
            ...variables,
            [variablesMappings.csv[index]]: variable, // csv is arr of tags
          }), {});
        }
        if (!normalizedItem.priority) {
          normalizedItem.priority = 0;
        }

        normalizedItem.communications = [];
        const commLength = Math.max(
          normalizedItem.destination.length,
          normalizedItem.code.length,
        );
        for (let index = 0; index < commLength; index += 1) {
          let id;
          try {
            id = findCommunicationIdByName({
              communications: this.allCommunications,
              code: normalizedItem.code[index],
            });
          } catch (err) {
            throw new ReferenceError(`cannot find communication: ${normalizedItem.code[index]}`);
          }
          const communication = {
            destination: normalizedItem.destination[index],
            type: { id },
          };
          if (normalizedItem.commPriority && normalizedItem.commPriority[index]) {
            communication.priority = normalizedItem.commPriority[index];
          }
          if (normalizedItem.description && normalizedItem.description[index]) {
            communication.description = normalizedItem.description[index];
          }
          normalizedItem.communications.push(communication);
        }

        delete normalizedItem.destination;
        delete normalizedItem.code;
        delete normalizedItem.commPriority;
        delete normalizedItem.description;

        return normalizedItem;
      });
    },
  },
  created() {
    this.getCommunicationTypes();
  },
};
