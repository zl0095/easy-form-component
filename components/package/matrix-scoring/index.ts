import _MatrixScoring from "./Preview.vue";
import _MatrixScoringConfiguration from "./Configuration.vue";
import type {App} from "vue";

export interface Column {
    title: string;
    key: string;
}

export interface Row {
    index: string | number;
    [key: string]: any;
}

export default Object.assign(_MatrixScoring, {
    configuration: _MatrixScoringConfiguration,
    install: (app: App, options?:any) => {
        app.component('MatrixScoring', _MatrixScoring);
        app.component('MatrixScoringConfiguration', _MatrixScoringConfiguration);
    }
});

export type MatrixScoringInstance = InstanceType<typeof _MatrixScoring>
export type MatrixScoringConfigurationInstance = InstanceType<typeof _MatrixScoringConfiguration>

export { _MatrixScoringConfiguration as MatrixScoringConfiguration }
