import _Switch from "./Switch.vue";
import type {App} from "vue";

export default Object.assign(_Switch, {
    install: (app: App, options?:any) => {
        app.component('Switch', _Switch);
    }
});

export type SwitchInstance = InstanceType<typeof _Switch>

export { _Switch as Switch }
