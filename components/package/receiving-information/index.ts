import _ReceivingInformation from "./Preview.vue";
import _ReceivingInformationConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_ReceivingInformation, {
    configuration: _ReceivingInformationConfiguration,
    install: (app: App, options?:any) => {
        app.component('ReceivingInformation', _ReceivingInformation);
        app.component('ReceivingInformationConfiguration', _ReceivingInformationConfiguration);
    }
});

export type ReceivingInformationInstance = InstanceType<typeof _ReceivingInformation>
export type ReceivingInformationConfigurationInstance = InstanceType<typeof _ReceivingInformationConfiguration>

export { _ReceivingInformationConfiguration as ReceivingInformationConfiguration }
