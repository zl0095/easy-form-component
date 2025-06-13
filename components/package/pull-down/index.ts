import _PullDown from "./Preview.vue";
import _PullDownConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_PullDown, {
    configuration: _PullDownConfiguration,
    install: (app: App, options?:any) => {
        app.component('PullDown', _PullDown);
        app.component('PullDownConfiguration', _PullDownConfiguration);
    }
});

export type PullDownInstance = InstanceType<typeof _PullDown>
export type PullDownConfigurationInstance = InstanceType<typeof _PullDownConfiguration>

export { _PullDownConfiguration as PullDownConfiguration }
