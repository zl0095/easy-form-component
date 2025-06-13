import _TimeSelector from "./Preview.vue";
import _TimeSelectorConfiguration from "./Configuration.vue";
import type {App} from "vue";
import {MatrixScoringInstance} from "../matrix-scoring";

export default Object.assign(_TimeSelector, {
    configuration: _TimeSelectorConfiguration,
    install: (app: App, options?:any) => {
        app.component('TimeSelector', _TimeSelector);
        app.component('TimeSelectorConfiguration', _TimeSelectorConfiguration);
    }
});

export type TimeSelectorInstance = InstanceType<typeof _TimeSelector>
export type TimeSelectorConfigurationInstance = InstanceType<typeof _TimeSelectorConfiguration>

export { _TimeSelectorConfiguration as TimeSelectorConfiguration }
