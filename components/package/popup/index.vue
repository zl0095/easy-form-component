<template>
  <div v-if="visible" class="popup-overlay" @click.self="close">
    <div class="popup-content" :style="{ width: width + 'px'}">
      <div class="popup-header">
        <h3 class="popup-title">{{ title }}</h3>
        <button @click="close"> <SvgIcon name="error"  color="red"/></button>
      </div>
      <div class="popup-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import SvgIcon from "../../package/svg-icon/index.vue";

// 定义 props
const props = defineProps<{
  visible: boolean;
  title: string;
  width: number;
}>();

// 定义 emits
const emits = defineEmits<{
  (e: 'close'): void;
}>();

// 关闭弹窗的方法
const close = () => {
  emits('close');
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.popup-content {
  background-color: var(--easy-form-component-background);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding-bottom: 60px;

  .close-icon {
    color: var(--easy-form-color-text-component-1);
    font-size: 20px;
  }
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  .popup-title {
    color: var(--easy-form-color-text-component-1);
  }
}

.popup-header button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.popup-body {
  line-height: 1.5;
}
</style>