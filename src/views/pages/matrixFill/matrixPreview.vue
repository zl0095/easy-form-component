<script lang="ts" setup>
import {ref} from 'vue'
import MatrixFill from '../../../../components/package/matrix-fill/Preview.vue'

const obj = ref({
  title: '我是title',
  placeholder: '我是placeholder12123。',
  data: [
    {index: '矩阵1', fill1: '内容1', fill2: '内容2',fill3:'内容3',fill4:'内容4',fill5:'内容5',},
    {index: '矩阵2', fill1: '内容1', fill2: '内容2',fill3:'内容3',fill4:'内容4',fill5:'内容5',},
    {index: '矩阵3', fill1: '内容1', fill2: '内容2',fill3:'内容3',fill4:'内容4',fill5:'内容5',},
  ],
  columns: [
    {title: '编号', key: 'index'},
    {title: '填空1', key: 'fill1'},
    {title: '填空2', key: 'fill2'},
    {title: '填空3', key: 'fill3'},
    {title: '填空4', key: 'fill4'},
    {title: '填空5', key: 'fill5'},
    {title: '填空6', key: 'fill6'},
    {title: '填空7', key: 'fill7'}
  ]
})

</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p>矩阵填空的基本用法。</p>
  <div class="doc-item">
    <MatrixFill v-model:model-value="obj"/>
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
          <td>表格的行描述信息</td>
          <td>[
            { index:string fill1: string, fill2:string }
            ]
          </td>
          <td>[]</td>
        </tr>
        <tr>
          <td>columns</td>
          <td>表格的列描述信息</td>
          <td>[
            { title: string, key:string }
            ]
          </td>
          <td>[]</td>
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