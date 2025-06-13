<script lang="ts" setup>
import {ref} from 'vue'
import {MultipleFill} from 'easy-form-component'
// import MultipleFill from '../../../../components/package/multiple-fill/Preview.vue'

const title = ref<string>('请填写以下填空')
const options = ref<{ id: number, label: string, value: string,placeholder:string }[]>([{
  id: 1,
  label: "填空1",
  value: '',
  placeholder:'请输入填空1的值'
}, {
  id: 2,
  label: "填空2",
  value: '',
  placeholder: '请输入填空2的值'
}])
const modelValue = ref<{ id: number, label: string, value: string }[]>([])
</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">多项填空的基本用法。</p>
  <div class="doc-item doc-item-one">
    {{modelValue}}
    <MultipleFill v-model:model-value="modelValue" :title="title" :options="options"/>
  </div>
  <div class="doc-item">
    <div class="doc-table">
      <div class="doc-title">props（参数）</div>
      <table class="table">
        <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>model-value(v-model)</td>
          <td>绑定值</td>
          <td>(number | string | boolean)[]</td>
          <td>-</td>
        </tr>
        <tr>
          <td>title</td>
          <td>标题</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>options</td>
          <td>配置项</td>
          <td>Array<{ id:number,title:string,value: number | string, label: string,
            error(可不传): string, maxLength(可不传): number,placeholder:string,disabled:boolean }>
          </td>
          <td>-</td>
        </tr>
        <tr>
          <td>max-length</td>
          <td>输入框的最大长度</td>
          <td>number</td>
          <td>-</td>
        </tr>
        <tr>
          <td>allow-clear</td>
          <td>是否清除内容</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="doc-table">
      <div class="doc-title">Method（方法）</div>
      <table class="table">
        <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>参数</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>change</td>
          <td>用户点击选项时触发</td>
          <td class="maxWidth">value: object<{ value: number | string | boolean, label: string, checked:
            boolean,disabled:boolean }>
            <p>index: number</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>blur</td>
          <td>用户设置标题时失去焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>index: number</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>input</td>
          <td>用户设置选项输入时触发</td>
          <td>
            <p>value: string</p>
            <p>index: number</p>
            <p>ev: Event</p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="doc-table">
      <div class="doc-title">插槽（slot）</div>
      <table class="table">
        <thead>
        <tr>
          <th>插槽名</th>
          <th>描述</th>
          <th>参数</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>serial</td>
          <td>序号</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="less" scoped>
.doc-item {
  padding: var(--easy-form-item-padding-component);
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, .1);
  box-sizing: border-box;
  background: var(--easy-form-component-background);
}
</style>
