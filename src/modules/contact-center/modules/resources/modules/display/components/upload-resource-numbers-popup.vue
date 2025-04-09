<template>
    <upload-csv-popup
      :add-bulk-items="saveBulkData"
      :file="file"
      :mapping-fields="mappingFields"
      @close="close"
    />
  </template>
  
  <script>
  import uploadCSVWrapperComponentMixin from '../../../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
  import ResourceDisplayAPI from '../api/resourceDisplay.js';
  
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
          // TDOD:  consult with the backend team
           await ResourceDisplayAPI.addList({
            parentId: this.parentId,
            data,
          });
        } catch (err) {
           
          throw `An error occurred during saving ${processedChunkIndex} record: ${JSON.stringify(err)}`;
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  