<template>
  <div id="box" :class="{ 'easy-form-focused': isFocused }" class="easy-form-box">
    <div class="easy-form-content">
      <div class="easy-form-content-left">
        <div class="easy-form-serial-number">
          <slot name="serial"></slot>
        </div>
        <div class="easy-form-fill-title-value">
          <input v-model="propsModelValue.title"
                 placeholder="请输入"
                 class="easy-form-box-content easy-form-title-input"
                 name="title"
                 type="text"
                 @blur="(e) => (isFocused = false,emit('blurTitle',propsModelValue.title,e))"
                 @focus="(e) => (isFocused = true,emit('focusTitle',propsModelValue.title,e))"
                 @input="(e)=>watchTitle(e)"
          >
          <SvgIcon name="clear" v-if="allowClear && propsModelValue.title!==''" class="easy-form-clear"
                   @click="() => propsModelValue.title = ''"/>
        </div>
      </div>
      <div class="easy-form-operation">
        <slot name="operation"></slot>
      </div>
    </div>
    <VueDraggable ref="el" v-model="propsModelValue.options" :animation="150" handle=".handle"
                  @end="()=>emit('update:modelValue',propsModelValue)">
      <div v-for="(item,index) in propsModelValue.options" :key="index" class="easy-form-fill-content-container">
        <div class="easy-form-fill-content">
          <div class="easy-form-fill-content-input">
            <SvgIcon name="drag" class="easy-form-drag handle"/>
            <input v-model="item.label"
                   :name="item.label"
                   placeholder="请输入"
                   class="easy-form-box-content easy-form-fill-name-content"
                   @blur="(e) => (watchBlur(item.label,index,e))"
                   @focus="(e) => (isFocused = true,emit('focus',item.label,index,e),isShow = index)"
                   @input="(e)=>watchInput(item,index,'input',e)"
            />
            <SvgIcon name="clear" v-if="allowClear && item.label!==''" class="easy-form-clear"
                     @click="clearValue(item.id)"/>
            <div class="easy-form-settings" :style="{ opacity : index === isShow ? 1 : 0}">
              <SvgIcon style="margin-left: 5px;cursor: pointer" name="reduce_active"
                       @click="()=>delOption(index)"
                       color="red" :width="20" :height="20"/>
              <slot name="setting"></slot>
            </div>
          </div>
          <div class="easy-form-setting">
            <slot name="setting"></slot>
          </div>
        </div>
        <input class="easy-form-fill-input" disabled :placeholder="item.placeholder && (item.placeholder !== '') ? item.placeholder : '填写者内容输入区'" type="text"/>
        <p style="margin-left: 0;width: 100%" class="easy-form-set-switch" v-if="isPlaceholderShow">
          <span class="easy-form-tit">提示文字</span>
          <input @input="(e)=>watchInput(item,index,'placeholder',e)" type="text" v-model="item.placeholder" placeholder="请输入提示文字" class="easy-form-placeholder">
        </p>
      </div>
    </VueDraggable>
    <div class="easy-form-add">
      <div class="easy-form-add-item" @click="addOptions">
        <SvgIcon name="add" class="easy-form-icon"/>
        <span>添加选项</span>
      </div>
      <slot name="add"></slot>
    </div>
    <p class="easy-form-set-switch" v-if="isRequiredShow">
      <span class="easy-form-tit">是否必填</span>
      <Switch @change="()=>emit('update:modelValue',propsModelValue)" size="small"
              v-model:checked="propsModelValue.required"></Switch>
    </p>
    <div v-if="showTooltip" class="easy-form-tooltip">标题不能重复，请重新输入。</div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, type PropType, ref} from 'vue'
import {VueDraggable} from "vue-draggable-plus";
import SvgIcon from "../../package/svg-icon/index.vue";
import Switch from "../../package/common/Switch.vue";

const isShow = ref(-1)
const isFocused = ref(false);
const showTooltip = ref(false)
const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      options: Array<{ id: number; label: string; value: string }>;
      required: boolean;
      error: string;
      placeholder: string;
    }>,
    default: () => ({
      title: '请填写以下填空',
      options: [{
        id: 1,
        label: '填空1',
        value: ''
      }, {
        id: 2,
        label: '填空2',
        value: ''
      }],
      required: false,
      error: '',
      placeholder:'请输入'
    })
  },
  allowClear: {
    type: Boolean,
    default: true,
  },
  isRequiredShow: {
    type: Boolean,
    default: true
  },
  isPlaceholderShow:{
    type: Boolean,
    default:true
  }
})
const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'input', 'blurTitle', 'focusTitle', 'inputTitle'])

const propsModelValue = ref<{
  title: string,
  options: { id: number, label: string, value: string,placeholder: string }[],
  required: boolean,
  error: string,
}>(JSON.parse(JSON.stringify(props.modelValue)))

function watchTitle(event: Event) {
  emit('update:modelValue', propsModelValue.value)
  emit('input', propsModelValue.value.title, event)
}

function watchInput(item: {
  id: number,
  label: string,
  value:string,
  placeholder: string
}, index: number,type:string, event: Event) {
  emit('update:modelValue', propsModelValue.value);
  if(type !== 'placeholder'){
    emit('input', item.label, index, event)
  }
}

// 清除值的函数
const clearValue = (id: number) => {
  if (propsModelValue.value && propsModelValue.value.options) {
    const option = propsModelValue.value.options.find(value => value.id === id);
    if (option) {
      option.label = '';
    }
  }
  emit('update:modelValue', propsModelValue.value)
};

// 添加选项
function addOptions() {
  propsModelValue.value.options.push({
    id: parseInt(`${props.modelValue.options.length + 1}`, 10),
    label: `填空${props.modelValue.options.length + 1}`,
    value: '',
    placeholder:''
  })
  emit('update:modelValue', propsModelValue.value)
}

function delOption(index: number) {
  propsModelValue.value.options.splice(index, 1)
  propsModelValue.value.options.forEach((option, optionIndex) => {
    option.id = optionIndex + 1
  })
  emit('update:modelValue', propsModelValue.value)
}

// 选项blur
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
  background: var(--easy-form-component-background);
  border: 1px solid transparent;
  border-radius: var(--easy-form-border-radius-component);
  outline: none;
  box-shadow: 0 6px 12px 0 rgb(0 0 0 / 10%);

  .easy-form-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .easy-form-content-left {
      display: flex;
      align-items: center;
      width: 70%;
      font-size: 16px;

      .easy-form-serial-number {
        width: 35px;
        margin: auto;
      }

      .easy-form-fill-title-value {
        flex: 1;
        position: relative;

        .easy-form-error {
          padding: 2px 25px 2px 10px;
        }
      }
    }
  }

  .easy-form-fill-content-container {
    display: flex;
    flex-direction: column;
    width: calc(70% - 35px);
    margin-left: 35px;
    margin-top: 5px;

    .easy-form-fill-name-content {
      width: 100%;
      font-size: 14px;
    }

    .easy-form-fill-content-input {
      position: relative;
      display: flex;
      align-items: center;

      .easy-form-settings {
        display: flex;
        align-items: center;
        opacity: 0;
        margin-left: 5px;
      }

      &:hover {
        .easy-form-settings {
          opacity: 1 !important;
        }
      }

      .easy-form-clear {
        position: absolute;
        top: 0;
        right: 40px;
        bottom: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        margin: auto;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }


  .easy-form-box-content {
    padding: var(--easy-form-select-padding-component);
    color: var(--easy-form-color-text-component-1);
    font-size: 16px;
    background: var(--easy-form-input-bg-component);
    border: 1px dashed transparent;
    border-radius: 4px;

    &:hover {
      border: 1px dashed #ccc;
      transition: border-color 0.2s linear;
    }

    &:focus {
      background: var(--easy-form-input-select-background-component) !important;
      border: 1px dashed transparent; // 当input获得焦点时，边框消失
      outline: none; // 移除浏览器默认的焦点轮廓
      transition: border-color 0.2s linear;
    }
  }

  .easy-form-title-input {
    width: 100%;
  }

  .easy-form-fill-input {
    box-sizing: border-box;
    margin-top: 5px;
    padding: var(--easy-form-select-padding-component);
    overflow: hidden;
    color: var(--easy-form-color-text-component-1);
    font-size: 14px;
    background: var(--easy-form-input-bg-component-2);
    border: 1px dashed transparent;
    border-radius: 4px;
    outline: none;
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
</style>