import _Signature from "./Preview.vue";
import _SignatureConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_Signature, {
    configuration: _SignatureConfiguration,
    install: (app: App, options?:any) => {
        app.component('Signature', _Signature);
        app.component('SignatureConfiguration', _SignatureConfiguration);
    }
});

export type SignatureInstance = InstanceType<typeof _Signature>
export type SignatureConfigurationInstance = InstanceType<typeof _SignatureConfiguration>

export { _SignatureConfiguration as SignatureConfiguration }
