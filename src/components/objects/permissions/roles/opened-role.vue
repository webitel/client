<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            {{$tc('objects.permissions.permissionsRole')}} | {{computeTitle}}
        </object-header>

        <section class="object-content module-new">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
            </header>

            <form class="new_w50">
                <form-input
                        v-model.trim="$v.itemInstance.name.$model"
                        :v="$v.itemInstance.name"
                        :label="$t('objects.name')"
                        required
                ></form-input>

                <!--                v-model="role.description"-->
                <form-input
                        :label="$t('objects.description')"
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
        name: 'opened-role',
        mixins: [editComponentMixin],

        data() {
            return {
                itemInstance: {
                    name: 'front-role',
                    // description: '',
                },
            };
        },

        validations: {
            itemInstance: {
                name: {
                    required
                }
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

            async loadItem() {
                this.itemInstance = await getRole(this.id);
                this.initialItem = JSON.parse(JSON.stringify(this.itemInstance));
            }
        },
    };
</script>


<style lang="scss" scoped>

</style>
