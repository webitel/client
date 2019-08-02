<template>
    <div class="content-wrap">
        <module-header
                :primaryText="$t('modules.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >
            Devices | New
        </module-header>
        <section class="module-content module-new devices-new">

            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="module-content__title">General info</h3>
                </template>

                <template slot="expansion-content">
                    <form-input
                            class="form__input"
                            v-model="name"
                            :label="'name'"
                            :placeholder="'name'"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="authId"
                            :label="'authId'"
                            :placeholder="'authId'"
                    ></form-input>

                    <div class="form__input-wrap">


                        <form-input
                                class="form__input"
                                v-model="password"
                                :label="'password'"
                                :placeholder="'password'"
                        ></form-input>

                        <i class="icon-icon_deny" @click="generatePassword"></i>
                    </div>

                    <form-input
                            class="form__input"
                            v-model="user"
                            :label="'user'"
                            :placeholder="'user'"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="phone"
                            :label="'phone'"
                            :placeholder="'phone'"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="IPv4"
                            :label="'IPv4'"
                            :placeholder="'IPv4'"
                    ></form-input>
                </template>
            </expansion-panel>

            <expansion-panel>
                <template slot="expansion-header">
                    <h3 class="module-content__title">Autoprovision</h3>
                </template>

                <template slot="expansion-content">
                    <form-input
                            class="form__input"
                            v-model="vendor"
                            :label="'vendor'"
                            :placeholder="'vendor'"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="model"
                            :label="'model'"
                            :placeholder="'model'"
                    ></form-input>
                    <form-input
                            class="form__input"
                            v-model="MAC"
                            :label="'MAC'"
                            :placeholder="'MAC'"
                    ></form-input>
                </template>
            </expansion-panel>
        </section>
    </div>
</template>

<script>
    import moduleHeader from '../module-header';
    import formInput from '../../utils/form-input';
    import expansionPanel from '../utils/expansion-panel';

    export default {
        name: 'devices-new',
        components: {
            'module-header': moduleHeader,
            'form-input': formInput,
            'expansion-panel': expansionPanel
        },
        data() {
            return {
                name: '',
                authId: '',
                password: '',
                user: '',
                phone: '',
                IPv4: '',

                vendor: '',
                model: '',
                MAC: '',

                hostName: [],
            }
        },
        methods: {
            close() {
                this.$router.push('/devices');
            },
            generatePassword() {
                const length = 12;
                const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let result = '';
                for(let i = 0; i < length; i++) {
                    result += charset.charAt(Math.floor(Math.random()*charset.length));
                }
                console.log(result);
                return result;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/modules/modules";

    .module-content {
        padding-top: 36px;
    }

    .module-content__title {
        margin: 0;
    }


</style>
