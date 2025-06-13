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
                 @blur="(e) => ((showBorder = false), (showBackground = 1), emit('blurTitle', propsModelValue.title, e))"
                 @focus="(e) => ((showBorder = true), (showBackground = 1), emit('focusTitle', propsModelValue.title, e))"
                 @input="(e) => watchTitleInput(propsModelValue.title, e)"/>
          <div class="easy-form-clear">
            <SvgIcon name="clear" v-if="showBackground === 1 && allowClear && propsModelValue.title !== '' "
                     class="easy-form-clear-img" @click.stop.prevent="() => (propsModelValue.title = '')"/>
          </div>
        </div>
      </div>
      <div class="easy-form-operation">
        <slot name="operation"></slot>
      </div>
    </div>
    <div class="easy-form-content">
      <div class="easy-form-info">
        <div class="easy-form-name">收货人</div>
        <div class="easy-form-info-input"></div>
      </div>
      <div class="easy-form-info">
        <div class="easy-form-name">手机号码</div>
        <div class="easy-form-info-input"></div>
      </div>
      <div class="easy-form-info">
        <div class="easy-form-name">选择地区</div>
        <div class="easy-form-info-select">
          <div class="easy-form-info-select-item">
            <input v-model="provincesAndMunicipalities[0].text"
                   :class="['easy-form-input', provincesAndMunicipalities[0].show ? 'easy-form-input-active' : '']"
                   :placeholder="provincesAndMunicipalities[0].placeholder" readonly type="text"
                   @click.stop="() => (provincesAndMunicipalities[0].show = !provincesAndMunicipalities[0].show)"/>
            <div v-if="provincesAndMunicipalities[0].show" class="easy-form-options">
              <div v-for="(item, index) in provinceList" :key="index"
                   :class="['easy-form-option', item.text === provincesAndMunicipalities[0].text ? 'easy-form-option-active' : '']"
                   @click.stop="() => selectProvinces(item)">
                {{ item.text }}
              </div>
            </div>
            <SvgIcon :class="['easy-form-icon', provincesAndMunicipalities[0].show ? 'easy-form-icon-active' : '']"
                     :height="10" :width="10" name="arrow_down"></SvgIcon>
          </div>
          <div class="easy-form-info-select-item">
            <input v-model="provincesAndMunicipalities[1].text"
                   :class="['easy-form-input', provincesAndMunicipalities[1].show ? 'easy-form-input-active' : '']"
                   :placeholder="provincesAndMunicipalities[1].placeholder" readonly type="text"
                   @click.stop="() => (provincesAndMunicipalities[1].show = !provincesAndMunicipalities[1].show)"/>
            <div v-if="provincesAndMunicipalities[1].show && provincesAndMunicipalities[0].text !== ''"
                 class="easy-form-options">
              <div v-for="(item, index) in cityList" :key="index"
                   :class="['easy-form-option', item.text === provincesAndMunicipalities[1].text ? 'easy-form-option-active' : '']"
                   @click.stop="() => selectCity(item)">
                {{ item.text }}
              </div>
            </div>
            <SvgIcon :class="['easy-form-icon', provincesAndMunicipalities[1].show ? 'easy-form-icon-active' : '']"
                     :height="10" :width="10" name="arrow_down"></SvgIcon>
          </div>
          <div class="easy-form-info-select-item">
            <input v-model="provincesAndMunicipalities[2].text"
                   :class="['easy-form-input', provincesAndMunicipalities[2].show ? 'easy-form-input-active' : '']"
                   :placeholder="provincesAndMunicipalities[2].placeholder" readonly type="text"
                   @click.stop="() => (provincesAndMunicipalities[2].show = !provincesAndMunicipalities[2].show)"/>
            <div v-if="provincesAndMunicipalities[2].show && provincesAndMunicipalities[1].text !== ''"
                 class="easy-form-options">
              <div v-for="(item, index) in countryList" :key="index"
                   :class="['easy-form-option', item.text === provincesAndMunicipalities[2].text ? 'easy-form-option-active' : '']"
                   @click.stop="() => ((provincesAndMunicipalities[2].text = item.text), (provincesAndMunicipalities[2].show = false))">
                {{ item.text }}
              </div>
            </div>
            <SvgIcon :class="['easy-form-icon', provincesAndMunicipalities[2].show ? 'easy-form-icon-active' : '']"
                     :height="10" :width="10" name="arrow_down"></SvgIcon>
          </div>
        </div>
      </div>
      <div class="easy-form-info">
        <div class="easy-form-name">详细地址</div>
        <div class="easy-form-info-input"></div>
      </div>
    </div>
    <p class="easy-form-set-switch" v-if="isRequiredShow">
      <span class="easy-form-tit">是否必填</span>
      <Switch @change="()=>emit('update:modelValue',propsModelValue)" size="small"
              v-model:checked="propsModelValue.required"></Switch>
    </p>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, type PropType, ref} from 'vue';
import {getList} from '../area';
import SvgIcon from "@/package/svg-icon/index";
import Switch from "@/package/common/Switch.vue";

const showBorder = ref(false);
const showBackground = ref(0);
const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      required: boolean;
      error: string
    }>,
    default: () => ({
      title: '请输入收货信息',
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
const emit = defineEmits(['blurTitle', 'focusTitle', 'inputTitle', 'update:modelValue']);
const provincesAndMunicipalities = ref([
  {show: false, text: '', placeholder: '请选择省份'},
  {show: false, text: '', placeholder: '请选择城市'},
  {show: false, text: '', placeholder: '请选择区县'},
]);
const provinceList = ref<{ value: string; text: string }[]>(getList('province'));
const cityList = ref<{ value: string; text: string }[]>([]);
const countryList = ref<{ value: string; text: string }[]>([]);
const propsModelValue = ref(JSON.parse(JSON.stringify(props.modelValue)))

document.addEventListener('click', function () {
  provincesAndMunicipalities.value.forEach(item => {
    item.show = false
  });
});

function selectProvinces(item: { value: string; text: string }) {
  cityList.value = getList('city', item.value?.slice(0, 2));
  provincesAndMunicipalities.value.forEach((provinces, index) => {
    if (index === 0) {
      provinces.text = item.text;
    } else if (index === 1) {
      provinces.text = '';
      provinces.placeholder = '请选择城市';
    } else {
      provinces.text = '';
      provinces.placeholder = '请选择区县';
    }
    provinces.show = false;
  });
}

function selectCity(item: { value: string; text: string }) {
  countryList.value = getList('county', item.value.slice(0, 4));
  provincesAndMunicipalities.value.forEach((city, index) => {
    if (index === 1) {
      city.text = item.text;
    } else if (index === 2) {
      city.text = '';
      city.placeholder = '请选择区县';
    }
    city.show = false;
  });
}

function watchTitleInput(title: string, event: Event) {
  emit('update:modelValue', propsModelValue.value);
  emit('inputTitle', title, event);
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
      padding: 2px 35px;
      color: red;
      font-size: 12px;
    }
  }

  .easy-form-content {
    max-width: 50%;
    margin-top: 10px;
    margin-left: 35px;

    .easy-form-info {
      margin-bottom: 10px;

      .easy-form-name {
        margin: 3px 0 5px;
        color: var(--easy-form-color-text-component-5);
        font-size: 12px;
      }

      .easy-form-info-input {
        width: 100%;
        height: 38px;
        background: var(--easy-form-input-select-background-component);
        border-radius: var(--easy-form-border-radius-component-1);
      }

      .easy-form-info-select {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        .easy-form-info-select-item {
          position: relative;
          width: 32%;

          .easy-form-input {
            box-sizing: border-box;
            width: 100%;
            height: 38px;
            padding: 0 12px;
            color: var(--easy-form-color-text-component-1);
            background: var(--easy-form-input-select-background-component);
            border: 1px solid transparent;
            border-radius: var(--easy-form-border-radius-component-1);
            outline: none;
            cursor: pointer;

            &-active {
              border-color: var(--easy-form-primary-background-component);
            }
          }

          .easy-form-options {
            position: absolute;
            top: 38px;
            left: 0;
            z-index: 100;
            box-sizing: border-box;
            width: 100%;
            max-height: 300px;
            padding: 5px 0;
            overflow-y: auto;
            background: var(--easy-form-input-bg-component-4);
            border: 1px solid #d8d8d8;
            border-radius: var(--easy-form-border-radius-component-1);
            box-shadow: 0 0 10px 0 rgb(78 89 105 / 5%);

            &::-webkit-scrollbar {
              width: 0;
            }

            .easy-form-option {
              box-sizing: border-box;
              height: 36px;
              padding: 0 10px;
              font-size: 14px;
              line-height: 36px;
              cursor: pointer;
              color: var(--easy-form-color-text-component-1);

              &:hover {
                background: var(--easy-form-background-component-4);
              }

              &-active {
                color: var(--easy-form-primary-background-component);
              }
            }
          }

          .easy-form-icon {
            position: absolute;
            top: 0;
            right: 10px;
            bottom: 0;
            margin: auto;
            transition: transform 0.2s linear;

            &-active {
              transform: rotate(180deg);
            }
          }
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
