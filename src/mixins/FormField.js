export default {
    props: {
        resourceId: '',
        resourceIdModel: '',
        resourceType: '',
        field: {},
    },

    data: () => ({
        value: '',
    }),

    watch: {
        value(data){
            Leo.$emit(
                this.field.attribute + '-' + this.resourceId + '-value-change',
                data,
            );

        }
    },

    mounted() {

        this.setInitialValue();

        // Add a default fill method for the field
        this.field.fill = this.fill;

        // Register a global event for setting the field's value
        Leo.$on(this.field.attribute + '-' + this.resourceId + '-value',
            value => {
                this.value = value;
            });
    },

    destroyed() {
        Leo.$off(
            this.field.attribute + '-' + this.resourceId + '-value-change');
        Leo.$off(this.field.attribute + '-' + this.resourceId + '-value');
    },

    methods: {

        /*
         * Set the initial value for the field
         */
        setInitialValue() {
            this.value = !(this.field.value === undefined ||
                this.field.value === null)
                ? this.field.value
                : '';
        },

        /**
         * Provide a function that fills a passed FormData object with the
         * field's internal value attribute
         */
        fill(formData) {
            formData.append(this.field.attribute, String(this.value));
        },

        /**
         * Update the field's internal value
         */
        handleChange(value) {
            this.value = value;
        },
    },

    computed: {
        /**
         * Determine if the field is in readonly mode
         */
        isReadonly() {
            return this.field.readonly ||
                _.get(this.field, 'extraAttributes.readonly');
        },
    },
};
