import _UploadImage from "./Preview.vue";
import _UploadImageConfiguration from "./Configuration.vue";
import type {App} from "vue";

export default Object.assign(_UploadImage, {
    configuration: _UploadImageConfiguration,
    install: (app: App, options?:any) => {
        app.component('UploadImage', _UploadImage);
        app.component('UploadImageConfiguration', _UploadImageConfiguration);
    }
});

export type UploadImageInstance = InstanceType<typeof _UploadImage>
export type UploadImageConfigurationInstance = InstanceType<typeof _UploadImageConfiguration>

export { _UploadImageConfiguration as UploadImageConfiguration }
