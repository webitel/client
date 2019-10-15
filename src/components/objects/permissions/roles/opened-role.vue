<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                :secondaryAction="close"
        >
            {{$tc('objects.permissions.permissionsRole')}} | {{computeTitle}}
        </object-header>
        <section class="object-content module-new">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                <hint/>
            </header>

            <section class="new_w50">

                <form-input
                        v-model.trim="$v.itemInstance.role.$model"
                        :v="$v.itemInstance.role"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                        required
                ></form-input>

                <form-input
                        v-model="itemInstance.name"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                ></form-input>

                <!--                v-model="role.description"-->
                <form-input
                        :height="164"
                        :label="$t('objects.description')"
                        :placeholder="$t('objects.description')"
                        textarea
                ></form-input>

            </section>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';

    import {addRole, getRole, updateRole} from "@/api/objects/permissions/roles";

    export default {
        name: 'opened-role',
        mixins: [editComponentMixin],

        data() {
            return {
                itemInstance: {
                    role: 'front-role',
                    name: '',
                    // description: '',
                },
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                role: {
                    required
                }
            }
        },

        mounted() {
            if (this.id) {
                this.loadItem();
            }
        },

        methods: {
            async save() {
                if (this.id) {
                    await updateRole(this.id, this.itemInstance);
                } else {
                    await addRole(this.itemInstance);
                }
                this.close();
            },

            // load current role from backend
            async loadItem() {
                const response = await getRole(this.id);
                this.itemInstance = response.role;
                this.initialItem = JSON.parse(JSON.stringify(response.role));
            }
        },
    };
</script>


<style lang="scss" scoped>

</style>
