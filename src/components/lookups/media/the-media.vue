<template>
    <div class="content-wrap">
        <object-header
                hide-primary-action
        >
            {{$t('objects.lookups.lookups')}} |
            {{$tc('objects.lookups.media.mediaFiles', 2)}}
        </object-header>

        <!--        <textToSpeechPopup-->
        <!--                v-if="popupTriggerIf"-->
        <!--                @close="popupTriggerIf = false"-->
        <!--        ></textToSpeechPopup>-->

        <section class="object-content" ref="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.lookups.media.allMediaFiles')}}</h3>
                <div class="content-header__actions-wrap">
                    <search
                            v-model="search"
                            @filterData="loadList"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            :title="$t('iconHints.deleteSelected')"
                            @click="deleteSelected"
                    ></i>
                    <i
                            class="icon-action icon-icon_download"
                            :title="$t('iconHints.downloadAll')"
                            @click="downloadAll"
                    ></i>
                    <!--                    <i class="icon-action icon-icon_text-to-speech" @click="openPopup"></i>-->
                    <i
                            class="icon-icon_reload icon-action"
                            :title="$t('iconHints.reload')"
                            @click="loadList"
                    ></i>
                </div>
            </header>
            <vue-dropzone
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
                        <span>{{loadedCount}}</span>/<span>{{allLoadingCount}}</span>
                    </div>
                </div>
                <div
                        v-show="!isLoadingFiles"
                        class="dz-custom-message"
                        :title="$t('iconHints.upload')"
                >
                    <i
                            class="icon-icon_upload"
                    ></i>
                    <div class="dz-message-text">
                        <span class="dz-message-text__accent">
                            {{$t('objects.lookups.media.dragPlaceholder')}}
                        </span>
                        {{$t('objects.lookups.media.dragPlaceholderHere')}}
                    </div>
                </div>
            </vue-dropzone>

            <loader v-show="!isLoaded"></loader>

            <vuetable
                    v-show="isLoaded"
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >
                <template slot="name" slot-scope="props">
                    <div>
                        {{dataList[props.rowIndex].name}}
                    </div>
                </template>

                <template slot="createdAt" slot-scope="props">
                    <div>
                        {{computeDate(dataList[props.rowIndex].createdAt)}}
                    </div>
                </template>

                <template slot="format" slot-scope="props">
                    <div>
                        {{computeFormat(dataList[props.rowIndex].mimeType)}}
                    </div>
                </template>

                <template slot="size" slot-scope="props">
                    <div>
                        {{computeSize(dataList[props.rowIndex].size)}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_download"
                       :title="$t('iconHints.download')"
                       @click="downloadFile(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_play"
                       :title="$t('iconHints.edit')"
                       @click="play(props.rowIndex)"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
                       :title="$t('iconHints.delete')"
                       @click="remove(props.rowIndex)"
                    ></i>
                </template>
            </vuetable>
            <pagination
                    v-show="isLoaded"
                    v-model="size"
                    @loadDataList="loadList"
                    @next="nextPage"
                    @prev="prevPage"
                    :isNext="isNextPage"
                    :isPrev="!!page"
            ></pagination>
        </section>
        <audio-player
                v-show="playerTriggerShow"
                :file="audioLink"
                @close="playerTriggerShow = false"
        ></audio-player>
    </div>
</template>

<script>
    import jszip from 'jszip';
    import jszipUtils from 'jszip-utils';
    import {saveAs} from 'file-saver';
    import vueDropzone from 'vue2-dropzone';
    import audioPlayer from '../../utils/audio-player';
    import textToSpeechPopup from './media-text-to-speech-popup';
    import tableComponentMixin from '../../../mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_3} from "../../../utils/tableFieldPresets";
    import eventBus from "../../../utils/eventBus";
    import {mapActions, mapState} from "vuex";
    import {download} from "../../../utils/download";


    const token = localStorage.getItem('access-token');
    const BASE_URL = process.env.VUE_APP_API_URL;

    export default {
        name: "the-media",
        mixins: [tableComponentMixin],
        components: {
            vueDropzone,
            audioPlayer,
            textToSpeechPopup
        },
        data() {
            return {
                isLoadingFiles: false,
                loadedCount: 0,
                allLoadingCount: 0,
                // audioLink: 'https://mn1.sunproxy.net/file/WjdlSU1UMjBsQWszeGtDSWdCcWxHUlVJQ3FQbVVzSkY3OHF6WENtbUl4clF4UnVxNjhxUWF0ajY3WGR5bEVUQlJSeXpSa1JEQjEzZzBmVlFUclFnZlZQTEdlVFdKS2wwSUszUHFsUlZ2cWM9/Pskovskoe_-_Post_punk_version_(mp3.mn).mp3',
                audioLink: '',
                playerTriggerShow: false,

                dropzoneOptions: {
                    url: `${BASE_URL}/storage/media?access_token=${token}`,
                    thumbnailWidth: 150,
                    // maxFilesize: 0.5,
                    acceptedFiles: '.mp3, .wav, .mpeg',
                    uploadMultiple: true,
                },
                fields: [
                    _checkboxTableField,
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'createdAt', title: this.$t('objects.lookups.media.createdAt')},
                    {name: 'format', title: this.$t('objects.lookups.media.format')},
                    {name: 'size', title: this.$t('objects.lookups.media.size')},
                    _actionsTableField_3,
                ],
            };
        },

        computed: {
            ...mapState('lookups/media', {
                dataList: state => state.dataList,
                page: state => state.page, // acts like a boolean: if page is 0, there's no back page
                isNextPage: state => state.isNextPage,
            }),

            size: {
                get() {
                    return this.$store.state.lookups.media.size
                },
                set(value) {
                    this.setSize(value)
                }
            },

            search: {
                get() {
                    return this.$store.state.lookups.media.search
                },
                set(value) {
                    this.setSearch(value)
                }
            },
        },

        methods: {
            async downloadFile(rowId) {
                const item = this.dataList[rowId];
                const id = item.id;
                const url = `${BASE_URL}/storage/media/${id}/download?access_token=${token}`;
                download(url, item.name);
            },

            async downloadAll() {
                const zip = new jszip();
                for (const item of this.dataList) {
                    const id = item.id;
                    const url = `${BASE_URL}/storage/media/${id}/stream?access_token=${token}`;
                    await new Promise((resolve, reject) => jszipUtils.getBinaryContent(url, (err, data) => {
                        if (err) {
                            reject();
                        } else {
                            zip.file(item.name, data);
                            resolve();
                        }
                    }));
                }
                const file = await zip.generateAsync({type: 'blob'});
                saveAs(file, 'z.zip');
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
                this.loadedCount++;
            },

            // dropzone event firing on ech file load
            // used for updating loaded files number on UI
            onFileError(file, message) {
                this.loadedCount++;
                eventBus.$emit('notificationError', message.message);
            },

            // dropzone event firing on all files loaded and sended
            // used for animation end and list update
            onComplete() {
                this.isLoadingFiles = false;
                this.loadList();
            },

            async play(rowId) {
                const id = this.dataList[rowId].id;
                this.playerTriggerShow = true;
                this.audioLink = `${BASE_URL}/storage/media/${id}/stream?access_token=${token}`;
            },

            computeDate(date) {
                return new Date(+date).toLocaleDateString();
            },

            computeFormat(format) {
                return format.split('/').pop();
            },

            ...mapActions('lookups/media', {
                loadDataList: 'LOAD_DATA_LIST',
                loadItem: 'GET_ITEM',
                setSize: 'SET_SIZE',
                setSearch: 'SET_SEARCH',
                nextPage: 'NEXT_PAGE',
                prevPage: 'PREV_PAGE',
                removeItem: 'REMOVE_ITEM',
            }),

            computeSize(size, nospace, one) {
                const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB'];
                let resultSize, f;

                sizes.forEach((f, id) => {
                    if (one) {
                        f = f.slice(0, 1);
                    }
                    let s = Math.pow(1024, id), fixed;
                    if (size >= s) {
                        fixed = String((size / s).toFixed(1));
                        if (fixed.indexOf('.0') === fixed.length - 2) {
                            fixed = fixed.slice(0, -2);
                        }
                        resultSize = fixed + (nospace ? '' : ' ') + f;
                    }
                });

                // zero handling
                // always prints in Bytes
                if (!resultSize) {
                    f = (one ? sizes[0].slice(0, 1) : sizes[0]);
                    resultSize = '0' + (nospace ? '' : ' ') + f;
                }

                return resultSize;
            },
        }
    }
</script>

<style lang="scss">
    .dz-custom-message i:before {
        color: $accent-color;
    }

    .new-file {
        background: rgba(255, 193, 7, 0.1);
    }
</style>