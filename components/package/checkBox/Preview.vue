<template>
  <div class="easy-form-container-preview">
    <div class="easy-form-label">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-title">{{ title }}</div>
    </div>
    <div v-if="error" style="padding-top: 5px;" class="easy-form-error">{{ error }}</div>
    <div v-if="props.maxCount !== 0" class="easy-form-max-count">最多选择{{ props.maxCount }}项</div>
    <div class="easy-form-content">
      <div v-for="(item,index) in optionsList" :key="index" class="easy-form-select" @click="selectChecked(item)">
        <div
            :class="['easy-form-checked',item.checked ? 'easy-form-selected-checked' : '',item.disabled ? 'easy-form-disable-checked' : '']">
          <svg class="easy-form-icon" height="200" p-id="4259" t="1725517565197" version="1.1" viewBox="0 0 1024 1024"
               width="200" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M431.56 832.334c-20.505 0-40.192-8.093-54.833-22.734L232.181 665.055l-73.49-70.821c-19.088-18.396-19.651-48.782-1.255-67.871s48.782-19.649 67.871-1.256l74.444 71.752 129.435 129.436 363.619-514.333c15.303-21.647 45.258-26.79 66.903-11.485 21.646 15.304 26.789 45.257 11.485 66.903L494.981 799.523c-13.239 18.726-33.936 30.582-56.786 32.529a78.116 78.116 0 0 1-6.635 0.282z"
                fill="#ffffff" p-id="4260"></path>
          </svg>
        </div>
        <div :class="['easy-form-check-label',item.disabled ? 'easy-form-disable-checked' : '']">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, type PropType, ref} from "vue";
import {CheckConfigurationOptions} from "@/interface";

const props = defineProps({
  title: {
    type: String,
    default: '请选择以下选项 (多选)'
  },
  options: {
    type: Array as PropType<CheckConfigurationOptions[]>,
    default: () => [
      {
        id: 1,
        label: '选项1',
      },
      {
        id: 2,
        label: '选项2',
      }
    ]
  },
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  maxCount: {
    type: Number,
    default: 0
  },
  error: {
    type: String,
    default: ''
  }
})

const optionsList = ref(props.options?.map(option => ({...option, checked: false, disabled: false})))

const emit = defineEmits(['change', 'update:modelValue'])

const defaultValue = ref<string[]>([])
const bindValue = computed({
  get: () => props.modelValue.length === 0 ? defaultValue.value : props.modelValue,
  set: (value) => {
    defaultValue.value = value
    emit('update:modelValue', value)
  }
})

function selectChecked(item: CheckConfigurationOptions) {
  if (item.disabled) {
    return;
  }
  item.checked = !item.checked;
  if (props.maxCount !== 0) {
    if (optionsList.value?.filter(k => k.checked).length === props.maxCount) {
      optionsList.value?.filter(k => !k.checked).forEach(i => i.disabled = true)
    } else {
      optionsList.value?.filter(k => !k.checked).forEach(i => i.disabled = false)
    }
  }
  bindValue.value = optionsList.value?.filter(k => k.checked).map(v => v.label)
  emit('change', item)
}
</script>

<style lang="less" scoped>
.easy-form-container-preview {
  border-radius: var(--easy-form-border-radius-component);
  box-sizing: border-box;

  .easy-form-label {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    .easy-form-title {
      width: var(--easy-form-container-width);
      font-size: 14px;
      border: 1px dashed transparent;
      box-sizing: border-box;
    }
  }

  .easy-form-max-count {
    box-sizing: border-box;
    font-size: 12px;
    color: var(--easy-form-color-text-component-2);
    margin-top: 5px;
  }

  .easy-form-content {
    .easy-form-select {
      width: var(--easy-form-container-width);
      box-sizing: border-box;
      outline: none;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-top: 10px;

      &:nth-child(1) {
        margin-top: 5px;
      }

      .easy-form-checked {
        margin-top: 0;
        width: 15px;
        height: 15px;
        border: 1px solid var(--easy-form-border-color-component-1);
        border-radius: 3px;
        box-sizing: border-box;
        background: var(--easy-form-component-background);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s linear;

        .easy-form-icon {
          width: 12px;
          height: 12px;
          display: none;
          transition: all 0.2s linear;
        }

        &.easy-form-selected-checked {
          background: var(--easy-form-primary-background-component);
          border-color: var(--easy-form-primary-background-component);

          .easy-form-icon {
            display: inline-block;
          }
        }

        &.easy-form-disable-checked {
          border-color: var(--easy-form-disabled-border-component);
          background: var(--easy-form-disabled-bg-component);
          cursor: not-allowed;
        }
      }

      .easy-form-check-label {
        flex: 1;
        cursor: pointer;
        padding-left: 10px;

        &.easy-form-disable-checked {
          color: var(--easy-form-disabled-text-color-component);
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>