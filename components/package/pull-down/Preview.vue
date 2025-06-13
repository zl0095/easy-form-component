<template>
  <div id="box" class="easy-form-box">
    <div v-if="isMobile() && isDropdownOpen" class="easy-form-overlay"></div>
    <div class="easy-form-label">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-box-content">{{ props.title }}</div>
    </div>
    <div class="easy-form-error" v-if="error !== ''">{{ error }}</div>
    <div v-if="!isMobile()" class="easy-form-select-container" @click.stop="toggleDropdown">
      <div :class="{ active: isDropdownOpen }" class="easy-form-dropdown easy-form-fill-input">
        <span>{{ selectedLabel || placeholder }}</span>
        <SvgIcon class="easy-form-arrow" :height="13" :width="13" name="arrow_down"></SvgIcon>
        <transition name="fade">
          <div v-if="isDropdownOpen" :style="{'--easy-form-bottom':`${bottom}`}" class="easy-form-dropdown-content">
            <div
                v-for="(item, index) in props.options"
                :key="item.label"
                style="margin-bottom: 5px; margin-top: 5px;display: flex"
                @click.stop="selectItem(item, index)"
                @mouseleave="removeHighlight"
                @mouseover="highlightOption(item)"
            >
              <input
                  :id="`option-${index}`"
                  v-model="selectedValue"
                  :value="props.value === 'label' ? item.label : item.id"
                  type="radio"
                  :disabled="item.disabled"
                  @change="emit('change', item.label, $event)"
              >
              <label :for="`option-${index}`"
                     :style="{color:item.disabled ? '#ccc' : ' var(--easy-form-color-text-component-1)'}"
                     style="width: 100%">{{ item.label }}</label>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div v-else>
      <div :class="{ 'easy-form-active': isDropdownOpen }" class="easy-form-mobile-dropdown-container"
           @click.stop="toggleDropdownFood">
        <span>{{ selectedLabel || placeholder }}</span>
        <SvgIcon class="easy-form-arrow" :height="13" :width="13" name="arrow_down"></SvgIcon>
        <div v-if="isDropdownOpen" class="easy-form-dropdown-content-mobile">
          <span style="margin-top: 10px;margin-left: 42%">{{placeholder}}</span>
          <div style="display: flex;align-items: center" v-for="(item,index) in props.options" :key="index"
               @click.stop="handleOptionChange(item,index)">
            <input v-model="selectedValue" :value="props.value === 'label' ? item.label : item.id"
                   type="radio" :disabled="item.disabled">
            <span style="margin-left: 4px;"
                  :style="{color:item.disabled ? '#ccc' : ' var(--easy-form-color-text-component-1)'}">{{
                item.label
              }}</span>
          </div>
          <SvgIcon name="clear" class="easy-form-clear-foot" @click.stop="toggleDropdownFood"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, defineProps, nextTick, type PropType, ref,onMounted, onUnmounted} from "vue";
import {getDistance, isMobile} from '../utils'
import SvgIcon from "../../package/svg-icon/index.vue";
import {PullDownConfigurationOptions} from "../../interface";
import { eventBus } from '../eventBus';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  title: {
    type: String,
    default: '请选择一个选项'
  },
  options: {
    type: Array as PropType<PullDownConfigurationOptions[]>,
    default: () => ([
      {
        id: 1,
        label: '下拉框内容1',
        disabled: false
      },
      {
        id: 2,
        label: '下拉框内容2',
        disabled: true
      }
    ])
  },
  value: {
    type: String,
    default: 'label'
  },
  error: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择'
  }
})
const emit = defineEmits(['update:modelValue', 'change'],)
const isDropdownOpen = ref<boolean>(false);
const selectedValue = ref<string | number>(props.modelValue);
const highlightedOption = ref({});
const bottom = ref('auto')

// 当前组件实例ID
function toggleDropdown() {
  eventBus.emit('closeAllModals'); // 打开当前弹窗前关闭其他弹窗
  isDropdownOpen.value = !isDropdownOpen.value;
  bottom.value = 'auto'
  nextTick(() => {
    const viewportHeight = document.documentElement.clientHeight
    const inputHeight = document.querySelector('.easy-form-fill-input')?.getBoundingClientRect().height
    const rectData = document.querySelector('.easy-form-dropdown-content')?.getBoundingClientRect()
    if (viewportHeight - (rectData?.top ?? 0) + (inputHeight ?? 0) < (rectData?.height ?? 0)) {
      bottom.value = `${inputHeight}px`
    } else {
      bottom.value = 'auto'
    }
  })
}

function highlightOption(option: { label: string, disabled: boolean }) {
  highlightedOption.value = option;
}

function removeHighlight() {
  highlightedOption.value = {};
}

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(option => (props.value === 'label' ? option.label : option.id) === selectedValue.value);
  return selectedOption ? selectedOption.label : '';
})

function toggleDropdownFood() {
  if (!isMobile()) return;
  isDropdownOpen.value = !isDropdownOpen.value;
}

function handleOptionChange(item: { id: number, label: string, disabled: boolean }, index: number) {
  if (!item.disabled) {
    // 处理选项变更的逻辑
    emit('update:modelValue', props.value === 'label' ? item.label : item.id);
    emit('change', props.value === 'label' ? item.label : item.id, index);
    selectedValue.value = props.value === 'label' ? item.label : item.id;  // 更新绑定的值
    isDropdownOpen.value = false;
  }
}

function selectItem(item: {
  id: number,
  label: string,
  disabled: boolean
}, index: number) {
  if (!item.disabled) {
    emit('update:modelValue', props.value === 'label' ? item.label : item.id);
    emit('change', props.value === 'label' ? item.label : item.id, index); // 通知父组件
    selectedValue.value = props.value === 'label' ? item.label : item.id;  // 更新绑定的值
    isDropdownOpen.value = false;      // 关闭下拉框
  }
}

document.addEventListener('click', function () {
  isDropdownOpen.value = false
});

onMounted(() => {
  eventBus.on('closeAllModals', () => {
    isDropdownOpen.value = false;
  });
});

onUnmounted(() => {
  eventBus.off('closeAllModals' , () => {
    isDropdownOpen.value = false;
  });
});

</script>
<style lang="less" scoped>
.easy-form-box {
  width: 100%;
  height: 100%;
  background-color: var(--easy-form-component-background);
  border-radius: var(--easy-form-border-radius-component);
  color: #333;

  .easy-form-label {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .easy-form-box-content {
    font-size: 14px;
    color: var(--easy-form-color-text-component-1);
  }

  .easy-form-fill-input {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    padding: var(--easy-form-select-padding-component);
    background: var(--easy-form-input-bg-component-2);
    font-size: 14px;
    border: 1px dashed transparent;
    color: var(--easy-form-color-text-component-1);
    border-radius: 4px;

    &:focus {
      border: 1px solid blue; // 当input获得焦点时，边框消失
      outline: none; // 移除浏览器默认的焦点轮廓
      transition: border 0.3s ease;
    }

    .easy-form-dropdown-content {
      margin-top: 5px;
      position: absolute;
      left: 0;
      box-sizing: border-box;
      border: 1px solid var(--easy-form-color-fill-3);
      border-radius: var(--easy-form-border-radius-component);
      background-color: var(--easy-form-component-background);
      width: 100%;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 9;
      padding: 10px;
      bottom: var(--easy-form-bottom);
    }
  }

  .easy-form-dropdown {
    position: relative;
    cursor: pointer;
    display: inline-block;
    margin-top: 5px;

    .easy-form-arrow {
      display: inline-block;
      margin-left: 5px;
      transition: transform 0.3s;
      position: absolute;
      right: 10px;
    }
  }

  .easy-form-dropdown-content label {
    display: block;
    transition: height 0.2s ease; /* 定义高度变化的过渡效果 */
    padding: 5px 10px;
    cursor: pointer;
  }

  .easy-form-dropdown.easy-form-active .easy-form-dropdown-content {
    display: block;
    transition: 0.2s ease;
  }

  .easy-form-active .easy-form-arrow {
    transform: rotate(180deg);
  }

  .easy-form-mobile-dropdown-container {
    background: var(--easy-form-input-bg-component-2);
    padding: var(--easy-form-select-padding-component);
    position: relative;
    color: var(--easy-form-color-text-component-1);

    .easy-form-arrow {
      position: absolute;
      right: 15px;
      top: 10px;
    }
  }

  .easy-form-dropdown-content-mobile {
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 16px;
    line-height: 34px;
    width: 100%;
    min-height: 249px;
    z-index: 999;
    background-color: var(--easy-form-component-background);
    display: flex;
    flex-direction: column;
    border-top-left-radius: 19px;
    border-top-right-radius: 19px;
    padding-left: 25px;
  }

  .easy-form-clear-foot {
    position: absolute;
    top: 10px;
    right: 20px;
  }

  .easy-form-clear-foot {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 17px;
    right: 17px;
  }

  .easy-form-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    pointer-events: none;
  }

  /* 确保盒子内容在蒙层之上 */

  .easy-form-box > *:not(.overlay) {
    position: relative;
    z-index: 2;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>