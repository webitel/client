<template>
  <upload-csv-popup
    :file="file"
    :mapping-fields="mappingFields"
    :add-bulk-items="saveBulkData"
    @close="close"
  ></upload-csv-popup>
</template>

<script>
import uploadCSVWrapperComponentMixin from '../../../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
import { addMembersList } from '../api/queueMembers';

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
        name: 'priority',
        required: false,
        multiple: true,
        csv: [],
      },
      {
        text: 'Communication typeId',
        name: 'typeId',
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
      console.info('sbd', data);
      const normalizedData = this.normalizeData(data);
      return addMembersList(this.parentId, normalizedData);
    },

    normalizeData(data, mappingFields) {
      return data.map((item) => {
        const normalizedItem = { variables: {}, communications: [] };
        Object.keys(normalizedItem).filter
      });
      const item = ;
      mappingFields.forEach((field) => {
        if (field.csv && Object.entries(field.csv).length) {
          let { name } = field;
          if (name.includes('Id')) {
            name = name.slice(0, -2);
            item[name] = { id: row[field.csv.id] };
          } else {
            item[name] = row[field.csv.id];
          }
        }
      });
      const communications = mappingFields.filter((field) => field.tags);
      communications.forEach((field) => {
        field.csvArr.forEach((csvItem, index) => {
          let { name } = field;
          if (name === 'variables') {
            item.variables[csvItem.name] = row[csvItem.id];
          } else {
            item.communications[index] = item.communications[index] || {};
            if (name.includes('Id')) {
              name = name.slice(0, -2);
              item.communications[index][name] = { id: row[csvItem.id] };
            } else {
              item.communications[index][name] = row[csvItem.id];
            }
          }
        });
      });
      return item;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
