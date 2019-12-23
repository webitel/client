import objectHeader from '@/components/objects/the-object-header';
import formInput from '@/components/utils/form-input';
import expansionPanel from '@/components/utils/expansion-panel';
import dropdownSelect from '@/components/utils/dropdown-select';
import switcher from '@/components/utils/switcher';
import tableCheckbox from '@/components/utils/checkbox';
import hint from '@/components/utils/hint';
import tabs from '@/components/utils/tabs';
import validationMessage from '@/components/utils/validation-message';
import permissionsTab from '../components/objects/utils/permissions-tab';
import tabsComponent from '@/components/utils/tabs-component';
import tagsInput from '@/components/utils/tags-input';

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

    methods: {
        save() {
            const invalid = this.checkValidations();
            if (!invalid) {
                !this.id ? this.addItem() : this.updateItem();
            }
        },

        checkValidations(validatedInstance = 'itemInstance') {
            const v = this.$v ? this.$v : this.v;
            v[validatedInstance].$touch();
            // if its still pending or an error is returned do not submit
            return v[validatedInstance].$pending ||
                v[validatedInstance].$error;
        },

        close() {
            this.$router.go(-1);
        },
    },

    computed: {
        computePrimaryText() {
            // if it's a new item
            // OR any fields have changed
            return !this.id || this.itemInstance._dirty ?
                this.$t('objects.save') : this.$t('objects.saved');
        },

        computeDisabled() {
            // if there's a validation problem
            // OR it's edit and any fields haven't changed
            return this.checkValidations() || (!this.itemInstance._dirty && !!this.id);
        },

        computeTitle() {
            return this.$route.params.id &&  this.$route.params.id !== 'new'
                ? this.$t('objects.edit') : this.$t('objects.new');
        },
    },
}