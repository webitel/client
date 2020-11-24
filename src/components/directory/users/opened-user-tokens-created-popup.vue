<template>
    <wt-popup
        @close="$emit('close')"
    >
        <template slot="header">
            <h2 style="text-align: center; font-size: 14px">Your token key has been created successfully!</h2>
            <wt-divider style="width: 50%; margin-left: auto; margin-right: auto; border-color: #FFC107"></wt-divider>
        </template>
        <template slot="main">
            <div style="width: 50%; margin-left: auto; margin-right: auto; border: 2px solid red; border-radius: 5px; margin-top: 10px; margin-bottom: 20px;">
                <label style="font-size: 14px; text-align: center; color: #acacac; display: block; margin-top: 20px; margin-bottom: 20px;">c9uyogucxtrttcnmy7f77d9m8y</label>
            </div>
            <p style="font-size: 12px">Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Accusamus autem consequatur consequuntur earum, eius, exercitationem, expedita
            fugiat mollitia nam nesciunt omnis placeat provident quos sed tempore ullam
            voluptate.
            Est, molestias.</p>
        </template>
        <template slot="actions">
            <wt-button color="primary" @click="copy">Copy to clipboard</wt-button>
            <wt-button color="secondary" style="margin-left: 20px;" @click="saveTxt">Save in TXT</wt-button>
        </template>
    </wt-popup>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import popup from '../../utils/popup.vue';    
    import formInput from '../../utils/form-input.vue';
import Divider from '../../utils/divider.vue';

    export default {
        name: 'opened-user-tokens-created-popup',
        components: { popup, formInput },

        computed: {            
            usage: {                
                get() { return this.$store.state.directory.users.tokens.itemInstance.usage; },
                set(value) { this.setItemProp({ prop: 'usage', value }); },
            },
        },

        methods: {
            async copy() {
                console.log("Copy to clipboard");
            }, 
            
            async saveTxt() {
                console.log("savedTxt");
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
