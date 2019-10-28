<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit.bind(this, 'communicationInstance', 'initialCommunication')"
                :secondaryAction="close"
        >
            <span>{{$tc('objects.lookups.communications.communications', 1)}}</span> | {{computeTitle}}
        </object-header>
        <section class="object-content module-new permissions-new">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                <div class="hint">
                    <i
                            class="hint__img tooltip-activator icon-icon_question"
                    ></i>
                    <div class="tooltip-left">lorem ipsum</div>
                </div>
            </header>

            <form class="new_w50">

                <form-input
                        class="form__input"
                        v-model.trim="$v.communicationInstance.code.$model"
                        :v="$v.communicationInstance.code"
                        :label="$t('objects.lookups.communications.code')"
                        :placeholder="$t('objects.lookups.communications.code')"
                        required
                ></form-input>

                <form-input
                        class="form__input"
                        v-model.trim="$v.communicationInstance.name.$model"
                        :v="$v.communicationInstance.name"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                        required
                ></form-input>

                <form-input
                        class="form__input"
                        :label="$t('objects.description')"
                        :placeholder="$t('objects.description')"
                        textarea
                ></form-input>

            </form>
        </section>
    </div>
</template>

<script>
    import editComponentMixin from '@/mixins/editComponentMixin';

    import {required} from 'vuelidate/lib/validators';

    export default {
        name: "opened-communications-type",
        mixins: [editComponentMixin],
        data() {
            return {
                communicationInstance: {
                    code: 'A1',
                    name: 'skill name',
                    // description: '',
                },
                initialCommunication: {
                    code: 'A1',
                    name: 'skill name',
                    // description: '',
                },
            };
        },

        // by vuelidate
        validations: {
            communicationInstance: {
                code: {
                    required
                },
                name: {
                    required
                }
            }
        },

        methods: {
            save() {
                if (this.id) {
                    //    update
                } else {
                    //    create
                }

                this.close();
            }
        }
    }
</script>

<style scoped>

</style>