<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="v.itemInstance.name.$model"
                    :v="v.itemInstance.name"
                    :label="$t('objects.name')"
                    :placeholder="$t('objects.name')"
                    required
            ></form-input>

            <dropdown-select
                    :value="v.itemInstance.gateway"
                    :v="v.itemInstance.gateway"
                    :options="[]"
                    :label="$tc('objects.routing.gateways.gateways', 1)"
                    :placeholder="$tc('objects.routing.gateways.gateways', 1)"
                    @input="v.itemInstance.gateway = $event"
                    required
            ></dropdown-select>

            <form-input
                    v-model.trim="v.itemInstance.cps.$model"
                    :v="v.itemInstance.cps"
                    :label="$t('objects.ccenter.res.cps')"
                    :placeholder="$t('objects.ccenter.res.cps')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="v.itemInstance.limit.$model"
                    :v="v.itemInstance.limit"
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
        </form>
    </section>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';

    export default {
        name: "opened-resource-general",
        mixins: [editComponentMixin],
        props: {
            itemInstanceProp: {
                type: Object,
                required: true,
            },
            v: {
                type: Object,
                required: true,
            }
        },

        mounted() {
            this.itemInstance = this.itemInstanceProp;
        },
    }
</script>

<style lang="scss" scoped>

</style>