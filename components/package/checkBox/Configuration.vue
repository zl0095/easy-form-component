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
          <div class="easy-form-clear" @click.stop="() => (propsModelValue.title = '')">
            <SvgIcon name="clear" v-if="showBackground === 1 && props.allowClear && modelValue.title !== ''"
                     class="easy-form-clear-img"/>
          </div>
        </div>
      </div>
      <div class="easy-form-operation">
        <slot name="operation"></slot>
      </div>
    </div>
    <div class="easy-form-content">
      <VueDraggable ref="el" v-model="propsModelValue.options" :animation="150" handle=".handle"
                    @end="()=>emit('update:modelValue',propsModelValue)">
        <div v-for="(item, index) in propsModelValue.options" :key="item.id">
          <div class="easy-form-option-container">
            <SvgIcon class="easy-form-drag handle" name="drag"/>
            <div class="easy-form-option-label">
              <div class="easy-form-button"></div>
              <input v-model="item.label"
                     :class="['easy-form-content-item', showBorder && showBackground === index + 2 ? 'easy-form-active' : '']"
                     :name="item.label" placeholder="请输入选择项" class="easy-form-option-item"
                     @blur="(e) => watchBlur(item.label, index, e)"
                     @focus="(e) => ((showBorder = true), (showBackground = index + 2), emit('focus', item.label, index, e))"
                     @input="(e) => watchInput(item, index, e)"/>
              <div class="easy-form-clear">
                <SvgIcon name="clear" v-if="showBackground === index + 2 && props.allowClear && item.label !== ''"
                         class="easy-form-clear-img" @click.stop="() => (propsModelValue.options[index].label = '')"/>
              </div>
            </div>
            <div class="easy-form-setting" :style="{ opacity : showBackground === index + 2 ? 1 : 0}">
              <SvgIcon style="cursor: pointer" name="reduce_active" @click="()=>delOption(index)" color="red"
                       :width="20" :height="20"/>
              <slot name="setting"></slot>
            </div>
          </div>
        </div>
      </VueDraggable>
      <div class="easy-form-add">
        <div class="easy-form-add-item" @click="addOptions">
          <SvgIcon name="add" class="easy-form-icon"/>
          <span>添加选项</span>
        </div>
        <slot name="add"></slot>
      </div>
      <div class="easy-form-container-title" style="margin-top: 10px">
        <div class="easy-form-title-left" style="width: 100%">
          <div class="easy-form-max-count">最多选择项个数（注：只能输入正整数，0代表不限制选择个数。）</div>
          <div class="easy-form-label">
            <input v-model="propsModelValue.maxCount" :min="0"
                   style="width: 100%;background: var(--easy-form-input-bg-component-2)" type="number"
                   :class="['easy-form-title', showBorder && showBackground === propsModelValue.options.length + 2 ? 'easy-form-active' : '']"
                   placeholder="请输入最多选择项个数" name="title"
                   @blur="() => ((showBorder = false), (showBackground = propsModelValue.options.length + 2), blurMaxCount())"
                   @focus="() => ((showBorder = true), (showBackground = propsModelValue.options.length + 2))"
                   @input="()=>watchNumber(propsModelValue.maxCount)"/>
            <div class="easy-form-clear" @click.stop="() => (propsModelValue.maxCount = 0)">
              <SvgIcon name="clear"
                       v-if="showBackground === propsModelValue.options.length + 2 && props.allowClear && modelValue.title !== ''"
                       class="easy-form-clear-img"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="easy-form-set-switch" v-if="isRequiredShow">
      <span class="easy-form-tit">是否必填</span>
      <Switch size="small" @change="()=>emit('update:modelValue',propsModelValue)"
              v-model:checked="propsModelValue.required"></Switch>
    </p>
    <div v-if="showTooltip" class="easy-form-tooltip">选项值不能重复，请重新输入。</div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, type PropType, ref} from 'vue';
import {VueDraggable} from 'vue-draggable-plus';
import SvgIcon from '../../package/svg-icon/index.vue'
import {CheckConfigurationOptions} from '../../interface';
import Switch from "../../package/common/Switch.vue";

const showBorder = ref(false);
const showBackground = ref(0);
const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      options: Array<CheckConfigurationOptions>;
      maxCount: number | undefined;
      required: boolean;
      error: string
    }>,
    default: () => ({
      title: '请选择以下选项 (多选)',
      options: [
        {
          id: 1,
          label: '选项1',
        },
        {
          id: 2,
          label: '选项2',
        },
      ],
      maxCount: undefined,
      required: false,
      error: ''
    }),
  },
  allowClear: {
    type: Boolean,
    default: true
  },
  isRequiredShow: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['blur', 'focus', 'input', 'blurTitle', 'focusTitle', 'inputTitle', 'update:modelValue']);
const showTooltip = ref(false);

const propsModelValue = ref<{
  title: string;
  options: Array<CheckConfigurationOptions>;
  maxCount: number | undefined;
  required: boolean
}>(JSON.parse(JSON.stringify(props.modelValue)));

// 选项input事件
function watchInput(
    item: CheckConfigurationOptions,
    index: number,
    event: Event
) {
  emit('update:modelValue', propsModelValue.value);
  emit('input', item.label, index, event);
}

function blurMaxCount() {
  if (propsModelValue.value.maxCount && propsModelValue.value.maxCount % 1 !== 0) {
    propsModelValue.value.maxCount = parseInt(propsModelValue.value.maxCount.toString(), 10);
  }
}

function delOption(index: number) {
  propsModelValue.value.options.splice(index, 1)
  propsModelValue.value.options.forEach((option, optionIndex) => {
    option.id = optionIndex + 1
  })
  emit('update:modelValue', propsModelValue.value)
}

// 选项blur事件
function watchBlur(label: string, index: number, event: FocusEvent) {
  showBorder.value = false;
  showBackground.value = index + 2;
  if (propsModelValue.value.options.filter((item: CheckConfigurationOptions, indexs: number) => indexs !== index).some((item: CheckConfigurationOptions) => item.label === label)) {
    showTooltip.value = true;
    setTimeout(() => {
      showTooltip.value = false;
      propsModelValue.value.options[index].label = '';
    }, 2000);
  }
  emit('blur', label, index, event);
}

// title的input事件
function watchTitleInput(title: string, event: Event) {
  emit('update:modelValue', propsModelValue.value);
  emit('inputTitle', propsModelValue.value.title, event);
}

function watchNumber(value: number | undefined) {
  const index = value?.toString().indexOf('.')
  if (value?.toString().includes('.')) {
    propsModelValue.value.maxCount = parseInt(value?.toString().slice(0, index), 10)
  }
}

// 添加选项
function addOptions() {
  const newOptions = propsModelValue.value;
  newOptions.options.push({
    id: parseInt(propsModelValue.value.options.length.toString(), 10) + 1,
    label: `选项${propsModelValue.value.options.length + 1}`,
  });
  propsModelValue.value = newOptions;
  emit('update:modelValue', propsModelValue.value);
}
</script>

<style lang="less" scoped>
.easy-form-container {
  position: relative;
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
    white-space: wrap;

    .easy-form-title-left {
      width: 70%;

      .easy-form-max-count {
        box-sizing: border-box;
        font-size: 12px;
        color: var(--easy-form-color-text-component-2);
        margin: 5px 0 10px;
        width: 100%;
      }

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
          flex: 1;
          box-sizing: border-box;
          padding: var(--easy-form-select-padding-component);
          color: var(--easy-form-color-text-component-1);
          font-size: 14px;
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
    width: calc(70% - 35px);
    margin-left: 35px;

    .easy-form-option-container {
      display: flex;
      align-items: center;
      margin-top: 5px;

      .easy-form-setting {
        display: flex;
        align-items: center;
        opacity: 0;
        margin-left: 5px;
      }

      &:hover {
        .setting {
          opacity: 1 !important;
        }
      }

      .easy-form-option-label {
        position: relative;
        flex: 1;

        .easy-form-button {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 10px;
          width: 16px;
          height: 16px;
          margin: auto;
          background: rgb(229 231 241);
          border-radius: 50%;
        }

        .easy-form-content-item {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
          padding: var(--easy-form-select-padding-component);
          padding-left: 36px;
          color: var(--easy-form-color-text-component-1);
          font-size: 14px;
          background: var(--easy-form-input-bg-component);
          border: 1px dashed transparent;
          border-radius: var(--easy-form-border-radius-component-1);
          outline: none;
          cursor: text;

          &:hover {
            border-color: #aaa;
          }

          .easy-form-option-item {
            width: 100%;
            margin-left: 10px;
            font-size: 14px;
            border: none;
            outline: none;
          }
        }
      }
    }
  }

  .easy-form-tooltip {
    position: absolute;
    inset: 0;
    box-sizing: border-box;
    width: 400px;
    height: 40px;
    margin: auto;
    line-height: 40px;
    text-align: center;
    background: var(--easy-form-component-background);
    border-radius: 5px;
    box-shadow: var(--easy-form-boxshadow-component-1);
    cursor: none;
    pointer-events: none;
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
