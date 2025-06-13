import _CheckBox from "./Preview.vue";
import _CheckBoxConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_CheckBox, {
    configuration: _CheckBoxConfiguration,
    install: (app: App, options?:any) => {
        app.component('CheckBox', _CheckBox);
        app.component('CheckBoxConfiguration', _CheckBoxConfiguration);
    }
});

export type CheckBoxInstance = InstanceType<typeof _CheckBox>
export type CheckBoxConfigurationInstance = InstanceType<typeof _CheckBoxConfiguration>

export { _CheckBoxConfiguration as CheckBoxConfiguration }
