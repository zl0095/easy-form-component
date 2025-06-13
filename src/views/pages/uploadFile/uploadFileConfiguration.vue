<script lang="ts" setup>
import {ref} from 'vue'
import {UploadFileConfiguration} from 'easy-form-component'

const operation1 = ref({
  title: '请上传文件',
  maxCount: 10,
  maxSize: 30,
  restrictedFormat: false,
  format: '',
  drag: true,
  multiple: true,
  required: false,
  error: ''
})
const operation2 = ref({
  title: '请上传文件',
  maxCount: 10,
  maxSize: 30,
  restrictedFormat: false,
  format: '',
  drag: true,
  multiple: true,
  required: false,
  error: ''
})
const operation3 = ref({
  title: '请上传文件',
  maxCount: 10,
  maxSize: 30,
  restrictedFormat: false,
  format: '',
  drag: true,
  multiple: true,
  required: false,
  error: ''
})
const operation4 = ref({
  title: '请上传文件',
  maxCount: 10,
  maxSize: 30,
  restrictedFormat: false,
  format: '',
  drag: true,
  multiple: true,
  required: false,
  error: ''
})
const error = ref('')

function setError(val: string) {
  if (val.length < 3) {
    error.value = '标题长度不能小于3位'
  } else {
    error.value = ''
  }
}
</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">文件收集的基本用法</p>
  <div class="doc-item">
    <UploadFileConfiguration v-model:model-value="operation1" max-length="10"></UploadFileConfiguration>
  </div>
  <p class="doc-title-example">允许清空</p>
  <p class="doc-title-second-level">设置 <span class="code">allow-clear</span> 属性可以清空输入框</p>
  <div class="doc-item">
    <UploadFileConfiguration v-model:model-value="operation2" :allow-clear="true"></UploadFileConfiguration>
  </div>
  <p class="doc-title-example">显示error</p>
  <p class="doc-title-second-level">通过 <span class="code">error</span> 可以自定义错误信息的文字提示</p>
  <div class="doc-item">
    <UploadFileConfiguration v-model:model-value="operation3" :error="error"
                             @blur-title="(val)=>setError(val)"></UploadFileConfiguration>
  </div>
  <p class="doc-title-example">允许设置文件格式</p>
  <p class="doc-title-second-level">通过绑定 <span class="code">restrictedFormat</span> 设置文件格式</p>
  <div class="doc-item">
    <UploadFileConfiguration v-model:model-value="operation4" :allow-clear="true" :error="error"
                             @blur-title="(val)=>setError(val)"></UploadFileConfiguration>
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
          <td>提示文字</td>
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
          <td>blur-size</td>
          <td>用户设置单文件最大值失去焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>focus-size</td>
          <td>用户设置单文件最大值获取焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>input-size</td>
          <td>用户设置单文件最大值输入时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>blur-count</td>
          <td>用户设置最大上传数量失去焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>focus-count</td>
          <td>用户设置最大上传数量获取焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>input-count</td>
          <td>用户设置最大上传数量输入时触发</td>
          <td>
            <p>value: string</p>
            <p>ev: Event</p>
          </td>
        </tr>
        <tr>
          <td>change-format</td>
          <td>用户选择文件格式时触发</td>
          <td>
            <p>value: string</p>
            <p>format: string</p>
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
          <td>maxCount</td>
          <td>文件上传的最大数量</td>
          <td>number</td>
          <td>10</td>
        </tr>
        <tr>
          <td>maxSize</td>
          <td>单文件上传的最大大小</td>
          <td>number</td>
          <td>30</td>
        </tr>
        <tr>
          <td>restrictedFormat</td>
          <td>是否限制文件格式</td>
          <td>boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>format</td>
          <td>限制的文件格式类型</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>drag</td>
          <td>控制是否可拖拽上传</td>
          <td>boolean</td>
          <td>false</td>
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
        </tbody>
      </table>
    </div>
  </div>
</template>