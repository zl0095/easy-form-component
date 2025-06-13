<template>
  <div id="box" :class="{ 'easy-form-focused': isFocused }" class="easy-form-box">
    <div class="easy-form-label">
      <div class="easy-form-fill-title">
        <div class="easy-form-fill-title-value">
          <div class="easy-form-input-container">
            <div class="easy-form-serial-number">
              <slot name="serial"></slot>
            </div>
            <input v-model="computedModelValue.title" placeholder="请输入日期选择器的标题" class="easy-form-box-content"
                   type="text"
                   @blur="(e) => (isFocused = false,showClear = 1,emit('blurTitle',computedModelValue.title,e))"
                   @focus="(e) => (isFocused = true,showClear = 1,emit('focusTitle',computedModelValue.title,e))"
                   @input="(e)=>watchTitleInput(e)"
                   :disabled="isDisabled"
            >
            <SvgIcon name="clear" v-if="allowClear && computedModelValue.title!=='' && showClear === 1"
                     class="easy-form-clear"
                     @click="handleClear"/>
          </div>
          <div class="easy-form-operation">
            <slot name="operation"></slot>
          </div>
        </div>
      </div>
      <div class="easy-form-date-picker-input">
        <input class="easy-form-fill-input" disabled :placeholder="computedModelValue.placeholder  ? computedModelValue.placeholder :  '填写者内容输入区'" type="text">
        <SvgIcon name="date_picker" :width="16" :height="16" class="easy-form-date-packer"/>
      </div>
      <p class="easy-form-set-switch" v-if="isPlaceholderShow">
        <span class="easy-form-tit">提示文字</span>
        <input type="text" v-model="computedModelValue.placeholder" placeholder="请输入提示文字" class="easy-form-placeholder">
      </p>
      <p class="easy-form-set-switch" v-if="isSelectTimeShow">
        <span class="easy-form-tit">是否选择时间</span>
        <Switch size="small" @change="(checked:boolean)=>change(checked,'selectTime')"
                v-model:checked="computedModelValue.isSelectTime"></Switch>
      </p>
      <p class="easy-form-set-switch" v-if="isHalfdayShow">
        <span class="easy-form-tit">是否将选择上午/下午</span>
        <Switch size="small" @change="(checked:boolean)=>change(checked,'halfDay')"
                v-model:checked="computedModelValue.isHalfday"></Switch>
      </p>
      <p class="easy-form-set-switch" v-if="isShowGreaterNow">
        <span class="easy-form-tit">是否要大于当前时间</span>
        <Switch size="small" @change="()=>emit('update:modelValue',computedModelValue)"
                v-model:checked="computedModelValue.isGreaterNow"></Switch>
      </p>
      <p class="easy-form-set-switch" v-if="isRequiredShow">
        <span class="easy-form-tit">是否必填</span>
        <Switch size="small" @change="()=>emit('update:modelValue',computedModelValue)"
                v-model:checked="computedModelValue.required"></Switch>
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, defineProps, PropType, ref,watch} from 'vue'
import SvgIcon from "../../package/svg-icon/index.vue";
import Switch from "../../package/common/Switch.vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      isSelectTime: boolean;
      isHalfday:boolean;
      required: boolean;
      error: string;
      placeholder: string;
      isGreaterNow: boolean;
    }>,
    default: () => ({
      title: '请选择日期',
      isSelectTime: false,
      isHalfday:false,
      required: false,
      error: '',
      placeholder:'请选择',
      isGreaterNow:false
    })
  },
  allowClear: {
    type: Boolean,
    default: true
  },
  isRequiredShow: {
    type: Boolean,
    default: true
  },
  isSelectTimeShow: {
    type: Boolean,
    default: true
  },
  isHalfdayShow:{
    type: Boolean,
    default: true
  },
  isShowGreaterNow:{
    type:Boolean,
    default:true
  },
  isDisabled:{
    type:Boolean,
    default:false
  },
  isPlaceholderShow:{
    type: Boolean,
    default:true
  }
})
const emit = defineEmits(['update:modelValue', 'blurTitle', 'focusTitle', 'inputTitle'])
const isFocused = ref(false);
const showClear = ref(0)


const computedModelValue = ref<{
  title: string;
  isSelectTime: boolean;
  isHalfday:boolean;
  required: boolean;
  error: string;
  placeholder: string;
  isGreaterNow: boolean;}>(JSON.parse(JSON.stringify(props.modelValue)))

function watchTitleInput(event: Event) {
  emit('update:modelValue',{...computedModelValue.value})
  emit('inputTitle', computedModelValue.value.title, event)
}

const handleClear = () => {
  computedModelValue.value = {...computedModelValue.value,title:''}
  showClear.value = 0
};

function change(checked:boolean,type:string) {
  if(checked && type === 'halfDay'){
    computedModelValue.value = {...computedModelValue.value,isSelectTime:false,isHalfday:true}
  }
  if(checked && type === 'selectTime'){
    computedModelValue.value = {...computedModelValue.value,isHalfday:false,isSelectTime:true}
  }
  emit('update:modelValue',computedModelValue.value)
}

</script>
<style lang="less" scoped>
.easy-form-focused {
  border-color: var(--easy-form-border-color-component-2) !important;
  transition: border 0.3s ease;
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
    width: 100%;
  }

  .easy-form-fill-title {
    position: relative;
    display: flex;
    width: 100%;

    .easy-form-serial-number {
      width: 35px;
      margin: auto;
    }

    .easy-form-fill-title-value {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .easy-form-input-container {
        width: 70%;
        display: flex;
        align-items: center;
        position: relative;
      }
    }
  }

  .easy-form-box-content {
    flex: 1;
    padding: var(--easy-form-select-padding-component);
    color: var(--easy-form-color-text-component-1);
    font-size: 16px;
    background: var(--easy-form-input-bg-component);
    border: 1px dashed transparent;
    border-radius: 4px;

    &:hover {
      border: 1px dashed #ccc;
    }

    &:focus {
      background: rgb(241 243 246 / 50%);
      border: 1px dashed transparent; // 当input获得焦点时，边框消失
      outline: none; // 移除浏览器默认的焦点轮廓
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



  .easy-form-fill-input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 12px;
    overflow: hidden;
    font-size: 14px;
    background: var(--easy-form-input-bg-component-2);
    border: 1px dashed transparent;
    border-radius: 4px;
  }

  .easy-form-error {
    box-sizing: border-box;
    padding: 5px 34px;
    color: red;
    font-size: 12px;
  }

  .easy-form-date-picker-input {
    position: relative;
    width: calc(70% - 35px);
    margin-left: 35px;
    margin-top: 5px;

    .easy-form-date-packer {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;
      margin: auto;
    }
  }
}
</style>