<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="the-media table-page"
  >
    <template #header>
      <wt-page-header hide-primary>
        <wt-breadcrumb :path="path" />
        <template #actions>
          <wt-button
            :loading="isZipDownloading"
            @click="downloadZip"
          >
            {{ t('utils.downloadFilesBtn.downloadFiles') }}
          </wt-button>
        </template>
      </wt-page-header>
    </template>

    <template #main>
      <text-to-speech-popup
        v-if="isTextToSpeechOpened"
        @close="closeTextToSpeech"
        @saved="loadDataList"
      />

      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.lookups.media.allMediaFiles') }}
          </h3>
          <wt-action-bar
            :include="[IconAction.REFRESH, IconAction.DELETE]"
            :disabled:delete="!hasDeleteAccess || !selected.length"
            @click:refresh="loadDataList"
            @click:delete="
              askDeleteConfirmation({
                deleted: selected,
                callback: () => deleteEls(selected),
              })
            "
          >
            <template #search-bar>
              <dynamic-filter-search
                :filters-manager="filtersManager"
                :is-filters-restoring="isFiltersRestoring"
                @filter:add="addFilter"
                @filter:update="updateFilter"
                @filter:delete="deleteFilter"
              />
            </template>
            <wt-icon-btn
              v-tooltip="t('objects.lookups.media.tts.hint')"
              :disabled="!hasCreateAccess"
              icon="tts-download"
              @click="openTextToSpeech"
            />
          </wt-action-bar>
        </header>

        <div
          v-if="hasCreateAccess"
          ref="dropZone"
          :class="{ 'the-media__dropzone--over': isOverDropZone }"
          :title="t('iconHints.upload')"
          class="the-media__dropzone"
          @click="openFileDialog"
        >
          <wt-loader
            v-if="isUploading"
            :size="ComponentSize.SM"
          />
          <template v-else>
            <wt-icon
              color="primary"
              icon="upload"
            />
            <span>
              <span class="the-media__dropzone-accent">
                {{ t('objects.lookups.media.dragPlaceholder') }}
              </span>
              {{ t('objects.lookups.media.dragPlaceholderHere') }}
            </span>
          </template>
        </div>

        <div class="table-section__table-wrapper">
          <wt-empty
            v-show="showEmpty"
            :image="imageEmpty"
            :text="textEmpty"
          />

          <wt-loader v-show="isLoading" />

          <wt-table
            v-show="dataList.length && !isLoading"
            :data="dataList"
            :headers="headers"
            :selected="selected"
            reorderable-columns
            resizable-columns
            sortable
            @column-reorder="columnReorder"
            @column-resize="columnResize"
            @sort="updateSort"
            @update:selected="updateSelected"
          >
            <template #name="{ item }">
              {{ item.name }}
            </template>
            <template #createdAt="{ item }">
              {{ formatDate(Number(item.createdAt), FormatDateMode.DATE) }}
            </template>
            <template #format="{ item }">
              {{ getMediaFileFormat(item) }}
            </template>
            <template #size="{ item }">
              {{ prettifyFileSize(item.size) }}
            </template>
            <template #actions="{ item }">
              <wt-icon-btn
                v-if="item.mimeType?.includes('audio')"
                v-tooltip="getPlayAction(item).hint"
                v-bind="getPlayAction(item).attrs"
              />
              <wt-icon-btn
                v-else
                :icon="getFileTypeIcon(item.mimeType, { fallback: 'docs' })"
                @click="openFile(item)"
              />
              <wt-loader
                v-if="isFileDownloading(item.id)"
                :size="ComponentSize.SM"
              />
              <wt-icon-action
                v-else
                action="download"
                @click="downloadFile(item)"
              />
              <wt-icon-action
                :disabled="!hasDeleteAccess"
                action="delete"
                @click="
                  askDeleteConfirmation({
                    deleted: [item],
                    callback: () => deleteEls([item]),
                  })
                "
              />
            </template>
          </wt-table>

          <wt-pagination
            :next="next"
            :prev="page > 1"
            :size="size"
            debounce
            @change="updateSize"
            @next="updatePage(page + 1)"
            @prev="updatePage(page - 1)"
          />
        </div>

        <wt-player
          v-if="playerSrc"
          :src="playerSrc"
          @close="closePlayer"
        />
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import {
	getMediaDownloadUrl,
	getMediaStreamUrl,
	MediaAPI,
} from '@webitel/api-services/api';
import type { StorageMediaFile } from '@webitel/api-services/gen/models';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { WtPlayer } from '@webitel/ui-sdk/components';
import { useDownloadAction } from '@webitel/ui-sdk/composables';
import {
	ComponentSize,
	FormatDateMode,
	IconAction,
} from '@webitel/ui-sdk/enums';
import { useFilesExport } from '@webitel/ui-sdk/modules/FilesExport';
import {
	getFileTypeIcon,
	openStorageFileInNewTab,
} from '@webitel/ui-sdk/scripts/file';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import prettifyFileSize from '@webitel/ui-sdk/src/scripts/prettifyFileSize';
import { formatDate } from '@webitel/ui-sdk/utils';
import { saveAs } from 'file-saver-es';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useMediaPlayer } from '../composables/useMediaPlayer';
import { useMediaUpload } from '../composables/useMediaUpload';
import { getMediaUrlAuth } from '../scripts/getMediaUrlAuth';
import { useMediaDatalistStore } from '../stores/datalist/mediaDatalistStore';
import TextToSpeechPopup from './text-to-speech-popup.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { hasCreateAccess, hasDeleteAccess } = useUserAccessControl();

const mediaDatalistStore = useMediaDatalistStore();

const {
	dataList,
	selected,
	error,
	isLoading,
	page,
	size,
	next,
	headers,
	filtersManager,
	isFiltersRestoring,
} = storeToRefs(mediaDatalistStore);

const {
	initialize,
	loadDataList,
	updateSelected,
	updatePage,
	updateSize,
	updateSort,
	columnResize,
	columnReorder,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
} = mediaDatalistStore;

initialize();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

/** [Claude] for both the row download and the zip export: the table row and the export item both carry `id` */
const getDownloadUrl = ({ id }: { id?: unknown }) =>
	getMediaDownloadUrl(String(id), {
		auth: getMediaUrlAuth(),
	});

const { exportFiles, downloadStatus: filesDownloadProgress } = useFilesExport({
	getFileURL: ({ id }) =>
		getDownloadUrl({
			id,
		}),
	fetch: async (params) => {
		if (selected.value.length)
			return {
				items: selected.value,
				next: false,
			};
		return MediaAPI.getList(params);
	},
	filename: 'media',
	skipFilesWithError: true,
});

/* [Claude] separate instances: a row download must not spin the zip button and vice versa */
const { isLoading: isZipDownloading, runDownload: runZipDownload } =
	useDownloadAction();
const { isKeyLoading: isFileDownloading, runDownload: runFileDownload } =
	useDownloadAction();

/* [Claude] backend gives no total count, so the toast shows only the loaded count */
const downloadZip = () =>
	runZipDownload(exportFiles, {
		progress: {
			loaded: () => filesDownloadProgress.value.count,
		},
	});

/* [Claude] fetched instead of a plain link, so we know when the download ends – for the loader and toasts */
const downloadFile = (item: StorageMediaFile) =>
	runFileDownload(
		async () => {
			const response = await fetch(getDownloadUrl(item));
			if (!response.ok) throw new Error(response.statusText);
			saveAs(await response.blob(), item.name);
		},
		{
			key: item.id,
		},
	);

const path = computed(() => [
	{
		name: t('objects.lookups.lookups'),
	},
	{
		name: t('objects.lookups.media.mediaFiles', 2),
		route: '/lookups/media',
	},
]);

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});

const { dropZone, isOverDropZone, isUploading, openFileDialog } =
	useMediaUpload({
		onUploaded: loadDataList,
	});

const { playerSrc, play, closePlayer, isPlaying } = useMediaPlayer();

/** [Claude] play/stop toggle of an audio row: a playing file shows stop, which closes the player */
const getPlayAction = computed(() => (item: StorageMediaFile) => {
	const playing = isPlaying(item);
	return {
		hint: t(playing ? 'iconHints.stop' : 'iconHints.play'),
		attrs: {
			icon: playing ? 'stop' : 'play',
			onClick: () => (playing ? closePlayer() : play(item)),
		},
	};
});

/** [Claude] the popup lives on `/lookups/media/new`, so it survives a reload and can be linked */
const isTextToSpeechOpened = computed(() => route.params.mediaId === 'new');

const openTextToSpeech = () => {
	closePlayer();
	router.push({
		name: RouteNames.MEDIA,
		params: {
			mediaId: 'new',
		},
		query: route.query,
	});
};

const closeTextToSpeech = () =>
	router.replace({
		name: RouteNames.MEDIA,
		query: route.query,
	});

const getMediaFileFormat = ({ name = '', mimeType = '' }: StorageMediaFile) => {
	const parts = name.split('.');
	const format = parts.length > 1 ? parts.at(-1) : null;
	return format || mimeType.split('/').pop() || 'N/A';
};

const openFile = ({ id = '', name = '' }: StorageMediaFile) => {
	// Navigating to the stream URL put the token in the address bar and rendered
	// the file as a same-origin document, so an uploaded `.html` ran script in
	// the app's origin. The helper fetches the bytes and opens a blob instead.
	openStorageFileInNewTab({
		url: getMediaStreamUrl(id, {
			auth: getMediaUrlAuth(),
		}),
		name,
	});
};
</script>

<style scoped>
.the-media__dropzone {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  border: 2px dashed var(--primary-color);
  border-radius: var(--border-radius);
  background: var(--content-wrapper-color);
  cursor: pointer;
}

.the-media__dropzone--over {
  border-style: solid;
}

.the-media__dropzone-accent {
  color: var(--primary-color);
}
</style>
