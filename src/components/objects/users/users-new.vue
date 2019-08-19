<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >
            {{$t('objects.usersObject.usersTitle')}}  | {{computeTitle}}
        </object-header>
        <section class="object-content module-new devices-new">

            <expansion-panel opened>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                </template>

                <template slot="expansion-content">
                    <form-input
                            v-model.trim="$v.name.$model"
                            :v="$v.name"
                            :label="$t('objects.name')"
                            :placeholder="$t('objects.name')"
                            :hintText="'lorem ipsum'"
                    ></form-input>
                    <form-input
                            v-model.trim="$v.login.$model"
                            :v="$v.login"
                            :label="$t('objects.usersObject.login')"
                            :placeholder="$t('objects.usersObject.login')"
                            :hintText="'lorem ipsum'"
                    ></form-input>

                    <div class="input-extension-wrap">
                        <form-input
                                ref="input-password"
                                v-model.trim="$v.password.$model"
                                :v="$v.password"
                                :label="$t('objects.password')"
                                :placeholder="$t('objects.password')"
                        ></form-input>

                        <div class="input-extension">

                            <div class="input-extension__copy" @click="copyToClipboard">
                                <span>{{$t('objects.copy')}}</span>

                                <div class="hint" v-if="copyMessage">
                                    <div class="tooltip-top active">
                                        <i class="icon-icon_approve"></i>
                                        <span>{{this.copyMessage}}</span>
                                    </div>
                                </div>
                            </div>
                            <i class="input-extension__generate icon-icon_generate" @click="generatePassword"></i>
                        </div>
                    </div>

                    <form-input
                            v-model="extention"
                            :label="$t('objects.usersObject.extentions')"
                            :placeholder="$t('objects.usersObject.extentions')"
                    ></form-input>
                </template>
            </expansion-panel>

            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$tc('objects.permissions.permissionsRole')}}</h3>
                </template>

                <template slot="expansion-content">
                    <div>

                        <div class="tags-input-wrap">
                            <div class="tags-input__label">
                                {{$tc('objects.permissions.permissionsRole')}}<div class="hint">
                                    <i
                                            class="hint__img tooltip-activator icon-icon_question"
                                    ></i>
                                    <div class="tooltip-left">lorem ipsum</div>
                                </div>
                            </div>

                            <tags-input
                                    v-model="roleTag"
                                    :tags="roleTags"
                                    :autocomplete-items="availableRoles"
                                    :autocomplete-min-length="0"
                                    :placeholder="$tc('objects.permissions.permissionsRole')"
                                    @tags-changed="newTags => this.roleTags = newTags"
                                    add-only-from-autocomplete
                                    autocomplete-filter-duplicates
                            >

                            </tags-input>
                        </div>

                        <ul class="checkbox-list">
                            <li
                                    class="checkbox-list__item"
                                    v-for="item in roleTags"

                            >
                                <div>{{item.text}}</div>
                                <checkbox
                                        :value="item.isAdmin"
                                        :label="$t('objects.usersObject.new.roleAdmin')"
                                        @toggleCheckbox="item.isAdmin = $event"
                                ></checkbox>
                            </li>
                        </ul>
                    </div>
                </template>
            </expansion-panel>

            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.license.licenseTitle')}}</h3>
                </template>

                <template slot="expansion-content">
                    <ul class="checkbox-list">
                        <li
                                class="checkbox-list__item"
                                v-for="item in licenseProducts"

                        >
                            <checkbox
                                    :value="item.allowed"
                                    :label="item.text"
                                    @toggleCheckbox="item.allowed = $event"
                            ></checkbox>
                        </li>
                    </ul>
                </template>
            </expansion-panel>

            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.devices.devicesTitle')}}</h3>
                </template>

                <template slot="expansion-content">


                    <div class="tags-input-wrap">
                        <div class="tags-input__label">
                            {{$t('objects.devices.devicesTitle')}}
                            <div class="hint">
                                <i
                                        class="hint__img tooltip-activator icon-icon_question"
                                ></i>
                                <div class="tooltip-left">lorem ipsum</div>
                            </div>
                        </div>

                        <tags-input
                                v-model="deviceTag"
                                :tags="deviceTags"
                                :autocomplete-items="deviceList"
                                :autocomplete-min-length="0"
                                :placeholder="$t('objects.devices.devicesTitle')"
                                @tags-changed="newTags => this.deviceTags = newTags"
                                add-only-from-autocomplete
                                autocomplete-filter-duplicates
                        >

                        </tags-input>

                        <div class="hint-link__wrap">
                            <router-link class="hint-link__link" to="/devices/new">{{$t('objects.usersObject.new.deviceNotFound')}}</router-link>
                            <div class="hint">
                                <i
                                        class="hint__img tooltip-activator icon-icon_question"
                                ></i>
                                <div class="tooltip-left">lorem ipsum</div>
                            </div>
                        </div>
                    </div>
                </template>
            </expansion-panel>

            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.usersObject.new.variables')}}</h3>
                </template>

                <template slot="expansion-content">
                    <div class="variables">
                        <div
                                class="variable-pair"
                                v-for="(variable, key) in variables"
                        >
                            <form-input
                                    v-model="variable.key"
                                    :placeholder="$t('objects.usersObject.new.varKey')"
                            ></form-input>
                            <form-input
                                    v-model="variable.value"
                                    :placeholder="$t('objects.usersObject.new.varVal')"
                            ></form-input>
                            <i class="icon-icon_delete" @click="deleteVariable(key)"></i>
                        </div>
                        <i class="icon-icon_plus" @click="addVariable"></i>
                    </div>
                </template>
            </expansion-panel>
        </section>
    </div>
</template>

<script>
    import objectHeader from '../object-header';
    import formInput from '../../utils/form-input';
    import expansionPanel from '../../utils/expansion-panel';
    import eventBus from '../../../utils/eventBus';
    import {required} from 'vuelidate/lib/validators';
    import vueTagsInput from '@johmun/vue-tags-input';
    import vuetable from 'vuetable-2/src/components/Vuetable';
    import checkbox from '../../utils/checkbox';

    export default {
        name: "users-new",
        components: {
            'object-header': objectHeader,
            'form-input': formInput,
            'expansion-panel': expansionPanel,
            'tags-input': vueTagsInput,
            checkbox,
            vuetable,
        },
        data() {
            return {
                name: '',
                login: '',
                password: '',
                extention: '',
                copyMessage: '',

                roleTag: '',
                roleTags: [{text: 'Admin', isAdmin: false}],
                availableRoles: [
                    {text: 'Admin', isAdmin: false},
                    {text: 'Sales', isAdmin: false},
                    {text: 'Manager', isAdmin: false},
                    {text: 'Operator', isAdmin: false}
                ],
                licenseProducts: [
                    {text: 'Product 1', allowed: false},
                    {text: 'Product 2', allowed: false},
                    {text: 'Product 3', allowed: false},
                    {text: 'Product 4', allowed: false}
                ],

                deviceTag: '',
                deviceTags: [{text: 'Dev1', isAdmin: false}],
                deviceList: [
                    {text: 'Dev1', isAdmin: false},
                    {text: 'Dev2', isAdmin: false},
                    {text: 'Dev3', isAdmin: false},
                    {text: 'Dev5', isAdmin: false}
                ],

                variables: [
                    {key: '', value: ''}
                ]
            }
        },

        // by vuelidate
        validations: {
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

        methods: {
            addVariable() {
                this.variables.push({
                    key: '',
                    value: ''
                });
            },
            deleteVariable(id) {
                this.variables.splice(id, 1);
            },
            close() {
                this.$router.push('/users');
            },
            generatePassword() {
                const length = 12;
                const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let result = '';
                for (let i = 0; i < length; i++) {
                    result += charset.charAt(Math.floor(Math.random() * charset.length));
                }
                this.password = result;
            },
            copyToClipboard() {
                if (this.password) {
                    eventBus.$emit('copyToClipboard', this.password);
                    this.copyMessage = this.$t('objects.copied');
                    setTimeout(() => this.copyMessage = '', 2000);
                }
            },
        },
        computed: {
            computeTitle() {
                return this.$route.query.edit ? this.$t('objects.edit') : this.$t('objects.new');
            },
        }
    }
</script>

<style lang="scss" scoped>

    .checkbox-list {
        @extend .typo-body-md;

        width: 50%;
    }

    .tags-input-wrap + .checkbox-list {
        margin-top: 28px;

    }

    .checkbox-list__item {
        display: flex;
        justify-content: space-between;
        padding: 14px 0 14px 4px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .hint-link__wrap {
        margin-top: 9px;

        .hint-link__link {
            @extend .typo-input-label;
            @extend .border-underline;

            color: $icon-color;
        }
    }

    .variable-pair {
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