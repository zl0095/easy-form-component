<template>
  <div id="box" class="easy-form-box">
    <div style="display: flex;align-items: center;margin-bottom: 5px;">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-box-content">{{ props.modelValue.title }}</div>
    </div>
    <div v-if="error !== ''" class="easy-form-error">{{ error }}</div>
    <div class="easy-form-input-container">
      <div class="easy-form-editable-content" style="margin-top: 5px;">
        <span v-for="(part, index) in parts" :key="index">
          <template v-if="part.text">
            {{ part.text }}
          </template>
          <template v-else-if="part.input">
            <input :placeholder="props.modelValue.placeholder"
                   :style="{ width: part.width?part.width+ 'px':'102px' }"
                   :type="part.type"
                   v-model="part.value"
                   class="easy-form-editable-input"
                   @input="handleInput(index, $event)"/>
          </template>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineEmits, defineProps, type PropType, ref} from 'vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      content: string;
      placeholder: string;
    }>,
    default: () => ({
      title: '请填写以下内容',
      content: '姓名___年龄___岁,联系方式___，地址_____',
      placeholder: '请输入'
    })
  },
  error: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue', 'blur', 'change', 'input']);

interface InputField {
  text?: string;
  input?: boolean;
  value?: string;
  type?: string;
  width?: string;
  label?: string;
}

const parts = ref<InputField[]>([]);

function splitContent() {
  const regex = /(\___+)|([^\_]+)/g;
  let match;
  parts.value = [];
  let lastText = '';

  while ((match = regex.exec(props.modelValue.content))) {
    if (match[0][0] !== '_') {
      lastText = match[0];
      parts.value.push({text: match[0] as string});
    } else {
      const width = 102 + ((match[0].length - 1) * 10);
      const label = lastText.replace(/[^a-zA-Z\u4e00-\u9fa5]/g, '');
      parts.value.push({
        input: true,
        value: '',
        type: 'text',
        width: width.toString(),
        label: label
      });
    }
  }
}

function handleInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    parts.value[index].value = target.value;
    const inputValues = parts.value.filter(part => part.input).map(part => ({
      label: part.label,
      value: part.value
    }));
    emit('update:modelValue', {
      title: props.modelValue.title,
      value: inputValues
    });
    console.log({
      title: props.modelValue.title,
      value: inputValues
    });
  }
}

splitContent();
</script>
<style lang="less" scoped>
.easy-form-editable-content {
  line-height: 50px;
}

.easy-form-editable-input {
  height: 36px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  margin:0 6px;
}

.easy-form-box {
  width: 100%;
  height: 100%;
  background-color: var(--easy-form-component-background);
  outline: none;
  border-radius: var(--easy-form-border-radius-component);

  .easy-form-box-content {
    border-radius: 6px;
    font-size: 14px;
  }

  .easy-form-input-container {
    position: relative;

    .easy-form-fill-input {
      width: 100%;
      box-sizing: border-box;
      height: 40px;
      padding: 10px 12px 10px 12px;
      background: rgba(241, 243, 246, .5);
      font-size: 14px;
      border: 1px dashed transparent;
      border-radius: 4px;

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
      background-color: rgba(241, 243, 246, .5);
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