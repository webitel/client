<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
        </header>
        <form class="object-input-grid">
            <form-input
                    v-model.trim="v.itemInstance.res.name.$model"
                    :v="v.itemInstance.res.name"
                    :label="$t('objects.name')"
                    :placeholder="$t('objects.name')"
                    required
            ></form-input>

            <dropdown-select
                    v-model="itemInstance.res.gateway"
                    :v="v.itemInstance.res.gateway"
                    :options="gatewayList"
                    :label="$tc('objects.routing.gateways.gateways', 1)"
                    :placeholder="$tc('objects.routing.gateways.gateways', 1)"
                    required
            ></dropdown-select>

            <form-input
                    v-model.trim="v.itemInstance.res.cps.$model"
                    :v="v.itemInstance.res.cps"
                    :label="$t('objects.ccenter.res.cps')"
                    :placeholder="$t('objects.ccenter.res.cps')"
                    required
            ></form-input>

            <form-input
                    v-model.trim="v.itemInstance.res.limit.$model"
                    :v="v.itemInstance.res.limit"
                    :label="$t('objects.ccenter.res.limit')"
                    :placeholder="$t('objects.ccenter.res.limit')"
                    required
            ></form-input>

            <form-input
                    v-model="itemInstance.res.description"
                    :label="$t('objects.description')"
                    :placeholder="$t('objects.description')"
                    textarea
            ></form-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {getGatewayNameIdPair} from "../../../api/contact-center/resources/resources";

    export default {
        name: "opened-resource-general",
        mixins: [openedTabComponentMixin],
        data() {
            return {
                gatewayList: [],
            }
        },

        mounted() {
            this.loadGatewayList();
        },

        methods: {
            async loadGatewayList() {
               this.gatewayList = await getGatewayNameIdPair();
            }
        }
    }
</script>