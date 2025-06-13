<template>
  <div id="box" :class="{ 'easy-form-focused': isFocused }" class="easy-form-box">
    <slot name="serial" class="easy-form-serial-number"></slot>
    <div class="easy-form-label">
      <div class="easy-form-box-content" @click="() => isFocused = !isFocused">
        <!-- 分割线容器 -->
        <div class="easy-form-divider-container">
          <!-- 分割线 -->
          <div class="easy-form-divider" :style="{'--easy-form-divider-border-style': dividerBorderStyle}"></div>
          <!-- 文本绝对定位覆盖在分割线上 -->
          <div class="easy-form-divider-text" v-if="text" :style="textStyle">
            <span class="easy-form-text">{{ text }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="easy-form-operation">
      <slot name="operation"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, defineProps, ref} from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#ccc'
  },
  textColor: {
    type: String,
    default: '#000'
  },
  type: {
    type: String,
    default: 'solid'
  }
})

const isFocused = ref(false);

const dividerBorderStyle = computed(() => {
  return `1px ${props.type} ${props.color}`
});

const textStyle = computed(() => {
  return {
    color: props.textColor,
  };
});
</script>

<style lang="less" scoped>
.easy-form-divider-container {
  position: relative;
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.easy-form-divider {
  width: 100%;
  border-top: var(--easy-form-divider-border-style);
}

.easy-form-divider.dashed {
  background-size: 5px 1px;
  background-repeat: repeat-x;
}

.easy-form-divider-text {
  position: absolute;
  left: 50%;
  top: auto;
  transform: translateX(-50%);
  background: transparent;
  font-size: 14px;
  color: #666;

  .easy-form-text {
    padding: 5px;
    background-color: white;
  }
}

.easy-form-box {
  width: 100%;
  height: 100%;
  background-color: var(--easy-form-component-background);
  outline: none;
  border: 1px solid transparent;
  border-radius: var(--easy-form-border-radius-component);
}

.easy-form-label {
  width: 100%;
}

.easy-form-box-content {
  width: 100%;
  font-size: 16px;
  border: 1px dashed transparent;
  color: var(--easy-form-color-text-component-1);
  background: var(--easy-form-input-bg-component);
  border-radius: 4px;

  &:focus {
    background: rgba(241, 243, 246, .5);
    border: 1px dashed transparent;
    outline: none;
  }
}
</style>