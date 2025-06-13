import _NumberInput from "./Preview.vue";
import _NumberInputConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_NumberInput, {
    configuration: _NumberInputConfiguration,
    install: (app: App, options?: any) => {
        app.component('NumberInput', _NumberInput);
        app.component('NumberInputConfiguration', _NumberInputConfiguration);
    }
});

export type NumberInputInstance = InstanceType<typeof _NumberInput>
export type NumberInputConfigurationInstance = InstanceType<typeof _NumberInputConfiguration>

export {_NumberInputConfiguration as NumberInputConfiguration}
