<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                :secondaryAction="close"
        >
            {{$tc('objects.ccenter.resGroups.resGroups', 1)}} | {{computeTitle}}
        </object-header>
        <section class="object-content module-new">

            <expansion-panel opened>
                <template slot="expansion-header">
                    <header class="content-header">
                        <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                    </header>
                </template>
                <template slot="expansion-content">
                    <form-input
                            v-model.trim="$v.itemInstance.name.$model"
                            :v="$v.itemInstance.name"
                            :label="$t('objects.name')"
                            :placeholder="$t('objects.name')"
                            required
                    ></form-input>

                    <dropdown-select
                            :value="$v.itemInstance.communication"
                            :v="$v.itemInstance.communication"
                            :options="[]"
                            :label="$tc('objects.lookups.communications.communications', 1)"
                            :placeholder="$tc('objects.lookups.communications.communications', 1)"
                            @input="$v.itemInstance.communication = $event"
                            required
                    ></dropdown-select>

                    <form-input
                            v-model="itemInstance.description"
                            :label="$t('objects.description')"
                            :placeholder="$t('objects.description')"
                            textarea
                    ></form-input>

                </template>
            </expansion-panel>

            <expansion-panel>
                <template slot="expansion-header">
                    <header class="content-header">
                        <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                    </header>
                </template>
                <template slot="expansion-content">
                    <div>
                        <dropdown-select
                                :value="itemInstance.strategy"
                                :v="$v.itemInstance.strategy"
                                :options="[]"
                                :label="$t('objects.ccenter.resGroups.strategy')"
                                :placeholder="$t('objects.ccenter.resGroups.strategy')"
                                @input="$v.itemInstance.strategy = $event"
                                required
                        ></dropdown-select>

                        <section class="value-pair-wrap">
                            <div class="label">{{$tc('objects.ccenter.res.res', 2)}}</div>
                            <div
                                    class="value-pair"
                                    v-for="(res, key) in itemInstance.resList"
                            >
                                <form-input
                                        :placeholder="$tc('objects.ccenter.res.res', 1)"
                                ></form-input>

                                <i
                                        class="icon-icon_delete icon-action"
                                        v-if="key !== 0"
                                        @click="deleteValuePair(key)"
                                ></i>
                            </div>
                            <i class="icon-icon_plus icon-action" @click="addValuePair"></i>
                        </section>
                    </div>
                </template>
            </expansion-panel>

            <expansion-panel>
                <template slot="expansion-header">
                    <header class="content-header">
                        <h3 class="content-title">{{$t('objects.ccenter.resGroups.timerange')}}</h3>
                    </header>
                </template>
                <template slot="expansion-content">
<!--                        <section class="value-pair-wrap">-->
<!--                            <div class="label">{{$tc('objects.ccenter.res.res', 2)}}</div>-->
<!--                            <div-->
<!--                                    class="value-pair"-->
<!--                                    v-for="(res, key) in itemInstance.resList"-->
<!--                            >-->
<!--                                <form-input-->
<!--                                        :placeholder="$tc('objects.ccenter.res.res', 1)"-->
<!--                                ></form-input>-->

<!--                                <i-->
<!--                                        class="icon-icon_delete icon-action"-->
<!--                                        v-if="key !== 0"-->
<!--                                        @click="deleteValuePair(key)"-->
<!--                                ></i>-->
<!--                            </div>-->
<!--                            <i class="icon-icon_plus icon-action" @click="addValuePair"></i>-->
<!--                        </section>-->
                </template>
            </expansion-panel>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';

    import {addRole, getRole, updateRole} from "@/api/objects/permissions/roles";
    import DropdownSelect from "../../../utils/dropdown-select";

    export default {
        name: 'opened-resource-group',
        components: {DropdownSelect},
        mixins: [editComponentMixin],

        data() {
            return {
                itemInstance: {
                    name: '',
                    communication: '',
                    description: '',
                    strategy: '',
                    resList: ['', '']
                },
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
                comunication: {
                    required
                },
                strategy: {
                    required
                },
                // resList: {
                //     required
                // }
            }
        },

        mounted() {
            if (this.id) {
                this.loadItem();
            }
        },

        methods: {
            addValuePair() {
                this.itemInstance.resList.push('');
            },

            deleteValuePair(valuePairId) {
                this.itemInstance.resList.splice([valuePairId], 1);
            },

            async save() {
                if (this.id) {
                    // await updateRole(this.id, this.itemInstance);
                } else {
                    // await addRole(this.itemInstance);
                }
                this.close();
            },

            // load current role from backend
            async loadItem() {
                const response = await getRole(this.id);
                // this.itemInstance = response.role;
                // this.initialItem = JSON.parse(JSON.stringify(response.role));
            }
        },
    };
</script>


<style lang="scss" scoped>
    .value-pair-wrap {
        margin-top: 28px;
    }

    .value-pair {
        grid-template-columns: 1fr 24px !important;
    }
</style>
