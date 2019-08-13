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
                <h3 class="content-title">{{$t('objects.generalInfo')}} </h3>
                <div class="hint">
                    <i
                            class="hint__img tooltip-activator icon-icon_question"
                    ></i>
                    <div class="tooltip-left">Ya s`el deda :(</div>
                </div>
            </header>

            <form class="permissions-new__form">
                <form-input
                        class="form__input"
                        v-model="form.name"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.namePlaceholder')"
                ></form-input>
                <form-input
                        class="form__input"
                        v-model="form.description"
                        :textarea="true"
                        :height="164"
                        :label="$t('objects.permissions.permissionsNew.description')"
                        :placeholder="$t('objects.permissions.permissionsNew.descriptionPlaceholder')"
                ></form-input>
            </form>
        </section>
    </div>
</template>

<script>
    import objectHeader from '../object-header';
    import formInput from '../../utils/form-input';

    export default {
        name: 'permissions-new',
        components: {
            'object-header': objectHeader,
            'form-input': formInput,
        },
        data() {
            return {
                form: {
                    name: '',
                    description: '',
                },
            };
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
