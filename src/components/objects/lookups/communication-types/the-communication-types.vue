<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.lookups.lookups')}} |
            {{$tc('objects.lookups.leadSource.leadSource', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header page-header">
                <h3 class="content-title">{{$t('objects.lookups.leadSource.allSources')}}</h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="leadSourceList"
            >
                <template slot="leadSourceName" slot-scope="props">
                    <div>
                        {{leadSourceList[props.rowIndex].name}}
                    </div>
                </template>

                <template slot="leadSourceDescription" slot-scope="props">
                    <div>
                        {{leadSourceList[props.rowIndex].description || 'DESCRIPTION IS EMPTY'}}
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
        name: "the-lead-status",
        components: {
            'object-header': objectHeader,
            vuetable,
        },
        data() {
            return {
                leadSourceList: [],
                // vuetable prop
                fields: [
                    {name: 'leadSourceName', title: this.$t('objects.name')},
                    {name: 'leadSourceDescription', title: this.$t('objects.description')},
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
            this.loadLeadStatusList();
        },
        methods: {
            create() {
                this.$router.push('/lookups/lead-source/new');
            },

            action(action, rowId) {
                if (action === 'edit') {
                    this.$router.push({
                        name: 'lead-source-lookup-edit',
                        params: {id: this.leadSourceList[rowId].id},
                    });
                } else if (action === 'delete') {
                    // remove skill
                    const deletedLeadSource = this.leadSourceList.splice(rowId, 1)[0];
                }
            },

            loadLeadStatusList() {
                for(let i = 0; i < 10; i++) {
                    this.leadSourceList.push({
                        name: 'Lead source ' + i,
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