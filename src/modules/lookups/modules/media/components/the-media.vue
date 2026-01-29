<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header hide-primary>
        <wt-breadcrumb :path="path" />
        <template #actions>
          <download-files-btn
            :files-download-progress="filesDownloadProgress"
            :files-zipping-progress="filesZippingProgress"
            :is-files-loading="isFilesLoading"
            @export-files="exportFiles(null, { fields: undefined })"
          />
        </template>
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ $t('objects.lookups.media.allMediaFiles') }}
          </h3>
          <div class="table-title__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @enter="loadList"
              @input="setSearch"
              @search="loadList"
            />
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{ 'hidden': anySelected }"
                :selected-count="selectedRows.length"
                @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })"
              />
              <text-to-speech-popup @opened="closePlayer" />
            </wt-table-actions>
          </div>
        </header>
        <vue-dropzone
          v-if="hasCreateAccess"
          id="dropzone"
          :destroy-dropzone="false"
          :options="dropzoneOptions"
          duplicate-check
          use-custom-slot
          @vdropzone-files-added="onFilesAdded"
          @vdropzone-success="onFileSuccess"
          @vdropzone-error="onFileError"
          @vdropzone-queue-complete="onComplete"
        >
          <div v-show="isLoadingFiles">
            <div class="progress-count">
              <wt-loader size="sm" />
              <p>{{ loadedCount }}/{{ allLoadingCount }}</p>
            </div>
          </div>
          <div
            v-show="!isLoadingFiles"
            :title="$t('iconHints.upload')"
            class="dz-custom-message"
          >
            <wt-icon
              color="primary"
              icon="upload"
            />
            <div class="dz-message-text">
              <span class="dz-message-text__accent">
                {{ $t('objects.lookups.media.dragPlaceholder') }}
              </span>
              {{ $t('objects.lookups.media.dragPlaceholderHere') }}
            </div>
          </div>
        </vue-dropzone>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :dark-mode="darkMode"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
        />
        <div
          v-show="dataList.length && isLoaded"
          class="table-section__table-wrapper"
        >
          <wt-table
            :data="dataList"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              {{ item.name }}
            </template>
            <template #createdAt="{ item }">
              {{ prettifyDate(item.createdAt) }}
            </template>
            <template #format="{ item }">
              {{ displayFormatFile(item) }}
            </template>
            <template #size="{ item }">
              {{ prettifyFileSize(item.size) }}
            </template>
            <template #actions="{ item, index }">
              <media-file-preview-table-action
                :playing="index === playingIndex && currentlyPlaying"
                :type="item.mimeType"
                @open="openFile(item)"
                @play="play(index)"
              />
              <wt-icon-action
                action="download"
                @click="downloadFile(item)"
              />
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })"
              />
            </template>
          </wt-table>
          <wt-pagination
            :next="isNext"
            :prev="page > 1"
            :size="size"
            debounce
            @change="loadList"
            @input="setSize"
            @next="nextPage"
            @prev="prevPage"
          />
        </div>

        <wt-player
          v-show="audioLink"
          :src="audioLink"
          @close="closePlayer"
          @pause="currentlyPlaying = false"
          @play="currentlyPlaying = true"
        />
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import prettifyFileSize from '@webitel/ui-sdk/src/scripts/prettifyFileSize';
import { formatDate } from '@webitel/ui-sdk/utils';
import vueDropzone from 'vue2-dropzone';

import DownloadFilesBtn from '../../../../../app/components/utils/download-files-btn.vue';
import { useDummy } from '../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import { download } from '../../../../../app/utils/download';
import MediaAPI from '../api/media';
import TextToSpeechPopup from '../modules/text-to-speech/components/text-to-speech-popup.vue';
import MediaFilePreviewTableAction from './media-file-preview-table-action.vue';

const token = localStorage.getItem('access-token');
const API_URL = import.meta.env.VITE_API_URL;
const namespace = 'lookups/media';

export default {
  name: 'TheMedia',
  components: {
    DownloadFilesBtn,
    vueDropzone,
    TextToSpeechPopup,
    MediaFilePreviewTableAction,
    DeleteConfirmationPopup,
  },
  mixins: [exportFilesMixin, tableComponentMixin],
  inject: ['$eventBus'],
  setup() {
    const { dummy } = useDummy({
      namespace,
      hiddenText: true,
    });
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    const { hasCreateAccess, hasEditAccess, hasDeleteAccess } = useUserAccessControl();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
      hasCreateAccess,
      hasEditAccess,
      hasDeleteAccess,
    };
  },
  data() {
    return {
      namespace,

      isLoadingFiles: false,
      loadedCount: 0,
      allLoadingCount: 0,
      audioLink: '',
      playingIndex: null,
      currentlyPlaying: true,

      dropzoneOptions: {
        url: `${API_URL}/storage/media?access_token=${token}`,
        thumbnailWidth: 150,
        // maxFilesize: 0.5,
        // acceptedFiles: '.mp3, .wav, .mpeg',
        uploadMultiple: true,
      },
    };
  },
  computed: {
    path() {
      return [
        {
          name: this.$t('objects.lookups.lookups'),
        },
        {
          name: this.$t('objects.lookups.media.mediaFiles', 2),
          route: '/lookups/media',
        },
      ];
    },
  },
  created() {
    this.initFilesExport({
      fetchMethod: this.getMediaList, // API call method
      filename: 'media', // name of downloaded file. default is 'files'
      filesURL: (id) => `${API_URL}/storage/media/${id}/download?access_token=${token}`, // Function. accepts file id param, and generates download link for file
      skipFilesWithError: true,
    });
  },

  methods: {
    openFile({ id }) {
      const url = `${API_URL}/storage/media/${id}/stream?access_token=${token}`;
      window.open(url, '_blank');
    },
    async downloadFile({ id, name }) {
      const url = `${API_URL}/storage/media/${id}/download?access_token=${token}`;
      download(url, name);
    },

    getSelectedFiles() {
      const selected = this.dataList.filter((item) => item._isSelected);
      return selected.length ? selected : null;
    },

    // dropzone event on loading start
    // used for computing files number for UI and animation start
    onFilesAdded(files) {
      this.isLoadingFiles = true;
      this.loadedCount = 0;
      this.allLoadingCount = files.length;
    },

    // dropzone event firing on ech file loaded successfully
    // used for updating loaded files number on UI

    onFileSuccess(file, res) {
      this.loadedCount += 1;
    },

    // dropzone event firing on ech file load
    // used for updating loaded files number on UI
    onFileError(file, message) {
      this.loadedCount += 1;
      this.$eventBus.$emit('notification', {
        type: 'error',
        text: message.message || message,
      });
    },

    // dropzone event firing on all files loaded and sent
    // used for animation end and list update
    onComplete() {
      this.isLoadingFiles = false;
      this.loadList();
    },

    play(rowId) {
      const { id } = this.dataList[rowId];
      this.playingIndex = rowId;
      this.audioLink = `${API_URL}/storage/media/${id}/stream?access_token=${token}`;
    },

    closePlayer() {
      this.playingIndex = null;
      this.audioLink = '';
    },
    getMediaList: MediaAPI.getList,
    prettifyDate(date) {
      return formatDate(+date, FormatDateMode.DATE);
    },
    prettifyFormat(format) {
      return format.split('/').pop();
    },
    prettifyFileSize,
    displayFormatFile(item) {
      const array = item.name.split('.');
      const format = array.length > 1 ? array.at(-1) : null;
      return format || this.prettifyFormat(item.mimeType) || 'N/A';
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
.progress-count {
  display: flex;
  align-items: center;
  justify-content: center;

  .wt-loader {
    display: inline-block;
    margin-right: var(--spacing-xs);
    margin-bottom: 3px;
  }
}

#dropzone {
  background: var(--content-wrapper-color);
}
</style>
