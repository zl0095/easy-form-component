<template>
  <div id="box" class="easy-form-box">
    <div style="display: flex;align-items: center;margin-bottom: 5px;">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-box-content">{{ title }}</div>
    </div>
    <div class="easy-form-error" v-if="error !== ''">{{ error }}</div>
    <div class="easy-form-input-container">
      <textarea rows="5" v-model="bindValue" class="easy-form-fill-input"
             :placeholder="placeholder"
             type="text"
             @blur="(e)=>emit('blur',bindValue,e)"
             @change="(e)=>emit('change',bindValue,e)"
             @input="(e)=>watchInput(bindValue,e)"
      ></textarea>
      <SvgIcon v-if="props.allowClear && bindValue !== ''" class="easy-form-clear" name="clear"
               @click="handleClear"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineEmits, ref} from 'vue'
import SvgIcon from "../../package/svg-icon/index.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '请填写本项内容'
  },
  defaultText: {
    type: String,
    default: ''
  },
  maxLength: {
    type: Number,
    default: 0
  },
  error: {
    type: String,
    default: ''
  },
  allowClear: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default:'请输入'
  }
})
const emit = defineEmits(['update:modelValue', 'blur', 'change', 'input']);

const bindValue = ref<string>(JSON.parse(JSON.stringify(props.modelValue)))

function watchInput(inputContent: string, event: Event) {
  if (props.maxLength > 0 && inputContent.length > parseInt(props.maxLength.toString(), 10)) {
    bindValue.value = inputContent
        .substring(0, parseInt(props.maxLength.toString(), 10));
  } else {
    bindValue.value = inputContent;
  }
  emit('update:modelValue', bindValue.value)
  emit('input', inputContent, event);
}

const handleClear = () => {
  bindValue.value = '';
  emit('update:modelValue', bindValue.value);
};
</script>
<style lang="less" scoped>
.easy-form-box {
  width: 100%;
  height: 100%;
  outline: none;

  .easy-form-box-content {
    border-radius: 6px;
    font-size: 14px;
  }

  .easy-form-input-container {
    position: relative;

    .easy-form-fill-input {
      width: 100%;
      padding: var(--easy-form-select-padding-component);
      background: var(--easy-form-input-bg-component-2);
      color: var(--easy-form-color-text-component-1);
      font-size: 14px;
      border: 1px dashed transparent;
      border-radius: 4px;
      box-sizing: border-box;
      resize: none;
      font-family: sans-serif;

      &:focus {
        border: 1px solid var(--easy-form-primary-background-component);
        outline: none;
        transition: border 0.3s ease;
      }
    }

    .easy-form-clear {
      width: 18px;
      height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;
      margin: auto;
      cursor: pointer;
    }
  }

  .easy-form-error {
    font-size: 12px;
    color: red;
    box-sizing: border-box;
    padding: 0 0 5px;
  }
}
</style>
