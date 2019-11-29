<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.skills.skills', 2)}}</h3>
            <i class="icon-action icon-icon_plus" @click="popupTriggerIf = true"></i>
        </header>

        <skill-popup
                v-if="popupTriggerIf"
                :value="dataList[editedIndex]"
                @addItem="addItem"
                @close="closePopup"
        >

        </skill-popup>

        <vuetable
                :api-mode="false"
                :fields="fields"
                :data="dataList"
        >
            <template slot="name" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].skill.name}}
                </div>
            </template>

            <template slot="capacity" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].capacity[0]}} - {{dataList[props.rowIndex].capacity[1]}}
                </div>
            </template>

            <template slot="level" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].level}}
                </div>
            </template>

            <template slot="bucket" slot-scope="props">
                <div>
                    {{dataList[props.rowIndex].bucket.name}}
                </div>
            </template>

            <template slot="actions" slot-scope="props">
                <i class="vuetable-action icon-icon_edit"
                   @click="edit(props.rowIndex)"
                ></i>
                <i class="vuetable-action icon-icon_delete"
                   @click="remove(props.rowIndex)"
                ></i>
            </template>
        </vuetable>
        <pagination/>
    </section>
</template>

<script>
    import openedTeamSkillsPopup from './opened-team-skills-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_actionsTableField_2} from "@/utils/tableFieldPresets";

    export default {
        name: "opened-team-skills",
        components: {
            'skill-popup': openedTeamSkillsPopup
        },
        mixins: [openedTabComponentMixin, tableComponentMixin],
        data() {
            return {
                fields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'capacity', title: this.$t('objects.ccenter.skills.capacity')},
                    {name: 'level', title: this.$t('objects.ccenter.teams.level')},
                    {name: 'bucket', title: this.$tc('objects.ccenter.buckets.buckets', 1)},
                    _actionsTableField_2,
                ],
                editedIndex: null,
            }
        },

        methods: {
            closePopup() {
                this.popupTriggerIf = false;
                this.editedIndex = null;
            },

            addItem(item) {
                this.dataList.push(item);
                this.popupTriggerIf = false;
            },

            edit(rowIndex) {
                this.editedIndex = rowIndex;
                this.popupTriggerIf = true;
            },

            loadDataList() {
                for (let i = 0; i < 10; i++) {
                    this.dataList.push({
                        skill: {
                            id: i,
                            name: 'skillname ' + i,
                        },
                        capacity: [i, i**i],
                        level: i + 1,
                        bucket: {name: 'Bucket name'}
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>