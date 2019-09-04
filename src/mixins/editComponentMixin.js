import objectHeader from '@/components/objects/object-header';
import formInput from '@/components/utils/form-input';

export default {
    components: {
        'object-header': objectHeader,
        'form-input': formInput,
    },


    data() {
        return {
            id: null // id of currently opened component
        };
    },

    mounted() {
        if (this.$route.params.id !== 'new') this.id = this.$route.params.id;

    },

    methods: {
        submit(validatedInstance, initialInstance) {
            // check if some fields was changed
            const isEqualToInitial = Object.keys(this[validatedInstance]).every(newProperty => {
                return Object.keys(this[initialInstance]).some(oldProperty => {
                    return this[validatedInstance][newProperty] === this[initialInstance][oldProperty];
                })
            });

            // console.log(isEqualToInitial, this[validatedInstance], this[initialInstance]);

            if (isEqualToInitial) {
                this.close();
                return;
            } else {
                this.$v[validatedInstance].$touch();
                // if its still pending or an error is returned do not submit
                if (this.$v[validatedInstance].$pending || this.$v[validatedInstance].$error) return;
            }
            this.save();
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