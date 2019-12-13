import objectHeader from '@/components/objects/the-object-header';
import formInput from '@/components/utils/form-input';
import expansionPanel from '@/components/utils/expansion-panel';
import dropdownSelect from '@/components/utils/dropdown-select';
import switcher from '@/components/utils/switcher';
import tableCheckbox from '@/components/utils/checkbox';
import hint from '@/components/utils/hint';
import tabs from '@/components/utils/tabs';
import validationMessage from '@/components/utils/validation-message';
import tagsInput from '@johmun/vue-tags-input';
import deepEqual from 'deep-equal';
import permissionsTab from '../components/objects/utils/permissions-tab';
import tabsComponent from '@/components/utils/tabs-component';

export default {
    components: {
        objectHeader,
        formInput,
        expansionPanel,
        dropdownSelect,
        validationMessage,
        checkbox: tableCheckbox,
        switcher,
        hint,
        tabs,
        tagsInput,
        permissionsTab,
        tabsComponent,
    },

    data() {
        return {
            id: null, // id of currently opened component
            itemInstance: {},
            initialItem: {},
        };
    },

    mounted() {
        this.setId(); // if there is an edit case, set id from route

        if (!this.id) this.setInitialItem();
        if (this.id) {
            this.loadItem();
        }
    },

    methods: {
        setId() {
            if (this.$route.params.id !== 'new') this.id = this.$route.params.id;
        },

        submit(event, validatedInstance = 'itemInstance', initialInstance = 'initialItem') {
            const isEqualToInitial = deepEqual(this[validatedInstance], this[initialInstance]);
            if (!isEqualToInitial) {
                const validations = this.checkValidations(validatedInstance);
                if (!validations) {
                    this.save();
                }
            } else {
                this.close();
            }
        },

        async saveObject(name, createMethod, updateMethod) {
            const isItemChanged = !deepEqual(this.itemInstance[name], this.initialItem[name]);
            if (isItemChanged) {
                if (this.id) {
                    await updateMethod(this.itemInstance[name].id, this.itemInstance[name]);
                } else {
                    return await createMethod(this.itemInstance[name]);
                }
            }
        },

        async saveArray(name, createMethod) {
            const newItems = this.itemInstance[name].filter(item => !item.id);
            if (newItems.length) {
                for (const item of newItems) {
                    try {
                        await createMethod(this.id, item);
                    } catch (err) {
                        throw err;
                    }
                }
            }
        },

        async updateArray(name, updateMethod) {
            for (const item of this.itemInstance[name]) {
                if (item.id) {
                    const initIndex = this.initialItem.workWeek.findIndex(initItem => {
                        return deepEqual(item, initItem);
                    });
                    if (initIndex === -1) {
                        try {
                            await updateMethod(this.id, item.id, item);
                        } catch (err) {
                            throw err;
                        }
                    }
                }
            }
        },

        checkValidations(validatedInstance = 'itemInstance') {
            this.$v[validatedInstance].$touch();
            // if its still pending or an error is returned do not submit
            return this.$v[validatedInstance].$pending ||
                this.$v[validatedInstance].$error;
        },

        setInitialItem() {
            this.initialItem = JSON.parse(JSON.stringify(this.itemInstance));
        },

        close() {
            this.$router.go(-1);
        },

        loadItem() {
        },
    },
    computed: {
        computeTitle() {
            return this.id ? this.$t('objects.edit') : this.$t('objects.new');
        },
    },
}