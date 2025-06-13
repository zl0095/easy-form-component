<script lang="ts" setup>
import {ref} from 'vue'
import Sort from '../../../../components/package/sort/Preview.vue'

const title = ref('请给以下选项排序')
const options = ref([
  {
    label: '选项1'
  },
  {
    label: '选项2'
  },
  {
    label: '选项3'
  }
])
const sort1 = ref([])
const sort2 = ref([])
const error = ref('')

function setError(val: { label: string }) {
  if (val.label === '选项1') {
    error.value = '不能选择此项'
  } else {
    error.value = ''
  }
}
</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">排序的基本用法</p>
  <div class="doc-item doc-item-one">
    <Sort v-model:model-value="sort1" :options="options" :title="title"/>
  </div>
  <p class="doc-title-example">显示error</p>
  <p class="doc-title-second-level">通过 <span class="code">error</span> 可以自定义错误信息的文字提示</p>
  <div class="doc-item doc-item-one">
    <Sort v-model:model-value="sort2" :error="error" :options="options" :title="title"
          @change="(val:any)=>setError(val)"/>
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
          <td>string[]</td>
          <td>-</td>
        </tr>
        <tr>
          <td>title</td>
          <td>标题</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>options</td>
          <td>配置项</td>
          <td>Array<{ label : string }></td>
          <td>-</td>
        </tr>
        <tr>
          <td>error</td>
          <td>错误信息文字</td>
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
          <td>用户点击选项时触发</td>
          <td class="maxWidth">
            <p>value: object<{ label : string }></p>
            <p>index: number</p>
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