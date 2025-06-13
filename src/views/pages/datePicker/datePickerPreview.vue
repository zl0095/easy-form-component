<script lang="ts" setup>
import {ref,onMounted,onUnmounted} from 'vue'
// import {DatePicker} from 'easy-form-component'
import DatePicker from '../../../../components/package/date-picker/Preview.vue'
const obj = ref(undefined)

function aaa(val:number | undefined){
  if(val === 1749657600){
    obj.value = undefined
  }
}

</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">日期选择器的基本用法。</p>
  <div class="doc-item doc-item-one">
    {{obj}}
    <DatePicker :is-greater-now="true" v-model:model-value="obj" :is-halfday="false" @change="(val)=>aaa(val)"  :is-select-time="true"  error="111"/>
  </div>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">日期选择器的基本用法。</p>
  <div class="doc-item doc-item-one">
    <DatePicker v-model:model-value="obj" error="111"/>
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
        <tr>
          <td>title</td>
          <td>输入框的标题名称</td>
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
          <td>用户选中日期时触发</td>
          <td class="maxWidth">
            <p>value: object<{ model-value : string }></p>
          </td>
        </tr>
        <tr>
          <td>input</td>
          <td>用户点输入时触发</td>
          <td class="maxWidth">
            <p>value: object<{ model-value : string }></p>
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

