<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="save"
                :secondaryAction="close"
        ><span class="tt-capitalize">{{objectTitle}}</span> |
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
                    :data="permissionsList"
            >

                <template slot="grantee" slot-scope="props">
                    <div v-if="!permissionsList[props.rowIndex].new" class="tt-capitalize">
                        {{permissionsList[props.rowIndex].grantee.role}}
                    </div>

                    <dropdown-select
                            v-else
                            class="inline-dropdown options-align-left"
                            :placeholder="permissionsList[props.rowIndex].grantee.role || 'Role'"
                            :options="computeAvailableGrantees"
                            @input="selectNewGrantee($event, props.rowIndex)"
                    ></dropdown-select>
                </template>

                <template slot="create" slot-scope="props">
                    <checkbox
                            :value="permissionsList[props.rowIndex].access.c"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="changeAccess($event, 'c', props.rowIndex)"
                    ></checkbox>
                </template>

                <template slot="read" slot-scope="props">
                    <checkbox
                            :value="permissionsList[props.rowIndex].access.r"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="changeAccess($event, 'r', props.rowIndex)"
                    ></checkbox>
                </template>

                <template slot="edit" slot-scope="props">
                    <checkbox
                            :value="permissionsList[props.rowIndex].access.u"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="changeAccess($event, 'u', props.rowIndex)"
                    ></checkbox>
                </template>

                <template slot="delete" slot-scope="props">
                    <checkbox
                            :value="permissionsList[props.rowIndex].access.d"
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
    import objectHeader from '@/components/objects/object-header';
    import tableCheckbox from '@/components/utils/checkbox';
    import dropdownSelect from '@/components/utils/dropdown-select';

    import {getObject, updateObjectPermissions, getObjectPermissions} from "@/api/objects/permissions/objects";
    import {getRoles} from "@/api/objects/permissions/roles";

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
                permissionsList: [], // list with all table data, contains user changes
                initialPermissionsList: [],  // list of initial table data, used for user changes segregation
                id: this.$route.params.id, // object id
                objectTitle: '', // header title. retieves from object GET request

                changeAccessList: [], // contains id's of grantee`s changed permissions
                roleList: [] // list of all roles to add new. retrieves from roles GET request

            };
        },
        mounted() {

            // get object title to show on page header
            this.loadObject(this.id);

            // get all roles to choose which to add
           this.loadRoleList();

            // get object permissions
            this.loadObjectPermissions(this.id);
        },

        methods: {
            addGrantee() {
                this.permissionsList.push({
                    grantee: {
                        role: '',
                    },
                    access: {
                        c: false,
                        r: true,
                        u: false,
                        d: false,
                    },
                    new: true
                });
            },

            selectNewGrantee(granteeRole, rowId) {
                // find grantee id in role list by role name
                const granteeId = this.roleList.find(grantee => {
                    return grantee.role === granteeRole
                }).id;

                // change an object
                this.permissionsList[rowId].grantee = {
                    role: granteeRole,
                    id: granteeId
                };

                // push id to changes
                this.changeAccessList.push(granteeId);
            },

            changeAccess(newValue, operation, rowId) {
                // add grantee to changeList, if it have never changed
                if (this.changeAccessList.indexOf(this.permissionsList[rowId].grantee.id) === -1) {
                    this.changeAccessList.push(this.permissionsList[rowId].grantee.id);
                }

                // if 'read' checkbox switches to false, make all operations false
                if (operation === 'r' && this.permissionsList[rowId].access.r) {
                    Object.keys(this.permissionsList[rowId].access).map(item => {
                        this.permissionsList[rowId].access[item] = false
                    });
                    // else if another operation switches to true with unactive 'read', activate 'read' too
                } else if (operation !== 'r' && !this.permissionsList[rowId].access.r) {
                    this.permissionsList[rowId].access.r = true;
                }

                // finally, toggle the value
                this.permissionsList[rowId].access[operation] = newValue;
            },

            save() {
                // if there are changes, process them
                // if there aren't, or patch completed successfully, close page
                if (this.changeAccessList.length !== 0) {

                    const granteesToSend = []; // object with changes to patch
                    const operations = ['c', 'r', 'u', 'd']; // array for future iteration

                    // for each change
                    this.changeAccessList.forEach(changedGranteeId => {

                        // find changed grantee (by id)
                        const newGrantee = this.permissionsList.find(currentGrantee => {
                            return currentGrantee.grantee.id === changedGranteeId;
                        });

                        // find initial grantee (by id)
                        const oldGrantee = this.initialPermissionsList.find(oldGrantee => {
                            return oldGrantee.grantee.id === changedGranteeId;
                        });

                        // collect really changed operations (because operation can be changed twice)
                        const changedOperations = [];

                        // if there's old grantee
                        if (oldGrantee) {
                            operations.forEach(operation => {
                                if (oldGrantee.access[operation] !== newGrantee.access[operation]) {
                                    changedOperations.push(operation);
                                }
                            });
                            // if there's new grantee,
                            // and he wasn't changed
                        } else if (newGrantee) {
                            operations.forEach(operation => {
                                if (newGrantee.access[operation]) {
                                    changedOperations.push(operation);
                                }
                            });
                        }

                        // if there are any changes -- push them to array
                        if (changedOperations.length > 0) {
                            granteesToSend.push({
                                grantee_id: changedGranteeId,
                                access: changedOperations.join('')
                            });
                        }
                    });

                    // and send the array with changes
                    // catch statement prevents close()
                    updateObjectPermissions(this.id, granteesToSend)
                        .then(() => {
                            this.close();
                        });
                } else {
                    this.close();
                }

            },

            close() {
                this.$router.go(-1);
            },

            // get object title to show on page header
            loadObject(id) {
                getObject(id).then(
                    (response) => {
                        this.objectTitle = response;
                    }
                );
            },

            // get all roles to choose which to add
            loadRoleList() {
                getRoles().then(
                    (response) => {
                        this.roleList = [...response];
                    }
                );
            },

            // get object permissions
            loadObjectPermissions(id) {
                getObjectPermissions(id).then(
                    (response) => {
                        if (response) {
                            this.permissionsList = [...response];
                            this.initialPermissionsList = JSON.parse(JSON.stringify(response));
                        }
                    }
                );
            }
        },
        computed: {
            computeAvailableGrantees() {
                // filter available grantees:
                const availableGrantees = this.roleList.filter(grantee => {
                    return !this.permissionsList.some(usedGrantee => {
                        return grantee.id === usedGrantee.grantee.id;
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