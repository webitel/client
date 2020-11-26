<template>
    <wt-popup
        @close="$emit('close')"
    >
        <template slot="header">
            <h3 class='popup-header-content'>{{$t('objects.directory.users.tokenPopupHeader')}}</h3>            
        </template>
        <template slot="main">
            <div class='popup-token-container'>
                <h4 class='popup-token-label'>{{token}}</h4>
            </div>
            <h4 class='popup-token-text'>{{$t('objects.directory.users.tokenPopupText')}}</h4>
        </template>
        <template slot="actions">
            <wt-button color="primary" @click="copy">{{$t('objects.directory.users.tokenPopupCopy')}}</wt-button>
            <wt-button class='button-save' color="secondary" @click="saveTxt">{{$t('objects.directory.users.tokenPopupSave')}}</wt-button>
        </template>
    </wt-popup>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
    import { downloadAsTXT } from '../../../utils/download';

    export default {
        name: 'opened-user-tokens-created-popup',
        components: {},

        computed: {
            token: {
                get() {
                    return this.$store.state.directory.users.tokens.itemInstance.token;
                }
            },

            userName: {
                get() {
                    return this.$store.state.directory.users.itemInstance.name;
                }
            },
        },

        methods: {
            async copy() {
                if (this.token) {
                    debugger
                    eventBus.$emit('copy', this.token);
                }
            }, 
            
            async saveTxt() {
                downloadAsTXT(this.token, this.userName);
            },
        },
    };
</script>

<style lang="scss" scoped>

    .popup-header-content {
        text-align: center;
        text-decoration: underline;
        text-decoration-color: #FFC107;
    }

    .popup-token-container {
        width: 50%; margin-left: 
        auto; margin-right: auto; 
        border: 2px solid #FF4444; 
        border-radius: 5px; 
        margin-top: 10px; 
        margin-bottom: 20px;
    }

    .popup-token-label {
        text-align: center; 
        color: #acacac; 
        display: block; 
        margin-top: 20px; 
        margin-bottom: 20px;
    }
    
    .popup-token-text {
        margin-left: 30px; 
        margin-right: 30px;
    }

    .button-save {
        margin-left: 20px;
    }
</style>
