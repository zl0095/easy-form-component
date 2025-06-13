<script lang="ts" setup>
import {ref} from 'vue'
import {DividerConfiguration} from "easy-form-component";

const obj = ref(
    {
      text: '嘻嘻嘻',
      color: '#2dc3c8',
      textColor: '#87d6e3',
      type: 'solid'
    }
)
</script>

<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">分割线的基本用法。</p>
  <div class="doc-item">
    <DividerConfiguration v-model:model-value="obj"/>
  </div>
  <p class="doc-title-example">设置文案</p>
  <p class="doc-title-second-level">通过 <span class="code">text</span> 可以自定义分割线上文本内容。</p>
  <div class="doc-item">
    <DividerConfiguration v-model:model-value="obj"/>
  </div>
  <p class="doc-title-example">分割线颜色</p>
  <p class="doc-title-second-level">通过 <span class="code">color</span> 可以自定义分割线的颜色。</p>
  <div class="doc-item">
    <DividerConfiguration v-model:model-value="obj"/>
  </div>
  <p class="doc-title-example">分割线文本颜色</p>
  <p class="doc-title-second-level">通过 <span class="code">textColor</span> 可以自定义分割线文本的颜色。</p>
  <div class="doc-item">
    <dividerConfiguration v-model:model-value="obj"/>
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
          <td>text</td>
          <td>绑定值</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>text</td>
          <td>文本内容</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>color</td>
          <td>分割线颜色</td>
          <td>string</td>
          <td>-</td>
        </tr>
        <tr>
          <td>textColor</td>
          <td>分割线文本颜色</td>
          <td>string</td>
          <td>-</td>
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
          <td>operation</td>
          <td>操作</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>