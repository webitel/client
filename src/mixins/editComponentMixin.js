import objectHeader from '@/components/objects/the-object-header';
import formInput from '@/components/utils/form-input';
import expansionPanel from '@/components/utils/expansion-panel';
import dropdownSelect from '@/components/utils/dropdown-select';
import switcher from '@/components/utils/switcher';
import tableCheckbox from '@/components/utils/checkbox';
import hint from '@/components/utils/hint';
import tabs from '@/components/utils/tabs';
import validationMessage from '@/components/utils/validation-message';

export default {
    components: {
        'object-header': objectHeader,
        'form-input': formInput,
        'expansion-panel': expansionPanel,
        'dropdown-select': dropdownSelect,
        'validation-message': validationMessage,
        checkbox: tableCheckbox,
        switcher,
        hint,
        tabs,
    },


    data() {
        return {
            id: null, // id of currently opened component
            itemInstance: {},
            initialItem: {}
        };
    },

    mounted() {
        this.setId(); // if there is an edit case, set id from route

        if(!this.id) this.setInitialItem();

    },

    methods: {
        setId() {
            if (this.$route.params.id !== 'new') this.id = this.$route.params.id;
        },

        submit(event, validatedInstance = 'itemInstance', initialInstance = 'initialItem') {

            // check if some fields was changed
            const isEqualToInitial = Object.keys(this[validatedInstance]).every(newProperty => {
                return Object.keys(this[initialInstance]).some(oldProperty => {
                    return this[validatedInstance][newProperty] === this[initialInstance][oldProperty];
                })
            });

            console.log(isEqualToInitial, this[validatedInstance], this[initialInstance]);

            if (isEqualToInitial) {
                this.close();
                return;
            } else {
                this.$v[validatedInstance].$touch();
                // if its still pending or an error is returned do not submit
                if (this.$v[validatedInstance].$pending ||
                    this.$v[validatedInstance].$error) {
                    console.log(this.$v[validatedInstance].$pending, this.$v[validatedInstance].$error);
                    return;
                }
            }
            this.save();
        },

        setInitialItem() {
          this.initialItem = JSON.parse(JSON.stringify(this.itemInstance));
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