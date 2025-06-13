<template>
  <div id="box" class="easy-form-box">
    <div class="easy-form-label">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-box-content">{{ props.title }}</div>
    </div>
    <div v-if="error !== ''" class="easy-form-error">{{ error }}</div>
    <div class="easy-form-time-picker">
      <div class="easy-form-time-selector-box">
        <SvgIcon class="easy-form-img" name="time_selector"/>
        <input
            :value="formattedTime"
            class="easy-form-fill-input"
            readonly
            type="text"
            :placeholder="placeholder"
            @click.stop="selectTimePicker"/>
      </div>
      <div v-if="showPicker && !isMobile()"
           class="easy-form-picker-panel"
           :style="{'--easy-form-bottom':`${bottom}`}">
        <div class="easy-form-picker-content">
          <div class="easy-form-picker-list hour-list">
            <div v-for="hour in hourList" :key="hour"
                 :class="['easy-form-picker-cell',selectHour === hour ? 'easy-form-picker-cell-active' : '']"
                 @click.stop="selectTime('hour',hour)">
              <span>{{ hour }}</span>
            </div>
          </div>
          <div class="easy-form-picker-list minute-list">
            <div v-for="minute in minuteAndSecond" :key="minute"
                 :class="['easy-form-picker-cell',selectMinute === minute ? 'easy-form-picker-cell-active' : '']"
                 @click.stop="selectTime('minute',minute)">
              <span>{{ minute }}</span>
            </div>
          </div>
          <div class="easy-form-picker-list second-list" v-if="props.isHasSecond">
            <div v-for="second in minuteAndSecond" :key="second"
                 :class="['easy-form-picker-cell',selectSecond === second ? 'easy-form-picker-cell-active' : '']"
                 @click.stop="selectTime('second',second)">
              <span>{{ second }}</span>
            </div>
          </div>
        </div>
        <div class="easy-form-hand-btn">
          <div class="easy-form-hand-now" @click.stop="confirmNow">此刻</div>
          <div class="easy-form-hand-ok" @click.stop="confirmSelection">确定</div>
        </div>
      </div>
      <div v-if="showPicker && isMobile()" class="easy-form-picker-panel-mobile-container">
        <div class="easy-form-picker-panel-mobile"
             :style="{'--easy-form-bottom':`${bottom}`}">
          <div class="easy-form-picker-content">
            <div class="easy-form-picker-list hour-list">
              <div v-for="hour in hourList" :key="hour"
                   :class="['easy-form-picker-cell',selectHour === hour ? 'easy-form-picker-cell-active' : '']"
                   @click.stop="selectTime('hour',hour)">
                <span>{{ hour }}</span>
              </div>
            </div>
            <div class="easy-form-picker-list minute-list">
              <div v-for="minute in minuteAndSecond" :key="minute"
                   :class="['easy-form-picker-cell',selectMinute === minute ? 'easy-form-picker-cell-active' : '']"
                   @click.stop="selectTime('minute',minute)">
                <span>{{ minute }}</span>
              </div>
            </div>
            <div class="easy-form-picker-list second-list" v-if="props.isHasSecond">
              <div v-for="second in minuteAndSecond" :key="second"
                   :class="['easy-form-picker-cell',selectSecond === second ? 'easy-form-picker-cell-active' : '']"
                   @click.stop="selectTime('second',second)">
                <span>{{ second }}</span>
              </div>
            </div>
          </div>
          <div class="easy-form-hand-btn">
            <div class="easy-form-hand-now" @click.stop="confirmNow">此刻</div>
            <div class="easy-form-hand-ok" @click.stop="confirmSelection">确定</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, defineProps, nextTick, PropType, ref, onMounted, onUnmounted} from 'vue';
import SvgIcon from "../../package/svg-icon/index.vue";
import {getDistance, isMobile} from "../utils";
import { eventBus } from '../eventBus';

const props = defineProps({
  title: {
    type: String,
    default: '日期'
  },
  isHasSecond: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: [Number, undefined] as PropType<number | undefined>,
    default: undefined,
  },
  error: {
    type: String,
    default: ''
  },
  placeholder:{
    type: String,
    default:'请选择'
  }
})
const emit = defineEmits(['update:modelValue', 'ok', 'now']);

const bindValue = ref(props.modelValue)

const showPicker = ref(false);
const isShowValue = ref(props.modelValue !== undefined)
const selectHour = ref<string | undefined>(bindValue.value !== undefined ? new Date(bindValue.value).getHours().toString() : '00');
const selectMinute = ref<string | undefined>(bindValue.value !== undefined ? new Date(bindValue.value).getMinutes().toString() : '00');
const selectSecond = ref<string | undefined>(bindValue.value !== undefined && props.isHasSecond ? new Date(bindValue.value).getSeconds().toString() : '00');

const formattedTime = computed(() => {
  if (isShowValue.value) {
    if (props.isHasSecond) {
      return `${selectHour.value?.toString().padStart(2, '0')}:${selectMinute.value?.toString().padStart(2, '0')}:${selectSecond.value?.toString().padStart(2, '0')}`;
    } else {
      return `${selectHour.value?.toString().padStart(2, '0')}:${selectMinute.value?.toString().padStart(2, '0')}`;
    }
  }
  return ''
});
const hourList = ref(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']);
const minuteAndSecond = ref(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']);

function selectTime(type: string, val: string) {
  if (type === 'hour') {
    selectHour.value = val
  }
  if (type === 'minute') {
    selectMinute.value = val
  }
  if (type === 'second') {
    selectSecond.value = val
  }
  const nowTime = new Date()
  if (props.isHasSecond) {
    if (selectHour.value !== undefined && selectMinute.value !== undefined && selectSecond.value !== undefined) {
      isShowValue.value = true
      const [hour, minute, second] = formattedTime.value.split(':')
      nowTime.setHours(parseInt(hour))
      nowTime.setMinutes(parseInt(minute))
      nowTime.setSeconds(parseInt(second))
      const timestamp = nowTime.getTime()
      emit('update:modelValue', Math.floor(timestamp / 1000))
    }
  } else {
    if (selectHour.value !== undefined && selectMinute.value !== undefined) {
      isShowValue.value = true
      const [hour, minute] = formattedTime.value.split(':')
      nowTime.setHours(parseInt(hour))
      nowTime.setMinutes(parseInt(minute))
      nowTime.setSeconds(0)
      const timestamp = nowTime.getTime()
      emit('update:modelValue', Math.floor(timestamp / 1000))
    }
  }
}

function confirmNow() {
  selectHour.value = new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`
  selectMinute.value = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`
  selectSecond.value = new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : `${new Date().getSeconds()}`
  isShowValue.value = true
  showPicker.value = false
  emit('update:modelValue', Math.floor(Date.now() / 1000))
}


const confirmSelection = () => {
  showPicker.value = false;
  isShowValue.value = true;
  console.log(formattedTime.value)
  const nowTime = new Date()
  const [hour, minute, second] = formattedTime.value.split(':')
  console.log(hour, minute, second)
  nowTime.setHours(parseInt(hour))
  nowTime.setMinutes(parseInt(minute))
  nowTime.setSeconds(parseInt(second ?? '00'))
  const timestamp = nowTime.getTime()
  emit('update:modelValue', Math.floor(timestamp / 1000))
}

document.addEventListener('click', function () {
  showPicker.value = false
})

const bottom = ref('auto')

function selectTimePicker() {
  eventBus.emit('closeAllModals'); // 打开当前弹窗前关闭其他弹窗
  showPicker.value = true
  bottom.value = 'auto'
  nextTick(() => {
    const viewportHeight = document.documentElement.clientHeight
    const inputHeight = document.querySelector('.easy-form-fill-input')?.getBoundingClientRect().height
    const rectData = document.querySelector('.easy-form-picker-panel')?.getBoundingClientRect()
    if (viewportHeight - (rectData?.top ?? 0) + (inputHeight ?? 0) < (rectData?.height ?? 0)) {
      bottom.value = `${inputHeight}px`
    } else {
      bottom.value = 'auto'
    }
  })
}

onMounted(() => {
  eventBus.on('closeAllModals', () => {
    showPicker.value = false;
  });
});

onUnmounted(() => {
  eventBus.off('closeAllModals', () => {
    showPicker.value = false;
  });
});
</script>

<style lang="less" scoped>
.easy-form-disable {
  color: #ccc;
  cursor: not-allowed;
  pointer-events: none; /* 禁止鼠标事件 */
}

.easy-form-box {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--easy-form-component-background);
  border-radius: var(--easy-form-border-radius-component);

  .easy-form-label {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .easy-form-fill-input {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    padding: var(--easy-form-select-padding-component);
    padding-left: 38px;
    background: var(--easy-form-input-bg-component-2);
    font-size: 14px;
    border: 1px dashed transparent;
    border-radius: 4px;

    &:focus {
      border: 1px solid blue;
      outline: none;
      transition: border 0.3s ease;
    }

  }
}

.easy-form-time-selector-box {
  position: relative;
  margin-top: 5px;
  width: 100%;

  .easy-form-img {
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}

.easy-form-time-picker {
  width: 100%;
  position: relative;
  display: inline-block;

  .easy-form-picker-panel {
    position: absolute;
    background-color: var(--easy-form-background-component-1);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 180px;
    padding: 10px;
    box-sizing: border-box;
    z-index: 1;
    bottom: var(--easy-form-bottom)
  }

  .easy-form-picker-panel-mobile-container {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .6);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: end;
    z-index: 99;


    .easy-form-picker-panel-mobile {
      width: 100%;
      background-color: var(--easy-form-background-component-1);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 10px;
      box-sizing: border-box;
    }
  }


}

.easy-form-picker-content {
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 11px;
  justify-content: space-between;
}

.easy-form-picker-list {
  flex: 1;
  max-height: 200px;
  overflow-y: auto;
  margin: 5px 0;
}

.easy-form-picker-list::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}

.easy-form-picker-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  height: 20px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e3e2e2;
}

.easy-form-picker-cell {
  padding: 5px;
  text-align: center;
  cursor: pointer;

  &-active {
    background: var(--easy-form-input-bg-component-2);
    color: #409eff;
  }
}

.easy-form-picker-cell:hover {
  background: var(--easy-form-input-bg-component-2);
  color: #409eff;
}

.easy-form-invisible-placeholder {
  display: inline-block;
  width: 20px;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.easy-form-hand-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .easy-form-hand-ok, .easy-form-hand-now {
    padding: 4px 12px;
    display: inline-block;
    background: #409eff;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    font-size: 12px;
  }

  .easy-form-hand-now {
    background: var(--easy-form-input-bg-component-2);
    color: var(--easy-form-color-text-component-2);
    font-weight: normal;
  }
}


.easy-form-box-content {
  font-size: 14px;
  color: var(--easy-form-color-text-component-1);
  background: var(--easy-form-input-bg-component);
  border-radius: 4px;
}
</style>