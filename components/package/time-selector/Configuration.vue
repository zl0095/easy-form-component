<template>
  <div id="box" :class="{ 'easy-form-focused': isFocused }" class="easy-form-box">
    <div class="easy-form-label">
      <div class="easy-form-fill-title">
        <div style="width: 70%;display: flex;align-items: center">
          <div class="easy-form-serial-number">
            <slot name="serial"></slot>
          </div>
          <div class="easy-form-fill-title-value">
            <input v-model="propsModelValue.title" placeholder="请输入标题"
                   class="easy-form-box-content easy-form-title-input"
                   type="text"
                   @blur="(e) => (isFocused = false,emit('blurTitle',propsModelValue.title,e))"
                   @focus="(e) => (isFocused = true,emit('focusTitle',propsModelValue.title,e))"
                   @input="(e)=>watchTitleInput(propsModelValue.title,e)"
            >
            <SvgIcon v-if="props.allowClear && propsModelValue.title!==''" class="easy-form-clear" name="clear"
                     @click="handleClear"/>
          </div>
        </div>
        <div class="easy-form-operation">
          <slot name="operation"></slot>
        </div>
      </div>
      <div class="easy-form-time-input">
        <div class="easy-form-time-selector-box">
          <SvgIcon class="easy-form-img" name="time_selector"/>
          <input
              class="easy-form-fill-input"
              readonly
              type="text"
              :placeholder="propsModelValue.placeholder ? propsModelValue.placeholder : '请选择时间'"/>
        </div>
      </div>
      <p class="easy-form-set-switch" v-if="isPlaceholderShow">
        <span class="easy-form-tit">提示文字</span>
        <input type="text" v-model="propsModelValue.placeholder" placeholder="请输入提示文字" class="easy-form-placeholder">
      </p>
      <p class="easy-form-set-switch">
        <span class="easy-form-tit">是否选择秒数</span>
        <Switch @change="()=>emit('update:modelValue',propsModelValue)" size="small"
                v-model:checked="propsModelValue.isHasSecond"></Switch>
      </p>
      <p class="easy-form-set-switch" v-if="isRequiredShow">
        <span class="easy-form-tit">是否必填</span>
        <Switch @change="()=>emit('update:modelValue',propsModelValue)" size="small"
                v-model:checked="propsModelValue.required"></Switch>
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, type PropType, ref} from 'vue'
import SvgIcon from "../../package/svg-icon/index.vue";
import Switch from "../../package/common/Switch.vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      isHasSecond: boolean;
      required: boolean;
      error: string;
      placeholder: string;
    }>,
    default: () => ({
      title: '请选择时间',
      isHasSecond: true,
      required: false,
      error: '',
      placeholder: '请选择',
    })
  },
  isRequiredShow: {
    type: Boolean,
    default: true
  },
  allowClear: {
    type: Boolean,
    default: true
  },
  isPlaceholderShow:{
    type:Boolean,
    default:true
  }
})

const emit = defineEmits(['update:modelValue', 'blurTitle', 'focusTitle', 'inputTitle'])
const isFocused = ref(false);
const propsModelValue = ref(JSON.parse(JSON.stringify(props.modelValue)))

function watchTitleInput(title: string, event: Event) {
  emit('update:modelValue', propsModelValue.value)
  emit('inputTitle', title, event)
}

const handleClear = () => {
  propsModelValue.value.title = '';
  emit('update:modelValue', '');
};
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
    }
  }

  .easy-form-box-content {
    width: 100%;
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

  .easy-form-title-input {
    width: 100%;
  }

  .easy-form-fill-input {
    box-sizing: border-box;
    padding: var(--easy-form-select-padding-component);
    overflow: hidden;
    font-size: 14px;
    background: var(--easy-form-input-bg-component-2);
    border: 1px dashed transparent;
    border-radius: 4px;
  }

  .easy-form-error {
    box-sizing: border-box;
    padding: 5px 35px;
    color: red;
    font-size: 12px;
  }

  .easy-form-timer {
    margin: 0 10px;
  }

  .easy-form-time-input {
    width: calc(70% - 35px);
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-left: 35px;

    .easy-form-time-selector-box {
      position: relative;
      margin-top: 5px;
      width: 100%;

      .easy-form-img {
        position: absolute;
        left: 10px;
        top: 0;
        bottom: 0;
        margin: auto;
      }

      .easy-form-fill-input{
        width: 100%;
        padding-left: 38px;
        box-sizing: border-box;
        outline: none;
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
</style>