<template>
<wt-page-wrapper :actions-panel="false">
        <template slot="header">
            <wt-headline>
                <template slot="title">
                    {{$tc('objects.directory.users.users', 1)}} |
                    {{computeTitle}}
                </template>
                <template slot="actions">
                    <wt-button
                            color="secondary"
                            @click="back"
                    >
                        {{$t('objects.close')}}
                    </wt-button>
                    <wt-button
                            :disabled="computeDisabled"
                            @click="save"
                    >
                        {{computePrimaryText || $t('objects.addNew')}}
                    </wt-button>
                </template>
            </wt-headline>
        </template>

        <template slot="main">
            <div class="main-container">
                <wt-tabs
                :tabs="tabs"
                v-model="currentTab"
            >
            </wt-tabs>
                <component
                    :is="$options.name + '-' + currentTab.value"
                    :v="$v"
                 ></component>
            </div>
        </template>
    </wt-page-wrapper>

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
            return {
                currentTab: {
                    value: 'general',
                },
            };
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
            back() {
                this.$router.go(-1);
            },

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
    @import '@/assets/css/objects/table-page';

    .value-pair-wrap {
        margin-top: 8px;
    }

    .value-pair {
        grid-template-columns: 1fr 24px;
    }

    .main-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
</style>
