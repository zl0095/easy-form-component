import _NPS from "./Preview.vue";
import _NPSConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_NPS, {
    configuration: _NPSConfiguration,
    install: (app: App, options?:any) => {
        app.component('NPS', _NPS);
        app.component('NPSConfiguration', _NPSConfiguration);
    }
});

export type NPSInstance = InstanceType<typeof _NPS>
export type NPSConfigurationInstance = InstanceType<typeof _NPSConfiguration>

export { _NPSConfiguration as NPSConfiguration }
