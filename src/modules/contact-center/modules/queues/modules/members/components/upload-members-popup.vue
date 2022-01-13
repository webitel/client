<template>
  <upload-csv-popup
    v-model="mappingFields"
    :file="file"
    :add-bulk-items="saveBulkData"
    @close="close"
  ></upload-csv-popup>
</template>

<script>
import uploadCSVWrapperComponentMixin
  from '../../../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
import getCommunicationTypes from '../api/communicationTypes';
import QueueMembersAPI from '../api/queueMembers';

const findTypeIdByName = ({ types, name }) => types.find(type => type.code === name).id;

export default {
  name: 'upload-members-popup',
  mixins: [uploadCSVWrapperComponentMixin],
  props: {
    parentId: {
      type: [Number, String],
      required: true,
    },
  },
  data: () => ({
    bulk: [],
    allCommunicationTypes: null,
    mappingFields: [
      {
        name: 'name',
        required: true,
        csv: '',
      },
      {
        name: 'timezoneId',
        required: false,
        csv: '',
      },
      {
        name: 'priority',
        required: false,
        csv: '',
      },
      {
        text: 'Expire',
        name: 'expireAt',
        required: false,
        csv: '',
      },
      {
        name: 'bucketId',
        required: false,
        csv: '',
      },
      {
        name: 'variables',
        required: false,
        multiple: true,
        csv: [],
      },
      {
        text: 'Communication destination',
        name: 'destination',
        required: true,
        multiple: true,
        csv: [],
      },
      {
        text: 'Communication priority',
        name: 'commPriority',
        required: false,
        multiple: true,
        csv: [],
      },
      {
        text: 'Communication type',
        name: 'type',
        required: true,
        multiple: true,
        csv: [],
      },
      {
        text: 'Communication description',
        name: 'description',
        required: false,
        multiple: true,
        csv: [],
      },
    ],
  }),

  methods: {
    saveBulkData(data) {
      try {
        const normalizedData = this.normalizeData(data);
        return QueueMembersAPI.addBulk(this.parentId, normalizedData);
      } catch (err) {
        throw err;
      }
    },

    async getAllTypes() {
        this.allCommunicationTypes = await getCommunicationTypes();
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
            [variablesMappings.csv[index].text]: variable, // csv is arr of tags { text }
          }), {});
        }

        normalizedItem.communications = [];
        const commLength = Math.max(
          normalizedItem.destination.length,
          normalizedItem.type.length,
        );
        for (let index = 0; index < commLength; index += 1) {
          const id = findTypeIdByName({
            types: this.allCommunicationTypes,
            name: normalizedItem.type[index],
          });
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
        delete normalizedItem.type;
        delete normalizedItem.commPriority;
        delete normalizedItem.description;

        return normalizedItem;
      });
    },
  },
  created() {
    this.getAllTypes();
  },
};
</script>

<style lang="scss" scoped>
</style>
