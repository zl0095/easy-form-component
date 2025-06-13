<template>
  <div id="box" :class="{ 'easy-form-focused': isFocused }" class="easy-form-box">
    <div class="easy-form-label">
      <div class="easy-form-fill-title">
        <div class="easy-form-title-left">
          <div class="easy-form-serial-number">
            <slot name="serial"></slot>
          </div>
          <div class="easy-form-fill-title-value">
            <input v-model="propsModelValue.title" placeholder="请填写本项内容"
                   class="easy-form-box-content easy-form-title-input"
                   type="text"
                   @blur="(e) => (isFocused = false,emit('blurTitle',propsModelValue.title,e))"
                   @focus="(e) => (isFocused = true,emit('focusTitle',propsModelValue.title,e))"
                   @input="(e)=>watchTitleInput(e)"
                   :disabled="isDisabled"
            >
            <SvgIcon v-if="allowClear && propsModelValue.title !== ''" class="easy-form-clear" name="clear"
                     @click="handleClear"/>
          </div>
        </div>
        <div class="easy-form-operation">
          <slot name="operation"></slot>
        </div>
      </div>
      <input class="easy-form-fill-input" disabled :placeholder="propsModelValue.placeholder ? propsModelValue.placeholder : '填写者内容输入区'" type="text">
    </div>
    <p class="easy-form-set-switch" v-if="isPlaceholderShow">
      <span class="easy-form-tit">提示文字</span>
      <input type="text" v-model="propsModelValue.placeholder" placeholder="请输入提示文字" class="easy-form-placeholder">
    </p>
    <p class="easy-form-set-switch" v-if="isRequiredShow">
      <span class="easy-form-tit">是否必填</span>
      <Switch size="small" @change="()=>emit('update:modelValue',propsModelValue)"
              v-model:checked="propsModelValue.required"></Switch>
    </p>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, PropType, ref} from 'vue'
import SvgIcon from "../../package/svg-icon/index.vue";
import Switch from "../../package/common/Switch.vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<{ title: string; required: boolean; error: string;placeholder:string }>,
    default: () => ({
      title: '请填写本项内容',
      required: false,
      error: '',
      placeholder:'请输入'
    })
  },
  isRequiredShow: {
    type: Boolean,
    default: true
  },
  allowClear: {
    type: Boolean,
    default: true
  },
  isDisabled:{
    type:Boolean,
    default:false
  },
  isPlaceholderShow:{
    type: Boolean,
    default:true
  }
})

const emit = defineEmits(['update:modelValue', 'blurTitle', 'focusTitle', 'inputTitle'])
const isFocused = ref(false);
const propsModelValue = ref<{ title: string, required: boolean;error:string;placeholder:string }>(JSON.parse(JSON.stringify(props.modelValue)))

function watchTitleInput(event: Event) {
  emit('update:modelValue', propsModelValue.value)
  emit('inputTitle', propsModelValue.value, event)
}

const handleClear = () => {
  propsModelValue.value.title = '';
  emit('update:modelValue', '');
};
</script>
<style lang="less" scoped>
.easy-form-focused {
  border-color: var(--easy-form-border-color-component-2) !important;
  transition: border 0.3s ease;
}

.easy-form-box {
  width: 100%;
  height: 100%;
  padding: var(--easy-form-item-padding-component);
  background-color: var(--easy-form-component-background);
  border: 1px solid transparent;
  border-radius: var(--easy-form-border-radius-component);
  outline: none;
  box-shadow: 0 6px 12px 0 rgb(0 0 0 / 10%);

  .easy-form-label {
    width: 100%;
  }

  .easy-form-set-switch {
    width: calc(70% - 35px);

    .easy-form-placeholder{
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
  }

  .easy-form-fill-title {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .easy-form-title-left {
      width: 70%;
      display: flex;
      align-items: center;

      .easy-form-serial-number {
        width: 35px;
      }

      .easy-form-fill-title-value {
        flex: 1;
        width: 100%;
        display: flex;
        position: relative;

        .input-container {
          width: 100%;
        }
      }
    }


  }

  .easy-form-box-content {
    width: 100%;
    padding: var(--easy-form-select-padding-component);
    color: var(--easy-form-color-text-component-1);
    font-size: 16px;
    background: var(--easy-form-input-bg-component);
    border: 1px dashed transparent;
    border-radius: 4px;

    &:hover {
      border: 1px dashed #ccc;
    }

    &:focus {
      background: rgb(241 243 246 / 50%);
      border: 1px dashed transparent;
      outline: none;
    }
  }

  .easy-form-fill-input {
    box-sizing: border-box;
    width: calc(70% - 35px);
    margin-top: 5px;
    margin-left: 35px;
    padding: 10px 12px;
    overflow: hidden;
    font-size: 14px;
    background: var(--easy-form-input-bg-component-2);
    border: 1px dashed transparent;
    border-radius: 4px;
  }

  .easy-form-error {
    box-sizing: border-box;
    padding: 5px 33px;
    color: red;
    font-size: 12px;
  }
}
</style>