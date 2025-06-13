<template>
  <div class="easy-form-container-preview">
    <div class="easy-form-label">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-title">{{ title }}</div>
    </div>
    <div class="easy-form-error" v-if="error !== ''">{{ error }}</div>
    <div class="easy-form-content">
      <div class="easy-form-info">
        <div class="easy-form-info-select">
          <input v-model="selectCon" class="easy-form-input" :placeholder="placeholder" readonly type="text"
                 @click.stop="selectOptions"/>
          <SvgIcon v-if="!selectCon" :class="['easy-form-icon', showSelect ? 'easy-form-icon-active' : '']" :height="13"
                   :width="13" name="arrow_down"></SvgIcon>
          <SvgIcon v-if="selectCon && allowClear && showClear === 3" class="easy-form-clear" name="clear"
                   @click.stop="() => ((selectCon = ''), (address = []), cascader.splice(1), (selected = 0))"></SvgIcon>
          <div :class="['easy-form-select-options', showSelect && !isMobile() ? 'easy-form-select-options-active' : '']"
               :style="{ width: `${cascader.length * (100 / getMaxDepth(options))}%`,'--easy-form-bottom':`${bottom}` }">
            <div class="easy-form-select-option">
              <div v-for="(item, index) in cascader" :key="index" class="easy-form-options">
                <div v-for="(k, v) in item" :key="v"
                     :class="['easy-form-option', address[index] === k.text ? 'easy-form-option-active' : '']"
                     @click.stop="() => selectAddress(k, index)">
                  {{ k.text }}
                  <SvgIcon v-if="k.children && k.children?.length > 0" :height="15" :width="15" class="easy-form-arrow-right"
                           name="arrow_right"></SvgIcon>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showSelect && isMobile()" class="easy-form-mobile-contents" @click.stop="showSelect = true">
            <div
                :class="['easy-form-mobile-content', showSelect && isMobile() ? 'easy-form-mobile-content-active' : '']">
              <div class="easy-form-top">
                <div class="easy-form-title">{{placeholder}}</div>
                <SvgIcon :height="15" :width="15" name="close"
                         @click.stop="() => ((showSelect = false), (selectCon = address.join(' ')))"></SvgIcon>
              </div>
              <div class="easy-form-selected-info">
                <div v-for="(item, index) in address" :key="index"
                     :class="['easy-form-selected-item', selected === index ? 'easy-form-selected-item-active' : '']"
                     @click.stop="reselectAddress(item, index)">
                  <div class="easy-form-circle"></div>
                  <div class="easy-form-selected-text">{{ item }}</div>
                </div>
              </div>
              <div v-for="(item, index) in cascader" :key="index" class="easy-form-ws-cascader-container">
                <div v-if="index === selected" class="easy-form-ws-selected">
                  <p>请选择</p>
                  <div>
                    <div v-for="(k, v) in item" :key="v"
                         :class="['easy-form-ws-cascader-item', address[selected] === k.text ? 'easy-form-ws-cascader-item-active' : '']"
                         @click.stop="selectAddress(k, index)">
                      {{ k.text }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, nextTick, type PropType, ref,onMounted,onUnmounted} from 'vue';
import { isMobile} from '../utils';
import SvgIcon from "../../package/svg-icon/index";
import { eventBus } from '../eventBus'

interface Address {
  text: string;
  value: string;
  children?: Address[];
}

const props = defineProps({
  title: {
    type: String,
    default: '请选择以下选项',
  },
  modelValue: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array<any>,
    default: () => ([
      {
        label: '测试',
      },
      {
        label: '测试1',
        children: [
          {
            label: '测试1-1',
            children: [
              {
                label: '测试1-1-1',
                children: [
                  {
                    label: '测试1-1-1-1',
                  },
                  {
                    label: '测试1-1-1-2',
                  }
                ]
              },
              {
                label: '测试1-1-2',
              }
            ]
          },
          {
            label: '测试2-2',
          }
        ]
      }
    ]),
  },
  formatLabel: {
    type: Object as PropType<{ label: string }>,
    default: () => {
    },
  },
  placeholder: {
    type: String,
    default:'请选择'
  }
});
const emit = defineEmits(['change', 'update:modelValue']);
const cascader = ref<Address[][]>([]);
const showSelect = ref(false);
const address = ref<string[]>([]);
const showClear = ref(0);
const selected = ref(0);

document.addEventListener('click', function () {
  showSelect.value = false;
});

const defaultValue = ref('')

const selectCon = computed({
  get: () => props.modelValue || defaultValue.value,
  set: (val) => {
    defaultValue.value = val
    emit('update:modelValue', val)
  },
});

function convertLabelToText(data: any[]) {
  if (!Array.isArray(data)) return undefined;
  data.forEach((item) => {
    if (props.formatLabel && props.formatLabel.label && props.formatLabel.label !== 'label') {
      item.text = item[props.formatLabel.label];
      delete item[props.formatLabel.label];
      if (item.children && Array.isArray(item.children)) {
        convertLabelToText(item.children);
      }
    } else {
      item.text = item.label;
      delete item.label;
      if (item.children && Array.isArray(item.children)) {
        convertLabelToText(item.children);
      }
    }
  });
  return data;
}

function getMaxDepth(data: any[]): number {
  // 定义一个辅助函数来计算深度
  function getDepth(items: any[], currentDepth: number): number {
    let maxDepth = currentDepth;
    items.forEach((item) => {
      if (item.children && Array.isArray(item.children)) {
        const childDepth = getDepth(item.children, currentDepth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      }
    });
    return maxDepth;
  }

  // 从初始深度 1 开始计算
  return getDepth(data, 1);
}

cascader.value.push(convertLabelToText(JSON.parse(JSON.stringify(props.options))) || []);

function selectAddress(k: Address, index: number) {
  if (address.value[index]) {
    address.value[index] = k.text;
    if (isMobile()) {
      if (k.children) {
        address.value.push('请选择');
      }
    }
  } else {
    address.value.push(k.text);
  }
  if (k.children) {
    selected.value = index + 1;
  }
  if (index !== cascader.value.length - 1) {
    cascader.value.splice(index + 1);
    address.value.splice(index + 1);
  }
  if (k.children !== undefined && k.children.length > 0) {
    cascader.value.push(k.children);
  }
  emit('change', k.text, address.value.join(' '));
  if (k.children && k.children.length === 0) {
    selectCon.value = address.value.join(' ');
    showSelect.value = false;
  }
}

function reselectAddress(item: string, index: number) {
  selected.value = index;
  cascader.value.splice(index + 1);
  address.value.splice(index + 1);
  address.value[address.value.length - 1] = '请选择';
}

const bottom = ref('auto')

function selectOptions() {
  eventBus.emit('closeAllModals'); // 打开当前弹窗前关闭其他弹窗
  showSelect.value = true
  selectCon.value = ''
  showClear.value = 3
  bottom.value = 'auto'
  nextTick(() => {
    const viewportHeight = document.documentElement.clientHeight
    const inputHeight = document.querySelector('.easy-form-input')?.getBoundingClientRect().height
    const rectData = document.querySelector('.easy-form-select-options')?.getBoundingClientRect()
    if (viewportHeight - (rectData?.top ?? 0) + (inputHeight ?? 0) < (rectData?.height ?? 0)) {
      bottom.value = `${inputHeight}px`
    } else {
      bottom.value = 'auto'
    }
  })
}

onMounted(() => {
  eventBus.on('closeAllModals', () => {
    showSelect.value = false;
  });
});

onUnmounted(() => {
  eventBus.off('closeAllModals' , () => {
    showSelect.value = false;
  });
});
</script>

<style lang="less" scoped>
.easy-form-container-preview {
  border-radius: var(--easy-form-border-radius-component);
  box-sizing: border-box;

  .easy-form-label {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    .easy-form-title {
      width: var(--easy-form-container-width);
      font-size: 14px;
      border: 1px dashed transparent;
      box-sizing: border-box;
    }
  }

  .easy-form-content {
    .easy-form-textarea-container {
      position: relative;

      .easy-form-textarea {
        width: 100%;
        height: 120px;
        border-radius: var(--easy-form-border-radius-component-1);
        background: var(--easy-form-input-select-background-component);
        resize: none;
        border: 1px solid transparent;
        padding: 10px 12px 46px;
        box-sizing: border-box;
        outline: none;
        transition: all 0.2s linear;
        font-family: '微软雅黑';
        font-size: 14px;
        color: var(--easy-form-color-text-component-1);

        &:focus {
          border-color: var(--easy-form-primary-background-component);
        }

        &:hover {
          border-color: var(--easy-form-primary-background-component);
        }
      }

      .easy-form-recognize {
        width: 60px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: var(--easy-form-primary-background-component);
        color: #ffffff;
        position: absolute;
        right: 20px;
        bottom: 20px;
        font-size: 12px;
        border-radius: var(--easy-form-border-radius-component-1);
        cursor: pointer;
      }
    }

    .easy-form-info {

      .easy-form-name {
        font-size: 14px;
        margin: 3px 0 5px;
      }

      .easy-form-info-container {
        position: relative;

        .easy-form-info-input {
          width: 100%;
          height: 38px;
          border-radius: var(--easy-form-border-radius-component-1);
          background: var(--easy-form-input-select-background-component);
          border: 1px solid transparent;
          outline: none;
          padding: 0 12px;
          box-sizing: border-box;
          transition: all 0.2s linear;

          &:focus {
            border-color: var(--easy-form-primary-background-component);
          }

          &:hover {
            border-color: var(--easy-form-primary-background-component);
          }
        }

        .easy-form-clear {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 15px;
          margin: auto;
        }
      }

      .easy-form-info-select {
        position: relative;

        &:hover {
          .easy-form-input {
            border-color: var(--easy-form-primary-background-component);
          }
        }

        .easy-form-input {
          margin-top: 5px;
          width: 100%;
          height: 38px;
          border-radius: var(--easy-form-border-radius-component-1);
          background: var(--easy-form-input-select-background-component);
          outline: none;
          border: 1px solid transparent;
          cursor: pointer;
          padding: 0 12px;
          box-sizing: border-box;
          color: var(--easy-form-color-text-component-1);
          transition: all 0.2s linear;

          &:hover {
            border-color: var(--easy-form-primary-background-component);
          }
        }

        .easy-form-select-options {
          min-width: 33.3333333333%;
          position: absolute;
          bottom: var(--easy-form-bottom);
          left: 0;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #eaeaea;
          border-radius: var(--easy-form-border-radius-component-1);
          opacity: 0;
          cursor: none;
          pointer-events: none;
          transition: opacity 0.3s linear;
          z-index: 99;

          &-active {
            opacity: 1;
            cursor: pointer;
            pointer-events: all;
          }

          .easy-form-select-option {
            display: flex;

            .easy-form-options {
              width: 100%;
              max-height: 220px;
              overflow-y: auto;
              padding: 5px 0;
              border-right: 1px solid #eaeaea;
              box-sizing: border-box;
              background: var(--easy-form-input-bg-component-4);
              z-index: 9;

              &:nth-last-child(1) {
                border-right: none;
              }

              &::-webkit-scrollbar {
                width: 0px;
              }

              .easy-form-option {
                height: 36px;
                line-height: 36px;
                font-size: 14px;
                padding: 0 10px;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;

                &:hover {
                  background: var(--easy-form-background-component-4);
                }

                &-active {
                  color: var(--easy-form-primary-background-component);
                }

                .easy-form-arrow-right {
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  right: 10px;
                  margin: auto;
                }
              }
            }
          }
        }

        .easy-form-mobile-contents {
          width: 100vw;
          height: 100vh;
          background: var(--easy-form-background-component-6);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 99;

          .easy-form-mobile-content {
            width: 100%;
            min-height: 420px;
            border-radius: 20px 20px 0 0;
            padding: 0 12px env(safe-area-inset-bottom);
            position: fixed;
            left: 0;
            bottom: 100vh;
            z-index: 99;
            background: var(--easy-form-background-component-1);
            box-sizing: border-box;
            transition: bottom 0.3s linear;

            &-active {
              bottom: 0;
            }

            .easy-form-top {
              height: 54px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .easy-form-selected-info {
              margin: 20px 0;

              .easy-form-selected-item {
                display: flex;
                align-items: center;
                margin-top: 15px;

                .easy-form-circle {
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                  background: rgb(238, 238, 238);
                  position: relative;

                  &:after {
                    content: '';
                    width: 1px;
                    height: 35px;
                    background: rgb(238, 238, 238);
                    position: absolute;
                    left: 3px;
                    top: 5px;
                  }
                }

                &:nth-last-child(1) {
                  .easy-form-circle {
                    &:after {
                      display: none;
                    }
                  }
                }

                &-active {
                  color: var(--easy-form-primary-background-component);

                  .easy-form-circle {
                    background: var(--easy-form-primary-background-component);
                  }
                }

                .easy-form-selected-text {
                  font-size: 14px;
                  margin-left: 20px;
                }
              }
            }

            .easy-form-ws-cascader-container {
              .easy-form-ws-selected {
                height: 50vh;
                overflow-y: auto;
              }

              p {
                font-size: 12px;
                color: #d8d8d8;
              }

              .easy-form-ws-cascader-item {
                padding: 5px 0;
                box-sizing: border-box;

                &-active {
                  color: var(--easy-form-primary-background-component);
                }
              }

              &::-webkit-scrollbar {
                width: 0;
              }
            }
          }
        }

        .easy-form-icon {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 10px;
          margin: auto;
          transition: transform 0.2s linear;

          &-active {
            transform: rotate(180deg);
          }
        }

        .easy-form-clear {
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          right: 15px;
        }
      }
    }
  }
}
</style>
