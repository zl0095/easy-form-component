<script lang="ts" setup>
import {ref} from 'vue'
import Divider from '../../../../components/package/divider/Preview.vue'

const obj1 = ref({
  text: '',
  color: '#ccc',
  textColor: '#ccc',
  type: 'solid'
})
const obj2 = ref({
  text: '哈哈哈',
  color: '#ccc',
  textColor: '#ccc',
  type: 'dashed'
})
const obj3 = ref({
  text: '',
  color: 'blue',
  textColor: '#ccc',
  type: 'solid'
})
const obj4 = ref({
  text: '',
  color: '#ccc',
  textColor: 'red',
  type: 'solid'
})
</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">分割线的基本用法。</p>
  <div class="doc-item">
    <Divider v-bind="obj1"/>
  </div>
  <p class="doc-title-example">设置文案</p>
  <p class="doc-title-second-level">通过 <span class="code">text</span> 可以自定义分割线上文本内容。</p>
  <div class="doc-item">
    <Divider v-bind="obj2"/>
  </div>
  <p class="doc-title-example">分割线颜色</p>
  <p class="doc-title-second-level">通过 <span class="code">color</span> 可以自定义分割线的颜色。</p>
  <div class="doc-item">
    <Divider v-bind="obj3"/>
  </div>
  <p class="doc-title-example">分割线文本颜色</p>
  <p class="doc-title-second-level">通过 <span class="code">textColor</span> 可以自定义分割线文本的颜色。</p>
  <div class="doc-item">
    <Divider v-bind="obj4"/>
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
          <td>text</td>
          <td>绑定值</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>text</td>
          <td>文本内容</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>color</td>
          <td>分割线颜色</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>textColor</td>
          <td>分割线文本颜色</td>
          <td>string</td>
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