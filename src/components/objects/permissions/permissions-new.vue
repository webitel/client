<template>
    <div class="content-wrap">
        <module-header
                :primaryText="$t('objects.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >
            {{$tc('objects.permissions.permissionsRole')}} | {{computeTitle}}
        </module-header>
        <section class="module-content module-new permissions-new">
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
    import moduleHeader from '../object-header';
    import formInput from '../../utils/form-input';

    export default {
        name: 'permissions-new',
        components: {
            'module-header': moduleHeader,
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

<!--there is no scope to set .input border from objects.scss-->
<style lang="scss">
    @import "../../../assets/css/objects/objects";

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
