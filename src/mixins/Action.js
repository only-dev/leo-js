export default {
    props: {
        resourceData: {
            actions: {
                required: true,
            },
        },
    },

    methods: {

        /**
         * get action by uriKey
         */
        getActionByUriKey(uriKey) {
            return _(this.resourceData.actions).
                filter((action) => action.uriKey === uriKey).
                first();
        },

        /**
         * get action by uriKey and merge
         */
        getActionByUriKeyAndMerge(uriKey, data) {
            return Object.assign(this.getActionByUriKey(uriKey), data);
        },
    },

};
