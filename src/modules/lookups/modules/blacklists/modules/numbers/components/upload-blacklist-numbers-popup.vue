<template>
  <upload-csv-popup
    :add-bulk-items="saveBulkData"
    :file="file"
    :mapping-fields="mappingFields"
    @close="close"
  />
</template>

<script>
import uploadCSVWrapperComponentMixin
  from '../../../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
import BlacklistNumbersAPI from '../api/blacklistNumbers';

export default {
  name: 'UploadUsersPopup',
  mixins: [uploadCSVWrapperComponentMixin],
  props: {
    parentId: {
      type: [Number, String],
      required: true, // required to create new numbers
    },
  },
  data: () => ({
    mappingFields: [
      {
        name: 'number',
        required: true,
        csv: '',
      },
      {
        name: 'description',
        required: false,
        csv: '',
      },
      {
        name: 'expireAt',
        required: false,
        csv: '',
      },
    ],
  }),

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
    addItem(itemInstance) {
      return BlacklistNumbersAPI.add({ parentId: this.parentId, itemInstance });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
