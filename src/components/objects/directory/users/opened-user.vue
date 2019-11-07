<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            <span>{{$t('objects.usersObject.users')}}</span>
            | {{computeTitle}}
        </object-header>
        <section class="object-content module-new object-with-tabs">

            <tabs
                    :currentTab="currentTab"
                    :tabs="tabs"
                    @change="currentTab = $event"
            ></tabs>
            <component
                    class="tabs-inner-component"
                    :is="computeCurrentTab"
                    :itemInstanceProp="itemInstance"
                    :v="$v"
            ></component>
        </section>
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
                    name: '',
                    login: '',
                    password: '',
                    extension: '',
                    roleTags: [{text: 'Admin', isAdmin: false}],
                    roleAdmin: [],
                    deviceTags: [{text: 'Dev1', isAdmin: false}],
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
                name: {
                    required,
                },
                login: {
                    required
                },
                password: {
                    required,
                },
            },
        },

        methods: {},
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