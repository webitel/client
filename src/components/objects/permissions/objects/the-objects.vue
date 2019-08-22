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

                <template slot="obac" slot-scope="props">
                    <switcher
                            :value="objectList[props.rowIndex].obac"
                            @toggleSwitch="toggleObjectPermissions('obac', props.rowIndex)"
                    ></switcher>
                </template>

                <template slot="rbac" slot-scope="props">
                    <switcher
                            :value="objectList[props.rowIndex].rbac"
                            @toggleSwitch="toggleObjectPermissions('rbac', props.rowIndex)"
                    ></switcher>
                </template>

                <template slot="actions" slot-scope="props">
                    <div class="vuetable-actions">
                        <i class="vuetable-action icon-icon_edit"
                           @click="edit"
                        ></i>
                    </div>
                </template>
            </vuetable>
        </section>
    </div>
</template>

<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '../../object-header';
    import switcher from '../../../utils/switcher';
    // import notification from '../../../utils/notification';

    import {getObjects} from "../../../../api/objects/permissions/objects";

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
                    {name: 'class', title: this.$t('objects.name')},
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
                objectList: [],
                defaultObject: {
                    class: '',
                    obac: false,
                    rbac: false,
                    id: 0
                }
            };
        },
        mounted() {

            getObjects().then(
                response => {
                    this.objectList = response.classes.map(item => {
                        return Object.assign({}, this.defaultObject, item);
                    });
                },
                error => {
                    this._showError(error);
                }
            );
        },
        methods: {
            edit() {
                this.$router.push('/permissions/objects/edit');
            },
            computeStatusText(state) {
                return state ? this.$t('objects.on') : this.$t('objects.off');
            },
            toggleObjectPermissions() {
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>