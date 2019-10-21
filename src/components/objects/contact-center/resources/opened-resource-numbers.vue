<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$tc('objects.ccenter.res.numbers', 1)}}</h3>
            <i class="icon-icon_plus icon-action" @click="addValuePair"></i>
        </header>
        <form>
            <section class="value-pair-wrap">
                <div
                        class="label"
                        :class="{'invalid': v.itemInstance.numberList.$error}"
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

                <validation-message
                        :v="v.itemInstance.numberList">
                </validation-message>
            </section>
        </form>
    </section>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';

    export default {
        name: "opened-resource-number",
        mixins: [editComponentMixin],
        props: {
            itemInstanceProp: {
                type: Object,
                required: true,
            },
            v: {
                type: Object,
                required: true
            }
        },

        mounted() {
            this.itemInstance = this.itemInstanceProp;
        },

        methods: {
            addValuePair() {
                this.itemInstance.numberList.push('');
            },

            deleteValuePair(valuePairId) {
                this.itemInstance.numberList.splice([valuePairId], 1);
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>