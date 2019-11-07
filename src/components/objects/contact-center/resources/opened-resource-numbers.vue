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
                            v-model="num.display"
                            :placeholder="$tc('objects.ccenter.res.numbers', 1)"
                    ></form-input>

                    <i
                            class="icon-icon_delete icon-action"
                            v-if="key !== 0"
                            @click="deleteValuePair(num, key)"
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
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {deleteResDisplay} from "../../../../api/objects/contact-center/resources";

    export default {
        name: "opened-resource-number",
        mixins: [openedTabComponentMixin],

        methods: {
            addValuePair() {
                this.itemInstance.numberList.push({display: ''});
            },

            async deleteValuePair(value, valuePairId) {
                await deleteResDisplay(this.id, value.id);
                this.itemInstance.numberList.splice([valuePairId], 1);
            },
        }
    }
</script>