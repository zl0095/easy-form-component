<template>
  <div :class="['easy-form-container', showBorder ? 'easy-form-container-active' : '']">
    <div class="easy-form-container-title">
      <div class="easy-form-title-left">
        <div class="easy-form-label">
          <div class="easy-form-serial-number">
            <slot name="serial"></slot>
          </div>
          <input v-model="titles"
                 :class="['easy-form-title', showBorder && showBackground === 1 ? 'easy-form-active' : '']"
                 placeholder="请输入多级下拉标题" name="title"
                 @blur="(e) => ((showBorder = false), (showBackground = 1), emit('blurTitle', titles, e))"
                 @focus="(e) => ((showBorder = true), (showBackground = 1), emit('focusTitle', titles, e))"
                 @input="(e) => watchTitleInput(titles, e)"/>
          <div class="easy-form-clear">
            <SvgIcon name="clear" v-if="showBackground === 1 && allowClear && titles !== ''" class="easy-form-clear-img"
                     @click.stop.prevent="() => (titles = '')"/>
          </div>
        </div>
      </div>
      <div class="easy-form-operation">
        <slot name="operation"></slot>
      </div>
    </div>
    <div class="easy-form-content">
      <div class="easy-form-select-container">
        <div class="easy-form-select-container">
          <div v-for="(l, index) in maxLength" :key="index" class="easy-form-select-item"
               @click.stop="() => selected(l, index)">
            <div class="easy-form-select-value">
              <input v-model="selectedCon[index]" :disabled="options[index]?.length === 0"
                     :placeholder="options[index]?.length > 0 && !selectedCon[index] ? '请选择' : '暂无数据'"
                     class="easy-form-value" readonly type="text"/>
              <SvgIcon :class="['easy-form-arrow-down']" :height="15" :width="15" name="arrow_down"></SvgIcon>
            </div>
            <div
                :class="['easy-form-select-options', options[index]?.length > 0 && showSelect && index === current ? 'easy-form-select-options-active' : '']">
              <div v-for="(item, v1) in options[index]" :key="v1" class="easy-form-select-option"
                   @click.stop="select(item, index)">
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="easy-form-add">
        <div class="easy-form-add-item" @click="() => modal.show()">
          <SvgIcon :height="15" :width="15" class="easy-form-icon" color="#1677ff" name="edit_evaluate"></SvgIcon>
          <span>编辑选项</span>
        </div>
        <slot name="add"></slot>
      </div>
    </div>
    <p class="easy-form-set-switch" v-if="isPlaceholderShow">
      <span class="easy-form-tit">提示文字</span>
      <input type="text" v-model="propsModelValue.placeholder" placeholder="请输入提示文字" class="easy-form-placeholder">
    </p>
    <p class="easy-form-set-switch" v-if="isRequiredShow">
      <span class="easy-form-tit">是否必填</span>
      <Switch @change="()=>emit('update:modelValue',propsModelValue)" size="small"
              v-model:checked="propsModelValue.required"></Switch>
    </p>
  </div>
  <Modal ref="modal" v-model:options="propsModelValue.options"></Modal>
</template>

<script lang="ts" setup>
import {computed, defineProps, type PropType, ref, watch} from 'vue';
import {ChildrenArr, MultiplePullDownConfigurationOptions} from '@/interface';
import SvgIcon from "../../package/svg-icon/index";
import Modal from './Modal.vue';
import Switch from "../../package/common/Switch.vue";

const showBorder = ref(false);
const showBackground = ref(0);
const props = defineProps({
  modelValue: {
    type: Object as PropType<MultiplePullDownConfigurationOptions>,
    default: () => ({
      title: '请选择以下选项',
      options: [
        {
          label: '请选择',
        },
        {
          label: '测试1',
          children: [
            {
              label: '测试1-1',
            },
            {
              label: '测试2-2',
            },
          ],
        },
      ],
      required: false,
      error: '',
      placeholder:'请选择'
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
  isPlaceholderShow:{
    type: Boolean,
    default:true
  }
});
const emit = defineEmits(['blurTitle', 'focusTitle', 'inputTitle', 'update:modelValue']);
const propsModelValue = ref(JSON.parse(JSON.stringify(props.modelValue)));
const titles = ref(props.modelValue.title);
const modal = ref();
const options = ref([propsModelValue.value.options]);
const showSelect = ref(false);
const current = ref(-1);
const selectedCon = ref<string[]>([]);

interface labelArr {
  label?: string;
  children?: labelArr[];
}

function clearDelete(data: ChildrenArr[]) {
  data.forEach((item) => {
    delete item.delete;
    if (item.children && Array.isArray(item.children)) {
      clearDelete(item.children);
    }
  });
  return data;
}

watch(
    () => propsModelValue.value.options,
    (newValue, oldValue) => {
      if (oldValue !== newValue) {
        options.value[0] = JSON.parse(JSON.stringify(clearDelete(newValue)));
        emit('update:modelValue', propsModelValue.value);
      }
    },
    {deep: true}
);

function getMaxDepth(data: labelArr[]): number {
  // 定义一个辅助函数来计算深度
  function getDepth(items: labelArr[], currentDepth: number): number {
    let maxDepth = currentDepth;
    if (items) {
      items.forEach((item) => {
        if (item.children && Array.isArray(item.children) && item.children.length > 0) {
          const childDepth = getDepth(item.children, currentDepth + 1);
          maxDepth = Math.max(maxDepth, childDepth);
        }
      });
    }

    return maxDepth;
  }

  // 从初始深度 1 开始计算
  return getDepth(data, 1);
}

const maxLength = computed(() => getMaxDepth(props.modelValue.options));

function watchTitleInput(title: string, event: Event) {
  emit('update:modelValue', propsModelValue.value);
  emit('inputTitle', titles.value, event);
}

document.addEventListener('click', function () {
  showSelect.value = false;
});

function select(item: ChildrenArr, index: number) {
  if (selectedCon.value[index]) {
    selectedCon.value[index] = item.label;
  } else {
    selectedCon.value.push(item.label);
  }
  options.value.splice(index + 1);
  options.value.push(item.children);
  selectedCon.value.splice(index + 1);
  showSelect.value = false;
}

function selected(l: number, index: number) {
  if (l === current.value + 1) {
    showSelect.value = !showSelect.value;
  } else {
    showSelect.value = true;
  }
  current.value = index;
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
          margin: auto;
        }

        .easy-form-title {
          box-sizing: border-box;
          width: 100%;
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
    width: calc(100% - 35px);
    margin-top: 10px;
    margin-left: 35px;

    .easy-form-select-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;

      .easy-form-select-item {
        position: relative;
        box-sizing: border-box;
        width: 260px;
        margin-right: 10px;
        margin-bottom: 10px;
        padding: var(--easy-form-input-padding);

        &:nth-last-child(1) {
          margin-right: 0;
        }

        .easy-form-select-value {
          position: relative;
          width: 100%;
          height: 38px;
          border-radius: var(--easy-form-border-radius-component-1);

          .easy-form-value {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            padding: var(--easy-form-select-padding-component);
            font-size: 14px;
            background: var(--easy-form-background-component-7);
            border: none;
            border-radius: var(--easy-form-border-radius-component-1);
            outline: none;
            cursor: pointer;
          }

          .easy-form-arrow-down {
            position: absolute;
            top: 0;
            right: 10px;
            bottom: 0;
            margin: auto;
          }
        }

        .easy-form-select-options {
          position: absolute;
          top: 38px;
          left: 0;
          box-sizing: border-box;
          width: 100%;
          max-height: 500px;
          padding: 6px 0;
          overflow-y: auto;
          background: var(--easy-form-component-background);
          border: 1px solid #d8d8d8;
          border-radius: var(--easy-form-border-radius-component-1);
          cursor: none;
          opacity: 0;
          transition: opacity 0.3s linear;
          pointer-events: none;
          z-index: 10;

          &-active {
            cursor: pointer;
            opacity: 1;
            pointer-events: all;
          }

          &::-webkit-scrollbar {
            width: 5px;
          }

          .easy-form-select-option {
            box-sizing: border-box;
            height: 36px;
            padding: 0 12px;
            overflow: hidden;
            line-height: 36px;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            color: var(--easy-form-color-text-component-1);

            &:hover {
              background: var(--easy-form-input-bg-component-3);
            }

            &-active {
              color: var(--easy-form-primary-background-component);
            }
          }
        }
      }
    }
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
}

.easy-form-active {
  background: var(--easy-form-input-select-background-component) !important;
  border-color: transparent !important;
}
</style>
