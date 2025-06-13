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
                 @blur="(e) => ((showBorder = false), (showBackground = 1), emit('blurTitle', modelValue.title, e))"
                 @focus="(e) => ((showBorder = true), (showBackground = 1), emit('focusTitle', modelValue.title, e))"
                 @input="(e) => watchTitleInput(modelValue.title, e)"/>
          <div class="easy-form-clear">
            <SvgIcon name="clear" v-if="showBackground === 1 && allowClear && modelValue.title !== ''"
                     @click.stop="() => (propsModelValue.title = '')" class="easy-form-clear-img"/>
          </div>
        </div>
      </div>
      <div class="easy-form-operation">
        <slot name="operation"></slot>
      </div>
    </div>
    <div class="easy-form-content">
      <div class="easy-form-evaluate">
        <div v-for="(item, index) in modelValue.options" :key="index" class="easy-form-evaluate-item"
             @click="() => evaluate(item, index)" @mouseenter="() => enterEvaluate(index)"
             @mouseleave="checkTemp = null">
          <template v-if="checkTemp === null">
            <SvgIcon v-if="item.checked" :height="30" :width="30" name="evaluate_active"></SvgIcon>
            <SvgIcon v-else :height="30" :width="30" name="evaluate"></SvgIcon>
          </template>
          <template v-else>
            <SvgIcon v-if="checkTemp[index]" :height="30" :width="30" name="evaluate_active"></SvgIcon>
            <SvgIcon v-else :height="30" :width="30" name="evaluate"></SvgIcon>
          </template>
        </div>
      </div>
      <div class="easy-form-label">"{{
          props.modelValue.options[props.modelValue.options.filter((i) => i.checked).length - 1 >= 0 ? props.modelValue.options.filter((i) => i.checked).length - 1 : 0].label
        }}"
      </div>
      <div class="easy-form-desc">
        <div
            v-for="item in Array.from(new Set(props.modelValue.options[(props.modelValue.options.filter(i=>i.checked).length-1 >= 0 ? props.modelValue.options.filter(i=>i.checked).length - 1 : 0)].desc)).filter((i:string)=>i.length>0)"
            :key="item" class="easy-form-desc-item">
          {{ item }}
        </div>
        <div class="easy-form-desc-item">
          <SvgIcon :heigth="15" :width="15" class="easy-form-write" name="edit_evaluate"></SvgIcon>
          写评价
        </div>
        <div class="easy-form-edit" @click="modal.show">
          <span>编辑</span>
          <SvgIcon :height="20" :width="20" class="easy-form-edit-icon" name="edit"></SvgIcon>
        </div>
      </div>
    </div>
    <p class="easy-form-set-switch" v-if="isRequiredShow">
      <span class="easy-form-tit">是否必填</span>
      <Switch @change="()=>emit('update:modelValue',propsModelValue)" size="small"
              v-model:checked="propsModelValue.required"></Switch>
    </p>
  </div>
  <Modal ref="modal" v-model:options="propsModelValue.options"/>
</template>

<script lang="ts" setup>
import {computed, defineProps, type PropType, ref, watch} from 'vue';
import Modal from './Modal.vue';
import SvgIcon from "@/package/svg-icon/index";
import Switch from "@/package/common/Switch.vue";

const showBorder = ref(false);
const showBackground = ref(0);
const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      options: Array<{
        label: string;
        desc: string[];
        checked?: boolean;
      }>;
      required: boolean;
      error: string
    }>,
    default: () => ({
      title: '请您对我们的服务进行评价',
      options: [
        {
          label: '非常不满意',
          desc: ['态度冷淡', '推销多', '技术差'],
          checked: true,
        },
        {
          label: '比较不满意',
          desc: ['速度慢', '仪表乱', '不专业'],
          checked: false,
        },
        {
          label: '一般',
          desc: ['无互动', '不积极', '业务不精'],
          checked: false,
        },
        {
          label: '比较满意',
          desc: ['文明礼貌', '速度快', '较专业'],
          checked: false,
        },
        {
          label: '非常满意',
          desc: ['热情好客', '敬业精神', '技能专业'],
          checked: false,
        },
      ],
      required: false,
      error: ''
    }),
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

const propsModelValue = ref<{
  title: string;
  options: Array<{
    label: string;
    desc: string[];
    checked?: boolean;
  }>;
  required: boolean;
  error: string
}>(JSON.parse(JSON.stringify(props.modelValue)));
const emit = defineEmits(['blurTitle', 'focusTitle', 'inputTitle', 'update:modelValue']);
const iconLen = computed(() => props.modelValue.options.filter((item) => item.checked).length);
propsModelValue.value.options = props.modelValue.options.map((option) => ({...option, checked: false}));
propsModelValue.value.options[0].checked = true;
const modal = ref();
const checkTemp = ref<null | boolean[]>(null);
const label = ref(props.modelValue.options[iconLen.value > 1 ? iconLen.value - 1 : 0].label);

function watchTitleInput(title: string, event: Event) {
  emit('update:modelValue', propsModelValue.value)
  emit('inputTitle', props.modelValue.title, event);
}

function evaluate(item: { label: string; desc: string[]; checked?: boolean }, index: number) {
  label.value = item.label;
  props.modelValue.options.forEach((option, optionIndex) => {
    if (optionIndex <= index) {
      option.checked = true;
    } else {
      option.checked = false;
    }
  });
}

watch(
    () => propsModelValue.value.options,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        emit('update:modelValue', propsModelValue.value);
      }
    },
    {deep: true}
);

function enterEvaluate(index: number) {
  if (checkTemp.value === null) {
    checkTemp.value = [];
  }
  for (let i = 0; i <= index; i += 1) {
    checkTemp.value[i] = true;
  }
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
      padding: 2px 25px;
      color: red;
      font-size: 12px;
    }
  }

  .easy-form-content {
    margin-top: 10px;
    margin-left: 35px;

    .easy-form-evaluate {
      display: flex;
      align-items: center;

      .easy-form-evaluate-item {
        padding-right: 15px;
        cursor: pointer;

        &:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }

    .easy-form-label {
      margin: 5px 0 10px;
      color: #ffbe3a;
      font-size: 12px;
      line-height: 18px;
    }

    .easy-form-desc {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .easy-form-desc-item {
        display: flex;
        align-items: center;
        height: 22px;
        margin-right: 6px;
        margin-bottom: 5px;
        padding: 3px 6px;
        color: #aaa;
        font-size: 12px;
        line-height: 12px;
        white-space: nowrap;
        border: 1px solid #eaeaea;
        border-radius: 2px;

        .easy-form-write {
          margin-right: 5px;
        }
      }

      .easy-form-edit {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        margin-left: 15px;
        color: #2672ff;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;

        .easy-form-edit-icon {
          margin-left: 5px;
        }
      }
    }
  }
}

.easy-form-active {
  background: var(--easy-form-input-select-background-component) !important;
  border-color: transparent !important;
}
</style>
