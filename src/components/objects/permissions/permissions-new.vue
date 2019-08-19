<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >
            {{$tc('objects.permissions.permissionsRole')}} | {{computeTitle}}
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

            <form class="permissions-new__form">
                <form-input
                        class="form__input"
                        v-model.trim="$v.name.$model"
                        :v="$v.name"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                        required
                ></form-input>
                <form-input
                        class="form__input"
                        v-model="description"
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
    import objectHeader from '../object-header';
    import formInput from '../../utils/form-input';
    import {required} from 'vuelidate/lib/validators';

    export default {
        name: 'permissions-new',
        components: {
            'object-header': objectHeader,
            'form-input': formInput,
        },
        data() {
            return {
                name: '',
                description: '',
            };
        },

        // by vuelidate
        validations: {
            name: {
                required,
            }
        },

        methods: {
            close() {
                this.$router.push('/permissions');
            },
        },
        computed: {
            computeTitle() {
                return this.$route.query.edit ? this.$t('objects.edit') : this.$t('objects.new');
            },
        },
    };
</script>


<style lang="scss" scoped>
    .page-header {
        justify-content: start;
    }

    .permissions-new__form {
        width: 50%;

    }

    .form-input {
        margin: 16px 0 10px;
    }

</style>
