<template>
  <div id="box" :class="{ 'easy-form-focused': isFocused }" class="easy-form-box">
    <div class="easy-form-label">
      <div style="width: 70%;display: flex;align-items: center">
        <div class="easy-form-serial-number">
          <slot name="serial"></slot>
        </div>
        <div class="easy-form-fill-title-value">
          <input v-model="propsModelValue.title" placeholder="请输入下拉标题"
                 class="easy-form-title-input" type="text"
                 @blur="(e) => ((isFocused = false),(isShow = -2), emit('blurTitle', propsModelValue.title, e))"
                 @focus="(e) => ((isFocused = true),(isShow = -1),  emit('focusTitle', propsModelValue.title, e))"
                 @input="(e) => watchTitle(propsModelValue.title, e)" :disabled="isDisabled"/>
          <SvgIcon name="clear" v-if="allowClear && propsModelValue.title!=='' && isShow === -1" class="easy-form-clear"
                   @click="() => propsModelValue.title = ''"/>
        </div>
      </div>
      <div class="easy-form-operation">
        <slot name="operation"></slot>
      </div>
    </div>
    <VueDraggable v-if="propsModelValue.options.length > 0" ref="el" v-model="propsModelValue.options" :animation="150" handle=".handle" @ended="onDragEnd"
                  @end="()=>emit('update:modelValue',propsModelValue)">
      <div v-for="(item, index) in propsModelValue.options" :key="item.id" class="easy-form-fill-content">
        <SvgIcon name="drag" class="easy-form-drag handle" :width="18"/>
        <div class="easy-form-option">
          <SvgIcon :width="13" :height="13" name="arrow_down" color="#ccc" class="easy-form-arrow"/>
          <input :disabled="isDisabled" v-model="item.label" :name="item.label" placeholder="请输入下拉选择项"
                 class="easy-form-option-input fillNameContent"
                 @blur="(e) => watchBlur(item.label, Number(index), e)"
                 @focus="(e) => ((isFocused = true), emit('focus', item.label, index, e),isShow = index)"
                 @input="(e) => watchInput(item, Number(index), e)"/>
          <SvgIcon v-if="allowClear && item.label !== '' && isShow === index" class="easy-form-clear"
                   name="clear" @click="() => (item.label = '',emit('update:modelValue',propsModelValue))"/>
        </div>
        <div class="easy-form-settings" :style="{ opacity : index === isShow ? 1 : 0}">
          <SvgIcon style="cursor: pointer" name="reduce_active"
                   @click="()=>delOption(index)"
                   color="red" :width="20" :height="20"/>
          <slot name="setting"></slot>
        </div>
        <div class="setting-disabled" v-if="isDisabledShow">
          <Switch @change="() => emit('update:modelValue', propsModelValue)" v-model:checked="item.disabled"
                  size="small"/>
          <span class="disabled-text">是否不可选</span>
        </div>
      </div>
    </VueDraggable>
    <input v-else class="easy-form-fill-input" disabled :placeholder="propsModelValue.placeholder ? propsModelValue.placeholder : '请输入选项'" type="text">
    <div class="easy-form-add" v-if="isAddShow">
      <div class="easy-form-add-item" @click="addOptions">
        <SvgIcon name="add" class="easy-form-icon"/>
        <span>添加选项</span>
      </div>
      <slot name="add"></slot>
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
    <div v-if="showTooltip" class="easy-form-tooltip">标题不能重复，请重新输入。</div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, type PropType, ref} from 'vue';
import {VueDraggable} from 'vue-draggable-plus';
import {PullDownConfigurationOptions} from '../../interface';
import SvgIcon from "../../package/svg-icon/index.vue";
import Switch from "../../package/common/Switch.vue";

const showTooltip = ref(false);
const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      options: Array<PullDownConfigurationOptions>;
      required: boolean;
      error: string;
      placeholder:string
    }>,
    default: () => ({
      title: '请选择一个选项',
      options: [
        {
          id: 1,
          label: '选项1',
          disabled: false
        },
        {
          id: 2,
          label: '选项2',
          disabled: false
        },
      ],
      required: false,
      error: '',
      placeholder:'请选择'
    }),
  },
  allowClear: {
    type: Boolean,
    default: true,
  },
  isRequiredShow: {
    type: Boolean,
    default: true
  },
  isDisabledShow: {
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
  },
  isAddShow:{
    type:Boolean,
    default:true
  }
});
const emit = defineEmits(['blur', 'focus', 'input', 'blurTitle', 'focusTitle', 'inputTitle', 'update:modelValue']);
const errors = ref('');
const isShow = ref(-2)
const isFocused = ref(false);

const propsModelValue = ref<{
  title: string;
  options: Array<PullDownConfigurationOptions>;
  required: boolean;
  error: string;
  placeholder:string
}>(JSON.parse(JSON.stringify(props.modelValue)))

const onDragEnd = (event) => {
  const {oldIndex, newIndex} = event;
  if (oldIndex !== newIndex) {
    const newOptions = [...props.modelValue.options];
    const [movedItem] = newOptions.splice(oldIndex, 1);
    newOptions.splice(newIndex, 0, movedItem);
    emit('update:modelValue', {...props.modelValue, options: newOptions});
  }
};

function delOption(index: number) {
  propsModelValue.value.options.splice(index, 1)
  propsModelValue.value.options.forEach((option, optionIndex) => {
    option.id = optionIndex + 1
  })
  emit('update:modelValue', propsModelValue.value)
}

function watchTitle(title: string, event: Event) {
  if (title === '') {
    errors.value = '标题不能为空。';
  } else {
    errors.value = '';
    emit('update:modelValue', propsModelValue.value)
    emit('inputTitle', propsModelValue.value.title, event);
  }
}


function watchInput(
    item: {
      id: number;
      label: string;
    },
    index: number,
    event: Event
) {
  emit('update:modelValue', propsModelValue.value);
  emit('input', item.label, index, event);
}

// 选项blur事件
function watchBlur(label: string, index: number, event: Event) {
  isFocused.value = false;
  if (props.modelValue.options.filter((item: PullDownConfigurationOptions, indexs: number) => indexs !== index).some((item: PullDownConfigurationOptions) => item.label === label)) {
    showTooltip.value = true;
    setTimeout(() => {
      showTooltip.value = false;
      props.modelValue.options[index].label = '';
    }, 2000);
  }
  emit('blur', label, index, event);
}

// 添加项
function addOptions() {
  propsModelValue.value.options.push({
    id: parseInt(`${props.modelValue.options.length + 1}`, 10),
    label: `选项${props.modelValue.options.length + 1}`,
    disabled: false
  });
  emit('update:modelValue', propsModelValue.value);
}
</script>

<style lang="less" scoped>
.easy-form-focused {
  border-color: var(--easy-form-border-color-component-2) !important;
  transition: border-color 0.2s linear;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .easy-form-serial-number {
      width: 35px;
      margin: auto;
    }

    .easy-form-fill-title-value {
      flex: 1;
      position: relative;

      .easy-form-title-input {
        width: 100%;
        padding: var(--easy-form-select-padding-component);
        color: var(--easy-form-color-text-component-1);
        font-size: 16px;
        background: var(--easy-form-input-bg-component);
        border: 1px dashed transparent;
        border-radius: 4px;
        box-sizing: border-box;
        outline: none;

        &:hover {
          border: 1px dashed #ccc;
        }

        &:focus {
          background: var(--easy-form-input-select-background-component) !important;
          border: 1px dashed transparent;
          outline: none;
        }
      }
    }
  }

  .easy-form-fill-input{
    width: calc(70% - 35px);
    margin-left: 35px;
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

  .easy-form-fill-content {
    width: calc(70% - 35px);
    margin-left: 35px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .easy-form-option {
      flex: 1;
      position: relative;

      .easy-form-arrow {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 10px;
        margin: auto;
      }

      .easy-form-option-input {
        width: 100%;
        padding: var(--easy-form-select-padding-component);
        color: var(--easy-form-color-text-component-1);
        font-size: 16px;
        background: var(--easy-form-input-bg-component);
        border: 1px dashed transparent;
        border-radius: 4px;
        box-sizing: border-box;
        padding-left: 33px;

        &:hover {
          border: 1px dashed #ccc;
        }

        &:focus {
          background: var(--easy-form-input-select-background-component) !important;
          border: 1px dashed transparent; // 当input获得焦点时，边框消失
          outline: none; // 移除浏览器默认的焦点轮廓
        }
      }
    }

    &:hover {
      .easy-form-settings {
        opacity: 1 !important;
      }
    }

    .easy-form-settings {
      margin-left: 5px;
      width: 20px;
      height: 20px;
    }

    .setting-disabled {
      display: flex;
      align-items: center;
      margin-left: 4px;

      .disabled-text {
        font-size: 12px;
        color: var(--easy-form-color-text-component-1);
        margin-left: 4px;
      }
    }
  }

  .easy-form-error {
    box-sizing: border-box;
    padding: 2px 9px;
    color: red;
    font-size: 12px;
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

  .easy-form-add {
    margin-left: 35px;
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

  .easy-form-clear {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    margin: auto;
  }
}
</style>
