<template>
  <upload-csv-popup
    :add-bulk-items="saveBulkData"
    :file="file"
    :mapping-fields="mappingFields"
    @close="close"
  />
</template>

<script>
import uploadCSVWrapperComponentMixin from '../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
import DevicesAPI from '../api/devices';

export default {
  name: 'UploadDevicesPopup',
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
         
        for (const item of data) {
           
          await this.addItem(item);
          processedChunkIndex += 1;
        }
      } catch (err) {
         
        throw `An error occurred during saving ${processedChunkIndex} record: ${JSON.stringify(err)}`;
      }
    },
    addItem(item) {
       
      if (!item.password) item.password = item.account;
      return DevicesAPI.add({
        itemInstance: item,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
