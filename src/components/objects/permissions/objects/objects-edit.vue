<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >{{objectTitle}} |
            {{$t('objects.edit')}}
        </object-header>

        <section class="object-content">
            <header class="content-header page-header">
                <h3 class="content-title">{{$t('objects.permissions.object.operations')}}</h3>
                <i class="icon-icon_plus icon-action" @click="addGrantee"></i>
            </header>

            <vuetable
                    class="permissions-table"
                    :api-mode="false"
                    :fields="fields"
                    :data="data"
            >

                <template slot="grantee" slot-scope="props">
                    <div v-if="data[props.rowIndex].grantee.role && !data[props.rowIndex].new">
                        {{data[props.rowIndex].grantee.role}}
                    </div>

                    <dropdown-select
                            v-else
                            class="inline-dropdown options-align-left"
                            :placeholder="data[props.rowIndex].grantee.role || 'Role'"
                            :options="computeAvailableGrantees"
                            @input="selectNewGrantee($event, props.rowIndex)"
                    ></dropdown-select>
                </template>

                <template slot="create" slot-scope="props">
                    <checkbox
                            :value="data[props.rowIndex].access.c"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="changeAccess($event, 'c', props.rowIndex)"
                    ></checkbox>
                </template>

                <template slot="read" slot-scope="props">
                    <checkbox
                            :value="data[props.rowIndex].access.r"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="changeAccess($event, 'r', props.rowIndex)"
                    ></checkbox>
                </template>

                <template slot="edit" slot-scope="props">
                    <checkbox
                            :value="data[props.rowIndex].access.u"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="changeAccess($event, 'u', props.rowIndex)"
                    ></checkbox>
                </template>

                <template slot="delete" slot-scope="props">
                    <checkbox
                            :value="data[props.rowIndex].access.d"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="changeAccess($event, 'd', props.rowIndex)"
                    ></checkbox>
                </template>
            </vuetable>
        </section>
    </div>
</template>


<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import objectHeader from '../../object-header';
    import tableCheckbox from '../../../utils/checkbox';
    import dropdownSelect from '../../../utils/dropdown-select';

    import {getObjects} from "../../../../api/objects/permissions/objects";
    import {getObjectPermissions} from "../../../../api/objects/permissions/objects";
    import {getRoles} from "../../../../api/objects/permissions/roles";

    export default {
        name: "permissions-object",
        components: {
            'object-header': objectHeader,
            'dropdown-select': dropdownSelect,
            checkbox: tableCheckbox,
            vuetable,
        },
        data() {
            return {
                // vuetable prop
                fields: [
                    {name: 'grantee', title: this.$t('objects.name')},
                    {name: 'create', title: this.$t('objects.create')},
                    {name: 'read', title: this.$t('objects.read')},
                    {name: 'edit', title: this.$t('objects.edit')},
                    {name: 'delete', title: this.$t('objects.delete')},
                ],
                data: [],
                id: this.$route.params.id,
                objectTitle: '',

                accessChanges: [],
                roleList: []

            };
        },
        mounted() {
            getObjects(this.id).then(
                (response) => {
                    this.objectTitle = response.class.class;
                }
            );

            getRoles().then(
                (response) => {
                    this.roleList = [...response];
                }
            );

            getObjectPermissions(this.id).then(
                (response) => {
                    // format response before assignment
                    response.forEach(item => {
                        item.access = {
                            c: item.privileges.includes('CREATE'),
                            r: item.privileges.includes('SELECT'),
                            u: item.privileges.includes('UPDATE'),
                            d: item.privileges.includes('DELETE'),
                        };
                    });

                    this.data = [...response];
                    this.data.length = 6;
                }
            );
        },

        methods: {
            addGrantee() {
                this.data.push({
                    grantee: {
                        role: ''
                    },
                    c: false,
                    r: true,
                    u: false,
                    d: false,
                    new: true
                });
            },

            selectNewGrantee(granteeRole, rowId) {
                this.data[rowId].grantee = {
                    role: granteeRole,
                    id: this.roleList.find(item => {
                        return item.role === granteeRole
                    }).id
                };
            },

            changeAccess(newValue, operation, rowId) {
                const granteeId = this.data[rowId].grantee.id;

                if (!granteeId) return;

                // first, find grantee role with specified id
                const granteeIndex = this.accessChanges.findIndex(item => {
                    return item.grantee === granteeId;
                });

                // if there's a grantee with specified id
                if (granteeIndex !== -1) {

                    // if (operation === 'r' && this.data[rowId].access.r) {
                    //     for (let op of this.data[rowId].access) {
                    //         if (this.data[rowId].access[op]) {
                    //             this.toggleAccess(op, granteeIndex);
                    //             this.data[rowId].access[op] = false;
                    //         }
                    //     }
                    //     return
                    // }

                    // toggle an operation to his access permissions
                    this.toggleAccess(operation, granteeIndex);
                } else {

                    // if no -- add him to the list
                    this.accessChanges.push({
                        grantee: granteeId,
                        access: [operation]
                    });
                }
                // finally, toggle checkbox value
                this.data[rowId].access[operation] = newValue;
            },

            // adds/removes operations in list
            toggleAccess(operation, granteeIndex) {
                // create a reference for code clearance
                let accessChangesRef = this.accessChanges[granteeIndex].access;

                // check if there is an index,
                const operationIndex = accessChangesRef.indexOf(operation);

                // and, remove/push operation, depends on element presence
                accessChangesRef = operationIndex !== -1 ?
                    accessChangesRef.splice(operationIndex, 1) : accessChangesRef.push(operation);
            },

            close() {
                this.$router.push('/permissions/objects');
            }
        },
        computed: {
            computeAvailableGrantees() {
                // filter available grantees:
                const availableGrantees = this.roleList.filter(grantee => {
                    return !this.data.some(usedGrantee => {
                        return grantee.id === usedGrantee.id;
                    });
                });

                // return array of string names
                return availableGrantees.map(item => {
                    return item.role;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style> 