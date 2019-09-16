<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit.bind(this, 'contactTypeInstance', 'initialContactType')"
                :secondaryAction="close"
        >
            <span>{{$tc('objects.lookups.contactType.contactType', 1)}}</span> | {{computeTitle}}
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
                        v-model.trim="$v.contactTypeInstance.name.$model"
                        :v="$v.contactTypeInstance.name"
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
        name: "contact-type-edit",
        mixins: [editComponentMixin],
        data() {
            return {
                contactTypeInstance: {
                    name: 'skill name',
                    // description: '',
                },
                initialContactType: {
                    name: 'skill name',
                    // description: '',
                },
            };
        },

        // by vuelidate
        validations: {
            contactTypeInstance: {
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