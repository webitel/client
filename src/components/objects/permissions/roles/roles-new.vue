<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit.bind(this, 'roleInstance', 'initialRole')"
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

            <form class="form_w50">

                <form-input
                        class="form__input"
                        v-model.trim="$v.roleInstance.role.$model"
                        :v="$v.roleInstance.role"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                        required
                ></form-input>

                <form-input
                        class="form__input"
                        v-model="roleInstance.name"
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
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';

    import {addRole, getRole, updateRole} from "@/api/objects/permissions/roles";

    export default {
        name: 'permissions-new',
        mixins: [editComponentMixin],

        data() {
            return {
                roleInstance: {
                    role: 'front-role',
                    name: '',
                    // description: '',
                },
                initialRole: {},
            };
        },

        // by vuelidate
        validations: {
            roleInstance: {
                role: {
                    required
                }
            }
        },

        mounted() {
            if (this.id) {
                this.loadRole(this.id);
            }
        },

        methods: {
            save() {
                if (this.id) {
                    updateRole(this.id, this.roleInstance)
                        .then(() => {
                            this.close();
                        });
                } else {
                    addRole(this.roleInstance)
                        .then(() => {
                            this.close();
                        });
                }
            },

            // load current role from backend
            loadRole(id) {
                getRole(id)
                    .then(response => {
                        this.roleInstance = response.role;
                        this.initialRole = JSON.parse(JSON.stringify(response.role));
                    });
            }
        },
    };
</script>


<style lang="scss" scoped>

</style>
