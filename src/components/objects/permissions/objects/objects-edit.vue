<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="save"
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

    import {getObjects, updateObjectPermissions} from "../../../../api/objects/permissions/objects";
    import {getObjectPermissions} from "../../../../api/objects/permissions/objects";
    import {getRoles} from "../../../../api/objects/permissions/roles";

    import {mapState} from 'vuex';


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
                    if(response) {
                        this.data = JSON.parse(JSON.stringify(response));
                    }
                }
            );

            console.log(this.$store);
        },

        methods: {
            addGrantee() {
                this.data.push({
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
                const granteeId = this.roleList.find(item => {
                    return item.role === granteeRole
                }).id;
                this.data[rowId].grantee = {
                    role: granteeRole,
                    id: granteeId
                };

                this.accessChanges.push(granteeId);
            },

            changeAccess(newValue, operation, rowId) {
                // add grantee to changeList, if it have never changed
                if (this.accessChanges.indexOf(this.data[rowId].grantee.id) === -1) {
                    this.accessChanges.push(this.data[rowId].grantee.id);
                }

                // if 'read' checkbox switches to false, make all operations false
                if (operation === 'r' && this.data[rowId].access.r) {
                    Object.keys(this.data[rowId].access).map(item => this.data[rowId].access[item] = false);
                } else if (operation !== 'r' && !this.data[rowId].access.r) {
                    this.data[rowId].access.r = true;
                }

                // finally, toggle value
                this.data[rowId].access[operation] = newValue;
            },

            save() {
                const initialData = [...this.initialPermissions];
                const granteesToSend = [];
                const operations = ['c', 'r', 'u', 'd'];
                this.accessChanges.forEach(changedGranteeId => {
                    const newGrantee = this.data.find(currentGrantee => {
                        return currentGrantee.grantee.id === changedGranteeId;
                    });

                    // console.log(newGrantee);

                    const oldGrantee = initialData.find(oldGrantee => {
                        return oldGrantee.grantee.id === changedGranteeId;
                    });

                    // console.log(initialData[0].access.d, oldGrantee);

                    const changedOperations = [];
                    if(oldGrantee) {
                        operations.forEach(operation => {
                            if (oldGrantee.access[operation] !== newGrantee.access[operation]) {
                                changedOperations.push(operation);
                            }
                        });
                    } else if(newGrantee) {
                        operations.forEach(operation => {
                            if (newGrantee.access[operation]) {
                                changedOperations.push(operation);
                            }
                        });
                    }


                    // console.log(changedOperations);

                    if (changedOperations.length > 0) {
                        granteesToSend.push({
                            grantee_id: changedGranteeId,
                            access: changedOperations.join('')
                        });
                    }
                });

                // console.log(granteesToSend);
                updateObjectPermissions(this.id, granteesToSend);
            },

            close() {
                this.$router.push('/permissions/objects');
            }
        },
        computed: {
            ...mapState({
                initialPermissions: state => state.permissions.objects.permissionsList || []
            }),

            computeAvailableGrantees() {
                // filter available grantees:
                const availableGrantees = this.roleList.filter(grantee => {
                    return !this.data.some(usedGrantee => {
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