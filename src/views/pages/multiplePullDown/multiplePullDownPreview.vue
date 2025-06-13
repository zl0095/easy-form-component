<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">多级下拉的基本用法</p>
  <div class="doc-item">
    <MultiplePullDown :format-label="{label:'label'}"
                      :options="options" :title="title"/>
  </div>
  <p class="doc-title-example">允许清空</p>
  <p class="doc-title-second-level">设置 <span class="code">allow-clear</span> 属性可以清空输入框</p>
  <div class="doc-item">
    <MultiplePullDown v-model:model-value="selected2" :allow-clear="true"
                      :format-label="{label:'label'}" :options="options" :title="title"/>
  </div>
  <p class="doc-title-example">显示error</p>
  <p class="doc-title-second-level">通过 <span class="code">error</span> 可以自定义错误信息的文字提示</p>
  <div class="doc-item">
    <MultiplePullDown v-model:model-value="selected3" :error="error"
                      :format-label="{label:'label'}" :options="options"
                      :title="title" @change="(val:string,value:string) => setError(val,value)"/>
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
        <tr>
          <td>options</td>
          <td>多级下拉框数据</td>
          <td>any[]</td>
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
        <tr>
          <td>format-label</td>
          <td>格式化展示内容</td>
          <td>
            {
            label: string,
            }
          </td>
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
          <td>
            <p>value: string</p>
            <p>selectedValue: string</p>
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
// import MultiplePullDown from '../../../../components/package/multiple-pull-down/Preview.vue'
import {MultiplePullDown} from 'easy-form-component'


const title = ref('请选择以下选项')
const selected1 = ref('')
const selected2 = ref('')
const selected3 = ref('')
const error = ref('')
const options = ref([
{
  "label": "测试1",
    "children": []
},
{
  "label": "测试2",
    "children": [
  {
    "label": "测试1-1",
    "children": [
      {
        "label": "选项1",
        "children": [
          {
            "label": "选项1",
            "children": []
          }
        ]
      }
    ]
  },
  {
    "label": "测试2-2",
    "children": [
      {
        "label": "测试2-2-1",
        "children": [
          {
            "label": "测试2-2-1-1",
            "children": []
          }
        ]
      }
    ]
  }
]
}
])

function setError(val: string, value: string) {
  if (val === '请选择') {
    error.value = '请选择下拉内容'
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