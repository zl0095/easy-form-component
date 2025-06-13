<template>
  <p class="doc-title-example">基本用法</p>
  <p class="doc-title-second-level">上传图片的基本用法</p>
  <div class="doc-item">
    {{imageList1}}
    <UploadImage v-model:model-value="imageList1" :title="title"/>
  </div>
  <p class="doc-title-example">不允许拖拽上传</p>
  <p class="doc-title-second-level">通过<span class="code">drag</span>可以设置用户是否可以拖拽上传</p>
  <div class="doc-item">
    <UploadImage v-model:model-value="imageList2" :drag="false" :title="title"/>
  </div>
  <p class="doc-title-example">显示error</p>
  <p class="doc-title-second-level">通过 <span class="code">error</span> 可以自定义错误信息的文字提示</p>
  <div class="doc-item">
    <UploadImage v-model:model-value="imageList3" :error="error" :title="title"
                 @delete="(images)=>setError(images)"/>
  </div>
  <p class="doc-title-example">不允许多选</p>
  <p class="doc-title-second-level">通过 <span class="code">multiple</span> 可以设置图片是否可以多选</p>
  <div class="doc-item">
    <UploadImage v-model:model-value="imageList4" :multiple="false" :title="title"/>
  </div>
  <p class="doc-title-example">设置最大上传数量</p>
  <p class="doc-title-second-level">通过 <span class="code">max-count</span> 可以设置图片上传的最大数量</p>
  <div class="doc-item">
    <UploadImage v-model:model-value="imageList5" :title="title" max-count="3"/>
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
          <td>max-count</td>
          <td>图片最大上传数量</td>
          <td>string | number</td>
          <td>10</td>
        </tr>
        <tr>
          <td>multiple</td>
          <td>是否多选</td>
          <td>boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>drag</td>
          <td>是否可拖拽上传</td>
          <td>boolean</td>
          <td>true</td>
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
          <td>upload</td>
          <td>用户上传图片时触发</td>
          <td>
            <p>value: string[]</p>
            <p>imageList: FileList</p>
          </td>
        </tr>
        <tr>
          <td>delete</td>
          <td>用户删除图片时触发</td>
          <td>
            <p>value: string[]</p>
            <p>item: string</p>
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
// import UploadImage from '../../../../components/package/upload-image/Preview.vue'

import {UploadImage} from 'easy-form-component'

const title = ref('请上传图片')
const imageList1 = ref([{
  name:'111',
  url:'https://static-legacy.dingtalk.com/media/lQDPM4Ol96IufZvNAwzNAwyw0OL-rBaIaTIGy9ahEJeyAA_780_780.jpg'
}])
const imageList2 = ref([])
const imageList3 = ref([])
const imageList4 = ref([])
const imageList5 = ref([])
const error = ref('')

function setError(images: string[]) {
  if (images.length === 0) {
    error.value = '请上传图片'
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