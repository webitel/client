<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="save"
                :secondaryAction="close"
        >
            <span>{{$tc('objects.lookups.skills.skills', 1)}}</span> | {{computeTitle}}
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
                        v-model.trim="$v.skillInstance.name.$model"
                        :v="$v.skillInstance.name"
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
    import objectHeader from '@/components/objects/object-header';
    import formInput from '@/components/utils/form-input';

    import {required} from 'vuelidate/lib/validators';

    export default {
        name: "agent-skills-edit",
        components: {
            'object-header': objectHeader,
            'form-input': formInput,
        },
        data() {
            return {
                skillInstance: {
                    name: 'skill name',
                    // description: '',
                },
                initialSkill: {},
                id: null
            };
        },

        // by vuelidate
        validations: {
            skillInstance: {
                name: {
                    required
                }
            }
        },

        mounted() {
            if(this.$route.params.id !== 'new') this.id = this.$route.params.id;

        },

        methods: {
            save() {
                this.$v.skillInstance.$touch();
                // if its still pending or an error is returned do not submit
                if (this.$v.skillInstance.$pending || this.$v.skillInstance.$error) return;

                // check if some fields was changed
                const isEqualToInitial = Object.keys(this.skillInstance).every(newProperty => {
                    return Object.keys(this.initialSkill).some(oldProperty => {
                        return this.skillInstance[newProperty] === this.initialSkill[oldProperty];
                    })
                });
                if (!isEqualToInitial) {
                    if (this.id) {
                    //    update
                    } else {
                    //    create
                    }

                } else {
                    this.close();
                }
            },

            close() {
                this.$router.go(-1);
            },
        },
        computed: {
            computeTitle() {
                return this.id ? this.$t('objects.edit') : this.$t('objects.new');
            },
        },
    }
</script>

<style scoped>

</style>