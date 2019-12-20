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
            if(!invalid) {
                !this.id ? this.addItem() : this.updateItem();
            }
        },

        checkValidations(validatedInstance = 'itemInstance') {
            this.$v[validatedInstance].$touch();
            // if its still pending or an error is returned do not submit
            return this.$v[validatedInstance].$pending ||
                this.$v[validatedInstance].$error;
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