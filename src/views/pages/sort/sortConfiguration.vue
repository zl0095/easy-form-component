<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">排序的基本用法</p>
  <div class="doc-item">
    <SortConfiguration v-model:model-value="obj1"/>
    <div class="code"></div>
  </div>
  <p class="doc-title-example">显示error</p>
  <p class="doc-title-second-level">通过 <span class="code">error</span> 可以自定义错误信息的文字提示</p>
  <div class="doc-item">
    <SortConfiguration v-model:model-value="obj2" :error="error" @blur-title="(val:string)=>setError(val)"/>
  </div>
  <p class="doc-title-example">允许清空</p>
  <p class="doc-title-second-level">设置 <span class="code">allow-clear</span> 属性可以清空输入框</p>
  <div class="doc-item">
    <SortConfiguration v-model:model-value="obj3" :allow-clear="true"/>
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
          <td>configurationType</td>
          <td>-</td>
        </tr>
        <tr>
          <td>max-length</td>
          <td>标题的最大长度</td>
          <td>number | string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>标题输入框提示文字</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>error</td>
          <td>错误信息文字</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>allow-clear</td>
          <td>是否允许清空</td>
          <td>boolean</td>
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
          <td>blur-title</td>
          <td>用户设置标题失去焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>focus-title</td>
          <td>用户设置标题获取焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>input-title</td>
          <td>用户设置标题输入时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>blur</td>
          <td>用户设置选项失去焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>index: number</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>focus</td>
          <td>用户设置选项获取焦点时触发</td>
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
      <div class="doc-title">configurationType（参数）</div>
      <table class="table">
        <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th class="maxWidth">类型</th>
          <th>默认值</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>title</td>
          <td>标题</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>direction</td>
          <td>选项的排列方向</td>
          <td>vertical | horizontal</td>
          <td>vertical</td>
        </tr>
        <tr>
          <td>options</td>
          <td>关于配置项的参数</td>
          <td class="maxWidth">Array<{ label : string , max-length（可不传）: number | string , placeholder（可不传）:
            string }>
          </td>
          <td>-</td>
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

<script lang="ts" setup>
import {ref} from 'vue'
import {SortConfiguration} from 'easy-form-component'


const obj1 = ref({
  title: '请选择一个选项',
  direction: 'vertical',
  options: [
    {
      id: 1,
      label: '选项1',
    },
    {
      id: 2,
      label: '选项2',
    },
  ],
  required: false,
  error: ''
})
const obj2 = ref({
  title: '请选择一个选项',
  direction: 'vertical',
  options: [
    {
      id: 1,
      label: '选项1',
    },
    {
      id: 2,
      label: '选项2',
    },
  ],
  required: false,
  error: ''
})
const obj3 = ref({
  title: '请选择一个选项',
  direction: 'vertical',
  options: [
    {
      id: 1,
      label: '选项1',
    },
    {
      id: 2,
      label: '选项2',
    },
  ],
  required: false,
  error: ''
})

const error = ref('')

function setError(val: string) {
  if (val === '111') {
    error.value = '错误'
  } else {
    error.value = ''
  }
}
</script>