<script lang="ts" setup>
import {ref} from 'vue'
import MatrixScoring from '../../../../components/package/matrix-scoring/Preview.vue'

const obj = ref({
  title: '我是title',
  placeholder: '我是placeholder',
  data: [
    {index: '矩阵1',fill1: 0, fill2: 0, fill3: 0,fill4: 0},
    {index: '矩阵2',fill1: 0, fill2:0, fill3: 0,fill4: 0},
    {index: '矩阵3',fill1: 0, fill2: 0, fill3: 0,fill4: 0},
  ],
  columns: [
    {title: '编号', key: 'index'},
    {title: '选项1', key: 'fill1'},
    {title: '选项2', key: 'fill2'},
    {title: '选项3', key: 'fill3'},
    // {title: '选项4', key: 'fill4'},
    // {title: '选项5', key: 'fill5'},
    // {title: '选项6', key: 'fill6'},
    // {title: '选项7', key: 'fill7'},
    // {title: '选项8', key: 'fill8'},
  ]
})
</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p>矩阵填空的基本用法。</p>
  <div class="doc-item">
    <MatrixScoring v-model:model-value="obj"/>
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
            { index:string fill1: number, fill2:number }
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