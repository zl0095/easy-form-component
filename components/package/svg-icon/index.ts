// 导入组件
import type { App, Component, Plugin } from 'vue';
import _SvgIcon from './index.vue';

export default Object.assign(_SvgIcon, {
  install: (app: App, options?:any) => {
    app.component('SvgIcon', _SvgIcon);
  }
});

export type SvgIconInstance = InstanceType<typeof _SvgIcon>

export { _SvgIcon as SvgIcon }