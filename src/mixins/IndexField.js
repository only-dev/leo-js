export default {
    props: {
        resourceName: {},
        field: {},
    },

    data: () => ({
        value: '',
    }),

    created() {
        this.setInitialValue();
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

    },
};
