<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header hide-primary>
        <wt-headline-nav :path="path"></wt-headline-nav>
        <template v-slot:actions>
          <download-files-btn
            :files-download-progress="filesDownloadProgress"
            :files-zipping-progress="filesZippingProgress"
            :is-files-loading="isFilesLoading"
            @export-files="exportFiles(null, { fields: undefined })"
          ></download-files-btn>
        </template>
      </object-header>
    </template>

    <template v-slot:main>
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.lookups.media.allMediaFiles') }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @enter="loadList"
              @input="setSearch"
              @search="loadList"
            ></wt-search-bar>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="callDelete(selectedRows)"
              ></delete-all-action>
              <text-to-speech-popup
                @opened="closePlayer"
              ></text-to-speech-popup>
            </wt-table-actions>
          </div>
        </header>
        <vue-dropzone
          v-if="hasCreateAccess && !dummy && isLoaded"
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
              <wt-loader size="sm"></wt-loader>
              <p>{{ loadedCount }}/{{ allLoadingCount }}</p>
            </div>
          </div>
          <div
            v-show="!isLoadingFiles"
            :title="$t('iconHints.upload')"
            class="dz-custom-message"
          >
            <wt-icon color="accent" icon="upload"></wt-icon>
            <div class="dz-message-text">
              <span class="dz-message-text__accent">
                {{ $t('objects.lookups.media.dragPlaceholder') }}
              </span>
              {{ $t('objects.lookups.media.dragPlaceholderHere') }}
            </div>
          </div>
        </vue-dropzone>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :text="$t(dummy.text)"
          class="dummy-wrapper"
        ></wt-dummy>
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper">
          <wt-table
            :data="dataList"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              {{ item.name }}
            </template>
            <template v-slot:createdAt="{ item }">
              {{ prettifyDate(item.createdAt) }}
            </template>
            <template v-slot:format="{ item }">
              {{ prettifyFormat(item.mimeType) }}
            </template>
            <template v-slot:size="{ item }">
              {{ prettifyFileSize(item.size) }}
            </template>
            <template v-slot:actions="{ item, index }">
              <media-file-preview-table-action
                :playing="index === playingIndex && currentlyPlaying"
                :type="item.mimeType"
                @open="openFile(item)"
                @play="play(index)"
              ></media-file-preview-table-action>
              <download-action
                @click="downloadFile(item)"
              ></download-action>
              <delete-action
                v-if="hasDeleteAccess"
                @click="callDelete(item)"
              ></delete-action>
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
          ></wt-pagination>
        </div>

        <wt-player
          v-show="audioLink"
          :src="audioLink"
          @close="closePlayer"
          @pause="currentlyPlaying = false"
          @play="currentlyPlaying = true"
        ></wt-player>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import prettifyFileSize from '@webitel/ui-sdk/src/scripts/prettifyFileSize';
import vueDropzone from 'vue2-dropzone';
import DownloadAction from '../../../../../app/components/actions/download-action.vue';
import DownloadFilesBtn from '../../../../../app/components/utils/download-files-btn.vue';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import { download } from '../../../../../app/utils/download';
import MediaAPI from '../api/media';
import TextToSpeechPopup from '../modules/text-to-speech/components/text-to-speech-popup.vue';
import MediaFilePreviewTableAction from './media-file-preview-table-action.vue';
import { useDummy } from '../../../../../app/composables/useDummy';

const token = localStorage.getItem('access-token');
const API_URL = process.env.VUE_APP_API_URL;
const namespace = 'lookups/media';

export default {
  name: 'the-media',
  mixins: [exportFilesMixin, tableComponentMixin],
  components: {
    DownloadAction,
    DownloadFilesBtn,
    vueDropzone,
    TextToSpeechPopup,
    MediaFilePreviewTableAction,
  },
  inject: ['$eventBus'],
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
  setup() {
    const { dummy } = useDummy({ namespace });
    return { dummy };
  },
  computed: {
    path() {
      return [
        { name: this.$t('objects.lookups.lookups') },
        {
          name: this.$tc('objects.lookups.media.mediaFiles', 2),
          route: '/lookups/media',
        },
      ];
    },
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
    // eslint-disable-next-line no-unused-vars
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
      return new Date(+date).toLocaleDateString();
    },
    prettifyFormat(format) {
      return format.split('/')
      .pop();
    },
    prettifyFileSize,
  },
  created() {
    this.initFilesExport({
      fetchMethod: this.getMediaList, // API call method
      filename: 'media', // name of downloaded file. default is 'files'
      filesURL: (id) => `${API_URL}/storage/media/${id}/download?access_token=${token}`, // Function. accepts file id param, and generates download link for file
    });
  },
};
</script>

<style lang="scss" scoped>
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
</style>
