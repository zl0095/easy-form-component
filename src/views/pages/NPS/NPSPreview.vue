<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">NPS的基本用法</p>
  <div class="doc-item">
    <NPS :title="title" maxCount="1"/>
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
          <td>number | string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>title</td>
          <td>标题</td>
          <td>string</td>
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
          <td>value: number</td>
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

<script lang="ts" setup>
import {ref} from 'vue'
import NPS from '../../../../components/package/nps/Preview.vue'

const title = ref('您向朋友或同事推荐我们的可能性有多大？')
const nps = ref('')
</script>
<style lang="less" scoped>
.doc-item {
  padding: var(--easy-form-item-padding-component);
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, .1);
  box-sizing: border-box;
  background: var(--easy-form-component-background);
}
</style>