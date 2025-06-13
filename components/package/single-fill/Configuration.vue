<template>
  <div id="box" :class="{ 'easy-form-focused': isFocused }" class="easy-form-box">
    <div class="easy-form-label">
      <div class="easy-form-fill-title">
        <div class="easy-form-title-left">
          <div class="easy-form-serial-number">
            <slot name="serial"></slot>
          </div>
          <div class="easy-form-fill-title-value">
            <input v-model="propsModelValue.title" placeholder="请填写本项内容"
                   class="easy-form-box-content easy-form-title-input"
                   type="text"
                   @blur="(e) => (isFocused = false,emit('blurTitle',propsModelValue.title,e))"
                   @focus="(e) => (isFocused = true,emit('focusTitle',propsModelValue.title,e))"
                   @input="(e)=>watchTitleInput(e)"
                   :disabled="isDisabled"
            >
            <SvgIcon v-if="allowClear && propsModelValue.title !== ''" class="easy-form-clear" name="clear"
                     @click="handleClear"/>
          </div>
        </div>
        <div class="easy-form-operation">
          <slot name="operation"></slot>
        </div>
      </div>
      <input class="easy-form-fill-input" disabled :placeholder="propsModelValue.placeholder  ? propsModelValue.placeholder :  '填写者内容输入区'" type="text">
      <div class="easy-form-config-item" v-if="isPlaceholderShow">
        <span>提示文本：</span>
        <input v-model="propsModelValue.placeholder" @focus="() => isFocused = true" class="easy-form-config-item-input"
               placeholder="请输入提示文本"  @input="() => emit('update:modelValue',propsModelValue)">
        <SvgIcon v-if="allowClear && propsModelValue.placeholder" class="easy-form-clear" name="clear"
                 @click="() => propsModelValue.placeholder = ''"/>
      </div>
      <div class="easy-form-config-item" v-if="isMaxLengthShow">
        <span>文本最大长度：</span>
        <input v-model="propsModelValue.maxLength" @focus="() => isFocused = true" class="easy-form-config-item-input"
               placeholder="请输入文本的最大长度"
               type="number" :min="0" @input="() => emit('update:modelValue',propsModelValue)">
        <SvgIcon v-if="allowClear && propsModelValue.maxLength as number > 0" class="easy-form-clear" name="clear"
                 @click="() => propsModelValue.maxLength = undefined"/>
      </div>
      <div class="easy-form-config-item" v-if="isDefaultTextShow">
        <span>默认文本：</span>
        <input v-model="propsModelValue.defaultText" @focus="() => isFocused = true" class="easy-form-config-item-input"
               placeholder="请输入默认文本"
               type="text" @input="() => emit('update:modelValue',propsModelValue)">
        <SvgIcon v-if="allowClear && propsModelValue.defaultText !== ''" class="easy-form-clear" name="clear"
                 @click="()=>propsModelValue.defaultText = ''"/>
      </div>
      <p class="easy-form-set-switch" v-if="isRequiredShow">
        <span class="easy-form-tit">是否必填</span>
        <Switch @change="()=>emit('update:modelValue',propsModelValue)" size="small"
                v-model:checked="propsModelValue.required"></Switch>
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, PropType, ref} from 'vue'
import SvgIcon from "../../package/svg-icon/index.vue";
import Switch from "../../package/common/Switch.vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      maxLength: number | undefined;
      defaultText: string;
      required: boolean;
      error: string;
      placeholder: string;
      disabled:boolean
    }>,
    default: () => ({
      title: '请填写本项内容',
      defaultText: '',
      maxLength: undefined,
      required: false,
      error: '',
      placeholder:'请输入',
      disabled:false
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
  isPlaceholderShow: {
    type: Boolean,
    default: true
  },
  isMaxLengthShow:{
    type:Boolean,
    default:true
  },
  isDefaultTextShow:{
    type:Boolean,
    default:true
  },
  isDisabled:{
    type:Boolean,
    default:false
  },
})

const emit = defineEmits(['update:modelValue', 'blurTitle', 'focusTitle', 'inputTitle'])
const isFocused = ref(false);
const propsModelValue = ref<{
  title: string;
  maxLength: number | undefined;
  defaultText: string;
  required: boolean;
  error: string;
  placeholder:string
}>(JSON.parse(JSON.stringify(props.modelValue)))

function watchTitleInput(event: Event) {
  emit('update:modelValue', propsModelValue.value)
  emit('inputTitle', propsModelValue.value.title, event)
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

    .easy-form-title-left {
      width: 70%;
      display: flex;
      align-items: center;

      .easy-form-serial-number {
        width: 35px;
        margin: auto;
      }

      .easy-form-fill-title-value {
        flex: 1;
        width: 100%;
        display: flex;
        position: relative;

        .input-container {
          width: 100%;
        }
      }
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
      border: 1px dashed transparent;
      outline: none;
    }
  }

  .easy-form-fill-input {
    box-sizing: border-box;
    width: calc(70% - 35px);
    margin-top: 5px;
    margin-left: 35px;
    padding: 10px 12px;
    overflow: hidden;
    font-size: 14px;
    background: var(--easy-form-input-bg-component-2);
    border: 1px dashed transparent;
    border-radius: 4px;
  }

  .easy-form-error {
    box-sizing: border-box;
    padding: 5px 33px;
    color: red;
    font-size: 12px;
  }
}

.easy-form-config-item {
  width: calc(70% - 35px);
  margin-left: 35px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  position: relative;
  color: var(--easy-form-color-text-component-3);
  font-size: 14px;

  span {
    width: 105px;
  }

  .easy-form-config-item-input {
    flex: 1;
    box-sizing: border-box;
    padding: 10px 12px;
    overflow: hidden;
    font-size: 14px;
    background: var(--easy-form-input-bg-component-2);
    border: 1px dashed transparent;
    border-radius: 4px;
    outline: none;
    color: var(--easy-form-color-text-component-1);
  }
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