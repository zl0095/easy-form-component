<script lang="ts" setup>
import {ref} from 'vue'
// import {PullDownConfiguration} from 'easy-form-component'
import PullDownConfiguration from '../../../../components/package/pull-down/Configuration.vue'

const obj = ref({
  title: '请选择一个选项',
  options: [
    {
      id: 1,
      label: '选项1',
      disabled: false
    },
    {
      id: 2,
      label: '选项2',
      disabled: false
    },
  ],
  required: false,
  error: ''
})
const obj1 = ref({
  title: '请选择一个选项',
  options: [],
  required: false,
  error: ''
})
const error = ref('')

function setError(val: string) {
  if (val === '222') {
    error.value = '错误'
  } else {
    error.value = ''
  }
}
</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">下拉框的基本用法。</p>
  <div class="doc-item doc-item-one">
    <PullDownConfiguration :is-disabled="true" :is-disabled-show="false" v-model:model-value="obj1"/>
  </div>
  <p class="doc-title-example">是否允许清空</p>
  <p class="doc-title-second-level">设置 <span class="code">allow-clear</span> 属性可以清空输入框</p>
  <div class="doc-item doc-item-one">
    <PullDownConfiguration :is-disabled="true" v-model:model-value="obj" :allow-clear="true"/>
  </div>
  <p class="doc-title-example">输入框的最大长度</p>
  <p class="doc-title-second-level">通过 <span class="code">max-length</span> 可以设置输入框输入的最大长度。</p>
  <div class="doc-item doc-item-one">
    <PullDownConfiguration v-model:model-value="obj" :max-length="5"/>
  </div>
  <p class="doc-title-example">输入框错误提示文字</p>
  <p class="doc-title-second-level">通过 <span class="code">error</span> 可以自定义错误信息的文字提示</p>
  <div class="doc-item doc-item-one">
    <PullDownConfiguration v-model:model-value="obj" :error="error" @blur="(val:string)=>setError(val)"
                           @blur-title="(val:string)=>setError(val)"/>
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
          <td> Array<{ value: number | string, label: string, error(可不传): string, maxLength(可不传): number }></td>
        </tr>
        <tr>
          <td>max-length</td>
          <td>标题的最大长度</td>
          <td>number | string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>allow-clear</td>
          <td>是否允许清空</td>
          <td>boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>error</td>
          <td>输入框错误提示文字</td>
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
          <td>blur</td>
          <td>用户设置选项时失去焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>focus</td>
          <td>用户设置选项时获取焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>input</td>
          <td>用户设置选项输入时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>blur-title</td>
          <td>用户设置标题时失去焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>focus-title</td>
          <td>用户设置标题时获取焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>input-title</td>
          <td>用户设置标题输入时焦点时触发</td>
          <td>
            <p>value: string</p>
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
        <tr>
          <td>operation</td>
          <td>操作</td>
          <td>-</td>
        </tr>
        <tr>
          <td>setting</td>
          <td>每一项的设置</td>
          <td>-</td>
        </tr>
        <tr>
          <td>add</td>
          <td>添加</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>