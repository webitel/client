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
                        v-model.trim="$v.role.role.$model"
                        :v="$v.role.role"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                        required
                ></form-input>

                <form-input
                        class="form__input"
                        v-model="role.name"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                ></form-input>

<!--                v-model="role.description"-->
                <form-input
                        class="form__input"
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
    import {addRole, getRole, updateRole} from "../../../../api/objects/permissions/roles";

    export default {
        name: 'permissions-new',
        components: {
            'object-header': objectHeader,
            'form-input': formInput,
        },
        data() {
            return {
                role: {
                    role: 'front-role',
                    name: '',
                    // description: '',
                },
                initialRole: {},
                id: null
            };
        },

        // by vuelidate
        validations: {
            role: {
                role: {
                    required
                }
            }
        },

        mounted() {
            if(this.$route.params.id !== 'new') this.id = this.$route.params.id;

            if (this.id) {
                getRole(this.id)
                    .then(response => {
                        this.role = response.role;
                        this.initialRole = JSON.parse(JSON.stringify(response.role));
                    });
            }

        },

        methods: {
            save() {
                // check if some fields was changed
                const isEqualToInitial = Object.keys(this.role).every(newProperty => {
                    return Object.keys(this.initialRole).some(oldProperty => {
                        return this.role[newProperty] === this.initialRole[oldProperty];
                    })
                });
                if (this.role.role && !isEqualToInitial) {
                    if (this.id) {
                        updateRole(this.id, this.role)
                            .then(() => {
                                this.close();
                            });
                    } else {
                        addRole(this.role)
                            .then(() => {
                                this.close()
                            });
                    }

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
                return this.id ? this.$t('objects.edit') : this.$t('objects.new');
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
