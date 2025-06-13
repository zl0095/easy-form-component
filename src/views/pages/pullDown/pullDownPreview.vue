<script lang="ts" setup>
import {ref} from 'vue'
import {PullDownConfigurationOptions} from "../../../../components/interface";
import PullDown from '../../../../components/package/pull-down/Preview.vue'
// import {PullDown} from 'easy-form-component'

const title = ref<string>('请选择一个选项')
const options = ref<PullDownConfigurationOptions[]>([
  {
    id: 1,
    label: '选项1',
    disabled: false,
  },
  {
    id: 2,
    label: '选项2',
    disabled: true,
  },
  {
    id: 3,
    label: '选项3',
    disabled: false,
  },
  {
    id: 4,
    label: '选项4',
    disabled: false,
  },
])

const obj = ref<number>(0)
</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">下拉框的基本用法。</p>
  <div class="doc-item doc-item-one">
    <PullDown value="id" v-model:model-value="obj" :title="title" :options="options"/>
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
          <td>string</td>
          <td>-</td>
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
          <td>值发生改变时触发</td>
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
