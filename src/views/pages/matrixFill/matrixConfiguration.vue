<script lang="ts" setup>
import {ref} from 'vue'
import {MatrixFillConfiguration} from 'easy-form-component'
// import MatrixFillConfiguration from '../../../../components/package/matrix-fill/Configuration.vue'

const b = ref('错误')
const obj = ref({
  title: '我是title',
  placeholder: '我是placeholder。',
  data: [
    {index: '矩阵1', fill1: '内容1', fill2: '内容2'},
    {index: '矩阵2', fill1: '内容3', fill2: '内容4'}
  ],
  columns: [
    {title: '编号', key: 'index'},
    {title: '填空1', key: 'fill1'},
    {title: '填空2', key: 'fill2'}
  ],
  error: ''
})
const obj1 = ref({
  title: '我是title',
  placeholder: '我是placeholder。',
  data: [
    {index: '矩阵1', fill1: '内容1', fill2: '内容2'},
    {index: '矩阵2', fill1: '内容3', fill2: '内容4'}
  ],
  columns: [
    {title: '编号', key: 'index'},
    {title: '填空1', key: 'fill1'},
    {title: '填空2', key: 'fill2'}
  ],
  error: ''
})
const obj2 = ref({
  title: '我是title',
  placeholder: '我是placeholder。',
  data: [
    {index: '矩阵1', fill1: '内容1', fill2: '内容2'},
    {index: '矩阵2', fill1: '内容3', fill2: '内容4'}
  ],
  columns: [
    {title: '编号', key: 'index'},
    {title: '填空1', key: 'fill1'},
    {title: '填空2', key: 'fill2'}
  ],
  error: ''
})
const obj3 = ref({
  title: '我是title',
  placeholder: '我是placeholder。',
  data: [
    {index: '矩阵1', fill1: '内容1', fill2: '内容2'},
    {index: '矩阵2', fill1: '内容3', fill2: '内容4'}
  ],
  columns: [
    {title: '编号', key: 'index'},
    {title: '填空1', key: 'fill1'},
    {title: '填空2', key: 'fill2'}
  ],
  error: ''
})
const obj4 = ref({
  title: '我是title',
  placeholder: '我是placeholder。',
  data: [
    {index: '矩阵1', fill1: '内容1', fill2: '内容2'},
    {index: '矩阵2', fill1: '内容3', fill2: '内容4'}
  ],
  columns: [
    {title: '编号', key: 'index'},
    {title: '填空1', key: 'fill1'},
    {title: '填空2', key: 'fill2'}
  ],
  error: ''
})

</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p>矩阵填空的基本用法。</p>
  <div class="doc-item">
    <MatrixFillConfiguration v-model:model-value="obj" :max-length="10"  />
  </div>
  <p class="doc-title-example">设置文案</p>
  <p class="doc-title-second-level">通过 <span class="code">title</span> 可以自定义标题的文本内容。</p>
  <div class="doc-item">
    <MatrixFillConfiguration v-model:model-value="obj1"/>
  </div>
  <p class="doc-title-example">标题输入框错误提示文字</p>
  <p class="doc-title-second-level">通过 <span class="code">error</span> 可以自定义错误信息的文字提示。</p>
  <div class="doc-item">
    <MatrixFillConfiguration v-model:model-value="obj2" :error="b"/>
  </div>
  <p class="doc-title-example">标题的最大长度</p>
  <p class="doc-title-second-level">通过 <span class="code">max-length</span> 可以设置输入框输入的最大长度。</p>
  <div class="doc-item doc-item-one">
    <MatrixFillConfiguration v-model:model-value="obj3" :max-length="5"/>
  </div>
  <p class="doc-title-example">是否允许清空</p>
  <p class="doc-title-second-level">通过 <span class="code">allow-clear</span> 属性可以清空输入框。</p>
  <div class="doc-item doc-item-one">
    <MatrixFillConfiguration :allow-clear="true" v-model:model-value="obj4" :max-length="5"/>
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
          <td>data</td>
          <td>绑定值</td>
          <td>-</td>
          <td>[]</td>
        </tr>
        <tr>
          <td>columns</td>
          <td>表格的列描述信息</td>
          <td>-</td>
          <td>[]</td>
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
          <td>addRow</td>
          <td>添加行</td>
          <td>-</td>
        </tr>
        <tr>
          <td>addColumn</td>
          <td>添加列</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>