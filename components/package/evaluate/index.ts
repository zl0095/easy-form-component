import _Evaluate from "./Preview.vue";
import _EvaluateConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_Evaluate, {
    configuration: _EvaluateConfiguration,
    install: (app: App, options?:any) => {
        app.component('Evaluate', _Evaluate);
        app.component('EvaluateConfiguration', _EvaluateConfiguration);
    }
});

export type EvaluateInstance = InstanceType<typeof _Evaluate>
export type EvaluateConfigurationInstance = InstanceType<typeof _EvaluateConfiguration>

export { _EvaluateConfiguration as EvaluateConfiguration }
