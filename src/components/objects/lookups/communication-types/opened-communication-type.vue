<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            <span>{{$tc('objects.lookups.communications.communications', 1)}}</span> | {{computeTitle}}
        </object-header>
        <section class="object-content module-new">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
            </header>

            <form class="new_w50">
                <form-input
                        v-model.trim="$v.itemInstance.code.$model"
                        :v="$v.itemInstance.code"
                        :label="$t('objects.lookups.communications.code')"
                        required
                ></form-input>

                <form-input
                        v-model.trim="$v.itemInstance.name.$model"
                        :v="$v.itemInstance.name"
                        :label="$t('objects.name')"
                        required
                ></form-input>

                <form-input
                        v-model="itemInstance.description"
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
    import {
        addCommunication,
        getCommunication,
        updateCommunication
    } from "../../../../api/objects/lookups/communications";

    export default {
        name: "opened-communications-type",
        mixins: [editComponentMixin],
        data() {
            return {
                itemInstance: {
                    name: '',
                    code: '',
                    description: '',
                }
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                code: {
                    required
                },
                name: {
                    required
                }
            }
        },

        methods: {
            async save() {
                if (this.id) {
                    await updateCommunication(this.itemInstance);
                } else {
                    await addCommunication(this.itemInstance);
                }
                this.close();
            },

            async loadItem() {
                const response = await getCommunication(this.id);
                this.itemInstance = response;
                this.initialItem = JSON.parse(JSON.stringify(response));
            }
        }
    }
</script>

<style scoped>

</style>