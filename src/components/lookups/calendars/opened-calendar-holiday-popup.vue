<template>
    <popup
            :title="$t('objects.lookups.calendars.newHoliday')"
            :primaryAction="save"
            :primaryText="computePrimaryText"
            :primaryDisabled="computeDisabled"
            @close="$emit('close')"
            overflow
    >
        <form>
            <form-input
                    v-model.trim="name"
                    :label="$t('objects.name')"
                    :v="$v.itemInstance.name"
                    required
            ></form-input>
            <div class="date">
                <datepicker
                        class="datepicker__to-right"
                        v-model="date"
                        :label="$t('objects.lookups.calendars.date')"
                        :v="$v.itemInstance.date"
                        required
                ></datepicker>
                <div class="switcher-label-wrap">
                    <div class="label">{{$t('objects.lookups.calendars.everyYear')}}</div>
                    <switcher
                            v-model="repeat"
                    ></switcher>
                </div>
            </div>
        </form>
    </popup>
</template>

<script>
    import popup from '@/components/utils/popup';
    import datepicker from '@/components/utils/datepicker';
    import editComponentMixin from '@/mixins/objectPagesMixins/openedObjectMixin/editComponentMixin';
    import { required } from 'vuelidate/lib/validators';
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'opened-calendar-holiday-popup',
        mixins: [editComponentMixin],
        components: {
            popup,
            datepicker,
        },

        validations: {
            itemInstance: {
                name: {
                    required,
                },
                date: {
                    required,
                },
            },
        },

        mounted() {
            this.loadItem();
        },

        computed: {
            ...mapState('lookups/calendars/holidays', {
                id: (state) => state.itemId,
                itemInstance: (state) => state.itemInstance,
            }),
            name: {
                get() {
                    return this.$store.state.lookups.calendars.holidays.itemInstance.name;
                },
                set(value) {
                    this.setItemProp({ prop: 'name', value });
                },
            },
            date: {
                get() {
                    return this.$store.state.lookups.calendars.holidays.itemInstance.date;
                },
                set(value) {
                    this.setItemProp({ prop: 'date', value });
                },
            },
            repeat: {
                get() {
                    return this.$store.state.lookups.calendars.holidays.itemInstance.repeat;
                },
                set(value) {
                    this.setItemProp({ prop: 'repeat', value });
                },
            },

            computePrimaryText() {
                // if it's a new item
                // OR any fields have changed
                return !(typeof this.id === 'number') || this.itemInstance._dirty
                    ? this.$t('objects.save') : this.$t('objects.saved');
            },

            computeDisabled() {
                // if there's a validation problem
                // OR it's edit and any fields haven't changed
                return this.checkValidations()
                    || (!this.itemInstance._dirty && (typeof this.id === 'number'));
            },
        },

        methods: {
            async save() {
                const invalid = this.checkValidations();
                // console.log(!invalid, !(typeof this.id === 'number'));
                if (!invalid) {
                    try {
                        !(typeof this.id === 'number') ? await this.addItem() : await this.updateItem();
                        this.$emit('close');
                    } catch {
                    }
                }
            },

            ...mapActions('lookups/calendars/holidays', {
                setItemProp: 'SET_ITEM_PROPERTY',
                addItem: 'ADD_ITEM',
                updateItem: 'UPDATE_ITEM',
                loadItem: 'LOAD_ITEM',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    .date {
        display: flex;
        margin-top: 14px;

        .datepicker {
            margin-right: 18px;
        }

        .switcher {
            margin-top: 9px;
        }
    }
</style>
