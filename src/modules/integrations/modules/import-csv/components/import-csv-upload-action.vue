<template>
  <div class="import-csv-upload-action">
    <upload-file-icon-btn
      accept=".csv"
      @change="processCSV"
    ></upload-file-icon-btn>
    <upload-csv-preview-popup
      v-if="file"
      :file="file"
      :mapping-fields="item.parameters.mappings"
      :separator="item.parameters.separator"
      :charset="item.parameters.charset.value"
      :skip-headers="item.parameters.skipHeaders"
      :add-bulk-items="saveBulkData"
      @close="file = null"
      @save="handleSave"
    ></upload-csv-preview-popup>
  </div>
</template>

<script>
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import UploadCsvPreviewPopup from '../../../../_shared/upload-csv-popup/components/upload-csv-preview-popup.vue';
import normalizeCsvMembers from '../../../../contact-center/modules/queues/modules/members/mixins/normalizeCsvMembers';
import QueueMembersAPI from '../../../../contact-center/modules/queues/modules/members/api/queueMembers';

export default {
  name: 'import-csv-upload-action',
  mixins: [normalizeCsvMembers],
  components: { UploadFileIconBtn, UploadCsvPreviewPopup },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    file: null,
  }),
  computed: {
    parentId() {
      return this.item.source.id;
    },
    mappingFields() {
      return this.item.parameters.mappings;
    },
  },
  methods: {
    processCSV(files) {
      const file = files[0];
      if (file) {
        this.file = file;
        // this.isUploadPopup = true;
      }
    },
    handleSave() {
      if (this.item.parameters.clearMembers) {
        QueueMembersAPI.deleteBulk(this.parentId, { ids: [] });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
