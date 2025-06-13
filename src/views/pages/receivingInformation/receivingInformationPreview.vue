<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">收货信息的基本用法</p>
  <div class="doc-item">
    <ReceivingInformation v-model:model-value="options" :title="title" maxCount="1"
                          @change="(val) => setError(val)"/>
  </div>
  <p class="doc-title-example">允许清空</p>
  <p class="doc-title-second-level">设置 <span class="code">allow-clear</span> 属性可以清空输入框</p>
  <div class="doc-item">
    <ReceivingInformation v-model:model-value="options" :allow-clear="true"></ReceivingInformation>
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
          <td>
            {
            name: string,
            phone: string,
            area: string,
            detailAddress: string
            }
          </td>
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
          <td>change</td>
          <td>用户选中下拉框选项时触发</td>
          <td>
            <p>value: string</p>
            <p>selectedValue: string</p>
          </td>
        </tr>
        <tr>
          <td>focus-name</td>
          <td>收货人姓名获取焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>e: Event</p>
          </td>
        </tr>
        <tr>
          <td>blur-name</td>
          <td>收货人姓名失去焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>e: Event</p>
          </td>
        </tr>
        <tr>
          <td>input-name</td>
          <td>收货人姓名输入时触发</td>
          <td>
            <p>value: string</p>
            <p>e: Event</p>
          </td>
        </tr>
        <tr>
          <td>focus-phone</td>
          <td>手机号码获取焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>e: Event</p>
          </td>
        </tr>
        <tr>
          <td>blur-phone</td>
          <td>手机号码失去焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>e: Event</p>
          </td>
        </tr>
        <tr>
          <td>input-phone</td>
          <td>手机号码输入时触发</td>
          <td>
            <p>value: string</p>
            <p>e: Event</p>
          </td>
        </tr>
        <tr>
          <td>focus-detail</td>
          <td>详细地址获取焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>e: Event</p>
          </td>
        </tr>
        <tr>
          <td>blur-detail</td>
          <td>详细地址失去焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>e: Event</p>
          </td>
        </tr>
        <tr>
          <td>input-detail</td>
          <td>详细地址输入时触发</td>
          <td>
            <p>value: string</p>
            <p>e: Event</p>
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

<script lang="ts" setup>
import {ref} from 'vue'
import ReceivingInformation from '../../../../components/package/receiving-information/Preview.vue'

const title = ref('请输入收货信息')
const error = ref('')
const options = ref({
  name: '',
  phone: '',
  area: '',
  detailAddress: ''
})

function setError(val: string) {
  if (val === '') {
    error.value = '请输入收货信息'
  } else {
    error.value = ''
  }
}
</script>

<style lang="less" scoped>
.doc-item {
  padding: var(--easy-form-item-padding-component);
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, .1);
  box-sizing: border-box;
  background: var(--easy-form-component-background);
}
</style>