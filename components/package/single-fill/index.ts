import _SingleFill from "./Preview.vue";
import _SingleFillConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_SingleFill, {
    configuration: _SingleFillConfiguration,
    install: (app: App, options?:any) => {
        app.component('SingleFill', _SingleFill);
        app.component('SingleFillConfiguration', _SingleFillConfiguration);
    }
});

export type SingleFillInstance = InstanceType<typeof _SingleFill>
export type SingleFillConfigurationInstance = InstanceType<typeof _SingleFillConfiguration>

export { _SingleFillConfiguration as SingleFillConfiguration }
