import _MultiplePullDown from "./Preview.vue";
import _MultiplePullDownConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_MultiplePullDown, {
    configuration: _MultiplePullDownConfiguration,
    install: (app: App, options?:any) => {
        app.component('MultiplePullDown', _MultiplePullDown);
        app.component('MultiplePullDownConfiguration', _MultiplePullDownConfiguration);
    }
});

export type MultiplePullDownInstance = InstanceType<typeof _MultiplePullDown>
export type MultiplePullDownConfigurationInstance = InstanceType<typeof _MultiplePullDownConfiguration>

export { _MultiplePullDownConfiguration as MultiplePullDownConfiguration }
