// 导入组件
import type { App, Component, Plugin } from 'vue';
import _Popup from './index.vue';

export default Object.assign(_Popup, {
    install: (app: App, options?:any) => {
        app.component('Popup', _Popup);
    }
});

export type PopupInstance = InstanceType<typeof _Popup>

export { _Popup as Popup }