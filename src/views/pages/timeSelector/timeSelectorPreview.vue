<script lang="ts" setup>
import {ref} from 'vue'
import TimeSelector from '../../../../components/package/time-selector/Preview.vue'

const title = ref('请填写内容')
const obj = ref(undefined)
</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">时间选择器的基本用法。</p>
  <div class="doc-item doc-item-one">
    {{obj}}
    <TimeSelector :title="title" :is-has-second="false" v-model:model-value="obj"/>
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
          <td>标题</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <!--        <tr>-->
        <!--          <td>allow-clear</td>-->
        <!--          <td>是否允许清空</td>-->
        <!--          <td>boolean</td>-->
        <!--          <td>false</td>-->
        <!--        </tr>-->
        <!--        <tr>-->
        <!--          <td>disabled</td>-->
        <!--          <td>是否禁用</td>-->
        <!--          <td>boolean</td>-->
        <!--          <td>false</td>-->
        <!--        </tr>-->
        <!--        <tr>-->
        <!--          <td>max-length</td>-->
        <!--          <td>标题的最大长度</td>-->
        <!--          <td>number</td>-->
        <!--          <td>-</td>-->
        <!--        </tr>-->
        <!--        <tr>-->
        <!--          <td>placeholder</td>-->
        <!--          <td>输入框提示文字</td>-->
        <!--          <td>string</td>-->
        <!--          <td>-</td>-->
        <!--        </tr>-->
        <!--        <tr>-->
        <!--          <td>error</td>-->
        <!--          <td>输入框错误提示文字</td>-->
        <!--          <td>string</td>-->
        <!--          <td>-</td>-->
        <!--        </tr>-->
        </tbody>
      </table>
    </div>
    <!--    <div class="doc-table">-->
    <!--      <div class="doc-title">Method（方法）</div>-->
    <!--      <table class="table">-->
    <!--        <thead>-->
    <!--        <tr>-->
    <!--          <th>事件名</th>-->
    <!--          <th>描述</th>-->
    <!--          <th>参数</th>-->
    <!--        </tr>-->
    <!--        </thead>-->
    <!--        <tbody>-->
    <!--        <tr>-->
    <!--          <td>change</td>-->
    <!--          <td>用户点击选项时触发</td>-->
    <!--          <td>value: number</td>-->
    <!--        </tr>-->
    <!--        <tr>-->
    <!--          <td>input</td>-->
    <!--          <td>用户设置标题输入时焦点时触发</td>-->
    <!--          <td>-->
    <!--            <p>value: string</p>-->
    <!--            <p>ev: Event</p>-->
    <!--          </td>-->
    <!--        </tr>-->
    <!--        <tr>-->
    <!--          <td>blur</td>-->
    <!--          <td>用户设置标题时失去焦点时触发</td>-->
    <!--          <td>-->
    <!--            <p>value: string</p>-->
    <!--            <p>ev: Event</p>-->
    <!--          </td>-->
    <!--        </tr>-->
    <!--        </tbody>-->
    <!--      </table>-->
    <!--    </div>-->
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
