<template>
    <div class="content-wrap">
        <module-header
                :primaryText="$t('modules.save')"
                :primaryAction="close"
                :secondaryAction="close"
        >
            {{$tc('modules.permissions.permissionsRole')}} | {{computeTitle}}
        </module-header>
        <section class="module-content module-new permissions-new">
            <header class="content-header page-header">
                <h3 class="content-title">{{$t('modules.permissions.permissionsNew.generalInfo')}} </h3>
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
                        :label="$t('modules.permissions.permissionsNew.name')"
                        :placeholder="$t('modules.permissions.permissionsNew.namePlaceholder')"
                ></form-input>
                <form-input
                        class="form__input"
                        v-model="form.description"
                        :textarea="true"
                        :height="164"
                        :label="$t('modules.permissions.permissionsNew.description')"
                        :placeholder="$t('modules.permissions.permissionsNew.descriptionPlaceholder')"
                ></form-input>
            </form>
        </section>
    </div>
</template>

<script>
    import moduleHeader from '../module-header';
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
                return this.$route.query.edit ? this.$t('modules.edit') : this.$t('modules.new');
            },
        },
    };
</script>

<!--there is no scope to set .input border from modules.scss-->
<style lang="scss">
    @import "../../../assets/css/modules/modules";

    .permissions-new__form {
        width: 50%;

    }

    .form-input {
        margin: 16px 0 10px;
    }

</style>
