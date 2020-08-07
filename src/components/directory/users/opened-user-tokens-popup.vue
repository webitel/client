<template>
    <popup
            :title="$tc('objects.directory.users.token', 2)"
            :primaryText="$t('objects.add')"
            :primaryAction="save"
            @close="$emit('close')"
            overflow
    >
        <section>
            <form-input
                v-model="usage"
                :label="$t('objects.name')"
            ></form-input>
        </section>
    </popup>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import popup from '../../utils/popup.vue';    
    import formInput from '../../utils/form-input.vue';

    export default {
        name: 'opened-user-tokens-popup',
        components: { popup, formInput },

        computed: {            
            usage: {                
                get() { return this.$store.state.directory.users.tokens.itemInstance.usage; },
                set(value) { this.setItemProp({ prop: 'usage', value }); },
            },
        },

        methods: {
            async save() {
                try {
                    await this.addToken(this.usage);
                    this.$emit('close');
                } catch {}
            },            

            ...mapActions('directory/users/tokens', {
                addToken: 'POST_ITEM',
                setItemProp: 'SET_ITEM_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>

</style>
