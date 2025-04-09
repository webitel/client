<template>
  <upload-csv-popup
    :add-bulk-items="saveBulkData"
    :file="file"
    :mapping-fields="mappingFields"
    v-bind="$attrs"
    @close="close"
  />
</template>

<script>
import uploadCSVWrapperComponentMixin from '../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
import UsersAPI from '../api/users';

export default {
  name: 'UploadUsersPopup',
  mixins: [uploadCSVWrapperComponentMixin],
  data: () => ({
    mappingFields: [
      {
        name: 'username',
        required: true,
        csv: '',
      },
      {
        name: 'name',
        required: false,
        csv: '',
      },
      {
        name: 'extension',
        required: false,
        csv: '',
      },
      {
        name: 'email',
        required: false,
        csv: '',
      },
    ],
  }),
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
    addItem(itemInstance) {
      return UsersAPI.add({
        itemInstance,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
