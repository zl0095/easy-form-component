import _MatrixFill from "./Preview.vue";
import _MatrixFillConfiguration from "./Configuration.vue";
import type {App} from "vue";

export interface Column {
    title: string;
    key: string;
}

export interface Row {
    index: string | number;
    [key: string]: any;
}

export default Object.assign(_MatrixFill, {
    configuration: _MatrixFillConfiguration,
    install: (app: App, options?:any) => {
        app.component('MatrixFill', _MatrixFill);
        app.component('MatrixFillConfiguration', _MatrixFillConfiguration);
    }
});

export type MatrixFillInstance = InstanceType<typeof _MatrixFill>
export type MatrixFillConfigurationInstance = InstanceType<typeof _MatrixFillConfiguration>

export { _MatrixFillConfiguration as MatrixFillConfiguration }
