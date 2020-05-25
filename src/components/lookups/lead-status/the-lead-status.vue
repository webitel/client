<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.lookups.lookups')}} |
            {{$t('objects.lookups.leadStatus.leadStatus')}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.lookups.leadStatus.allStatuses')}}</h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="leadStatusList"
            >
                <template slot="leadStatusName" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink"  @click="action('edit', props.rowIndex)">
                        {{leadStatusList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="leadStatusDescription" slot-scope="props">
                    <div>
                        {{leadStatusList[props.rowIndex].description || 'DESCRIPTION IS EMPTY'}}
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
    import objectHeader from '../../object-utils/the-object-header';

    export default {
        name: 'the-lead-status',
        components: {
            'object-header': objectHeader,
            vuetable,
        },
        data() {
            return {
                leadStatusList: [],
                // vuetable prop
                fields: [
                    { name: 'leadStatusName', title: this.$t('objects.name') },
                    { name: 'leadStatusDescription', title: this.$t('objects.description') },
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '120px',
                    },
                ],
            };
        },
        mounted() {
            this.loadLeadStatusList();
        },
        methods: {
            create() {
                this.$router.push('/lookups/skills/new');
            },

            edit(rowId) {
                this.$router.push({
                    name: 'lead-status-lookup-edit',
                    params: { id: this.leadStatusList[rowId].id },
                });
            },

            remove(rowId) {
                const deletedLeadStatus = this.leadStatusList.splice(rowId, 1)[0];
            },

            loadLeadStatusList() {
                for (let i = 0; i < 10; i++) {
                    this.leadStatusList.push({
                        name: `Lead status name ${i}`,
                        description: 'Description',
                        id: i,
                    });
                }
            },
        },
    };
</script>

<style scoped>

</style>
