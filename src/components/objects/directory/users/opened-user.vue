<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            <span>{{$tc('objects.directory.users.users', 1)}}</span>
            | {{computeTitle}}
        </object-header>
        <tabs-component
                :tabs="tabs"
                :itemInstance="itemInstance"
                :v="$v"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :itemInstanceProp="itemInstance"
                        :v="$v"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
    import openedUserGeneral from './opened-user-general';
    import openedUserRoles from './opened-user-roles';
    import openedUserLicense from './opened-user-license';
    import openedUserDevices from './opened-user-devices';
    import openedUserVariables from './opened-user-variables';
    import {required} from 'vuelidate/lib/validators';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {addUser, getUser, updateUser} from "../../../../api/objects/directory/users";

    export default {
        name: "opened-user",
        mixins: [editComponentMixin],
        components: {
            openedUserGeneral,
            openedUserRoles,
            openedUserLicense,
            openedUserDevices,
            openedUserVariables,
        },
        data() {
            return {
                itemInstance: {
                    name: 'user name',
                    username: 'user login',
                    password: '',
                    extension: '1007',
                    roles: [{text: 'Admin', isAdmin: false}],
                    roleAdmin: [],
                    license: [],
                    devices: [{text: 'Dev1', isAdmin: false}],
                    variables: [
                        {key: '', value: ''}
                    ],
                },

                tabs: [
                    {
                        text: this.$t('objects.general'),
                        value: 'general',
                    },
                    {
                        text: this.$t('objects.directory.users.roles'),
                        value: 'roles',
                    },
                    {
                        text: this.$t('objects.directory.users.license'),
                        value: 'license',
                    },
                    {
                        text: this.$t('objects.directory.users.devices'),
                        value: 'devices',
                    },
                    {
                        text: this.$t('objects.directory.users.variables'),
                        value: 'variables',
                    }
                ],
            }
        },

        // by vuelidate
        validations: {
            itemInstance: {
                username: {
                    required
                },
            },
        },

        methods: {
            async save() {
                let itemInstance = this.itemInstance;

                if (this.id) {
                    await updateUser(this.id, itemInstance);
                } else {
                    await addUser(itemInstance);
                }
                this.close();
            },

            async loadItem() {
                const response = await getUser(this.id);
                this.itemInstance = response;
                this.initialItem = JSON.parse(JSON.stringify(response));
            }
        },
    }
</script>

<style lang="scss" scoped>
    .value-pair {
        @extend .object-input-grid;

        align-items: center;
        grid-template-columns: 1fr 1fr 24px;

        .icon-icon_delete {
            margin-bottom: 10px;
            cursor: pointer;

            &:hover {
                color: #000;
            }
        }
    }

    .variables .icon-icon_plus {
        cursor: pointer;

        &:hover {
            color: #000;
        }
    }
</style>