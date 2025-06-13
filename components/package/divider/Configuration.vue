<template>
  <div id="box" class="easy-form-box">
    <div :class="{ 'easy-form-focused': isFocused }" class="easy-form-divider-box">
      <div class="easy-form-serial-number">
        <slot name="serial"></slot>
      </div>
      <div class="easy-form-label">
        <div class="easy-form-box-content">
          <div class="easy-form-box-item">
            <!-- 分割线容器 -->
            <div class="easy-form-divider-container">
              <!-- 分割线 -->
              <div class="easy-form-divider" :style="{'--easy-form-divider-border-style': dividerBorderStyle}"></div>
              <!-- 文本绝对定位覆盖在分割线上 -->
              <div v-if="propsModelValue.text" class="easy-form-divider-text" :style="textStyle">
                <span class="easy-form-text">{{ propsModelValue.text }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="easy-form-operation">
          <slot name="operation"></slot>
        </div>
      </div>
    </div>
    <div class="easy-form-config-box">
      <div class="easy-form-config-item">
        <span class="easy-form-config-label">文字颜色</span>
        <input type="color" class="easy-form-config-input easy-form-config-input-color"
               v-model="propsModelValue.textColor">
      </div>
      <div class="easy-form-config-item">
        <span class="easy-form-config-label">分割线颜色</span>
        <input type="color" class="easy-form-config-input easy-form-config-input-color" v-model="propsModelValue.color">
      </div>
      <div class="easy-form-config-item">
        <span class="easy-form-config-label">分割线样式</span>
        <select placeholder="请选择" class="easy-form-config-input easy-form-config-input-select"
                v-model="propsModelValue.type">
          <option class="option" value="solid" label="实线"></option>
          <option class="option" value="dashed" label="虚线"></option>
        </select>
      </div>
      <div class="easy-form-config-item">
        <span class="easy-form-config-label">文字</span>
        <input type="text" class="easy-form-config-input  easy-form-config-input-inp" v-model="propsModelValue.text">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, defineProps, type PropType, ref} from 'vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      text?: string,
      color?: string,
      textColor?: string,
      type?: string
    }>,
    default: () => ({
      text: '哈哈哈',
      color: '#ccc',
      textColor: '#ccc',
      type: 'solid'
    })
  },
})
const propsModelValue = ref(JSON.parse(JSON.stringify(props.modelValue)))
const isFocused = ref(false);
const emit = defineEmits(['update:modelValue'])

const dividerBorderStyle = computed(() => {
  emit('update:modelValue', propsModelValue.value)
  return `1px ${propsModelValue.value.type} ${propsModelValue.value.color}`
});

const textStyle = computed(() => {
  return {
    color: propsModelValue.value.textColor,
  };
});
</script>

<style lang="less" scoped>
.easy-form-divider-box {
  display: flex;
  align-items: center;
}

.easy-form-config-box {
  margin-left: 30px;

  .easy-form-config-item {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .easy-form-config-label {
      margin-right: 10px;
    }

    .easy-form-config-input {
      outline: none;
      border: none;
      padding: var(--easy-form-select-padding-component);
      background: var(--easy-form-input-bg-component-2);
      box-sizing: border-box;
      color: var(--easy-form-color-text-component-1);

      &-select, &-inp {
        width: 300px;
      }

      &-color {
        padding: 0;
        height: 26px;
      }

      .option {
        background-color: var(--easy-form-background-component-1);
        color: var(--easy-form-color-text-component-1);
      }
    }
  }
}

.easy-form-divider-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px 0;
}

.easy-form-divider {
  width: 100%;
  border-top: var(--easy-form-divider-border-style);
}

.easy-form-divider-text {
  position: absolute;
  top: auto;
  left: 50%;
  color: #666;
  font-size: 14px;
  background: transparent;
  transform: translateX(-50%);

  .easy-form-text {
    padding: 5px;
    background: var(--easy-form-component-background);
  }
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
}

.easy-form-label {
  display: flex;
  width: 100%;
}

.easy-form-box-content {
  flex: 1;
  padding: var(--easy-form-title-padding-component);
  color: var(--easy-form-color-text-component-1);
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
