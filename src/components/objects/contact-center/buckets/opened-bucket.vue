<template>
    <div class="content-wrap">
        <object-header
                :primaryText="$t('objects.save')"
                :primaryAction="submit"
                close
        >
            <span>{{$tc('objects.ccenter.buckets.buckets', 1)}}</span> | {{computeTitle}}
        </object-header>
        <section class="object-content module-new">
            <header class="content-header">
                <h3 class="content-title">{{$t('objects.generalInfo')}}</h3>
            </header>

            <form class="new_w50">
                <form-input
                        v-model.trim="$v.itemInstance.name.$model"
                        :v="$v.itemInstance.name"
                        :label="$t('objects.name')"
                        :placeholder="$t('objects.name')"
                        required
                ></form-input>

                <form-input
                        v-model.trim="itemInstance.description"
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
        name: "opened-bucket-skill",
        mixins: [editComponentMixin],
        data() {
            return {
                itemInstance: {
                    name: 'bucket name',
                    // description: '',
                },
            };
        },

        // by vuelidate
        validations: {
            itemInstance: {
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