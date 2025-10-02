<template>
  <upload-csv-popup
    :file="file"
    :mapping-fields="mappingFields"
    :handling-mode="handlingMode"
    :file-upload-handler="uploadFileAsItems"
    @close="close"
  />
</template>

<script>
import HandlingMode from '../../../../../../_shared/upload-csv-popup/enums/HandlingMode.enum.js';
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
    handlingMode: HandlingMode.UPLOAD,
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
