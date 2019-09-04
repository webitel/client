<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.lookups.lookups')}} |
            {{$tc('objects.lookups.contactType.contactType', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header page-header">
                <h3 class="content-title">{{$t('objects.lookups.contactType.allContactTypes')}}</h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="contactTypeList"
            >
                <template slot="contactTypeName" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink"  @click="action('edit', props.rowIndex)">
                        {{contactTypeList[props.rowIndex].name}}
                        </span>
                    </div>
                </template>

                <template slot="contactTypeDescription" slot-scope="props">
                    <div>
                        {{contactTypeList[props.rowIndex].description || 'DESCRIPTION IS EMPTY'}}
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
        name: "the-contact-type",
        components: {
            'object-header': objectHeader,
            vuetable,
        },
        data() {
            return {
                contactTypeList: [],
                // vuetable prop
                fields: [
                    {name: 'contactTypeName', title: this.$t('objects.name')},
                    {name: 'contactTypeDescription', title: this.$t('objects.description')},
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
            this.loadContactTypeList();
        },
        methods: {
            create() {
                this.$router.push('/lookups/contact-type/new');
            },

            action(action, rowId) {
                if (action === 'edit') {
                    this.$router.push({
                        name: 'contact-type-lookup-edit',
                        params: {id: this.contactTypeList[rowId].id},
                    });
                } else if (action === 'delete') {
                    // remove skill
                    const deletedcontactType = this.contactTypeList.splice(rowId, 1)[0];
                }
            },

            loadContactTypeList() {
                for(let i = 0; i < 10; i++) {
                    this.contactTypeList.push({
                        name: 'contact  Type ' + i,
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