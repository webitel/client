<template>
    <div>
        <object-header>
            {{$t('objects.permissions.permissions')}} |
            {{$t('objects.permissions.object.object')}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">
                    {{$t('objects.permissions.object.allObjects')}}
                </h3>
            </header>

            <vuetable
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >

                <template slot="name" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                            {{dataList[props.rowIndex].class}}
                        </span>
                    </div>
                </template>

                <template slot="obac" slot-scope="props">
                    <switcher
                            class="test__object-switcher__obac"
                            :value="dataList[props.rowIndex].obac"
                            @toggleSwitch="toggleDataProperty('obac', props.rowIndex)"
                    ></switcher>
                </template>

                <template slot="rbac" slot-scope="props">
                    <switcher
                            class="test__object-switcher__rbac"
                            :value="dataList[props.rowIndex].rbac"
                            @toggleSwitch="toggleDataProperty('rbac', props.rowIndex)"
                    ></switcher>
                </template>

                <template slot="actions" slot-scope="props">
                    <div class="vuetable-actions__wrap">
                        <i class="vuetable-action icon-icon_edit"
                           @click="edit(props.rowIndex)"
                        ></i>
                    </div>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '@/components/objects/the-object-header';
    import switcher from '@/components/utils/switcher';

    import {getObjects, updateObject} from '@/api/objects/permissions/objects';

    export default {
        name: "the-objects-permissions",
        components: {
            'object-header': objectHeader,
            switcher,
            vuetable,
        },
        data() {
            return {
                dataList: [], // list of all objects to show

                // vuetable prop
                fields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'obac', title: this.$t('objects.permissions.object.ObAC')},
                    {name: 'rbac', title: this.$t('objects.permissions.object.RbAC')},
                    {
                        name: 'actions',
                        title: '',
                        titleClass: 'vuetable-td-actions',
                        dataClass: 'vuetable-td-actions',
                        width: '60px'
                    },
                ],
            };
        },
        mounted() {
            this.loadDataList();
        },
        methods: {
            edit(rowId) {
                this.$router.push({
                    name: 'permissions-objects-edit',
                    params: {id: this.dataList[rowId].id},
                });
            },

            // toggle object permissions
            async toggleDataProperty(property, id) {
                // first, change UI, then send request
                this.dataList[id][property] = !this.dataList[id][property];

                try {
                    await updateObject(this.dataList[id].id, this.dataList[id]);
                } catch (err) {
                    // if request throws error, move changes back
                    this.dataList[id][property] = !this.dataList[id][property];
                }
            },

            async loadDataList() {
                const response = await getObjects();
                this.dataList = [...response];
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>