export default {
    props: {
        resourceIdModel: null,
        viaResource: null,
        viaResourceId: null,
        viaRelationship: null,
        relationshipType: null,
        resourceId: {required: true,},
        resourceType: {required: true,},
    },

    data: () => ({
        errorClass: 'border-danger',
        dataFields: [],
    }),

    mounted() {
        this.mountedResourceSelected();
    },

    methods: {
        getResourceFormData() {
            return _.tap(new FormData(), formData => {
                _(this.dataFields.fields).each(field => field.fill(formData));
                // formData.append('_method', 'PUT')
            });
        },

        /**
         * mounted Resource Selected
         */
        mountedResourceSelected() {
            if (!isset(Leo.$bus().resourceSelected)) {
                Leo.$bus()['resourceSelected'] = {};
            }

            if (!isset(Leo.$bus().resourceSelected[this.resourceId])) {
                Leo.$bus()['resourceSelected'][this.resourceId] = [];
            }

            // Register a global event selected data
            Leo.$on(
                this.resourceId + '-resource-selected-set',
                data => this.resourceSelected = data,
            );

            Leo.$on(
                this.resourceId + '-resource-selected-get',
                callback => callback(this.resourceSelected),
            );

            Leo.$on(this.resourceId + '-resource-selected-id-get', callback => {
                let ids = [];
                _.forEach(this.resourceSelected, d => ids.push(d.modelId));
                callback(ids);
            });

        },
    },
};
