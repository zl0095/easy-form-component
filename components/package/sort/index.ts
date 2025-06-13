import _Sort from "./Preview.vue";
import _SortConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_Sort, {
    configuration: _SortConfiguration,
    install: (app: App, options?:any) => {
        app.component('Sort', _Sort);
        app.component('SortConfiguration', _SortConfiguration);
    }
});

export type SortInstance = InstanceType<typeof _Sort>
export type SortConfigurationInstance = InstanceType<typeof _SortConfiguration>

export { _SortConfiguration as SortConfiguration }
