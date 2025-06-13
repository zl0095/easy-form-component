<template>
  <div id="box" class="easy-form-box">
    <div style="display: flex;align-items: center;margin-bottom: 5px;"
         :style="{ color:isDisabled ? 'var(--easy-form-color-text-component-3)' : 'var(--easy-form-color-text-component-1)' }">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-box-content">{{ title }}</div>
    </div>
    <div class="easy-form-error" v-if="error !== ''">{{ error }}</div>
    <div class="easy-form-input-container">
      <input v-model="bindValue" class="easy-form-fill-input"
             :placeholder="placeholder"
             type="number"
             :min="0"
             :disabled="isDisabled"
             :style="{color : isDisabled ? 'var(--easy-form-color-text-component-2)' : 'var(--easy-form-color-text-component-1)'}"
             @blur="(e)=>emit('blur',bindValue,e)"
             @change="(e)=>(emit('change',bindValue,e))"
             @input="(e)=>watchInput(bindValue,e)"
      >
      <SvgIcon v-if="props.allowClear && bindValue !== undefined && !isDisabled" class="easy-form-clear" name="clear"
               @click="handleClear"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, defineEmits, PropType, ref} from 'vue'
import SvgIcon from "../../package/svg-icon/index.vue";

const props = defineProps({
  modelValue: {
    type: [Number, undefined] as PropType<number | undefined>,
    default: undefined
  },
  title: {
    type: String,
    default: '请填写本项内容'
  },
  error: {
    type: String,
    default: ''
  },
  allowClear: {
    type: Boolean,
    default: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default:'请输入'
  }
})
const emit = defineEmits(['update:modelValue', 'blur', 'change', 'input']);

const defaultValue = ref<number | undefined>(props.modelValue)

const bindValue = computed({
  get: () => props.modelValue ?? defaultValue.value,
  set: (value) => {
    defaultValue.value = value
    emit('update:modelValue', value)
  }
})

function watchInput(inputNumber: number | undefined, event: Event) {
  const inputString = inputNumber?.toString()
  if (inputString?.includes('.')) {
    const decimalIndex = inputString.indexOf('.')
    bindValue.value = parseFloat(inputString.slice(0, decimalIndex + 3))
  } else {
    bindValue.value = inputNumber
  }
  emit('input', bindValue.value, event);
}

const handleClear = () => {
  bindValue.value = undefined;
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
      height: 40px;
      padding: var(--easy-form-select-padding-component);
      background: var(--easy-form-input-bg-component-2);
      font-size: 14px;
      border: 1px dashed transparent;
      border-radius: 4px;
      box-sizing: border-box;
      margin-top: 5px;

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
}
</style>
