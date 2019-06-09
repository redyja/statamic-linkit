Vue.component('link_it-fieldtype', {

    mixins: [Fieldtype],

    template: `
        <div>
            <div class="flex flex-wrap items-center">
                <select-fieldtype class="w-1/5" :data.sync="data.type" :name="type" :options="types"></select-fieldtype>
                <select-fieldtype v-if="data.type === 'term'" class="ml-2 w-1/5" :data.sync="data.taxonomy" name="taxonomy" :options="taxonomies"></select-fieldtype>
                <select-fieldtype v-if="data.type === 'asset'" class="ml-2 w-1/5" :data.sync="data.container" name="container" :options="containers"></select-fieldtype>
                <select-fieldtype v-if="data.type === 'entry'" class="ml-2 w-1/5" :data.sync="data.collection" name="collection" :options="collections"></select-fieldtype>
                <text-fieldtype v-if="['url', 'custom', 'email', 'tel'].indexOf(data.type) !== -1" :class="[config.newWindow ? 'mx-2' : 'ml-2']" class="flex-1" :data.sync="data.url" :config="{ mode: 'text', placeholder: urlPlaceholder, required: config.required }"></text-fieldtype>
                
                <div v-if="config.newWindow" class="ml-auto w-1/4 text-right">
                    <input type="checkbox"
                           :id="'newWindow'+this.uuid"
                           :value="true"
                           v-model="data.newWindow"
                    />
                    <label :for="'newWindow'+this.uuid">{{ translate('addons.LinkIt::fieldtype.new_window') }}</label>
                </div>
            </div>
            <assets-fieldtype 
                v-if="data.type === 'asset' && data.container"
                class="mt-2"
                :data.sync="data.asset"
                :config="{
                    max_files: 1,
                    container: data.container,
                    type: 'asset',
                }"
            ></assets-fieldtype>
            <taxonomy-fieldtype
                class="mt-2"
                v-for="taxonomy in taxonomies"
                v-if="data.type === 'term' && data.taxonomy === taxonomy.value"
                :data.sync="data.term"
                :config.sync="{
                    max_items: 1,
                    type: 'taxonomy',
                    taxonomy: taxonomy.value,
                }"
            ></taxonomy-fieldtype>
            <pages-fieldtype
                class="mt-2"
                v-if="data.type === 'page'"
                :data.sync="data.page"
                :config.sync="{
                    max_items: 1,
                    type: 'pages'
                }" 
            ></pages-fieldtype>
            <collection-fieldtype
                class="mt-2"
                v-for="collection in collections"
                v-if="data.type === 'entry' && data.collection === collection.value"
                :data.sync="data.entry"
                :config.sync="{
                    max_items: 1,
                    type: 'collection',
                    collection: collection.value,
                }"
            ></collection-fieldtype>
            <div v-if="config.text" class="flex items-center mt-2">
                <label class="w-1/5 flex-no-shrink" for="text">{{ translate('addons.LinkIt::fieldtype.text_label') }}</label>
                <text-fieldtype class="ml-2" :data.sync="data.text" :config="{ mode: 'text', placeholder: translate('addons.LinkIt::fieldtype.text_placeholder') }"></text-fieldtype>
            </div>
            <div v-if="config.aria" class="flex items-center mt-2">
                <label class="w-1/5 flex-no-shrink" for="aria">{{ translate('addons.LinkIt::fieldtype.aria_label') }}</label>
                <text-fieldtype class="ml-2" :data.sync="data.aria" :config="{ mode: 'text', placeholder: translate('addons.LinkIt::fieldtype.aria_placeholder') }"></text-fieldtype>
            </div>
            <div v-if="config.title" class="flex items-center mt-2">
                <label class="w-1/5 flex-no-shrink" for="title">{{ translate('addons.LinkIt::fieldtype.title_label') }}</label>
                <text-fieldtype class="ml-2" :data.sync="data.title" :config="{ mode: 'text', placeholder: translate('addons.LinkIt::fieldtype.title_placeholder') }"></text-fieldtype>
            </div>
            <div v-if="config.append && data.type !== 'custom'" class="flex items-center mt-2">
                <label class="w-1/5 flex-no-shrink" for="append">{{ translate('addons.LinkIt::fieldtype.append_label') }}</label>
                <text-fieldtype class="ml-2" :data.sync="data.append" :config="{ mode: 'text', placeholder: translate('addons.LinkIt::fieldtype.append_placeholder') }"></text-fieldtype>
            </div>
        </div>
    `,

    data: function () {
        return {
            uuid: this._uid,
        }
    },

    watch: {
        'data.type': function (newValue, oldValue) {
            if (newValue !== oldValue) {
                // Reset url data
                this.data.url = null;
                this.data.newWindow = false;
                this.data.asset = [];
                this.data.term = [];
                this.data.page = [];
                this.data.entry = [];

                // Reset custom data
                this.data.text = null;
                this.data.aria = null;
                this.data.title = null;
            }
        },
    },

    computed: {
        types: function () {
            let types = this.config.types || [
                'asset',
                'entry',
                'custom',
                'email',
                'page',
                'term',
                'tel',
                'url',
            ];

            if (this.containers.length === 0 && types.indexOf('asset') !== -1) {
                types.splice(types.indexOf('asset'), 1);
            }

            if (this.collections.length === 0 && types.indexOf('entry') !== -1) {
                types.splice(types.indexOf('entry'), 1);
            }

            if (this.taxonomies.length === 0 && types.indexOf('term') !== -1) {
                types.splice(types.indexOf('term'), 1);
            }

            return types.map(function (type) {
                return { text: translate(type), value: type }
            });
        },
        taxonomies: function () {
            return this.config.taxonomies ? _.map(this.config.taxonomies, function (taxonomy) {
                return { value: taxonomy, text: translate(taxonomy) };
            }) : [];
        },
        containers: function () {
            return this.config.containers ? _.map(this.config.containers, function (container) {
                return { value: container, text: translate(container) };
            }) : [];
        },
        collections: function () {
            return this.config.collections ? _.map(this.config.collections, function (collection) {
                return { value: collection, text: translate(collection) };
            }) : [];
        },
        urlPlaceholder: function () {
            switch (this.data.type) {
                case 'email':
                    return translate('addons.LinkIt::fieldtype.email_placeholder');
                case 'url':
                    return translate('addons.LinkIt::fieldtype.url_placeholder');
                case 'tel':
                    return translate('addons.LinkIt::fieldtype.tel_placeholder');
                case 'custom':
                    return translate('addons.LinkIt::fieldtype.custom_placeholder');
            }

            return '';
        }
    },

    methods: {
        getReplicatorPreviewText() {
            if (! this.data) return;

            return translate('addons.LinkIt::fieldtype.' + this.data.type);
        },
    },

    ready: function () {
        this.config = Object.assign({
            aria: false,
            title: false,
            append: false,
            newWindow: false,
        }, this.config);
    }
});
