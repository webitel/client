<template>
    <div>
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                :secondaryAction="close"
        >
            {{$tc('objects.ccenter.res.res', 2)}} | {{computeTitle}}
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
                            :value="$v.itemInstance.gateway"
                            :v="$v.itemInstance.gateway"
                            :options="[]"
                            :label="$tc('objects.routing.gateways.gateways', 1)"
                            :placeholder="$tc('objects.routing.gateways.gateways', 1)"
                            @input="$v.itemInstance.gateway = $event"
                            required
                    ></dropdown-select>

                    <form-input
                            v-model.trim="$v.itemInstance.cps.$model"
                            :v="$v.itemInstance.cps"
                            :label="$t('objects.ccenter.res.cps')"
                            :placeholder="$t('objects.ccenter.res.cps')"
                            required
                    ></form-input>

                    <form-input
                            v-model.trim="$v.itemInstance.limit.$model"
                            :v="$v.itemInstance.limit"
                            :label="$t('objects.ccenter.res.limit')"
                            :placeholder="$t('objects.ccenter.res.limit')"
                            required
                    ></form-input>

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
                        <h3 class="content-title">{{$tc('objects.ccenter.res.numbers', 1)}}</h3>
                    </header>
                </template>
                <template slot="expansion-content">
                    <section class="value-pair-wrap">
                        <div
                                class="label"
                                :class="{'invalid': $v.itemInstance.numberList.$error}"
                        >
                            {{$t('objects.ccenter.res.displayNumbers')}}*
                        </div>
                        <div
                                class="value-pair"
                                v-for="(num, key) in itemInstance.numberList"
                        >
                            <form-input
                                    v-model="itemInstance.numberList[key]"
                                    :placeholder="$tc('objects.ccenter.res.numbers', 1)"
                            ></form-input>

                            <i
                                    class="icon-icon_delete icon-action"
                                    v-if="key !== 0"
                                    @click="deleteValuePair(key)"
                            ></i>
                        </div>
                        <i class="icon-icon_plus icon-action" @click="addValuePair"></i>

                        <validation-message
                                :v="$v.itemInstance.numberList">
                        </validation-message>
                    </section>
                </template>
            </expansion-panel>

            <expansion-panel>
                <template slot="expansion-header">
                    <header class="content-header">
                        <h3 class="content-title">{{$t('objects.ccenter.res.failure')}}</h3>
                    </header>
                </template>
                <template slot="expansion-content">
                    <form-input
                            v-model.trim="itemInstance.maxErrors"
                            :label="$t('objects.ccenter.res.maxErrors')"
                            :placeholder="$t('objects.ccenter.res.maxErrors')"
                    ></form-input>

                    <div class="tags-input-wrap">
                        <div class="tags-input__label">
                            {{$tc('objects.ccenter.res.errorCodes')}}
                        </div>

                        <tags-input
                                v-model="errorCodeTag"
                                :tags="itemInstance.errorCodeList"
                                :autocomplete-items="errorCodeTags"
                                :autocomplete-min-length="0"
                                :placeholder="$tc('objects.ccenter.res.errorCodes')"
                                @tags-changed="newTags => this.itemInstance.errorCodeList = newTags"
                                autocomplete-filter-duplicates
                        >

                        </tags-input>
                    </div>
                </template>
            </expansion-panel>
        </section>
    </div>
</template>

<script>
    import tagsInput from "@johmun/vue-tags-input";

    import editComponentMixin from '@/mixins/editComponentMixin';
    import {required} from 'vuelidate/lib/validators';
    import {requiredArrayValue} from "@/utils/validators";
    import {getResource} from "../../../../api/objects/contact-center/resources";


    export default {
        name: 'opened-resource',
        components: {
            'tags-input': tagsInput,
        },
        mixins: [editComponentMixin],

        data() {
            return {
                itemInstance: {
                    name: '',
                    gateway: {},
                    cps: '',
                    limit: '',
                    description: '',
                    numberList: ['1', '2'],
                    maxErrors: null,
                    errorCodeList: [],
                },
                errorCodeTag: '',
                errorCodeTags: [
                    {text: '1xx'},
                    {text: '2xx'},
                    {text: '3xx'},
                    {text: '4xx'},
                    {text: '5xx'}
                ],

            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
                gateway: {
                    required
                },
                cps: {
                    required
                },
                limit: {
                    required
                },
                numberList: {
                    requiredArrayValue
                }
            }
        },

        mounted() {
            if (this.id) {
                this.loadItem();
            }
        },

        methods: {
            addValuePair() {
                this.itemInstance.numberList.push('');
            },

            deleteValuePair(valuePairId) {
                this.itemInstance.numberList.splice([valuePairId], 1);
            },

            async save() {
                if (this.id) {
                    // await updateRole(this.id, this.itemInstance);
                } else {
                    // await addRole(this.itemInstance);
                }
                this.close();
            },

            // load current item from backend
            async loadItem() {
                const response = await getResource(this.id);
                this.itemInstance = response;
                this.initialItem = JSON.parse(JSON.stringify(response));
            }
        },
    };
</script>


<style lang="scss" scoped>
    .value-pair-wrap {
        margin-top: 8px;
    }

    .value-pair {
        grid-template-columns: 1fr 24px;
    }
</style>
