import _Radio from "./Preview.vue";
import _RadioConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_Radio, {
    configuration: _RadioConfiguration,
    install: (app: App, options?:any) => {
        app.component('Radio', _Radio);
        app.component('RadioConfiguration', _RadioConfiguration);
    }
});

export type RadioInstance = InstanceType<typeof _Radio>
export type RadioConfigurationInstance = InstanceType<typeof _RadioConfiguration>

export { _RadioConfiguration as RadioConfiguration }
