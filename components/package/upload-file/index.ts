import _UploadFile from "./Preview.vue";
import _UploadFileConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_UploadFile, {
    configuration: _UploadFileConfiguration,
    install: (app: App, options?:any) => {
        app.component('UploadFile', _UploadFile);
        app.component('UploadFileConfiguration', _UploadFileConfiguration);
    }
});

export type UploadFileInstance = InstanceType<typeof _UploadFile>
export type UploadFileConfigurationInstance = InstanceType<typeof _UploadFileConfiguration>

export { _UploadFileConfiguration as UploadFileConfiguration }
