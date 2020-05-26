<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit.bind(this, 'leadStatusInstance', 'initialLeadStatus')"
                :secondaryAction="close"
        >
            <span>{{$t('objects.lookups.leadStatus.leadStatus')}}</span> | {{computeTitle}}
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
                        v-model.trim="$v.leadStatusInstance.name.$model"
                        :v="$v.leadStatusInstance.name"
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

    import { required } from 'vuelidate/lib/validators';

    export default {
        name: 'opened-lead-status',
        mixins: [editComponentMixin],
        data() {
            return {
                leadStatusInstance: {
                    name: 'skill name',
                    // description: '',
                },
                initialLeadStatus: {
                    name: 'skill name',
                    // description: '',
                },
            };
        },

        // by vuelidate
        validations: {
            leadStatusInstance: {
                name: {
                    required,
                },
            },
        },

        methods: {
            save() {
                if (this.id) {
                    //    update
                } else {
                    //    create
                }

                this.close();
            },
        },
    };
</script>

<style scoped>

</style>
