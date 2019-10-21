<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
            <i class="icon-icon_plus icon-action" @click="addValuePair"></i>
        </header>
        <form>
<!--            <div>-->
<!--                <dropdown-select-->
<!--                        :value="itemInstance.strategy"-->
<!--                        :v="v.itemInstance.strategy"-->
<!--                        :options="[]"-->
<!--                        :label="$t('objects.ccenter.resGroups.strategy')"-->
<!--                        :placeholder="$t('objects.ccenter.resGroups.strategy')"-->
<!--                        @input="v.itemInstance.strategy = $event"-->
<!--                        required-->
<!--                ></dropdown-select>-->

                <section class="value-pair-wrap">
                    <div
                            class="label"
                            :class="{'invalid': v.itemInstance.resList.$error}"
                    >
                        {{$tc('objects.ccenter.res.res', 2)}}*
                    </div>
                    <div
                            class="value-pair"
                            v-for="(res, key) in itemInstance.resList"
                    >
                        <form-input
                                v-model="itemInstance.resList[key]"
                                :placeholder="$tc('objects.ccenter.res.res', 1)"
                        ></form-input>

                        <i
                                class="icon-icon_delete icon-action"
                                v-if="key !== 0"
                                @click="deleteValuePair(key)"
                        ></i>
                    </div>

                    <validation-message
                            :v="v.itemInstance.resList">
                    </validation-message>

                </section>
<!--            </div>-->
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-resource-group-resources",
        mixins: [openedTabComponentMixin],

        methods: {
            addValuePair() {
                this.itemInstance.resList.push('');
            },

            deleteValuePair(valuePairId) {
                this.itemInstance.resList.splice([valuePairId], 1);
            },
        }
    }
</script>