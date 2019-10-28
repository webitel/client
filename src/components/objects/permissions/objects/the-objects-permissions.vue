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
                <div class="content-header__actions-wrap">
                    <search
                            @filterData="filterData"
                    ></search>
                </div>
            </header>

            <vuetable
                    :api-mode="false"
                    :fields="fields"
                    :data="filteredDataList"
            >

                <template slot="name" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink" @click="edit(props.rowIndex)">
                            {{filteredDataList[props.rowIndex].class}}
                        </span>
                    </div>
                </template>

                <template slot="obac" slot-scope="props">
                    <switcher
                            class="test__object-switcher__obac"
                            :value="filteredDataList[props.rowIndex].obac"
                            @input="toggleDataProperty('obac', props.rowIndex)"
                    ></switcher>
                </template>

                <template slot="rbac" slot-scope="props">
                    <switcher
                            class="test__object-switcher__rbac"
                            :value="filteredDataList[props.rowIndex].rbac"
                            @input="toggleDataProperty('rbac', props.rowIndex)"
                    ></switcher>
                </template>

                <template slot="actions" slot-scope="props">
                    <i class="vuetable-action icon-icon_edit"
                       @click="edit(props.rowIndex)"
                    ></i>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import tableComponentMixin from '@/mixins/tableComponentMixin';

    import {_actionsTableField_1} from "@/utils/tableFieldPresets";
    import {getObjectList, updateObject} from '@/api/objects/permissions/objects';

    export default {
        name: "the-objects-permissions",
        mixins: [tableComponentMixin],

        data() {
            return {
                fields: [
                    {name: 'name', title: this.$t('objects.name')},
                    {name: 'obac', title: this.$t('objects.permissions.object.ObAC')},
                    {name: 'rbac', title: this.$t('objects.permissions.object.RbAC')},
                    _actionsTableField_1,
                ],

                filterProperties: ['class'],
            };
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
                this.filteredDataList[id][property] = !this.filteredDataList[id][property];

                try {
                    await updateObject(this.filteredDataList[id].id, this.filteredDataList[id]);
                } catch (err) {
                    // if request throws error, move changes back
                    this.filteredDataList[id][property] = !this.filteredDataList[id][property];
                }
            },

            async loadDataList() {
                const response = await getObjectList();
                this.dataList = [...response];
                this.filterData();
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>