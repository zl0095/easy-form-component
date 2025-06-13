<script lang="ts">
import {defineComponent, ref,computed} from 'vue';

export default defineComponent({
  name: 'Switch',
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  emits: ['update:checked', 'change'],
  setup(props, ctx) {
    const hasChecked = computed({
      get: () => props.checked,
      set: (val) => {
        ctx.emit('update:checked', val);
        ctx.emit('change', val);
      }
    });

    function click() {
      hasChecked.value = !hasChecked.value;
    }

    const height = ref<number>(24)
    const width = ref<number>(40)
    const iconWidth = ref<number>(16)
    const iconHeight = ref<number>(16)
    const iconTop = ref<number>(4)
    const iconLeft = ref<number>(20)

    if (props.size === 'small') {
      width.value = 34
      height.value = 18
      iconWidth.value = 12
      iconHeight.value = 12
      iconTop.value = 3
      iconLeft.value = 16
    }

    return {click, hasChecked, height, width, iconWidth, iconHeight, iconTop, iconLeft}
  },
});
</script>

<template>
  <button :class="['easy-form-switch', hasChecked ? 'easy-form-switch-checked' : '']"
          :style="{height:`${height}px`,lineHeight:`${height}px`,minWidth:`${width}px`}"
          type="button" @click="click">
    <span class="easy-form-arco-switch-handle"
          :style="{width:`${iconWidth}px`,height:`${iconHeight}px`,top:`${iconTop}px`,'--left':`calc(100% - ${iconLeft}px)`}"></span>
  </button>
</template>

<style lang="less" scoped>
.easy-form-switch {
  position: relative;
  box-sizing: border-box;
  min-width: 40px;
  height: 24px;
  padding: 0;
  overflow: hidden;
  line-height: 24px;
  vertical-align: middle;
  background-color: rgb(201 205 212);
  border: none;
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

  .easy-form-arco-switch-handle {
    position: absolute;
    top: 4px;
    left: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: #fff;
    font-size: 12px;
    background-color: #fff;
    border-radius: 50%;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }

  &.easy-form-switch-checked {
    background: var(--easy-form-primary-background-component);

    .easy-form-arco-switch-handle {
      left: var(--left);
    }
  }
}
</style>
