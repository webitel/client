<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >
            {{$t('objects.devices.devicesTitle')}} | {{computeTitle}}
        </object-header>
        <section class="object-content module-new devices-new">

            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                </template>

                <template slot="expansion-content">
                    <form-input
                            v-model.trim="$v.name.$model"
                            :v="$v.name"
                            :label="$t('objects.name') + '*'"
                            :placeholder="$t('objects.name') + '*'"
                            :hintText="'Ya s`el deda :('"
                    ></form-input>
                    <form-input
                            v-model.trim="$v.login.$model"
                            :v="$v.login"
                            :label="'login' + '*'"
                            :placeholder="'login' + '*'"
                            :hintText="'Ya s`el deda :('"
                    ></form-input>

                    <div class="input-extension-wrap">
                        <form-input
                                ref="input-password"
                                v-model.trim="$v.password.$model"
                                :v="$v.password"
                                :label="$t('objects.password') + '*'"
                                :placeholder="$t('objects.password') + '*'"
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
                            :label="'extention'"
                            :placeholder="'extention'"
                    ></form-input>
                </template>
            </expansion-panel>

            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="content-title">Roles</h3>
                </template>

                <template slot="expansion-content">
                    <div>

                        <div class="tags-input-wrap">
                            <div class="tags-input__label">
                                Roles
                                <div class="hint">
                                    <i
                                            class="hint__img tooltip-activator icon-icon_question"
                                    ></i>
                                    <div class="tooltip-left">Ya s`el deda :(</div>
                                </div>
                            </div>

                            <tags-input
                                    v-model="roleTag"
                                    :tags="roleTags"
                                    :autocomplete-items="availableRoles"
                                    :autocomplete-min-length="0"
                                    :placeholder="'Role'"
                                    @tags-changed="newTags => this.roleTags = newTags"
                                    add-only-from-autocomplete
                                    autocomplete-filter-duplicates
                            >

                            </tags-input>
                        </div>

                        <ul class="role-admin">
                            <li
                                    class="role-admin__item"
                                    v-for="item in roleTags"

                            >
                                <div>{{item.text}}</div>
                                <checkbox
                                    :value="item.isAdmin"
                                    :label="'Admin'"
                                    @toggleCheckbox="item.isAdmin = $event"
                                ></checkbox>
                            </li>
                        </ul>
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
                availableRoles: [{text: 'Admin', isAdmin: false},
                    {text: 'Sales', isAdmin: false},
                    {text: 'Manager', isAdmin: false},
                    {text: 'Operator', isAdmin: false}]
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

    .role-admin {
        @extend .typo-body-md;

        width: 50%;
        margin-top: 29px;
    }

    .role-admin__item {
        display: flex;
        justify-content: space-between;
        margin-top: 26px;
    }
</style>