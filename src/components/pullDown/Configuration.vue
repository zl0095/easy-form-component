<template>
  <div id="box" :class="{ focused: isFocused }" class="box">
    <div class="label">
      <div class="serial-number">
        <slot name="serial"></slot>
      </div>
      <div class="fill-title-value">
        <input v-model="props.modelValue.title"
               :placeholder="props.modelValue.placeholder"
               class="box-content" type="text"
               @blur="(e) => (isFocused = false,emit('blurTitle',props.modelValue.title,e))"
               @focus="(e) => (isFocused = true,emit('focusTitle',props.modelValue.title,e))"
               @input="(e)=>watchTitle(props.modelValue.title,e)">
        <div class="error">{{ props.error }}</div>
      </div>
      <div class="operation">
        <slot name="operation"></slot>
      </div>
    </div>
    <VueDraggable ref="el" v-model="props.modelValue.options" :animation="150" handle=".handle">
      <div v-for="(item,index) in props.modelValue.options" :key="index" class="fillContent">
        <div class="input-with-icon">
          <div class="input-icon">
            <div class="pullDownInput">
              <img alt="" class="drag handle" src="../../assets/icons/drag.svg"
                   style="margin-top: 5px;margin-right: 5px">
              <div class="arrow">▼</div>
              <div class="input-box">
                <input v-model="item.label"
                       :name="item.label"
                       :placeholder="item.placeholder"
                       class="box-content fillNameContent"
                       @blur="(e) => watchBlur(item.label,index,e)"
                       @focus="(e) => (isFocused = true,emit('focus',item.label,index,e))"
                       @input="(e)=>watchInput(item,index,e)"
                >
                <img v-if="allowClear&&item.label!==''" alt="" class="clear" src="../../assets/icons/clear.svg"
                     @click="clearValue(item.id)">
              </div>
            </div>
          </div>
          <div class="setting">
            <slot name="setting"></slot>
          </div>
        </div>
      </div>
    </VueDraggable>
    <div class="add">
      <div class="add-item" @click="addOptions">
        <img alt="" class="icon" src="../../assets/icons/add.svg">
        <span>添加选项</span>
      </div>
      <slot name="add"></slot>
    </div>
    <div v-if="showTooltip" class="tooltip">标题不能重复，请重新输入。</div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, type PropType, ref} from 'vue'
import {VueDraggable} from "vue-draggable-plus";

const showTooltip = ref(false)
const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string,
      placeholder: string,
      options: Array<{ id: number, label: string, maxLength?: number, placeholder: string }>
    }>,
    default: () => ({
      title: '',
      placeholder: '',
      options: [{
        id: 1,
        label: '',
        maxLength: 20,
        placeholder: ''
      }, {
        id: 2,
        label: '',
        maxLength: 20,
        placeholder: ''
      }]
    })
  },
  maxLength: {
    type: [Number, String],
    default: ''
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['blur', 'focus', 'input', 'blurTitle', 'focusTitle', 'inputTitle'])
const error = ref('')

function watchTitle(title: string, event: Event) {
  if (title === '') {
    error.value = '标题不能为空。'
  } else {
    error.value = ''
    if (props.maxLength !== undefined && typeof props.maxLength === 'number' && title.length > props.maxLength) {
      props.modelValue.title = props.modelValue.title.substring(0, props.maxLength as number)
      emit('inputTitle', props.modelValue.title, event)
    }
  }

}
const isFocused = ref(false);
const maxLength = ref(20)

function watchInput(item: {
  label: string,
  maxLength?: number,
  placeholder: string
}, index: number, event: Event) {
  const obj = props.modelValue?.options.find(item => item.label === (event.target as HTMLInputElement).name)
  if (obj !== undefined && obj.maxLength !== undefined) {
    if (item.label.length > obj.maxLength) {
      item.label = item.label.substring(0, obj.maxLength)
    }
  }
  emit('input', item.label, index, event)
}

// 清除值的函数
const clearValue = (id: number) => {
  if (props.modelValue && props.modelValue.options) {
    const option = props.modelValue.options.find(value => value.id === id);
    if (option) {
      option.label = '';
    }
  }
};

// 选项blur事件
function watchBlur(label: string, index: number, event: Event) {
  isFocused.value = false
  if (props.modelValue.options.filter((item, indexs) => indexs !== index).some(item => item.label === label)) {
    showTooltip.value = true
    setTimeout(() => {
      showTooltip.value = false
      props.modelValue.options[index].label = ''
    }, 2000)
  }
  emit('blur', label, index, event)
}

// 添加项
function addOptions() {
  props.modelValue.options.push({
    id: parseInt(`${props.modelValue.options.length + 1}`, 10),
    label: `选项${props.modelValue.options.length + 1}`,
    placeholder: `这里是选项${props.modelValue.options.length + 1}的占位符`
  })
}
</script>
<style lang="less" scoped>
.focused {
  border-color: var(--easy-form-border-color-component-2) !important;
  transition: border 0.3s ease;
}

.box {
  width: 100%;
  height: 100%;
  background-color: var(--easy-form-component-background);
  padding: var(--easy-form-item-padding-component);
  outline: none;
  border: 1px solid transparent;
  border-radius: var(--easy-form-border-radius-component);
  .label{
    width: 70%;
    display: flex;

    .serial-number {
      width: 30px;
      margin: auto;
    }

    .fill-title-value {
      flex: 1;
    }
  }

  .input-icon {
    position: relative;


    .pullDownInput {
      display: flex;
      position: relative;

      .arrow{
        color: #ccc;
        margin-top: 10px;
        position: absolute;
        left: 26px;
        top: -1px;
      }
    }
  }
.input-box{
  width: 70%;
  position: relative;
  .clear {
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
    right: 23px;
    margin: auto;
    cursor: pointer;
  }
}
  .box-content.fillNameContent {
    padding-left: 30px;
  }

  .box-content {
    width: 100%;
    padding: var(--easy-form-select-padding-component);
    cursor: pointer;
    color: var(--easy-form-color-text-component-1);
    background: var(--easy-form-input-bg-component);
    font-size: 16px;
    border: 1px dashed transparent;
    border-radius: 4px;

    &:hover {
      border: 1px dashed #ccc;
    }

    &:focus {
      background: rgba(241, 243, 246, .5);
      border: 1px dashed transparent; // 当input获得焦点时，边框消失
      outline: none; // 移除浏览器默认的焦点轮廓
    }
  }

  .fill-input {
    overflow: hidden;
    box-sizing: border-box;
    padding: var(--easy-form-select-padding-component);
    background: rgba(241, 243, 246, .5);
    font-size: 14px;
    border: 1px dashed transparent;
  }

  .fillContent {
    margin-left: 25px;
    margin-bottom: 4px;
  }

  .error {
    font-size: 12px;
    color: red;
    padding: 2px 9px;
    box-sizing: border-box;
  }

  .tooltip {
    width: 400px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    box-shadow: var(--easy-form-boxshadow-component-1);
    border-radius: 5px;
    background: var(--easy-form-component-background);
    cursor: none;
    pointer-events: none;
  }

  .add {
    margin-left: 25px;
  }
}
</style>