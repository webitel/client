<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header>
        <headline-nav :path="path"></headline-nav>
        <template slot="actions">
          <download-files-btn
            :is-files-loading="isFilesLoading"
            :files-download-progress="filesDownloadProgress"
            :files-zipping-progress="filesZippingProgress"
            @export-files="exportFiles"
          ></download-files-btn>
        </template>
      </object-header>
    </template>

    <template slot="main">
      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.lookups.media.allMediaFiles') }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @input="setSearch"
              @search="loadList"
              @enter="loadList"
            ></wt-search-bar>
            <wt-icon-btn
              v-if="hasDeleteAccess"
              class="icon-action"
              :class="{'hidden': anySelected}"
              icon="bucket"
              :tooltip="$t('iconHints.deleteSelected')"
              @click="deleteSelected"
            ></wt-icon-btn>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            ></wt-table-actions>
          </div>
        </header>
        <vue-dropzone
          v-if="hasCreateAccess"
          id="dropzone"
          :options="dropzoneOptions"
          :destroy-dropzone="false"
          use-custom-slot
          duplicate-check
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
            class="dz-custom-message"
            :title="$t('iconHints.upload')"
          >
            <wt-icon icon="upload" color="accent"></wt-icon>
            <div class="dz-message-text">
              <span class="dz-message-text__accent">
                {{ $t('objects.lookups.media.dragPlaceholder') }}
              </span>
              {{ $t('objects.lookups.media.dragPlaceholderHere') }}
            </div>
          </div>
        </vue-dropzone>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
            sortable
            @sort="sort"
          >
            <template slot="name" slot-scope="{ item }">
              {{ item.name }}
            </template>
            <template slot="createdAt" slot-scope="{ item }">
              {{ prettifyDate(item.createdAt) }}
            </template>
            <template slot="format" slot-scope="{ item }">
              {{ prettifyFormat(item.mimeType) }}
            </template>
            <template slot="size" slot-scope="{ item }">
              {{ prettifyFileSize(item.size) }}
            </template>
            <template slot="actions" slot-scope="{ item, index }">
              <wt-icon-btn
                class="table-action"
                icon="download"
                :tooltip="$t('iconHints.download')"
                tooltip-position="left"
                @click="downloadFile(item)"
              ></wt-icon-btn>
              <div class="table-action table-action--iframe-wrap">
                <wt-icon-btn
                  icon="play"
                  v-show="index !== playingIndex || !currentlyPlaying"
                  :tooltip="$t('iconHints.play')"
                  tooltip-position="left"
                  @click="play(index)"
                ></wt-icon-btn>
                <iframe
                  v-show="index === playingIndex && currentlyPlaying"
                  :src="`${baseUrl}animations/equalizer/eq.html`"
                ></iframe>
              </div>
              <delete-action
                v-if="hasDeleteAccess"
                @click="remove(index)"
              ></delete-action>
            </template>
          </wt-table>
          <wt-pagination
            :size="size"
            :next="isNext"
            :prev="page > 1"
            debounce
            @next="nextPage"
            @prev="prevPage"
            @input="setSize"
            @change="loadList"
          ></wt-pagination>
        </div>

        <wt-player
          v-show="audioLink"
          :src="audioLink"
          @play="currentlyPlaying = true"
          @pause="currentlyPlaying = false"
          @close="closePlayer"
        ></wt-player>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import vueDropzone from 'vue2-dropzone';
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import prettifyFileSize from '@webitel/ui-sdk/src/scripts/prettifyFileSize';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import DownloadFilesBtn from '../../../../../app/components/utils/download-files-btn.vue';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import { download } from '../../../../../app/utils/download';
import { getMediaList } from '../api/media';

const token = localStorage.getItem('access-token');
const API_URL = process.env.VUE_APP_API_URL;

export default {
  name: 'the-media',
  mixins: [exportFilesMixin, tableComponentMixin],
  components: {
    DownloadFilesBtn,
    vueDropzone,
  },
  data() {
    return {
      namespace: 'lookups/media',
      baseUrl: process.env.BASE_URL, // to resolve iframe equalizer path after build

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
        acceptedFiles: '.mp3, .wav, .mpeg',
        uploadMultiple: true,
      },
    };
  },
  created() {
    this.initFilesExport({
      fetchMethod: this.getMediaList, // API call method
      filename: 'media', // name of downloaded file. default is 'files'
      filesURL: (id) => `${API_URL}/storage/media/${id}/download?access_token=${token}`, // Function. accepts file id param, and generates download link for file
    });
  },
  computed: {
    path() {
      return [
        { name: this.$t('objects.lookups.lookups') },
        { name: this.$tc('objects.lookups.media.mediaFiles', 2), route: '/lookups/media' },
      ];
    },
  },

  methods: {
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
      eventBus.$emit('notification', { type: 'error', text: message.message });
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
      this.audioLink = null;
    },
    async getMediaList(params) {
      const response = await getMediaList(params);
      return { items: response.list, next: response.next };
    },
    prettifyDate(date) {
      return new Date(+date).toLocaleDateString();
    },
    prettifyFormat(format) {
      return format.split('/').pop();
    },
    prettifyFileSize,
  },
};
</script>

<style lang="scss" scoped>
.progress-count {
  display: flex;
  justify-content: center;
  align-items: center;

  .wt-loader {
    display: inline-block;
    margin-bottom: 3px;
    margin-right: var(--icon-spacing);
  }
}

.table-action--iframe-wrap {
  width: var(--icon-md-size);
  height: var(--icon-md-size);
  overflow: hidden;
}
</style>
