import objectHeader from '@/components/objects/the-object-header';
import formInput from '@/components/utils/form-input';
import expansionPanel from '@/components/utils/expansion-panel';
import dropdownSelect from '@/components/utils/dropdown-select';
import switcher from '@/components/utils/switcher';
import tableCheckbox from '@/components/utils/checkbox';
import hint from '@/components/utils/hint';
import tabs from '@/components/utils/tabs';
import validationMessage from '@/components/utils/validation-message';
import deepEqual from 'deep-equal';

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
    },


    data() {
        return {
            id: null, // id of currently opened component
            itemInstance: {},
            initialItem: {},
            currentTab: {value: 'general'},
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

        checkValidations(validatedInstance) {
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

        computeCurrentTab() {
            return this.$options.name + '-' + this.currentTab.value;
        }
    },
}