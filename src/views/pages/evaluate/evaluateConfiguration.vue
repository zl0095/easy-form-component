<script lang="ts" setup>
import {ref} from 'vue'
import {EvaluateConfiguration} from "easy-form-component"

const error = ref('')
const obj1 = ref({
  title: '请您对我们的服务进行评价',
  options: [
    {
      label: '非常不满意',
      desc: ['态度冷淡', '推销多', '技术差'],
      checked: true,
    },
    {
      label: '比较不满意',
      desc: ['速度慢', '仪表乱', '不专业'],
      checked: false,
    },
    {
      label: '一般',
      desc: ['无互动', '不积极', '业务不精'],
      checked: false,
    },
    {
      label: '比较满意',
      desc: ['文明礼貌', '速度快', '较专业'],
      checked: false,
    },
    {
      label: '非常满意',
      desc: ['热情好客', '敬业精神', '技能专业'],
      checked: false,
    },
  ],
  required: false,
  error: ''
})
const obj2 = ref({
  title: '请您对我们的服务进行评价',
  options: [
    {
      label: '非常不满意',
      desc: ['态度冷淡', '推销多', '技术差'],
      checked: true,
    },
    {
      label: '比较不满意',
      desc: ['速度慢', '仪表乱', '不专业'],
      checked: false,
    },
    {
      label: '一般',
      desc: ['无互动', '不积极', '业务不精'],
      checked: false,
    },
    {
      label: '比较满意',
      desc: ['文明礼貌', '速度快', '较专业'],
      checked: false,
    },
    {
      label: '非常满意',
      desc: ['热情好客', '敬业精神', '技能专业'],
      checked: false,
    },
  ],
  required: false,
  error: ''
})
const obj3 = ref({
  title: '请您对我们的服务进行评价',
  options: [
    {
      label: '非常不满意',
      desc: ['态度冷淡', '推销多', '技术差'],
      checked: true,
    },
    {
      label: '比较不满意',
      desc: ['速度慢', '仪表乱', '不专业'],
      checked: false,
    },
    {
      label: '一般',
      desc: ['无互动', '不积极', '业务不精'],
      checked: false,
    },
    {
      label: '比较满意',
      desc: ['文明礼貌', '速度快', '较专业'],
      checked: false,
    },
    {
      label: '非常满意',
      desc: ['热情好客', '敬业精神', '技能专业'],
      checked: false,
    },
  ],
  required: false,
  error: ''
})

function setError(val: string) {
  if (val.length > 10) {
    error.value = '最多输入10个字符'
  } else {
    error.value = ''
  }
}
</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">评价的基本用法</p>
  <div class="doc-item">
    <EvaluateConfiguration v-model:model-value="obj1" max-length="10"></EvaluateConfiguration>
  </div>
  <p class="doc-title-example">显示error</p>
  <p class="doc-title-second-level">通过 <span class="code">error</span> 可以自定义错误信息的文字提示</p>
  <div class="doc-item">
    <EvaluateConfiguration v-model:model-value="obj2" :error="error"
                           @blur-title="(val)=>setError(val)"></EvaluateConfiguration>
  </div>
  <p class="doc-title-example">允许清空</p>
  <p class="doc-title-second-level">设置 <span class="code">allow-clear</span> 属性可以清空输入框</p>
  <div class="doc-item">
    <EvaluateConfiguration v-model:model-value="obj3" :allow-clear="true"></EvaluateConfiguration>
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
            title: string,
            options: {
            label: string,
            desc: string[]
            }
            }
          </td>
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