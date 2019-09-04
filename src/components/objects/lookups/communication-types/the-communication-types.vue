<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.lookups.lookups')}} |
            {{$tc('objects.lookups.communications.communications', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header page-header">
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
                        <span class="nameLink"  @click="action('edit', props.rowIndex)">
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
                    <div class="vuetable-actions">
                        <i class="vuetable-action icon-icon_edit"
                           @click="action('edit', props.rowIndex)"
                        ></i>
                        <i class="vuetable-action icon-icon_delete"
                           @click="action('delete', props.rowIndex)"
                        ></i>
                    </div>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '@/components/objects/object-header';

    export default {
        name: "the-communication-types",
        components: {
            'object-header': objectHeader,
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
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '120px'
                    },
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

            action(action, rowId) {
                if (action === 'edit') {
                    this.$router.push({
                        name: 'communications-lookup-edit',
                        params: {id: this.communicationsList[rowId].id},
                    });
                } else if (action === 'delete') {
                    // remove skill
                    const deletedCommunications = this.communicationsList.splice(rowId, 1)[0];
                }
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