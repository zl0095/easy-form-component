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
          <div class="easy-form-clear">
            <SvgIcon name="clear" v-if="showBackground === 1 && allowClear && propsModelValue.title !== ''"
                     class="easy-form-clear-img"
                     @click.stop.prevent="() => (propsModelValue.title = '')"/>
          </div>
        </div>
      </div>
      <div class="easy-form-operation">
        <slot name="operation"></slot>
      </div>
    </div>
    <div class="easy-form-content">
      <div class="easy-form-signature">请在此处签名</div>
    </div>
    <p class="easy-form-set-switch" v-if="isRequiredShow">
      <span class="easy-form-tit">是否必填</span>
      <Switch @change="()=>emit('update:modelValue',propsModelValue)" size="small"
              v-model:checked="propsModelValue.required"></Switch>
    </p>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, PropType, ref} from 'vue';
import SvgIcon from "@/package/svg-icon/index.vue";
import Switch from "@/package/common/Switch.vue";

const showBorder = ref(false);
const showBackground = ref(0);
const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      required: boolean;
      error: string
    }>,
    default: () => ({
      title: '签名',
      required: false,
      error: ''
    })
  },
  isRequiredShow: {
    type: Boolean,
    default: true
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['blurTitle', 'focusTitle', 'inputTitle', 'update:modelValue']);

const propsModelValue = ref(JSON.parse(JSON.stringify(props.modelValue)))

function watchTitleInput(title: string, event: Event) {
  emit('update:modelValue', propsModelValue.value);
  emit('inputTitle', title, event);
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
        }

        .easy-form-title {
          box-sizing: border-box;
          flex: 1;
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

    .easy-form-error {
      box-sizing: border-box;
      padding: 2px 35px;
      color: red;
      font-size: 12px;
    }
  }

  .easy-form-content {
    max-width: 50%;
    margin-top: 10px;
    margin-left: 35px;

    .easy-form-signature {
      box-sizing: content-box;
      width: 438px;
      height: 190px;
      color: var(--easy-form-color-text-component-3);
      font-size: 14px;
      line-height: 190px;
      text-align: center;
      background: var(--easy-form-background-component-4);
      border: 1px solid var(--easy-form-border-color-component-3);
    }
  }
}

.easy-form-active {
  background: var(--easy-form-input-select-background-component) !important;
  border-color: transparent !important;
}
</style>
