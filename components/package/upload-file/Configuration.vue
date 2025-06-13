<template>
  <div :class="['easy-form-container', showBorder ? 'easy-form-container-active' : '']">
    <div class="easy-form-container-title">
      <div class="easy-form-title-left">
        <div class="easy-form-label">
          <div class="easy-form-serial-number">
            <slot name="serial"></slot>
          </div>
          <input v-model="propsModelValue.title"
                 :class="['easy-form-title', showBorder && showBackground === 1 ? 'easy-form-active' : '']"
                 placeholder="请输入标题" name="title"
                 @blur="(e) => ((showBorder = false), (showBackground = 1), emit('blurTitle', propsModelValue.title, e))"
                 @focus="(e) => ((showBorder = true), (showBackground = 1), emit('focusTitle', propsModelValue.title, e))"
                 @input="(e) => watchTitleInput(propsModelValue.title, e)"/>
          <div class="easy-form-clear">
            <SvgIcon name="clear" v-if="showBackground === 1 && allowClear && propsModelValue.title !== ''"
                     class="easy-form-clear-img" @click.stop.prevent="() => (propsModelValue.title = '')"/>
          </div>
        </div>
      </div>
      <div class="easy-form-operation">
        <slot name="operation"></slot>
      </div>
    </div>
    <div class="easy-form-content">
      <div class="easy-form-plus">
        <SvgIcon :height="40" :width="40" color="#aaa" name="plus"></SvgIcon>
        <span class="easy-form-text-upload">由答题者上传</span>
        <span class="easy-form-text-desc">最多{{
            propsModelValue.maxCount
          }}个，单个文件大小不超过{{ propsModelValue.maxSize }}MB</span>
      </div>
      <p class="easy-form-upload-file-tip">
        <span class="easy-form-tit">是否限制文件格式</span>
        <Switch v-model:checked="propsModelValue.restrictedFormat"></Switch>
      </p>
      <div v-if="propsModelValue.restrictedFormat" class="easy-form-upload-file-tip">
        <span class="easy-form-tit">限制文件类型</span>
        <div class="easy-form-select-format">
          <div class="easy-form-max-count" style="cursor: pointer"
               @click.stop="() => ((showSelect = !showSelect), (showBackground = 2), (showBorder = true))">
            <span>{{ propsModelValue.format }}</span>
            <div v-if="showBorder && modelValue.format && allowClear && showBackground === 2" class="easy-form-clear">
              <SvgIcon name="clear" @click.stop="clearSelect"></SvgIcon>
            </div>
            <SvgIcon :class="['easy-form-arrow', showSelect ? 'easy-form-arrow-active' : '']" :height="15" :width="15"
                     color="#aaa" name="arrow_down"></SvgIcon>
          </div>
          <div v-if="showSelect" class="easy-form-options">
            <div v-for="(item, index) in options" :key="index"
                 :class="['easy-form-option', item.selected ? 'easy-form-active' : '']"
                 @click.stop="() => selectOptions(item)">{{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <p class="easy-form-upload-file-tip">
        <span class="easy-form-tit">最大上传数量</span>
        <input v-model="propsModelValue.maxCount" class="easy-form-max-count" type="number"
               @blur="(e) => ((showBorder = false), (showBackground = 3), emit('blurCount', propsModelValue.maxCount, e))"
               @focus="(e) => ((showBorder = true), (showBackground = 3), emit('focusCount', propsModelValue.maxCount, e))"
               @input="(e) => (emit('update:modelValue', propsModelValue),emit('inputCount', propsModelValue.maxCount, e))"/>
        <SvgIcon v-if="modelValue.maxCount && allowClear && showBackground === 3" class="easy-form-clear"
                 name="clear" @click.stop="() => (propsModelValue.maxCount = undefined)"></SvgIcon>
      </p>
      <p class="easy-form-upload-file-tip">
        <span class="easy-form-tit">单文件最大上传大小（MB）</span>
        <input v-model="propsModelValue.maxSize" class="easy-form-max-count" type="number"
               @blur="(e) => ((showBorder = false), (showBackground = 4), emit('blurSize', propsModelValue.maxSize, e))"
               @focus="(e) => ((showBorder = true), (showBackground = 4), emit('focusSize', propsModelValue.maxSize, e))"
               @input="(e) => (emit('update:modelValue', propsModelValue),emit('inputSize', propsModelValue.maxSize, e))"/>
        <SvgIcon v-if="modelValue.maxSize && allowClear && showBackground === 4" class="easy-form-clear"
                 name="clear" @click.stop="() => (propsModelValue.maxSize = undefined)"></SvgIcon>
      </p>
      <p class="easy-form-upload-file-tip">
        <span class="easy-form-tit">是否支持拖拽上传</span>
        <Switch v-model:checked="propsModelValue.drag"></Switch>
      </p>
      <p class="easy-form-upload-file-tip">
        <span class="easy-form-tit">是否支持多文件上传</span>
        <Switch v-model:checked="propsModelValue.multiple"></Switch>
      </p>
    </div>
    <p class="easy-form-set-switch" v-if="isRequiredShow">
      <span class="easy-form-tit">是否必填</span>
      <Switch @change="()=>emit('update:modelValue',propsModelValue)"
              v-model:checked="propsModelValue.required"></Switch>
    </p>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, type PropType, ref, watch} from 'vue';
import Switch from '../common/Switch.vue';
import SvgIcon from "@/package/svg-icon/index";

const showBorder = ref(false);
const showBackground = ref(0);
const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      maxCount?: number;
      maxSize?: number;
      restrictedFormat?: boolean;
      format?: string;
      drag?: boolean;
      multiple?: boolean;
      required: boolean;
      error: string
    }>,
    default: () => ({
      title: '请上传文件',
      maxCount: 10,
      maxSize: 30,
      restrictedFormat: false,
      format: '',
      drag: true,
      multiple: true,
      required: false,
      error: ''
    }),
  },
  isRequiredShow: {
    type: Boolean,
    default: true
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['blurTitle', 'focusTitle', 'inputTitle', 'update:modelValue', 'focusSize', 'blurSize', 'inputSize', 'focusCount', 'blurCount', 'inputCount', 'changeFormat']);
const options = ref([
  {name: '.png', selected: false},
  {name: '.jpg', selected: false},
  {name: '.gif', selected: false},
  {name: '.doc', selected: false},
  {name: '.docx', selected: false},
  {name: '.pdf', selected: false},
  {name: '.xls', selected: false},
  {name: '.xlsx', selected: false},
  {name: '.ppt', selected: false},
  {name: '.pptx', selected: false},
  {name: '.zip', selected: false},
  {name: '.mp4', selected: false},
]);
const selected = ref<{ name: string; selected: boolean }[]>([]);
const showSelect = ref(false);

document.addEventListener('click', function () {
  showSelect.value = false;
});

const propsModelValue = ref<{
  title: string;
  maxCount?: number;
  maxSize?: number;
  restrictedFormat?: boolean;
  format?: string;
  drag?: boolean;
  multiple?: boolean;
  required: boolean;
  error: string
}>(JSON.parse(JSON.stringify(props.modelValue)));

watch(
    () => propsModelValue.value.drag,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        emit('update:modelValue', propsModelValue.value);
      }
    }
);

if (propsModelValue.value.format !== '') {
  options.value.forEach((item) => {
    propsModelValue.value.format?.split(',').forEach((k: string) => {
      if (item.name === k) {
        item.selected = true;
        selected.value.push({name: item.name, selected: true});
      }
    });
  });
}

function clearSelect() {
  propsModelValue.value.format = '';
  selected.value = [];
  options.value = [
    {name: '.png', selected: false},
    {name: '.jpg', selected: false},
    {name: '.gif', selected: false},
    {name: '.doc', selected: false},
    {name: '.docx', selected: false},
    {name: '.pdf', selected: false},
    {name: '.xls', selected: false},
    {name: '.xlsx', selected: false},
    {name: '.ppt', selected: false},
    {name: '.pptx', selected: false},
    {name: '.zip', selected: false},
    {name: '.mp4', selected: false},
  ];
}

function selectOptions(item: { name: string; selected: boolean }) {
  if (item.selected) {
    selected.value.splice(
        selected.value.findIndex((select) => select.name === item.name),
        1
    );
  } else {
    selected.value.push(item);
  }
  item.selected = !item.selected;
  propsModelValue.value.format = selected.value.map((select) => select.name).join(',');
  emit('update:modelValue', propsModelValue.value);
  emit('changeFormat', item.name, propsModelValue.value.format);
}

function watchTitleInput(title: string, event: Event) {
  emit('update:modelValue', propsModelValue.value);
  emit('inputTitle', propsModelValue.value.title, event);
}
</script>

<style lang="less" scoped>
.easy-form-container {
  box-sizing: border-box;
  padding: var(--easy-form-item-padding-component);
  background: var(--easy-form-component-background);
  border: 1px solid transparent;
  border-radius: var(--easy-form-border-radius-component);
  transition: border-color 0.2s linear;

  &.easy-form-container-active {
    border-color: var(--easy-form-border-color-component-2);
  }

  .easy-form-container-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .easy-form-title-left {
      width: 70%;

      .easy-form-label {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 16px;

        .easy-form-serial-number {
          width: 35px;
        }

        .easy-form-title {
          box-sizing: border-box;
          flex: 1;
          padding: var(--easy-form-select-padding-component);
          color: var(--easy-form-color-text-component-1);
          font-size: 16px;
          background: var(--easy-form-input-bg-component);
          border: 1px dashed transparent;
          border-radius: var(--easy-form-border-radius-component-1);
          outline: none;

          &:hover {
            border-color: #aaa;
            cursor: text;
          }
        }
      }
    }
  }

  .easy-form-content {
    max-width: 50%;
    margin-top: 10px;
    margin-left: 35px;

    .easy-form-plus {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 398px;
      height: 164px;
      color: var(--easy-form-color-text-component-3);
      background: var(--easy-form-background-component-7);

      .easy-form-text-upload {
        margin: 10px 0 5px;
        font-size: 14px;
      }

      .easy-form-text-desc {
        font-size: 12px;
      }
    }

    .easy-form-upload-file-tip {
      position: relative;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      margin-top: 10px;
      color: var(--easy-form-color-text-component-3);
      font-size: 14px;

      .easy-form-select-format {
        position: relative;
        flex: 1;
      }

      .easy-form-max-count {
        flex: 1;
        box-sizing: border-box;
        height: 38px;
        padding: var(--easy-form-select-padding-component);
        color: var(--easy-form-color-text-component-1);
        font-size: 14px;
        background: var(--easy-form-background-component-7);
        border: none;
        outline: none;
        border-radius: var(--easy-form-border-radius-component-1);
      }

      .easy-form-tit {
        margin-right: 10px;
      }

      .easy-form-options {
        position: absolute;
        top: 38px;
        left: 0;
        z-index: 9;
        box-sizing: border-box;
        width: 100%;
        color: var(--easy-form-color-text-component-1);
        background: var(--easy-form-background-component-8);
        box-shadow: 0 0 10px 0 rgb(78 89 105 / 10%);

        .easy-form-option {
          box-sizing: border-box;
          padding: 5px 10px;
          font-size: 16px;
          cursor: pointer;

          &:hover {
            color: #1677ff;
            background: #e6f4ff;
          }

          &.easy-form-active {
            color: #1677ff;
            background: #e6f4ff !important;
          }
        }
      }

      .easy-form-clear {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        margin: auto;
      }

      .easy-form-arrow {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        margin: auto;
        transition: transform 0.2s linear;

        &-active {
          transform: rotate(180deg);
        }
      }
    }
  }
}

.easy-form-active {
  background: var(--easy-form-input-select-background-component) !important;
  border-color: transparent !important;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
