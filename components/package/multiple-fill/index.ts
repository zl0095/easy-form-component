import _MultipleFill from "./Preview.vue";
import _MultipleFillConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_MultipleFill, {
    configuration: _MultipleFillConfiguration,
    install: (app: App, options?:any) => {
        app.component('MultipleFill', _MultipleFill);
        app.component('MultipleFillConfiguration', _MultipleFillConfiguration);
    }
});

export type MultipleFillInstance = InstanceType<typeof _MultipleFill>
export type MultipleFillConfigurationInstance = InstanceType<typeof _MultipleFillConfiguration>

export { _MultipleFillConfiguration as MultipleFillConfiguration }
