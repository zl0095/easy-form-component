<template>
  <div class="easy-form-container-preview">
    <div class="easy-form-label">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-title">{{ title }}</div>
    </div>
    <div class="easy-form-error" v-if="error !== ''">{{ error }}</div>
    <div class="easy-form-content">
      <div class="easy-form-score">
        <div :class="['easy-form-score-item', selectNum === 0 ? 'easy-form-score-item-active' : '']"
             @click="selectPossiblity(0)">0
        </div>
        <div v-for="item in 10" :key="item"
             :class="['easy-form-score-item', selectNum === item ? 'easy-form-score-item-active' : '']"
             @click="selectPossiblity(item)">{{ item }}
        </div>
      </div>
      <div class="easy-form-possibility">
        <div class="easy-form-possibility-item">不可能</div>
        <div class="easy-form-possibility-item">极有可能</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '您向朋友或同事推荐我们的可能性有多大？',
  },
  modelValue: {
    type: [Number, String],
    default: '',
  },
  error: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['change', 'update:modelValue']);
const selectNum = ref<string | number>('');

function selectPossiblity(num: number) {
  selectNum.value = num;
  emit('update:modelValue', num);
  emit('change', num);
}
</script>

<style lang="less" scoped>
.easy-form-container-preview {
  box-sizing: border-box;
  border-radius: var(--easy-form-border-radius-component);

  .easy-form-label {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    .easy-form-title {
      box-sizing: border-box;
      width: var(--easy-form-container-width);
      font-size: 14px;
      border: 1px dashed transparent;
    }
  }

  .easy-form-content {
    .easy-form-score {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--easy-form-color-text-component-3);

      .easy-form-score-item {
        margin-top: 5px;
        flex: 1;
        box-sizing: border-box;
        height: 28px;
        margin-right: 3px;
        font-size: 14px;
        line-height: 28px;
        text-align: center;
        background: var(--easy-form-background-component-2);
        border-radius: 4px;
        cursor: pointer;

        &:nth-last-child(1) {
          margin-right: 0;
        }

        &.easy-form-score-item-active {
          color: #fff;
          background: var(--easy-form-primary-background-component);
        }
      }
    }

    .easy-form-possibility {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      color: var(--easy-form-color-text-component-3);
      font-size: 12px;
    }
  }
}
</style>
