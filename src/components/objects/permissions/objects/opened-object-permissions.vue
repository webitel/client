<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="save"
                close
        >
            <span class="tt-capitalize">{{headerTitle}}</span>
            | {{$t('objects.edit')}}
        </object-header>

        <section class="object-content">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.permissions.object.operations')}}</h3>
                <i class="icon-icon_plus icon-action" @click="addTableItem"></i>
            </header>

            <vuetable
                    :api-mode="false"
                    :fields="fields"
                    :data="dataList"
            >

                <template slot="grantee" slot-scope="props">
                    <!--                    if not new-->
                    <div v-if="!dataList[props.rowIndex].new">
                        {{dataList[props.rowIndex].grantee.role}}
                    </div>

                    <dropdown-select
                            v-else
                            class="inline-dropdown inline-dropdown__options-left"
                            v-model="dataList[props.rowIndex].grantee"
                            :placeholder="$tc('objects.permissions.permissionsRole', 1)"
                            :options="computeAvailableGrantees"
                            :displayProperty="'role'"
                    ></dropdown-select>
                </template>

                <template slot="create" slot-scope="props">
                    <checkbox
                            class="test__permissions-checkbox__c"
                            :value="dataList[props.rowIndex].access.c"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="toggleDataProperty($event, 'c', props.rowIndex)"
                    ></checkbox>
                </template>

                <template slot="read" slot-scope="props">
                    <checkbox
                            class="test__permissions-checkbox__r"
                            :value="dataList[props.rowIndex].access.r"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="toggleDataProperty($event, 'r', props.rowIndex)"
                    ></checkbox>
                </template>

                <template slot="edit" slot-scope="props">
                    <checkbox
                            class="test__permissions-checkbox__u"
                            :value="dataList[props.rowIndex].access.u"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="toggleDataProperty($event, 'u', props.rowIndex)"
                    ></checkbox>
                </template>

                <template slot="delete" slot-scope="props">
                    <checkbox
                            class="test__permissions-checkbox__d"
                            :value="dataList[props.rowIndex].access.d"
                            :label="$t('objects.allow')"
                            @toggleCheckbox="toggleDataProperty($event, 'd', props.rowIndex)"
                    ></checkbox>
                </template>
            </vuetable>
        </section>
    </div>
</template>


<script>
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import {getObject, updateObjectPermissions, getObjectPermissions} from "@/api/objects/permissions/objects";
    import {getRoleList} from "@/api/objects/permissions/roles";
    import editComponentMixin from '@/mixins/editComponentMixin';

    export default {
        name: "opened-object-permissions",
        components: {
            vuetable,
        },
        mixins: [editComponentMixin],
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
                dataList: [], // list with all table data, contains user changes
                initialDataList: [],  // list of initial table data, used for user changes segregation
                headerTitle: '', // header title. retieves from object GET request

                changeAccessList: [], // contains id's of grantee`s changed permissions
                roleList: [] // list of all roles to add new. retrieves from roles GET request

            };
        },
        mounted() {
            // get object permissions
            this.loadDataList(this.id);

            // get object title to show on page header
            this.loadHeaderTitle(this.id);

            // get all roles to choose which to add
            this.loadRoleList();
        },

        methods: {
            addTableItem() {
                this.dataList.unshift({
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

            toggleDataProperty(newValue, operation, rowId) {
                // add grantee to changeList, if it have never changed
                const isGranteeChanged = this.changeAccessList.includes(this.dataList[rowId].grantee.id);

                if (!isGranteeChanged) {
                    this.changeAccessList.push(this.dataList[rowId].grantee.id);
                }

                // if 'read' checkbox switches to false, make all operations false
                if (operation === 'r' && this.dataList[rowId].access.r) {
                    Object.keys(this.dataList[rowId].access).map(item => {
                        this.dataList[rowId].access[item] = false
                    });
                    // else if another operation switches to true with unactive 'read', activate 'read' too
                } else if (!this.dataList[rowId].access.r) {
                    this.dataList[rowId].access.r = true;
                }

                // finally, toggle the value
                this.dataList[rowId].access[operation] = newValue;
            },

            async save() {
                // if there are changes, process them
                // if there aren't, or patch completed successfully, close page
                if (this.changeAccessList.length !== 0) {

                    const granteesToSend = []; // object with changes to patch

                    this.filterChanges(granteesToSend);

                    // and send the array with changes
                    // catch statement prevents close()
                    try {
                        await updateObjectPermissions(this.id, granteesToSend);
                        this.close();
                    } catch (e) {}

                } else {
                    this.close();
                }

            },

            filterChanges(granteesToSend) {
                // for each change
                this.changeAccessList.forEach(changedGranteeId => {

                    // find changed grantee (by id)
                    const newGrantee = this.findGrateeById(changedGranteeId);

                    // find initial grantee (by id)
                    const oldGrantee = this.findInitialGranteeById(changedGranteeId);

                    // collect really changed operations (operation can be changed twice)
                    const changedOperations = this.collectChangedOperations(newGrantee, oldGrantee);

                    // if there are any changes -- push them to array
                    if (changedOperations.length > 0) {
                        granteesToSend.push({
                            grantee_id: changedGranteeId,
                            access: changedOperations.join('')
                        });
                    }
                });
            },

            findGrateeById(granteeId) {
                return this.dataList.find(currentGrantee => {
                    return currentGrantee.grantee.id === granteeId;
                });
            },

            findInitialGranteeById(granteeId) {
                return this.initialDataList.find(oldGrantee => {
                    return oldGrantee.grantee.id === granteeId;
                });
            },

            collectChangedOperations(newGrantee, oldGrantee) {
                const operations = ['c', 'r', 'u', 'd']; // array for operations iterations iteration

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
                return changedOperations;
            },

            close() {
                this.$router.go(-1);
            },

            // get object title to show on page header
            async loadHeaderTitle(id) {
                this.headerTitle = await getObject(id);
            },

            // get all roles to choose which to add
            async loadRoleList() {
                const response = await getRoleList();
                this.roleList = [...response];
            },

            // get object permissions
            async loadDataList(id) {
                const response = await getObjectPermissions(id);
                this.dataList = [...response];
                this.initialDataList = JSON.parse(JSON.stringify(response));
            }
        },

        computed: {
            computeAvailableGrantees() {
                // filter available grantees:
                return this.roleList.filter(grantee => {
                    return !this.dataList.some(usedGrantee => {
                        return grantee.id === usedGrantee.grantee.id;
                    });
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .vs__dropdown-toggle {
        padding-left: 0 !important;
    }
</style> 