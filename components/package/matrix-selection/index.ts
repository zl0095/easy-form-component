import _MatrixSelection from "./Preview.vue";
import _MatrixSelectionConfiguration from "./Configuration.vue";
import type {App} from "vue";

export interface Column {
    title: string;
    key: string;
}

export interface Row {
    index: string | number;
    [key: string]: any;
}

export default Object.assign(_MatrixSelection, {
    configuration: _MatrixSelectionConfiguration,
    install: (app: App, options?:any) => {
        app.component('MatrixSelection', _MatrixSelection);
        app.component('MatrixSelectionConfiguration', _MatrixSelectionConfiguration);
    }
});

export type MatrixSelectionInstance = InstanceType<typeof _MatrixSelection>
export type MatrixSelectionConfigurationInstance = InstanceType<typeof _MatrixSelectionConfiguration>

export { _MatrixSelectionConfiguration as MatrixSelectionConfiguration }
