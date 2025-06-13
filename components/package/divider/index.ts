import _Divider from "./Preview.vue";
import _DividerConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_Divider, {
    configuration: _DividerConfiguration,
    install: (app: App, options?:any) => {
        app.component('Divider', _Divider);
        app.component('DividerConfiguration', _DividerConfiguration);
    }
});

export type DividerInstance = InstanceType<typeof _Divider>
export type DividerConfigurationInstance = InstanceType<typeof _DividerConfiguration>

export { _DividerConfiguration as DividerConfiguration }
