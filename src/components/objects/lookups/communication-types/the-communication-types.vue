<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.lookups.lookups')}} |
            {{$tc('objects.lookups.communications.communications', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.lookups.communications.allCommunications')}}</h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="communicationsList"
            >
                <template slot="communicationCode" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink"  @click="edit(props.rowIndex)">
                        {{communicationsList[props.rowIndex].code}}
                        </span>
                    </div>
                </template>

                <template slot="communicationName" slot-scope="props">
                    <div>
                        {{communicationsList[props.rowIndex].name}}
                    </div>
                </template>

                <template slot="communicationDescription" slot-scope="props">
                    <div>
                        {{communicationsList[props.rowIndex].description || 'DESCRIPTION IS EMPTY'}}
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
    </div>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '@/components/objects/the-object-header';
    import {_checkboxTableField, _actionsTableField_2} from "@/utils/tableFieldPresets";

    export default {
        name: "the-communication-types",
        components: {
            objectHeader,
            vuetable,
        },
        data() {
            return {
                communicationsList: [],
                // vuetable prop
                fields: [
                    {name: 'communicationCode', title: this.$t('objects.lookups.communications.code')},
                    {name: 'communicationName', title: this.$t('objects.name')},
                    {name: 'communicationDescription', title: this.$t('objects.description')},
                    _actionsTableField_2,
                ],
            };
        },
        mounted() {
            this.loadComunicationsList();
        },
        methods: {
            create() {
                this.$router.push('/lookups/communications/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'communications-lookup-edit',
                    params: {id: this.communicationsList[rowId].id},
                });
            },

            remove(rowId) {
                const deletedCommunications = this.communicationsList.splice(rowId, 1)[0];
            },

            loadComunicationsList() {
                for (let i = 0; i < 10; i++) {
                    this.communicationsList.push({
                        code: 'A' + i,
                        name: 'Communication ' + i,
                        description: 'Description',
                        id: i
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>