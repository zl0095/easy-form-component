<script lang="ts" setup>
import {ref} from 'vue'
// import {MultiplePullDownConfiguration} from 'easy-form-component'
import MultiplePullDownConfiguration from '../../../../components/package/multiple-pull-down/Configuration.vue'

const options1 = ref({
  title: '请选择以下选项',
  options: [
    {
      label: '请选择',
    },
    {
      label: '测试1',
      children: [
        {
          label: '测试1-1',
        },
        {
          label: '测试2-2',
        },
      ],
    },
  ],
  required: false,
  error: ''
})
</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">多级下拉的基本用法</p>
  <div class="doc-item">
    <MultiplePullDownConfiguration v-model:model-value="options1" max-length="10"></MultiplePullDownConfiguration>
  </div>
  <p class="doc-title-example">允许清空</p>
  <p class="doc-title-second-level">设置 <span class="code">allow-clear</span> 属性可以清空输入框</p>
  <div class="doc-item">
    <MultiplePullDownConfiguration v-model:model-value="options1" :allow-clear="true"></MultiplePullDownConfiguration>
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
          <td>ChildrenArr[]</td>
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
        </tbody>
      </table>
    </div>
    <div class="doc-table">
      <div class="doc-title">ChildrenArr（参数）</div>
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
          <td>label</td>
          <td>设置的选项内容</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>children</td>
          <td>是否有子元素（可选）</td>
          <td class="maxWidth">ChildrenArr[]</td>
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
        </tbody>
      </table>
    </div>
  </div>
</template>