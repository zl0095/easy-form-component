<template>
  <div class="easy-form-container-preview">
    <div class="easy-form-label">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-title">{{ title }}</div>
    </div>
    <div v-if="error" class="easy-form-error">{{ error }}</div>
    <TransitionGroup class="easy-form-transition-container easy-form-content" name="fade" tag="div">
      <div v-for="(item, index) in initOptions" :key="item.label" class="easy-form-select"
           @click.prevent="sort(item, index)">
        <div :class="['easy-form-radio', item.checked ? 'easy-form-selected-radio' : '']">
          <span v-if="item.checked" class="easy-form-num">{{ index + 1 }}</span>
        </div>
        <div class="easy-form-radio-label">{{ item.label }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import {type PropType, ref} from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '请给以下选项排序',
  },
  options: {
    type: Array as PropType<{ label: string }[]>,
  },
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  error: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['change', 'update:modelValue']);

const initOptions = ref<{
  label: string;
  checked: boolean
}[]>(JSON.parse(JSON.stringify(props.options?.map((option) => ({label: option.label, checked: false})))));

function findLastIndex(arr: { label: string; checked: boolean }[], predicate: any) {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (predicate(arr[i])) {
      return i;
    }
  }
  return -1;
}

function sort(item: { label: string; checked: boolean }, index: number) {
  if (item.checked) {
    initOptions.value?.splice(index, 1);
    initOptions.value?.push(item);
  } else {
    initOptions.value?.splice(index, 1);
    const lastIndex = findLastIndex(initOptions.value ?? [], (n: any) => n.checked);
    initOptions.value?.splice(lastIndex + 1, 0, item);
  }
  item.checked = !item.checked;
  emit(
      'update:modelValue',
      initOptions.value?.filter((option: { label: string; checked: boolean }) => option.checked).map((option: {
        label: string;
        checked: boolean
      }) => option.label)
  );
  emit('change', item, index);
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

  .easy-form-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    &.easy-form-transition-container {
      position: relative;
      padding: 0;
      list-style-type: none;

      .easy-form-select {
        width: var(--easy-form-container-width);
        margin-top: 10px;
        box-sizing: border-box;
        outline: none;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;

        &:nth-child(1) {
          margin-top: 5px;
        }

        .easy-form-radio {
          margin-top: 0;
          margin-right: 10px;
          width: 17px;
          height: 17px;
          border-radius: var(--easy-form-border-radio-radius-component);
          box-sizing: border-box;
          transition: all 0.2s linear;
          background: #eff1f4;
          display: flex;
          align-items: center;
          justify-content: center;

          &.easy-form-selected-radio {
            background: var(--easy-form-primary-background-component);
          }

          .easy-form-num {
            font-size: 12px !important;
            color: #ffffff !important;
          }
        }

        .easy-form-radio-label {
          flex: 1;
          cursor: pointer;
        }
      }
    }
  }
}

/* 1. 声明过渡效果 */

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
    以便正确地计算移动时的动画效果。 */

.fade-leave-active {
  position: absolute;
}
</style>
