<template>
  <div id="box" :class="{ 'easy-form-focused': isFocused }" class="easy-form-box">
    <div class="easy-form-content" style="display: flex;">
      <div class="easy-form-content-left">
        <slot name="serial" class="easy-form-serial-number"></slot>
        <div class="easy-form-box-content">{{ props.title }}</div>
      </div>
    </div>
    <div class="easy-form-error" v-if="error !== ''">{{ error }}</div>
    <div v-for="(item,index) in bindOptions" :key="index" class="easy-form-fill-content">
      <div class="easy-form-box-content easy-form-fill-name-content">{{ item.label }}</div>
      <div class="easy-form-custom-input-container">
        <input v-model="item.value"
               :name="item.label.toString()"
               :placeholder="item.placeholder && (item.placeholder !== '') ? item.placeholder : '请输入'"
               class="easy-form-fill-input "
               type="text"
               @blur="(e)=>emit('blur',item.label,index,e)"
               @change="(e)=>emit('change',item.label,index,e)"
               @input="(e)=>watchInput(item,index,e)"
        />
        <SvgIcon name="clear" v-if="allowClear && item.value!==''" class="easy-form-clear"
                 @click="() => item.value = ''"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, defineProps, type PropType, ref} from 'vue'
import SvgIcon from "../../package/svg-icon/index.vue";

const props = defineProps({
  modelValue: {
    type: Array as PropType<{ id: number, label: string, value: string }[]>,
    default: () => []
  },
  title: {
    type: String,
    default: '请填写以下填空'
  },
  options: {
    type: Array as PropType<{ id: number, label: string, value: string,placeholder:string }[]>,
    default: () => ([{
      id: 1,
      label: "填空1",
      value: ''
    }, {
      id: 2,
      label: "填空2",
      value: ''
    }])
  },
  allowClear: {
    type: Boolean,
    default: true,
  },
  error: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入'
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'blur', 'change'],)
const isFocused = ref(false);
const bindOptions = ref<{ id: number, label: string, value: string,placeholder:string }[]>(JSON.parse(JSON.stringify(props.options)))

const defaultValue = ref<{ id: number, label: string, value: string }[]>([])
const bindValue = computed({
  get: () => props.modelValue.length > 0 ? props.modelValue.map(item=>({id:item.id,label:item.label,value:item.label})) : defaultValue,
  set: (value) => {
    defaultValue.value = value as { id: number, label: string, value: string }[]
    emit('update:modelValue', value)
  }
})

function watchInput(item: {
  id: number,
  label: string,
  value: string,
  placeholder:string
}, index: number, event: Event) {
  bindValue.value = bindOptions.value.map(item=>({id:item.id,label:item.label,value:item.value}))
  emit('input', item.label, index, event)
}
</script>
<style lang="less" scoped>
.easy-form-focused {
  border-color: var(--easy-form-border-color-component-2) !important;
  transition: border-color 0.2s linear;
}

.easy-form-box {
  width: 100%;
  height: 100%;
  background: var(--easy-form-component-background);
  outline: none;
  border-radius: var(--easy-form-border-radius-component);
  margin-bottom: 10px;

  .easy-form-content {
    display: flex;

    .easy-form-content-left {
      font-size: 16px;
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .easy-form-fill-title-value {
        flex: 1;
      }
    }
  }

  .easy-form-fill-content {
    display: flex;
    flex-direction: column;
    margin-top: 5px;

    .easy-form-fill-name-content {
      font-size: 14px;
      margin-bottom: 5px;
    }
  }

  .easy-form-box-content {
    flex: 1;
    color: var(--easy-form-color-text-component-1);
    font-size: 14px;
    border-radius: 4px;
  }

  .easy-form-custom-input-container {
    position: relative;

    .easy-form-fill-input {
      overflow: hidden;
      box-sizing: border-box;
      margin-bottom: 10px;
      width: 100%;
      padding: var(--easy-form-select-padding-component);
      color: var(--easy-form-color-text-component-1);
      background: var(--easy-form-input-bg-component-2);
      font-size: 14px;
      border: 1px dashed transparent;
      border-radius: 4px;

      &:focus {
        border: 1px solid blue;
        transition: border-color 0.2s linear;
        outline: none;
      }
    }

    .easy-form-clear {
      width: 18px;
      height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: rgba(241, 243, 246, .5);
      position: absolute;
      top: 0;
      bottom: 10px;
      right: 10px;
      margin: auto;
      cursor: pointer;
    }
  }
}
</style>