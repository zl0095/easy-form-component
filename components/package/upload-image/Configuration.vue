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
        <SvgIcon :height="60" :width="60" color="#d8d8d8" name="plus"></SvgIcon>
        <span>点击上传图片</span>
      </div>
      <p class="easy-form-set-max-count">
        <span class="easy-form-tit">最大上传数量</span>
        <input v-model="propsModelValue.maxCount" class="easy-form-max-count" type="number"
               @blur="(e) => ((showBorder = false), (showBackground = 2), emit('blurSize', propsModelValue.maxCount, e))"
               @focus="(e) => ((showBorder = true), (showBackground = 2), emit('focusSize', propsModelValue.maxCount, e))"
               @input="(e) => (emit('update:modelValue', propsModelValue),emit('inputSize', propsModelValue.maxCount, e))"/>
        <SvgIcon v-if="propsModelValue.maxCount && allowClear && showBackground === 2"
                 class="easy-form-clear"
                 name="clear" @click.stop.prevent="() => propsModelValue.maxCount = undefined"></SvgIcon>
      </p>
      <p class="easy-form-set-max-count">
        <span class="easy-form-tit">是否可以拖拽上传</span>
        <Switch @change="()=>emit('update:modelValue',propsModelValue)" v-model:checked="propsModelValue.drag"></Switch>
      </p>
      <p class="easy-form-set-max-count">
        <span class="easy-form-tit">是否多图上传</span>
        <Switch @change="()=>emit('update:modelValue',propsModelValue)"
                v-model:checked="propsModelValue.multiple"></Switch>
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
import {defineProps, type PropType, ref} from 'vue';
import Switch from '../common/Switch.vue';
import {UploadImageConfigurationOptions} from '@/interface';
import SvgIcon from "../../package/svg-icon/index";

const showBorder = ref(false);
const showBackground = ref(0);
const props = defineProps({
  modelValue: {
    type: Object as PropType<UploadImageConfigurationOptions>,
    default: () => ({
      title: '请上传图片',
      maxCount: 10,
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
const emit = defineEmits(['blurTitle', 'focusTitle', 'inputTitle', 'update:modelValue', 'blurSize', 'focusSize', 'inputSize']);

const propsModelValue = ref<UploadImageConfigurationOptions>(JSON.parse(JSON.stringify(props.modelValue)));

function watchTitleInput(title: string, event: Event) {
  emit('update:modelValue', propsModelValue.value);
  emit('inputTitle', title, event);
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
      box-sizing: border-box;
      width: 164px;
      height: 164px;
      padding: 30px 34px;
      background: var(--easy-form-background-component-7);
      border: 1px dashed #d8d8d8;

      span {
        margin-top: 20px;
        color: #d8d8d8;
        font-size: 14px;
      }
    }

    .easy-form-set-max-count {
      position: relative;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      margin-top: 10px;
      color: var(--easy-form-color-text-component-3);
      font-size: 14px;

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

      .easy-form-clear {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        margin: auto;
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
