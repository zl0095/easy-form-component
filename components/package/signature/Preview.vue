<template>
  <div class="easy-form-container-preview">
    <div class="easy-form-label" :style="{ marginBottom:error === '' ? '10px' : '5px' }">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-title">{{ title }}</div>
    </div>
    <div v-if="error !== ''" class="easy-form-error">{{ error }}</div>
    <div class="easy-form-content">
      <div class="easy-form-signature-container">
        <p v-if="!imgUrl" class="easy-form-start" @click="() => showModal = true">点击开始签名</p>
        <div v-else class="easy-form-image">
          <img :class="['easy-form-signature-img',isMobile() ? 'easy-form-signature-img-mobile' : ''] " :src="imgUrl"
               alt="">
          <SvgIcon :height="20" :width="20" class="easy-form-clear-signature" name="clear_signature"
                   @click="() => imgUrl = ''"></SvgIcon>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="easy-form-signature-modal">
    <div v-if="!isMobile()" class="easy-form-signature-content">
      <div class="easy-form-title-top">
        <div class="easy-form-title">电子签名</div>
        <SvgIcon name="error" @click="() => (showModal = false,emit('change', imgUrl))"/>
      </div>
      <div class="easy-form-signature">
        <div class="easy-form-signature-container">
          <Vue3Signature ref="signature" :disabled="false" :h="'100%'" :sigOption="option"
                         :w="'100%'" class="easy-form-example"></Vue3Signature>
        </div>
        <SvgIcon name="clear_signature" class="easy-form-clear-signature" @click="clearSingature"/>
      </div>
      <div class="easy-form-complete-container">
        <button class="easy-form-complete" @click="saveSignature">完成</button>
      </div>
    </div>
    <div v-else class="easy-form-mobile-content">
      <div class="easy-form-signature-container">
        <Vue3Signature ref="signature" :disabled="false" :h="'100%'" :sigOption="option"
                       :w="'100%'" class="easy-form-example"></Vue3Signature>
      </div>
      <div class="easy-form-complete-container">
        <SvgIcon name="clear_signature" class="easy-form-clear-signature" @click="clearSingature"/>
        <button class="easy-form-complete" @click="saveSignature">完成</button>
      </div>
      <button class="easy-form-back" @click="() => (showModal = false,emit('change', imgUrl))">返回</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {isMobile} from '../utils';
import SvgIcon from "../../package/svg-icon/index";
import Vue3Signature from 'vue3-signature'

const option = ref({
  penColor: "rgb(0, 0, 0)",
  backgroundColor: 'transparent',
})
const signature = ref()
const showModal = ref(false)
const props = defineProps({
  title: {
    type: String,
    default: '签名'
  },
  modelValue: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['change', 'update:modelValue'])
const imgUrl = ref(props.modelValue)

// 清除画布
function clearSingature() {
  signature.value.clear()
}

// 签名完成
function saveSignature() {
  showModal.value = false
  imgUrl.value = signature.value.save('image/png')
  emit('update:modelValue', imgUrl.value)
  emit('change', imgUrl.value)
}
</script>
<style lang="less" scoped>
.easy-form-container-preview {
  border-radius: var(--easy-form-border-radius-component);
  box-sizing: border-box;

  .easy-form-label {
    display: flex;
    align-items: center;

    .easy-form-title {
      width: var(--easy-form-container-width);
      font-size: 14px;
      border: 1px dashed transparent;
      box-sizing: border-box;
    }
  }

  .easy-form-content {
    .easy-form-signature-container {
      width: 100%;
      height: 126px;
      background: var(--easy-form-background-component-5);
      border-radius: var(--easy-form-border-radius-component-1);
      cursor: pointer;
      position: relative;

      .easy-form-start {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--easy-form-border-radius-component-1);
      }

      .easy-form-image {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--easy-form-border-radius-component-1);

        .easy-form-signature-img {
          max-width: 100%;
          height: 100%;
          object-fit: contain;

          &.easy-form-signature-img-mobile {
            transform: rotate(-90deg);
          }
        }

        .easy-form-clear-signature {
          width: 20px;
          height: 20px;
          cursor: pointer;
          position: absolute;
          right: 20px;
          bottom: 20px;
        }
      }
    }
  }
}

.easy-form-signature-modal {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: var(--easy-form-background-component-6);
  z-index: 9;

  .easy-form-signature-content {
    width: 600px;
    height: 410px;
    background: var(--easy-form-component-background);
    border-radius: 8px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 24px;
    box-sizing: border-box;

    .easy-form-title-top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .easy-form-title {
        font-size: 16px;
        font-weight: 500;
        max-width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }

    .easy-form-signature {
      width: 100%;
      height: 270px;
      position: relative;
      margin: 20px 0;

      .easy-form-signature-container {
        background: var(--easy-form-background-component-5);
        width: 100%;
        height: 100%;
      }

      .easy-form-clear-signature {
        width: 20px;
        height: 20px;
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 9;
        cursor: pointer;
      }
    }

    .easy-form-complete-container {
      display: flex;
      align-items: center;
      justify-content: center;

      .easy-form-complete {
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        background: var(--easy-form-primary-background-component);
        border-radius: var(--easy-form-border-radius-component-1);
        outline: none;
        border: none;
        cursor: pointer;
        display: block;
      }
    }
  }

  .easy-form-mobile-content {
    width: 100vw;
    height: 100vh;
    position: relative;

    .easy-form-complete-container {
      display: flex;
      align-items: center;
      position: absolute;
      left: -20px;
      bottom: 70px;
      transform: rotate(90deg);

      .easy-form-clear-signature {
        width: 20px;
        height: 20px;
        margin-right: 20px;
      }

      .easy-form-complete {
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        background: var(--easy-form-primary-background-component);
        border-radius: var(--easy-form-border-radius-component-1);
        outline: none;
        border: none;
        cursor: pointer;
        display: block;
      }
    }

    .easy-form-signature-container {
      width: 100%;
      height: 100%;
      background: var(--easy-form-background-component-5);
    }

    .easy-form-back {
      width: 80px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      background: #f0f0f0;
      color: #333333;
      border-radius: var(--easy-form-border-radius-component-1);
      outline: none;
      border: none;
      cursor: pointer;
      display: block;
      position: absolute;
      right: 0;
      top: 50px;
      transform: rotate(90deg);
    }
  }
}
</style>