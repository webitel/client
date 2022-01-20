<template>
  <upload-csv-popup
    :file="file"
    :mapping-fields="mappingFields"
    :add-bulk-items="saveBulkData"
    @close="close"
  ></upload-csv-popup>
</template>

<script>
import uploadCSVWrapperComponentMixin
  from '../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
import DevicesAPI from '../api/devices';

export default {
  name: 'upload-devices-popup',
  mixins: [uploadCSVWrapperComponentMixin],
  data() {
    return {
      mappingFields: [
        {
          name: 'account',
          required: true,
          csv: '',
        },
        {
          name: 'name',
          required: false,
          csv: '',
        },
        {
          name: 'vendor',
          required: false,
          csv: '',
        },
        {
          name: 'model',
          required: false,
          csv: '',
        },
        {
          name: 'mac',
          required: false,
          csv: '',
        },
        {
          name: 'ip',
          required: false,
          csv: '',
        },
        {
          name: 'password',
          required: false,
          csv: '',
          tooltip: this.$t('objects.directory.devices.passwordSetFromAccount'),
        },
      ],
    };
  },

  methods: {
    async saveBulkData(data) {
      let processedChunkIndex = 1;
      try {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of data) {
          // eslint-disable-next-line no-await-in-loop
          await this.addItem(item);
          processedChunkIndex += 1;
        }
      } catch (err) {
        // eslint-disable-next-line no-throw-literal
        throw `An error occurred during saving ${processedChunkIndex} record: ${JSON.stringify(err)}`;
      }
    },
    addItem(item) {
      // eslint-disable-next-line no-param-reassign
      if (!item.password) item.password = item.account;
      return DevicesAPI.add({ itemInstance: item });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
