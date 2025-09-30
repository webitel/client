<template>
  <upload-csv-popup
    :file="file"
    :mapping-fields="mappingFields"
    :handling-mode="'upload'"
    :file-upload-handler="uploadFileAsItems"
    @close="close"
  />
</template>

<script>
import uploadCSVWrapperComponentMixin from '../../../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
import resourceDisplayApi from '../api/resourceDisplay';

export default {
  name: 'UploadResourceNumbersPopup',
  mixins: [uploadCSVWrapperComponentMixin],
  props: {
    parentId: {
      type: [Number, String],
      required: true,
    },
  },

  data: () => ({
    mappingFields: [
      {
        name: 'number',
        required: true,
        csv: '',
      },
    ],
  }),

  methods: {
    async uploadFileAsItems() {
      const selectedColumn = this.mappingFields[0].csv;

      const payload = {
        parentId: this.parentId,
        file: this.file,
        delimiter: this.separator || ',',
        map: selectedColumn,
      };

      await resourceDisplayApi.uploadNumbers(payload);
    },
  },
};
</script>
