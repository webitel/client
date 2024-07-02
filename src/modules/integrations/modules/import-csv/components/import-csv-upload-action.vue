<template>
  <div class="import-csv-upload-action">
    <upload-file-icon-btn
      accept=".csv"
      @change="processCSV"
    />
    <upload-csv-preview-popup
      v-if="file"
      :add-bulk-items="saveBulkData"
      :charset="item.parameters.charset.value"
      :file="file"
      :mapping-fields="mappingFields"
      :separator="item.parameters.separator"
      :skip-headers="item.parameters.skipHeaders"
      @close="file = null"
      @save="handleSave"
    />
  </div>
</template>

<script>
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import UploadCsvPreviewPopup from '../../../../_shared/upload-csv-popup/components/upload-csv-preview-popup.vue';
import QueueMembersAPI from '../../../../contact-center/modules/queues/modules/members/api/queueMembers';
import normalizeCsvMembers from '../../../../contact-center/modules/queues/modules/members/mixins/normalizeCsvMembers';
import ImportCsvMemberMappings from '../lookups/ImportCsvMemberMappings.lookup';

export default {
  name: 'ImportCsvUploadAction',
  components: { UploadFileIconBtn, UploadCsvPreviewPopup },
  mixins: [normalizeCsvMembers],
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
      return Object.entries(ImportCsvMemberMappings).map(([name, mapping]) => ({
        ...mapping,
        name,
        csv: this.item.parameters.mappings[name],
      }));
    },
  },
  methods: {
    processCSV(files) {
      const file = files[0];
      if (file) {
        this.file = file;
      }
    },
    handleSave() {
      if (this.item.parameters.clearMembers) {
        QueueMembersAPI.deleteBulk(this.parentId, {
          ids: [],
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
