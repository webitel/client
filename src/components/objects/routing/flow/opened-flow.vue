<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            <span>{{$t('objects.routing.flow.flowSchema')}}</span> | {{computeTitle}}
        </object-header>
        <section class="object-content module-new">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
            </header>
            <form class="object-input-grid">
                <form-input
                        v-model.trim="$v.itemInstance.name.$model"
                        :v="$v.itemInstance.name"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                        required
                ></form-input>
            </form>
            <code-editor
                v-model="itemInstance.schema"
                :label="$t('objects.routing.flow.callflow')"
            ></code-editor>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';
    import codeEditor from '@/components/utils/code-editor';
    import {required} from 'vuelidate/lib/validators';

    export default {
        name: "opened-flow",
        mixins: [editComponentMixin],
        components: {
            codeEditor
        },
        data() {
            return {
                itemInstance: {
                    name: '',
                    schema: ''
                },
                options: {
                    autoClosingBrackets: false
                }
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
                name: {
                    required
                },
            }
        },

        mounted() {
            this.loadItem();
        },

        methods: {
            async save() {
                if (this.id) {
                    // upd
                } else {
                    //add
                }
                this.close();
            },

            async loadItem() {
                this.itemInstance.schema = 	JSON.stringify({
                    "recordSession": {
                        "action": "start",
                        "type": "mp3",
                        "stereo": true,
                        "followTransfer": true,
                        "bridged": true,
                        "minSec": 2,
                        "email": []
                    },
                    "_id": "eeedda1e-8ebe-46ee-a264-40c0af337146"
                }, null, 4);
                // const response = await getCommunication(this.id);
                // this.itemInstance = response;
                // this.initialItem = JSON.parse(JSON.stringify(response));
            }
        }
    }
</script>

<style lang="scss" scoped>
    .editor-wrap {
        margin-top: 8px;
    }
</style>