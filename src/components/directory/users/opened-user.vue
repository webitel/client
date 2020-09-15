<template>
    <div class="content-wrap">
        <object-header
                :primaryText="computePrimaryText"
                :primaryAction="save"
                :primaryDisabled="computeDisabled"
                close
        >
            {{$tc('objects.directory.users.users', 1)}} |
            {{computeTitle}}
        </object-header>
        <tabs-component
                :tabs="tabs"
                :root="$options.name"
        >
            <template slot="component" slot-scope="props">
                <component
                        class="tabs-inner-component"
                        :is="props.currentTab"
                        :v="$v"
                ></component>
            </template>
        </tabs-component>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';
    import editComponentMixin from '@/mixins/editComponentMixin';
    import { mapActions, mapState } from 'vuex';
    import openedUserGeneral from './opened-user-general';
    import openedUserRoles from './opened-user-roles';
    import openedUserLicense from './opened-user-license';
    import openedUserDevices from './opened-user-devices';
    import openedUserVariables from './opened-user-variables';
    import openedUserTokens from './opened-user-tokens';
    import openedUserPermissions from './opened-user-permissions.vue';

    export default {
        name: 'opened-user',
        mixins: [editComponentMixin],
        components: {
            openedUserGeneral,
            openedUserRoles,
            openedUserLicense,
            openedUserDevices,
            openedUserVariables,
            openedUserTokens,
            openedUserPermissions,
        },
        data() {
            return {};
        },

        validations: {
            itemInstance: {
                username: {
                    required,
                },
            },
        },

        mounted() {
            this.id = this.$route.params.id;
            this.loadItem();
        },

        computed: {
            ...mapState('directory/users', {
                itemInstance: (state) => state.itemInstance,
            }),
            id: {
                get() { return this.$store.state.directory.users.itemId; },
                set(value) { this.setId(value); },
            },

            tabs() {
                const tabs = [{
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
                    },
                    {
                        text: this.$t('objects.directory.users.tokens'),
                        value: 'tokens',
                    }];

                const permissions = {
                    text: this.$tc('objects.permissions.permissions', 2),
                    value: 'permissions',
                };

                if (this.id) tabs.push(permissions);
                return tabs;
            },
        },

        methods: {
            ...mapActions('directory/users', {
                setId: 'SET_ITEM_ID',
                loadItem: 'LOAD_ITEM',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
            }),
        },
    };
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
