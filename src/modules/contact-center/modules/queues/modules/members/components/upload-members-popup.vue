<template>
  <upload-csv-popup
    v-model="mappingFields"
    :add-bulk-items="saveBulkData"
    :file="file"
    @close="close"
  ></upload-csv-popup>
</template>

<script>
import uploadCSVWrapperComponentMixin
  from '../../../../../../_shared/upload-csv-popup/mixins/uploadCSVWrapperComponentMixin';
import normalizeCsvMembers from '../mixins/normalizeCsvMembers';

export default {
  name: 'upload-members-popup',
  mixins: [uploadCSVWrapperComponentMixin, normalizeCsvMembers],
  props: {
    parentId: {
      type: [Number, String],
      required: true,
    },
  },
  data: () => ({
    bulk: [],
    allCommunications: null,
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
        csv: 0,
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
        name: 'commPriority',
        required: false,
        multiple: true,
        csv: [],
      },
      {
        text: 'Communication code',
        name: 'code',
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
};
</script>

<style lang="scss" scoped>
</style>
