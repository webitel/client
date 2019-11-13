<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            <span>{{$t('objects.routing.dialplan.dialplanRule')}}</span> | {{computeTitle}}
        </object-header>
        <section class="object-content module-new">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
            </header>
            <form class="object-input-grid">
                <form-input
                        v-model.trim="$v.itemInstance.name.$model"
                        :v="$v.itemInstance.name"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                        required
                ></form-input>

                <dropdown-select
                    v-model="itemInstance.callflow"
                    :v="$v.itemInstance.callflow"
                    :label="$tc('objects.routing.callflow.callflow', 1)"
                    :placeholder="$tc('objects.routing.callflow.callflow', 1)"
                    :options="callflowList"
                    required
                ></dropdown-select>

<!--                1 col container-->
                <div>
                    <form-input
                            v-model.trim="$v.itemInstance.pattern.$model"
                            :v="$v.itemInstance.pattern"
                            :label="$t('objects.routing.dialplan.pattern')"
                            :placeholder="$t('objects.routing.dialplan.pattern')"
                            required
                    ></form-input>

                    <form-input
                            v-model="itemInstance.description"
                            :label="$t('objects.description')"
                            :placeholder="$t('objects.description')"
                            textarea
                    ></form-input>
                </div>
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
        name: "opened-dialplan",
        mixins: [editComponentMixin],
        data() {
            return {
                itemInstance: {
                    name: '',
                    callflow: {},
                    pattern: '',
                    description: '',
                },
                callflowList: [
                    {name: 'Callflow 1'}, {name: 'Callflow 2'}
                ]
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
                callflow: {
                    required
                },
                pattern: {
                    required
                }
            }
        },

        methods: {
            async save() {
                if (this.id) {
                    // upd
                } else {
                        //add
                }
                this.close();
            },

            async loadItem() {
                // const response = await getCommunication(this.id);
                // this.itemInstance = response;
                // this.initialItem = JSON.parse(JSON.stringify(response));
            }
        }
    }
</script>

<style scoped>

</style>