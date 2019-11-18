<template>
    <div class="content-wrap">
        <object-header
        >
            {{$t('objects.lookups.lookups')}} |
            {{$tc('objects.lookups.media.mediaFiles', 2)}}
        </object-header>

        <textToSpeechPopup v-if="popupTriggerIf" @close="popupTriggerIf = false"></textToSpeechPopup>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.lookups.media.allMediaFiles')}}</h3>
                <div class="content-header__actions-wrap">
                    <search
                            @filterData="filterData"
                    ></search>
                    <i
                            class="icon-icon_delete icon-action"
                            :class="{'hidden': anySelected}"
                            @click="deleteSelected"
                    ></i>
                    <i class="icon-action icon-icon_upload"></i>
                    <i class="icon-action icon-icon_upload"></i>
                    <i class="icon-action icon-icon_upload" @click="openPopup"></i>
                </div>
            </header>

            <vuetable
                    :api-mode="false"
                    :fields="fields"
                    :data="filteredDataList"
            >
                <template slot="name" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].name}}
                    </div>
                </template>

                <template slot="createdAt" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].createdAt}}
                    </div>
                </template>

                <template slot="format" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].format}}
                    </div>
                </template>

                <template slot="size" slot-scope="props">
                    <div>
                        {{filteredDataList[props.rowIndex].size}}
                    </div>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_check"
                    ></i>
                    <i class="vuetable-action icon-icon_edit"
                    ></i>
                    <i class="vuetable-action icon-icon_delete"
                       @click="remove(props.rowIndex)"
                    ></i>
                </template>
            </vuetable>
            <pagination></pagination>
        </section>
    </div>
</template>

<script>
    import textToSpeechPopup from './media-text-to-speech-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import {_checkboxTableField, _actionsTableField_3} from "@/utils/tableFieldPresets";

    export default {
        name: "the-media",
        mixins: [tableComponentMixin],
        components: {
            textToSpeechPopup
        },
        data() {
            return {
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

        methods: {
            openPopup() {
                this.popupTriggerIf = true;
            },

            async deleteItem(item) {
                // await deleteCommunication(item.id);
            },

            async loadDataList() {
                // this.dataList = await getCommunicationsList();
                for(let i = 0; i < 4; i++) {
                    this.dataList.push({
                        name: 'media name '+i,
                        createdAt: (Math.random()*Date.now()).toLocaleString(),
                        format: '.wav',
                        size: Math.round(Math.random()*100, 2)+' Kb',
                        isSelected: false,
                    });
                }
                this.filterData();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>