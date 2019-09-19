<template>
    <div class="content-wrap">
        <object-header>{{$t('objects.permissions.permissions')}} |
            {{$t('objects.permissions.object.object')}}
        </object-header>

        <section class="object-content">
            <header class="content-header page-header">
                <h3 class="content-title">
                    {{$t('objects.permissions.object.allObjects')}}
                </h3>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="objectList"
            >

                <template slot="objectName" slot-scope="props">
                    <div class="tt-capitalize">
                        <span class="nameLink"  @click="edit(props.rowIndex)">
                            {{objectList[props.rowIndex].class}}
                        </span>
                    </div>
                </template>

                <template slot="obac" slot-scope="props">
                    <switcher
                            class="object-switcher obac"
                            :value="objectList[props.rowIndex].obac"
                            @toggleSwitch="toggleObjectPermissions('obac', props.rowIndex)"
                    ></switcher>
                </template>

                <template slot="rbac" slot-scope="props">
                    <switcher
                            class="object-switcher rbac"
                            :value="objectList[props.rowIndex].rbac"
                            @toggleSwitch="toggleObjectPermissions('rbac', props.rowIndex)"
                    ></switcher>
                </template>

                <template slot="actions" slot-scope="props">
                    <div class="vuetable-actions">
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
    import objectHeader from '@/components/objects/object-header';
    import switcher from '@/components/utils/switcher';

    import {getObjects} from '@/api/objects/permissions/objects';
    import {updateObject} from '@/api/objects/permissions/objects';

    export default {
        name: "permissions-object",
        components: {
            'object-header': objectHeader,
            switcher,
            vuetable,
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: 'objectName', title: this.$t('objects.name')},
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
                objectList: [], // list of all objects to show
            };
        },
        mounted() {
            this.loadObjectList();
        },
        methods: {
            edit(rowId) {
                this.$router.push({
                    name: 'permissions-objects-edit',
                    params: {id: this.objectList[rowId].id},
                });
            },

            computeStatusText(state) {
                return state ? this.$t('objects.on') : this.$t('objects.off');
            },

            toggleObjectPermissions(property, id) {
                // first, change UI, then send request
                this.objectList[id][property] = !this.objectList[id][property];
                return updateObject(this.objectList[id].id, this.objectList[id])
                    .catch(() => {
                        // if request throws error, move changes back
                            this.objectList[id][property] = !this.objectList[id][property];
                        });
            },

            loadObjectList() {
                return getObjects().then(
                    response => {
                        this.objectList = [...response];
                    }
                );
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>