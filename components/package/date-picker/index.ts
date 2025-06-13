import _DatePicker from "./Preview.vue";
import _DatePickerConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_DatePicker, {
    configuration: _DatePickerConfiguration,
    install: (app: App, options?:any) => {
        app.component('DatePicker', _DatePicker);
        app.component('DatePickerConfiguration', _DatePickerConfiguration);
    }
});

export type DatePickerInstance = InstanceType<typeof _DatePicker>
export type DatePickerConfigurationInstance = InstanceType<typeof _DatePickerConfiguration>

export { _DatePickerConfiguration as DatePickerConfiguration }
