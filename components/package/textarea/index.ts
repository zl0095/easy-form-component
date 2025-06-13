import _TextArea from "./Preview.vue";
import _TextAreaConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_TextArea, {
    configuration: _TextAreaConfiguration,
    install: (app: App, options?:any) => {
        app.component('TextArea', _TextArea);
        app.component('TextAreaConfiguration', _TextAreaConfiguration);
    }
});

export type TextAreaInstance = InstanceType<typeof _TextArea>
export type TextAreaConfigurationInstance = InstanceType<typeof _TextAreaConfiguration>

export { _TextAreaConfiguration as TextAreaConfiguration }
