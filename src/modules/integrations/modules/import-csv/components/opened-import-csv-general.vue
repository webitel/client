<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        v-model="charset"
        :options="charsetOptions"
        :clearable="false"
        disabled
        :label="$t('objects.CSV.charSet')"
      ></wt-select>
      <wt-input
        v-model="separator"
        :label="$t('objects.CSV.separator')"
      ></wt-input>
      <wt-checkbox
        v-model="skipHeaders"
        :label="$t('objects.CSV.skipHeaders')"
        disabled
      ></wt-checkbox>
      <wt-switcher
        :disabled="disableUserInput"
        :label="$t('objects.CSV.clearMember')"
        :value="clearMember"
        @change="setItemProp({ prop: 'clearMember', value: $event })"
      ></wt-switcher>
      <wt-select
        :disabled="disableUserInput"
        :label="$tc('objects.ccenter.queues.queues', 1)"
        :search-method="loadQueueOptions"
        :value="itemInstance.queues.queues"
        :v="v.itemInstance.queues.queues"
        @input="setItemProp({ prop: 'queues', value: $event })"
      ></wt-select>

      <!--        PREVIEW SECTION: preview loader, preview table, parsing stack trace-->
      <section>
        <wt-loader
          v-show="isParsingPreview"
          class="upload-popup__parsing-preview-loader"
        ></wt-loader>
        <article
          v-show="!isParsingPreview"
          class="upload-popup-form__file-preview"
        >
          <wt-table
            :headers="csvPreviewTableHeaders"
            :data="csvPreviewTableData"
            :selectable="false"
            :grid-actions="false"
          ></wt-table>
        </article>
      </section>

      <!--        FIELDS MAPPING-->
      <ul class="upload-popup-mapping">
        <li class="upload-popup-mapping-item">
          <p class="upload-popup-mapping-item__field upload-popup-mapping-item__field--title">
            {{ $t('objects.CSV.fieldName') }}
          </p>
          <p class="upload-popup-mapping-item__field upload-popup-mapping-item__field--title">
            {{ $t('objects.CSV.CSVColumn') }}
          </p>
        </li>
        <li
          class="upload-popup-mapping-item"
          v-for="(field, key) in mappingFields"
          :key="key"
        >
          <p class="upload-popup-mapping-item__field">
            {{ field.text || field.name }}<span v-if="field.required">*</span>
          </p>
          <wt-select
            v-if="!field.multiple"
            class="upload-popup-mapping-item__select"
            v-model="field.csv"
            :options="csvColumns"
            :placeholder="field.text || field.name"
            :clearable="!field.required"
            :track-by="null"
          ></wt-select>
          <wt-tags-input
            v-else
            class="upload-popup-mapping-item__select"
            v-model="field.csv"
            :autocomplete-items="csvColumns"
            :placeholder="field.text || field.name"
            autocomplete-filter-duplicates
            add-only-from-autocomplete
          ></wt-tags-input>
          <div class="upload-tooltip" v-if="field.tooltip">{{field.tooltip}}</div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import QueuesAPI from '../../../../contact-center/modules/queues/api/queues';
import uploadCSVMixin from '../../../../../modules/_shared/upload-csv-popup/mixins/uploadCSVMixin';

export default {
  name: 'opened-email-profile-general',
  mixins: [openedTabComponentMixin, uploadCSVMixin],
  data: () => ({}),
  methods: {
    loadQueueOptions(params) {
      return QueuesAPI.getLookup(params);
    },
  },
};
</script>

<style scoped>

</style>
