<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">评价的基本用法</p>
  <div class="doc-item">
    <Evaluate :options="options1" :title="title"/>
  </div>
  <p class="doc-title-example">允许清空</p>
  <p class="doc-title-second-level">设置 <span class="code">allow-clear</span> 属性可以清空输入框</p>
  <div class="doc-item">
    {{evaluate2}}
    <Evaluate v-model:model-value="evaluate2" :allow-clear="allowClear" :options="options2" :title="title"/>
  </div>
  <p class="doc-title-example">显示error</p>
  <p class="doc-title-second-level">通过 <span class="code">error</span> 可以自定义错误信息的文字提示</p>
  <div class="doc-item">
    <Evaluate v-model:model-value="evaluate3" :error="error" :options="options3" :title="title"
              @blur="(value:string) => setError(value)"/>
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
            score: undefined | number,
            desc: string[],
            selfAssessment: string
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
          <td>allow-clear</td>
          <td>是否允许清空</td>
          <td>boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>输入框提示文字</td>
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
          <td>focus</td>
          <td>写评价获取焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>e: Event</p>
          </td>
        </tr>
        <tr>
          <td>blur</td>
          <td>写评价失去焦点时触发</td>
          <td>
            <p>value: string</p>
            <p>e: Event</p>
          </td>
        </tr>
        <tr>
          <td>input</td>
          <td>写评价输入时触发</td>
          <td>
            <p>value: string</p>
            <p>e: Event</p>
          </td>
        </tr>
        <tr>
          <td>evaluate</td>
          <td>点击星星评分时触发</td>
          <td>value: number</td>
        </tr>
        <tr>
          <td>select</td>
          <td>选择评价的标签时触发</td>
          <td>value: string[]</td>
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
// import Evaluate from '../../../../components/package/evaluate/Preview.vue'
import {Evaluate} from 'easy-form-component'

const title = ref('请您对我们的服务进行评价')
const options1 = ref<{ label: string, desc: string[], checked?: boolean }[]>([{
  label: '非常不满意',
  desc: ['态度冷淡', '推销多', '技术差'],
}, {
  label: '比较不满意',
  desc: ['速度慢', '仪表乱', '不专业'],
}, {
  label: '一般',
  desc: ['无互动', '不积极', '业务不精'],
}, {
  label: '比较满意',
  desc: ['文明礼貌', '速度快', '较专业'],
}, {
  label: '非常满意',
  desc: ['热情好客', '敬业精神', '技能专业'],
}])
const options2 = ref<{ label: string, desc: string[], checked?: boolean }[]>([{
  label: '非常不满意',
  desc: ['态度冷淡', '推销多', '技术差'],
}, {
  label: '比较不满意',
  desc: ['速度慢', '仪表乱', '不专业'],
}, {
  label: '一般',
  desc: ['无互动', '不积极', '业务不精'],
}, {
  label: '比较满意',
  desc: ['文明礼貌', '速度快', '较专业'],
}, {
  label: '非常满意',
  desc: ['热情好客', '敬业精神', '技能专业'],
}])
const options3 = ref<{ label: string, desc: string[], checked?: boolean }[]>([{
  label: '非常不满意',
  desc: ['态度冷淡', '推销多', '技术差'],
}, {
  label: '比较不满意',
  desc: ['速度慢', '仪表乱', '不专业'],
}, {
  label: '一般',
  desc: ['无互动', '不积极', '业务不精'],
}, {
  label: '比较满意',
  desc: ['文明礼貌', '速度快', '较专业'],
}, {
  label: '非常满意',
  desc: ['热情好客', '敬业精神', '技能专业'],
}])
const placeholder = ref('说说您的评价...')
const allowClear = ref(true)
const evaluate1 = ref({
  score: undefined,
  desc: [],
  selfAssessment: ''
})
const evaluate2 = ref({
  score: undefined,
  desc: [],
  selfAssessment: ''
})
const evaluate3 = ref({
  score: undefined,
  desc: [],
  selfAssessment: ''
})
const error = ref('')

function setError(value: string) {
  if (value === '') {
    error.value = '请输入评价'
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