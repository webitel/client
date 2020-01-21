<template>
    <popup
            class="upload-popup"
            :title="$t('objects.importJSON')"
            :primaryAction="save"
            :primaryDisabled="computeDisabledSave"
            @close="$emit('close')"
    >
        <section class="popup-content">
            <checkbox
                    v-model="create"
                    :label="$t('objects.routing.flow.createNew')"
            ></checkbox>
            <form>
                <form-input
                        v-model="flow.name"
                        :v="$v.flow.name"
                        :label="$t('objects.name')"
                        required
                ></form-input>
            </form>
        </section>
    </popup>
</template>

<script>
    import checkbox from '../../utils/checkbox';
    import formInput from '../../utils/form-input';
    import divider from '../../utils/divider';
    import popup from '../../utils/popup';
    import required from "vuelidate/src/validators/required";
    import {addFlow, updateFlow} from "../../../api/routing/flow/flow";

    export default {
        name: "upload-flow-popup",
        components: {
            formInput,
            checkbox,
            divider,
            popup
        },
        props: {
            file: {
                required: true,
            }
        },
        data() {
            return {
                create: true,
                flow: {name: 'file.name'},
            }
        },

        validations: {
            flow: {
                name: {
                    required
                }
            }
        },

        mounted() {
            this.processJSON();
        },

        computed: {
            computeDisabledSave() {
                this.$v.$touch();
                // if its still pending or an error is returned do not submit
                return this.$v.$pending ||
                    this.$v.$error;
            }
        },

        methods: {
            async save() {
                if (this.create) {
                    try {
                        delete this.flow.id;
                        await addFlow(this.flow);
                        this.$emit('close');
                    } catch {
                    }
                } else {
                    try {
                        await updateFlow(this.flow.id, this.flow);
                        this.$emit('close');
                    } catch {
                    }
                }
            },

            processJSON() {
                const reader = new FileReader();
                reader.addEventListener('load', (e) => {
                        const file = e.target.result;
                        if (file) this.flow = JSON.parse(file);
                    }
                );
                reader.readAsText(this.file);
            },

            async addItem(item) {
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/objects/upload-popup";

    .popup-content {
        margin: 38px 0 18px;
    }
</style>