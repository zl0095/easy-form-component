<template>
  <div class="easy-form-container-preview">
    <div class="easy-form-label" style="margin-bottom: 5px;">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-title">{{ title }}</div>
    </div>
    <div v-if="error !== ''" class="easy-form-error">{{ error }}</div>
    <div class="easy-form-content">
      <div class="easy-form-evaluate-container">
        <div class="easy-form-evaluate">
          <div v-for="(item, index) in initOptions" :key="index" :class="{ 'easy-form-active': item.checked }"
               class="easy-form-evaluate-item" @click="() => evaluate(item, index)">
            <SvgIcon v-if="!item.checked" :height="30" :width="30" name="evaluate"></SvgIcon>
            <SvgIcon v-else :height="30" :width="30" name="evaluate_active"></SvgIcon>
          </div>
        </div>
        <div v-if="propsModelValue.score && propsModelValue.score !== 0" class="easy-form-label">
          {{ initOptions[(propsModelValue.score as number) - 1]?.label }}
        </div>
      </div>
      <div v-if="propsModelValue.score && propsModelValue.score !== 0" class="easy-form-desc">
        <div v-for="(item,index) in initOptions[(propsModelValue.score as number) - 1]?.desc" :key="index"
             :class="['easy-form-desc-item', item.selected ? 'easy-form-desc-item-active' : '']"
             @click="selectDesc(item, index)">{{ item.label }}
        </div>
        <div :class="['easy-form-desc-item', isWrite ? 'easy-form-desc-item-active' : '']" @click="writeEvaluate">
          <SvgIcon v-if="!isWrite" :heigth="15" :width="15" class="easy-form-write" name="edit_evaluate"></SvgIcon>
          <SvgIcon v-else :heigth="15" :width="15" class="easy-form-write" name="edit_evaluate_white"></SvgIcon>
          写评价
        </div>
      </div>
      <div v-if="isWrite" class="easy-form-input-container">
        <input v-model="propsModelValue.selfAssessment" placeholder="说说您的评价..." class="easy-form-evaluate-input"
               type="text" @blur.prevent="(e) => ((isFocused = false), emit('blur', propsModelValue.selfAssessment, e))"
               @focus.prevent="(e) => ((isFocused = true), emit('focus', propsModelValue.selfAssessment, e))"
               @input.prevent="(e) => emit('input', propsModelValue.selfAssessment, e)"/>
        <SvgIcon v-if="propsModelValue.selfAssessment.length > 0 && allowClear" class="easy-form-clear" name="clear"
                 @click.stop="clearInput"></SvgIcon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {type PropType, ref} from 'vue';
import SvgIcon from "../../package/svg-icon/index";

const props = defineProps({
  title: {
    type: String,
    default: '请您对我们的服务进行评价',
  },
  options: {
    type: Array<{
      label: string;
      desc: string[];
      checked?: boolean;
    }>,
    default: () => [],
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Object as PropType<{ score?: number; desc: string[]; selfAssessment: string }>,
    default: () => ({
      score: undefined,
      desc: [],
      selfAssessment: '',
    }),
  },
});
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'input', 'evaluate', 'select']);
const initOptions = ref(
    props.options.map((item) => {
      const desc = item.desc.map((k) => {
        return {label: k, selected: false};
      });
      return {...item, checked: false, desc};
    })
);
const isFocused = ref(false);
const isWrite = ref(false);

const propsModelValue = ref<{
  score?: number;
  desc: string[];
  selfAssessment: string
}>(JSON.parse(JSON.stringify(props.modelValue)));

function evaluate(
    item: {
      label: string;
      desc: { label: string; selected: boolean }[];
      checked?: boolean;
    },
    index: number
) {
  initOptions.value.forEach((option, optionIndex) => {
    if (index >= optionIndex) {
      option.checked = true;
    } else {
      option.checked = false;
    }
  });
  isWrite.value = false;
  propsModelValue.value.score = index + 1;
  propsModelValue.value.desc = [];
  emit('update:modelValue', propsModelValue.value);
  emit('evaluate', propsModelValue.value.score);
}

function selectDesc(item: { label: string; selected: boolean }, index: number) {
  if (!item.selected) {
    propsModelValue.value.desc.push(item.label);
  } else {
    propsModelValue.value.desc.splice(index, 1);
  }
  item.selected = !item.selected;
  emit('update:modelValue', propsModelValue.value);
  emit('select', propsModelValue.value.desc);
}

function writeEvaluate() {
  isWrite.value = !isWrite.value;
  propsModelValue.value.selfAssessment = '';
}

function clearInput() {
  propsModelValue.value.selfAssessment = '';
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

    .easy-form-evaluate-container {
      display: flex;
      align-items: center;

      .easy-form-evaluate {
        display: flex;
        align-items: center;
        margin-top: 5px;

        .easy-form-evaluate-item {
          margin-right: 15px;
          cursor: pointer;
          transform: scale(1);

          &:hover {
            animation: shake 0.2s;
          }
        }
      }

      .easy-form-label {
        font-size: 12px;
        color: #ffbe3a;
      }
    }

    .easy-form-desc {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;

      .easy-form-desc-item {
        padding: 4px 8px;
        box-sizing: content-box;
        color: var(--easy-form-color-text-component-4);
        font-size: 12px;
        border-radius: var(--easy-form-border-radius-component-1);
        background: rgba(241, 243, 246, 0.5);
        margin-right: 8px;
        margin-top: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .easy-form-write {
          margin-right: 5px;
        }

        &.easy-form-desc-item-active {
          background: var(--easy-form-primary-background-component);
          color: #ffffff;
        }
      }
    }

    .easy-form-input-container {
      position: relative;

      .easy-form-evaluate-input {
        outline: none;
        width: 100%;
        height: 40px;
        padding: 8px 40px 8px 12px;
        border: 1px solid transparent;
        box-sizing: border-box;
        background: var(--easy-form-input-bg-component-2);
        border-radius: var(--easy-form-border-radius-component-1);
        color: var(--easy-form-color-text-component-1);

        &::placeholder {
          color: var(--easy-form-color-text-component-1);
        }

        &:focus {
          border-color: var(--easy-form-primary-background-component);
        }
      }

      .easy-form-clear {
        position: absolute;
        right: 10px;
        top: 0;
        bottom: 0;
        margin: auto;
        cursor: pointer;
      }
    }
  }
}

@keyframes shake {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    -ms-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>
