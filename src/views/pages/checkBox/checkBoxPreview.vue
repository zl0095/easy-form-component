<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">多选的基本用法</p>
  <div class="doc-item doc-item-one">
    <CheckBox :options="options" :title="title" error="111"/>
  </div>
  <p class="doc-title-example">最多可选个数</p>
  <p class="doc-title-second-level">设置 <span class="code">max-count</span> 属性可以设置标题的最大长度</p>
  <div class="doc-item doc-item-one">
    <CheckBox v-model:model-value="checkbox2" :options="options" :title="title" :max-count="1"/>
  </div>
  <p class="doc-title-example">显示error</p>
  <p class="doc-title-second-level">通过 <span class="code">error</span> 可以自定义错误信息的文字提示</p>
  <div class="doc-item doc-item-one">
    <CheckBox v-model:model-value="checkbox3" :error="error" :options="options" :title="title"
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
          <td>{
            label : string ,
            disabled（可不传）: boolean
            }[]
          </td>
          <td>-</td>
        </tr>
        <tr>
          <td>max-count</td>
          <td>可以选中的最大个数</td>
          <td>string | number</td>
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
          <td class="maxWidth">value: object<{ label: string , checked:
            boolean , disabled : boolean }>
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
import {CheckBox} from 'easy-form-component'

const title = ref('请选择以下选项 (多选)')
const options = ref<{
  label: string;
  placeholder?: string;
  disabled?: boolean;
  checked?: boolean
}[]>([
  {
    label: '选项1',
    placeholder: '请输入选择项',
  },
  {
    label: '选项2',
    placeholder: '请输入选择项',
  }
])
const checkbox1 = ref([])
const checkbox2 = ref([])
const checkbox3 = ref([])
const error = ref('')

function setError(val: { label: string, checked: boolean, disabled: boolean }) {
  if (val.label === '' && val.checked) {
    error.value = '不能选择该选项'
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