<template>
    <div class="content-wrap">

        <object-header
                :primaryAction="create"
        >
            {{$t('objects.lookups.lookups')}} |
            {{$tc('objects.lookups.contactType.contactType', 2)}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.lookups.contactType.allContactTypes')}}</h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="contactTypeList"
            >
                <template slot="contactTypeName" slot-scope="props">
                    <div>
                        <span class="nameLink" @click="edit(props.rowIndex)">
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
    import { _actionsTableField_2 } from '@/utils/tableFieldPresets';
    import objectHeader from '../../object-utils/the-object-header';

    export default {
        name: 'the-contact-type',
        components: {
            objectHeader,
            vuetable,
        },
        data() {
            return {
                contactTypeList: [],
                // vuetable prop
                fields: [
                    { name: 'contactTypeName', title: this.$t('objects.name') },
                    { name: 'contactTypeDescription', title: this.$t('objects.description') },
                    _actionsTableField_2,
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

            edit(rowId) {
                this.$router.push({
                    name: 'contact-type-lookup-edit',
                    params: { id: this.contactTypeList[rowId].id },
                });
            },

            remove(rowId) {
                const deletedcontactType = this.contactTypeList.splice(rowId, 1)[0];
            },

            loadContactTypeList() {
                for (let i = 0; i < 10; i++) {
                    this.contactTypeList.push({
                        name: `contact  Type ${i}`,
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
