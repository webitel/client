<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.ccenter.res.failure')}}</h3>
        </header>

        <form class="object-input-grid grid-w50">
            <form-input
                    v-model.trim="maxErrors"
                    :label="$t('objects.ccenter.res.maxErrors')"
            ></form-input>

            <tags-input
                    v-model="errorIds"
                    :options="dropdownOptionsList"
                    :label="$tc('objects.directory.devices.devices', 2)"
                    :addOnlyFromAutocomplete="false"
            ></tags-input>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
    import {mapActions} from "vuex";

    export default {
        name: "opened-resource-failure",
        mixins: [openedTabComponentMixin],

        data() {
            return {
                dropdownOptionsList: [
                    {name: '1xx'},
                    {name: '2xx'},
                    {name: '3xx'},
                    {name: '4xx'},
                    {name: '5xx'}
                ],
            }
        },

        computed: {
            maxErrors: {
                get() {return this.$store.state.ccenter.res.itemInstance.maxErrors},
                set(value) {this.setItemProp({prop: 'maxErrors', value})}
            },
            errorIds: {
                get() {return this.$store.state.ccenter.res.itemInstance.errorIds},
                set(value) {this.setItemProp({prop: 'errorIds', value})}
            },
        },

        methods: {
            ...mapActions('ccenter/res', {
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        }
    }
</script>