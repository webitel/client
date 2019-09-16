<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit.bind(this, 'leadSourceInstance', 'initialLeadSource')"
                :secondaryAction="close"
        >
            <span>{{$tc('objects.lookups.leadSource.leadSource', 1)}}</span> | {{computeTitle}}
        </object-header>
        <section class="object-content module-new permissions-new">
            <header class="content-header page-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
                <div class="hint">
                    <i
                            class="hint__img tooltip-activator icon-icon_question"
                    ></i>
                    <div class="tooltip-left">lorem ipsum</div>
                </div>
            </header>

            <form class="form_w50">

                <form-input
                        class="form__input"
                        v-model.trim="$v.leadSourceInstance.name.$model"
                        :v="$v.leadSourceInstance.name"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                        required
                ></form-input>

                <form-input
                        class="form__input"
                        :height="164"
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
        name: "lead-source-edit",
        mixins: [editComponentMixin],
        data() {
            return {
                leadSourceInstance: {
                    name: 'skill name',
                    // description: '',
                },
                initialLeadSource: {
                    name: 'skill name',
                    // description: '',
                },
            };
        },

        // by vuelidate
        validations: {
            leadSourceInstance: {
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