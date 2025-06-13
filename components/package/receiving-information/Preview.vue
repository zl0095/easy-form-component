<template>
  <div class="easy-form-container-preview">
    <div class="easy-form-label">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-title">{{ title }}</div>
    </div>
    <div class="easy-form-error" v-if="error !== ''">{{ error }}</div>
    <div class="easy-form-content">
      <div class="easy-form-textarea-container">
        <textarea v-model="textarea" class="easy-form-textarea"
                  placeholder="粘贴信息，自动拆分姓名、电话和地址"></textarea>
        <div class="easy-form-recognize" @click="recognize">识别</div>
      </div>
      <div class="easy-form-info">
        <div class="easy-form-name">收货人</div>
        <div class="easy-form-info-container">
          <input v-model="modelValue.name" class="easy-form-info-input" placeholder="请输入收货人" type="text"
                 @blur="(e)=>(showClear=1,emit('blurName',modelValue.name,e))"
                 @focus="(e)=>(showClear=1,emit('focusName',modelValue.name,e))"
                 @input="(e)=>(showClear=1,emit('inputName',modelValue.name,e))"/>
          <SvgIcon v-if="modelValue.name && allowClear && showClear === 1" class="easy-form-clear"
                   name="clear" @click="()=>modelValue.name=''"></SvgIcon>
        </div>
      </div>
      <div class="easy-form-info">
        <div class="easy-form-name">手机号码</div>
        <div class="easy-form-info-container">
          <input v-model="modelValue.phone" class="easy-form-info-input" placeholder="请输入手机号码"
                 type="number"
                 @blur="(e)=>(showClear=2,emit('blurPhone',modelValue.name,e))"
                 @focus="(e)=>(showClear=2,emit('focusPhone',modelValue.name,e))"
                 @input="(e)=>(showClear=2,emit('inputPhone',modelValue.name,e))"/>
          <SvgIcon v-if="modelValue.phone && allowClear && showClear === 2" class="easy-form-clear"
                   name="clear" @click="()=>modelValue.phone=''"></SvgIcon>
        </div>
      </div>
      <div class="easy-form-info">
        <div class="easy-form-name">选择区域</div>
        <div class="easy-form-info-select">
          <input v-model="modelValue.area" class="easy-form-input" placeholder="请选择区域" readonly type="text"
                 @click.stop="()=>(eventBus.emit('closeAllModals'),showSelect=true,modelValue.area = '',showClear=3,assemblyData())"/>
          <SvgIcon v-if="!modelValue.area" :class="['easy-form-icon',showSelect ? 'easy-form-icon-active' : '']"
                   :height="10" :width="10"
                   name="arrow_down"></SvgIcon>
          <SvgIcon v-if="modelValue.area && allowClear && showClear === 3" class="easy-form-clear"
                   name="clear"
                   @click.stop="()=>(modelValue.area='',address=[],cascader.splice(1),selected=0)"></SvgIcon>
          <div v-if="showSelect && !isMobile()" :style="{'width':`${cascader.length * 33.333333333333333}%`}"
               class="easy-form-select-options">
            <div class="easy-form-select-option">
              <div v-for="(item,index) in cascader" :key="index"
                   class="easy-form-options">
                <div v-for="(k,v) in item" :key="v"
                     :class="['easy-form-option',address[index] === k.text ? 'easy-form-option-active' : '']"
                     @click.stop="()=>selectAddress(k,index)">
                  {{ k.text }}
                  <SvgIcon v-if="k.children" :height="15" :width="15" class="easy-form-arrow-right"
                           name="arrow_right"></SvgIcon>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showSelect && isMobile()" class="easy-form-mobile-contents" @click.stop="showSelect=true">
            <div class="easy-form-mobile-content">
              <div class="easy-form-top">
                <div class="easy-form-title">请选择你的地址</div>
                <SvgIcon :height="15" :width="15" name="close"
                         @click.stop="()=>(showSelect = false,modelValue.area = address.join(' '))"></SvgIcon>
              </div>
              <div class="easy-form-selected-info">
                <div v-for="(item,index) in address" :key="index"
                     :class="['easy-form-selected-item',selected === index ? 'easy-form-selected-item-active' : '']"
                     @click.stop="reselectAddress(item,index)">
                  <div class="easy-form-circle"></div>
                  <div class="easy-form-selected-text">{{ item }}</div>
                </div>
              </div>
              <div v-for="(item,index) in cascader" :key="index" class="easy-form-ws-cascader-container">
                <div v-if="index === selected" class="easy-form-ws-selected">
                  <p>请选择{{ index === 0 ? '省份' : index === 1 ? '城市' : '区/县' }}</p>
                  <div>
                    <div v-for="(k,v) in item" :key="v"
                         :class="['easy-form-ws-cascader-item',address[selected] === k.text ? 'easy-form-ws-cascader-item-active':'']"
                         @click.stop="selectAddress(k,index)">
                      {{ k.text }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="easy-form-info">
        <div class="easy-form-name">详细地址</div>
        <div class="easy-form-info-container">
          <input v-model="modelValue.detailAddress" class="easy-form-info-input" placeholder="请输入详细地址"
                 type="text"
                 @blur="(e)=>(showClear=4,emit('blurDetail',modelValue.name,e))"
                 @focus="(e)=>(showClear=4,emit('focusDetail',modelValue.name,e))"
                 @input="(e)=>(showClear=4,emit('inputDetail',modelValue.name,e))"/>
          <SvgIcon v-if="modelValue.detailAddress && allowClear && showClear === 4"
                   class="easy-form-clear" name="clear" @click="()=>modelValue.detailAddress=''"></SvgIcon>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {type PropType, ref, watch,onMounted,onUnmounted} from 'vue'
import {getList} from '../area'
import {isMobile} from "../utils";
import AddressParse, {type OptionType} from 'zh-address-parse';
import SvgIcon from "../../package/svg-icon/index";
import { eventBus } from '../eventBus'

interface Address {
  text: string,
  value: string,
  children?: Address[]
}

const options: OptionType = {
  type: 0, // 哪种方式解析，0: 正则，1: 树查找
  textFilter: [], // 预清洗的字段
  nameMaxLength: 4, // 查找最大的中文名字长度
  extraGovData: {
    city: [{name: 'name', code: 'code', provinceCode: 'provinceCode'}],
    province: [{name: 'name', code: 'code'}],
    area: [{name: 'name', code: 'code', provinceCode: 'provinceCode', cityCode: 'cityCode'}]
  }
}
const textarea = ref('')
const props = defineProps({
  title: {
    type: String,
    default: '请输入收货信息'
  },
  modelValue: {
    type: Object as PropType<{ name: string, phone: string, area: string, detailAddress: string }>,
    default: {
      name: '',
      phone: '',
      area: '',
      detailAddress: ''
    }
  },
  error: {
    type: String,
    default: ''
  },
  allowClear: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['change', 'update:modelValue', 'focusName', 'blurName', 'inputName', 'focusPhone', 'blurPhone', 'inputPhone', 'focusDetail', 'blurDetail', 'inputDetail'])
const cascader = ref<Address[][]>([])
const showSelect = ref(false)
const address = ref<string[]>([])
const showClear = ref(0)
const selected = ref(0)

document.addEventListener('click', function () {
  showSelect.value = false
});

watch(() => props.modelValue, (oldValue, newValue) => {
  if (newValue !== oldValue) {
    emit('update:modelValue', props.modelValue)
  }
})

document.addEventListener('click', function () {
  showSelect.value = false
})


const region: Address[] = getList('province')
region.forEach((item, index) => {
  region[index].children = getList('city', item.value.slice(0, 2))
  region[index]?.children?.forEach((item1, key) => {
    region[index].children![key].children = getList('county', item1.value.slice(0, 4))
  })
})
cascader.value.push(region)

function assemblyData() {
  region.forEach((item, index) => {
    if (item.text === address.value[index]) {
      if (item.children !== undefined) {
        cascader.value.push(item.children)
        item.children.forEach((item1, index1) => {
          if (item1.text === address.value[index1]) {
            if (item1.children !== undefined) {
              cascader.value.push(item1.children)
            }
          }
        })
      }
    }
  })
}

function selectAddress(k: Address, index: number) {
  if (address.value[index]) {
    address.value[index] = k.text
    if (isMobile()) {
      if (index === 1) {
        address.value.push('请选择区/县')
      } else if (index === 0) {
        address.value.push('请选择城市')
      }
    }
  } else if(address.value[index] === undefined) {
    address.value.push(k.text)
  }else {
    address.value[index] = k.text
  }
  if (index !== 2) {
    selected.value = index + 1
  }
  if (index !== 2) {
    cascader.value.splice(index + 1)
    if (k.children !== undefined) {
      cascader.value.push(k.children)
    }
  }
  emit('change', k.text, address.value.join(' '))
  if (index === 2) {
    props.modelValue.area = address.value.join(' ')
    showSelect.value = false
  }
}

function reselectAddress(item: string, index: number) {
  selected.value = index
  cascader.value.splice(index + 1)
  address.value.splice(index + 1)
  if (index === 1) {
    address.value[address.value.length - 1] = '请选择城市'
  } else if (index === 2) {
    address.value[address.value.length - 1] = '请选择区/县'
  } else {
    address.value[address.value.length - 1] = '请选择省份'
  }
}

function recognize() {
  const parseResult = AddressParse(textarea.value, options)
  props.modelValue.name = parseResult.name
  props.modelValue.phone = parseResult.phone
  props.modelValue.area = `${parseResult.province} ${parseResult.city} ${parseResult.area}`
  props.modelValue.detailAddress = parseResult.detail
  address.value = [parseResult.province, parseResult.city, parseResult.area]
  region.forEach((item, index) => {
    if (item.text === parseResult.province) {
      if (item.children !== undefined) {
        cascader.value.push(item.children)
        item.children.forEach((item1, index1) => {
          if (item1.text === parseResult.city) {
            if (item1.children !== undefined) {
              cascader.value.push(item1.children)
            }
          }
        })
      }
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
        margin-top: 5px;
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
      margin-bottom: 10px;

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
          top: 38px;
          left: 0;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
          border: 1px solid #eaeaea;
          border-radius: var(--easy-form-border-radius-component-1);

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
            bottom: 0;
            z-index: 99;
            background: var(--easy-form-background-component-1);
            box-sizing: border-box;

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