<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="save"
                :secondaryAction="close"
        >
            {{$tc('objects.permissions.permissionsRole')}} | {{computeTitle}}
        </object-header>
        <section class="object-content module-new permissions-new">
            <header class="content-header page-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                <div class="hint">
                    <i
                            class="hint__img tooltip-activator icon-icon_question"
                    ></i>
                    <div class="tooltip-left">lorem ipsum</div>
                </div>
            </header>

            <form class="permissions-new__form">

                <form-input
                        class="form__input"
                        v-model.trim="$v.role.$model"
                        :v="$v.role"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                        required
                ></form-input>

                <form-input
                        class="form__input"
                        v-model="name"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                ></form-input>

                <form-input
                        class="form__input"
                        v-model="description"
                        :height="164"
                        :label="$t('objects.description')"
                        :placeholder="$t('objects.description')"
                        textarea
                ></form-input>

            </form>
        </section>
    </div>
</template>

<script>
    import objectHeader from '../../object-header';
    import formInput from '../../../utils/form-input';
    import {required} from 'vuelidate/lib/validators';
    import {addRole} from "../../../../api/objects/permissions/roles";

    export default {
        name: 'permissions-new',
        components: {
            'object-header': objectHeader,
            'form-input': formInput,
        },
        data() {
            return {
                role: 'front-role',
                name: '',
                description: '',
                isEdit: this.$route.query.edit || false
            };
        },

        // by vuelidate
        validations: {
            role: {
                required,
            }
        },

        methods: {
            save() {
                if (this.role) {
                    let roleToSend = {
                        role: this.role,
                    };

                    if (this.name) roleToSend.name = this.name;
                    if (this.description) roleToSend.description = this.description;
                    addRole(roleToSend)
                        .then(() => {
                            debugger;
                            this.close()
                        });
                } else {
                    this.close();
                }
            },

            close() {
                this.$router.go(-1);
            },
        },
        computed: {
            computeTitle() {
                return this.isEdit ? this.$t('objects.edit') : this.$t('objects.new');
            },
        },
    };
</script>


<style lang="scss" scoped>
    .page-header {
        justify-content: start;
    }

    .permissions-new__form {
        width: 50%;

    }

    .form-input {
        margin: 10px 0;
    }

</style>
