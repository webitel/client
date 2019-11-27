<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
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
                    {{dataList[props.rowIndex].capacity}}
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
    </section>
</template>

<script>
    import openedAgentSkillsPopup from './opened-agent-skills-popup';
    import tableComponentMixin from '@/mixins/tableComponentMixin';
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {_actionsTableField_2} from "@/utils/tableFieldPresets";

    export default {
        name: "opened-agent-skills",
        components: {
            'skill-popup': openedAgentSkillsPopup
        },
        mixins: [openedTabComponentMixin, tableComponentMixin],
        data() {
            return {
                fields: [
                    {name: 'name', title: this.$tc('objects.ccenter.skills.skills', 2)},
                    {name: 'capacity', title: this.$t('objects.ccenter.agents.skillCapacity')},
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
                for(let i = 0; i < 10; i++) {
                    this.dataList.push({
                        skill: {
                            id: i,
                            name: 'skillname '+i,
                        },
                        capacity:Math.random()*10*i
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>