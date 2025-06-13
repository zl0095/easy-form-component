import _HorizontalFill from "./Preview.vue";
import _HorizontalFillConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_HorizontalFill, {
    configuration: _HorizontalFillConfiguration,
    install: (app: App, options?:any) => {
        app.component('HorizontalFill', _HorizontalFill);
        app.component('HorizontalFillConfiguration', _HorizontalFillConfiguration);
    }
});

export type HorizontalFillInstance = InstanceType<typeof _HorizontalFill>
export type HorizontalFillConfigurationInstance = InstanceType<typeof _HorizontalFillConfiguration>

export { _HorizontalFillConfiguration as HorizontalFillConfiguration }
