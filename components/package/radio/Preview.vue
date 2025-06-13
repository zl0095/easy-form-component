<template>
  <div class="easy-form-container-preview">
    <div class="easy-form-label">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-title">{{ title }}</div>
    </div>
    <div v-if="error" class="easy-form-error">{{ error }}</div>
    <div :class="['easy-form-content', direction === 'vertical' ? '' : 'easy-form-row']">
      <div v-for="(item, index) in options" :key="index" class="easy-form-select"
           @click.prevent="selectRadio(item, index)">
        <div :class="['easy-form-radio', bindValue === item.label ? 'easy-form-selected-radio' : '']"></div>
        <div class="easy-form-radio-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, type PropType, ref} from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '请选择一个选项'
  },
  options: {
    type: Array as PropType<{ label: string }[]>,
    default: () => ([
      {
        label: '选项1'
      },
      {
        label: '选项2'
      }
    ])
  },
  modelValue: {
    type: String,
    default: '',
  },
  direction: {
    type: String,
    default: 'vertical',
  },
  error: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['change', 'update:modelValue']);
const defaultValue = ref<string>('');
const bindValue = computed<string>({
  get: () => props.modelValue === '' ? defaultValue.value : props.modelValue,
  set: (value) => {
    defaultValue.value = value;
    emit('update:modelValue', value);
  }
});

function selectRadio(item: { label: string }, index: number) {
  bindValue.value = item.label;
  emit('change', item, index);
}
</script>

<style lang="less" scoped>
.easy-form-container-preview {
  box-sizing: border-box;
  border-radius: var(--easy-form-border-radius-component);

  .easy-form-label {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    .easy-form-title {
      box-sizing: border-box;
      width: var(--easy-form-container-width);
      font-size: 14px;
      border: 1px dashed transparent;
      color: var(--easy-form-color-text-component-1);
    }
  }

  .easy-form-content {
    display: flex;
    flex-flow: column wrap;

    .easy-form-select {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: var(--easy-form-container-width);
      margin-top: 10px;
      font-size: 14px;
      outline: none;
      cursor: pointer;

      &:nth-child(1) {
        margin-top: 5px;
      }

      .easy-form-radio {
        box-sizing: border-box;
        width: 15px;
        height: 15px;
        margin-top: 0;
        margin-right: 10px;
        background: var(--easy-form-component-background);
        border: 1px solid var(--easy-form-border-color-component-1);
        border-radius: var(--easy-form-border-radio-radius-component);
        transition: all 0.2s linear;

        &.easy-form-selected-radio {
          background: #fff;
          border-color: var(--easy-form-primary-background-component);
          border-width: 5px;
        }
      }

      .easy-form-radio-label {
        flex: 1;
        cursor: pointer;
        color: var(--easy-form-color-text-component-1);
      }
    }

    &.easy-form-row {
      flex-direction: row;

      .easy-form-select {
        margin-right: 20px;
      }
    }
  }
}
</style>