<template>
  <div class="easy-form-container-preview">
    <div class="easy-form-label">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-box-content">{{ props.title }}</div>
    </div>
    <div class="easy-form-error" v-if="error !== ''">{{ error }}</div>
    <div class="easy-form-date-picker-input">
      <input
          :value="formattedDate"
          class="easy-form-fill-input"
          readonly
          type="text"
          :placeholder="placeholder"
          @click.stop="selectDate"
      />
      <SvgIcon name="date_picker" :width="16" :height="16" class="easy-form-date-packer"/>
      <div v-if="showCalendar && !isMobile()" class="easy-form-calendar" :style="{'--easy-form-bottom':`${bottom}`}">
        <div class="easy-form-tabs" v-if="isSelectTime">
          <div :class="['easy-form-tab',showType === 1 ? 'easy-form-tab-active' : '']" @click.stop="()=>showType=1">日期
          </div>
          <div :class="['easy-form-tab',showType === 2 ? 'easy-form-tab-active' : '']" @click.stop="()=>showType=2">
            时间
          </div>
        </div>
        <div class="easy-form-tabs" v-if="isHalfday">
          <div :class="['easy-form-tab',showType === 1 ? 'easy-form-tab-active' : '']" @click.stop="()=>showType=1">日期
          </div>
          <div :class="['easy-form-tab',showType === 3 ? 'easy-form-tab-active' : '']" @click.stop="()=>showType=3">
            上午/下午
          </div>
        </div>
        <div v-if="showType === 1">
          <div v-show="showHeader"
               :style="{borderTop:isSelectTime ? '1px solid var(--easy-form-border-color-component-light-1)' : 'none'}"
               class="easy-form-header">
            <button class="easy-form-height-light" @click.stop="preYear">
              <SvgIcon name="double_left"/>
            </button>
            <button class="easy-form-height-light" @click.stop="preMonth">
              <SvgIcon name="left"/>
            </button>
            <button class="easy-form-height-light" @click.stop="toggleYearPicker"><span>{{ year }} 年</span></button>
            <button class="easy-form-height-light" @click.stop="toggleMonthPicker"><span>{{ month }} 月</span></button>
            <button class="easy-form-height-light" @click.stop="nextMonth">
              <SvgIcon name="right"/>
            </button>
            <button class="easy-form-height-light" @click.stop="nextYear">
              <SvgIcon name="double_right"/>
            </button>
          </div>
          <div v-show="yearPickerVisible" class="easy-form-year-picker">
            <div
                v-for="year in yearRange"
                :key="year"
                class="easy-form-year-picker-item"
                @click.stop="selectYear(year)"
            >
              {{ year }}
            </div>
          </div>
          <div v-show="monthPickerVisible" class="easy-form-month-picker"
               style="display: flex;flex-wrap: wrap;cursor: pointer;padding:5px">
            <div
                v-for="i in 12"
                :key="'month-' + i"
                class="easy-form-month-picker-item"
                @click.stop="selectMonth(i - 1)"
            >
              {{ i }}月
            </div>
          </div>
          <div v-show="calendarList">
            <div class="easy-form-weekdays">
              <span v-for="day in weekdays" :key="day">{{ day }}</span>
            </div>
            <!--      月份的展示-->
            <div class="easy-form-days">
              <div v-for="i in [0,1,2,3,4,5]" :key="i" class="easy-form-days-row">
<!--                {{daysInMonth.slice(i*7, i*7+7)}}-->
                <button
                    v-for="day in daysInMonth.slice(i*7, i*7+7)"
                    :key="`${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`"
                    :class="{
                'easy-form-selected': day.getFullYear()===current.getFullYear() && day.getMonth()===current.getMonth() && day.getDate()===current.getDate(),
                'easy-form-today': day.getFullYear()===(new Date()).getFullYear() && day.getMonth()===(new Date()).getMonth() && day.getDate()===(new Date()).getDate(),
                'easy-form-other-month': day.getMonth() != current.getMonth(),
              }"
                    @click.stop="selectDay(day)"
                >
                  <div>{{ day.getDate() }}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="showType === 2">
          <div class="easy-form-picker-panel">
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
            </div>
            <div class="easy-form-hand-btn">
              <div class="easy-form-hand-now" @click.stop="confirmNow">此刻</div>
              <div class="easy-form-hand-ok" @click.stop="confirmSelection">确定</div>
            </div>
          </div>
        </div>
        <div class="easy-form-picker-panel" v-else>
          <div class="easy-form-picker-content">
            <div class="easy-form-picker-list am-pm-list" style="padding-top: 100px">
              <div
                  v-for="ampm in ['上午', '下午']"
                  :key="ampm"
                  :class="['easy-form-picker-cell', selectAmPm === ampm ? 'easy-form-picker-cell-active' : '']"
                  @click.stop="selectDataAmPm(ampm)"
              >
                <span>{{ ampm }}</span>
              </div>
            </div>
          </div>
          <div class="easy-form-hand-btn">
            <div class="easy-form-hand-ok" @click.stop="confirmSelection">确定</div>
          </div>
        </div >
      </div>
      <div v-if="showCalendar && isMobile()" class="easy-form-calendar-mobile-container">
        <div class="easy-form-calendar easy-form-calendar-mobile" :style="{'--easy-form-bottom':`${bottom}px`}">
          <div class="easy-form-tabs" v-if="isSelectTime">
            <div :class="['easy-form-tab',showType === 1 ? 'easy-form-tab-active' : '']" @click.stop="()=>showType=1">日期
            </div>
            <div :class="['easy-form-tab',showType === 2 ? 'easy-form-tab-active' : '']" @click.stop="()=>showType=2">
              时间
            </div>
          </div>
          <div class="easy-form-tabs" v-if="isSelectTime">
            <div :class="['easy-form-tab',showType === 1 ? 'easy-form-tab-active' : '']" @click.stop="()=>showType=1">日期
            </div>
            <div :class="['easy-form-tab',showType === 3 ? 'easy-form-tab-active' : '']" @click.stop="()=>showType=3">
              上午/下午
            </div>
          </div>
          <div v-if="showType === 1">
            <div v-show="showHeader"
                 :style="{borderTop:isSelectTime ? '1px solid var(--easy-form-border-color-component-light-1)' : 'none'}"
                 class="easy-form-header">
              <button class="easy-form-height-light" @click.stop="preYear">
                <SvgIcon name="double_left"/>
              </button>
              <button class="easy-form-height-light" @click.stop="preMonth">
                <SvgIcon name="left"/>
              </button>
              <button class="easy-form-height-light" @click.stop="toggleYearPicker"><span>{{ year }} 年</span></button>
              <button class="easy-form-height-light" @click.stop="toggleMonthPicker"><span>{{ month }} 月</span>
              </button>
              <button class="easy-form-height-light" @click.stop="nextMonth">
                <SvgIcon name="right"/>
              </button>
              <button class="easy-form-height-light" @click.stop="nextYear">
                <SvgIcon name="double_right"/>111
              </button>
            </div>
            <div v-show="yearPickerVisible" class="easy-form-year-picker">
              <div
                  v-for="year in yearRange"
                  :key="year"
                  class="easy-form-year-picker-item"
                  @click.stop="selectYear(year)"
              >
                {{ year }}
              </div>
            </div>
            <div v-show="monthPickerVisible" class="easy-form-month-picker"
                 style="display: flex;flex-wrap: wrap;cursor: pointer;padding:5px">
              <div
                  v-for="i in 12"
                  :key="'month-' + i"
                  class="easy-form-month-picker-item"
                  @click.stop="selectMonth(i - 1)"
              >
                {{ i }}月
              </div>
            </div>
            <div v-show="calendarList">
              <div class="easy-form-weekdays">
                <span v-for="day in weekdays" :key="day">{{ day }}</span>
              </div>
              <!--      月份的展示-->
              <div class="easy-form-days">
                <div v-for="i in [0,1,2,3,4,5]" :key="i" class="easy-form-days-row">
                  <button
                      v-for="day in daysInMonth.slice(i*7, i*7+7)"
                      :key="`${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`"
                      :class="{
                'easy-form-selected': day.getFullYear()===current.getFullYear() && day.getMonth()===current.getMonth() && day.getDate()===current.getDate(),
                'easy-form-today': day.getFullYear()===(new Date()).getFullYear() && day.getMonth()===(new Date()).getMonth() && day.getDate()===(new Date()).getDate(),
                'easy-form-other-month': day.getMonth() != current.getMonth(),
              }"
                      @click.stop="selectDay(day)"
                  >
                    <div>{{ day.getDate() }}</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="showType === 2">
            <div class="easy-form-picker-panel">
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
              </div>
              <div class="easy-form-hand-btn">
                <div class="easy-form-hand-now" @click.stop="confirmNow">此刻</div>
                <div class="easy-form-hand-ok" @click.stop="confirmSelection">确定</div>
              </div>
            </div>
          </div>
          <div class="easy-form-picker-panel" v-else>
            <div class="easy-form-picker-content">
              <div class="easy-form-picker-list am-pm-list" style="padding-top: 100px">
                <div
                    v-for="ampm in ['上午', '下午']"
                    :key="ampm"
                    :class="['easy-form-picker-cell', selectAmPm === ampm ? 'easy-form-picker-cell-active' : '']"
                    @click.stop="selectDataAmPm(ampm)"
                >
                  <span>{{ ampm }}</span>
                </div>
              </div>
            </div>
            <div class="easy-form-hand-btn">
              <div class="easy-form-hand-ok" @click.stop="confirmSelection">确定</div>
            </div>
          </div >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, defineProps, nextTick, PropType, ref, onMounted, onUnmounted, watch} from 'vue';
import SvgIcon from "../../package/svg-icon/index.vue";
import { isMobile} from '../utils'
import { eventBus } from '../eventBus'

const props = defineProps({
  title: {
    type: String,
    default: '日期'
  },
  isSelectTime: {
    type: Boolean,
    default: true
  },
  isHalfday: {
    type: Boolean,
    default: false
  },
  isGreaterNow:{
    type:Boolean,
    default:false
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
    type:String,
    default:'请选择'
  }
})

const emit = defineEmits(['update:modelValue', 'change']);
const current = ref<Date>(props.modelValue ? new Date(props.modelValue * 1000) : new Date());
const showCalendar = ref<boolean>(false);
const calendarList = ref<boolean>(false);
const showHeader = ref<boolean>(false);//头
const year = ref<number>(current.value.getFullYear());
const month = ref<number>(current.value.getMonth() + 1);
const yearPickerVisible = ref<boolean>(false);
const monthPickerVisible = ref<boolean>(false)
const isShowValue = ref<boolean>(props.modelValue !== undefined)
const isShowValueModal = computed(()=>props.modelValue !== undefined
)
const showType = ref<number>(1)
const bindValue = ref(props.modelValue)
const selectHour = ref<string | undefined>(bindValue.value !== undefined ?  new Date(bindValue.value * 1000).getHours().toString().padStart(2, '0') : '00');
const selectMinute = ref<string | undefined>(bindValue.value !== undefined ? new Date(bindValue.value * 1000).getMinutes().toString().padStart(2, '0') : '00');
const selectAmPm = ref<string>('上午');

const hourList = ref(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']);
const minuteAndSecond = ref(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']);

const yearRange = computed(() => {
  const startYear = year.value - 5;
  const endYear = year.value + 5;
  return Array(endYear - startYear + 1).fill(0).map((_, index) => startYear + index);
});

const weekdays = ref<string[]>([
  '日',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
]);

// 日历展示内容的逻辑
const daysInMonth = computed(() => {
  const currentDate = new Date(current.value.valueOf());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 获取当前月的第一天和最后一天
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // 获取当前月的天数
  const daysInCurrentMonth = lastDayOfMonth.getDate();

  // 获取当前月第一天是星期几 (0-6, 0=周日)
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 周日=0

  // 计算上个月需要显示的天数（从周日开始）
  const daysFromPrevMonth = firstDayOfWeek; // 直接使用，因为周日=0就是不需要，周一=1需要1天，等等

  // 计算下个月需要显示的天数 (总共42天 - 上个月天数 - 当前月天数)
  const daysFromNextMonth = 42 - daysFromPrevMonth - daysInCurrentMonth;

  // 生成日期数组
  const days: Date[] = [];

  // 添加上个月的日期
  if (daysFromPrevMonth > 0) {
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = daysFromPrevMonth; i > 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i + 1));
    }
  }

  // 添加当前月的日期
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    days.push(new Date(year, month, i));
  }

  // 添加下个月的日期
  for (let i = 1; i <= daysFromNextMonth; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
});

document.addEventListener('click', function () {
  showCalendar.value = false
})

const toggleYearPicker = () => {
  calendarList.value = false;
  yearPickerVisible.value = true;
  monthPickerVisible.value = false;
};

const toggleMonthPicker = () => {
  calendarList.value = false;
  monthPickerVisible.value = true;
  yearPickerVisible.value = false;
};

const selectYear = (selectedYear: number) => {
  monthPickerVisible.value = true;
  yearPickerVisible.value = false;
  year.value = selectedYear;
  emit('update:modelValue', current.value.valueOf());
};

const selectMonth = (selectedMonth: number) => {
  const newYear = month.value === 12 && selectedMonth === 0 ? year.value + 1 : (month.value === 0 && selectedMonth === 11 ? year.value - 1 : year.value);
  current.value = new Date(newYear, selectedMonth, 1); // 设置日期为所选月份的第一天
  month.value = selectedMonth + 1; // 更新显示的月份（注意: 这里的月份是用户界面的表示，从1开始）
  calendarList.value = true;
  monthPickerVisible.value = false;
  yearPickerVisible.value = false;
  emit('update:modelValue', current.value.valueOf());
};

const selectDay = (day: Date) => {
  current.value = day;
  month.value = day.getMonth() + 1;
  year.value = day.getFullYear();
  const d = day.getDate() > 9 ? current.value.getDate() : `0${current.value.getDate()}`
  isShowValue.value = true

  if (props.isSelectTime) {
    showType.value = 2
  }else if(props.isHalfday){
    showType.value = 3
  }else {
    const date = new Date(`${year.value}-${month.value}-${d}`)
    if(!props.isGreaterNow){
      emit('update:modelValue', Math.floor(date.getTime() / 1000));
    }else {
      if(Math.floor(date.getTime() / 1000) <= Math.floor(Date.now() / 1000)){
        emit('update:modelValue', Math.floor(date.getTime() / 1000));
      }else {
        emit('update:modelValue', Math.floor(date.getTime() / 1000));
      }
    }
    emit('change', Math.floor(date.getTime() / 1000));
    showCalendar.value = false;
  }
};

const formattedDate = computed(() => {
  if (isShowValue.value && isShowValueModal.value) {
    if (props.isSelectTime) {
      const m = month.value > 9 ? month.value : `0${month.value}`
      const d = current.value.getDate() > 9 ? current.value.getDate() : `0${current.value.getDate()}`
      return `${year.value}-${m}-${d} ${selectHour.value}:${selectMinute.value}`
    } else if (props.isHalfday) {
      const m = month.value > 9 ? month.value : `0${month.value}`
      const d = current.value.getDate() > 9 ? current.value.getDate() : `0${current.value.getDate()}`
      return `${year.value}-${m}-${d} ${selectAmPm.value ? selectAmPm.value : current.value.getHours() < 12? '上午' :'下午'}`
    } else {
      const m = month.value > 9 ? month.value : `0${month.value}`
      const d = current.value.getDate() > 9 ? current.value.getDate() : `0${current.value.getDate()}`
      return `${year.value}-${m}-${d}`
    }
  }
  return ''
});

const timestamp = ref<undefined | number>(undefined)

const preMonth = () => {
  if (month.value > 1) {
    month.value--;
    current.value = new Date(year.value, month.value - 1, 1);
  }
}

const preYear = () => {
  year.value--;
  current.value = new Date(year.value, month.value - 1, 1);
}

const nextMonth = () => {
  if (month.value < 12) {
    month.value++;
    current.value = new Date(year.value, month.value - 1, 1);
  }
}

const nextYear = () =>{
  year.value++;
  current.value = new Date(year.value, month.value - 1, 1);
}

function selectTime(type: string, val: string) {
  if (type === 'hour') {
    selectHour.value = val
  }
  if (type === 'minute') {
    selectMinute.value = val
  }
  if (selectHour.value !== undefined && selectMinute.value !== undefined) {
    isShowValue.value = true
    const date = new Date(formattedDate.value)
    timestamp.value = date.getTime()
    if(!props.isGreaterNow){
      emit('update:modelValue', Math.floor(timestamp.value / 1000))
    }else {
      if(Math.floor(timestamp.value / 1000) <= Math.floor(Date.now() / 1000)){
        emit('update:modelValue', Math.floor(timestamp.value / 1000));
      }else {
        emit('update:modelValue', Math.floor(timestamp.value / 1000));
      }
    }

  }
}

const selectDataAmPm = (ampm: string) => {
  selectAmPm.value = ampm;
  let hour = Number(selectHour.value);
  let minute = 0
  let seconds = 0
  if (ampm === '下午' && hour < 12) {
    hour = 23;
    minute = 59
    seconds = 59
  } else if (ampm === '上午' && hour >= 0) {
    hour = 0;
    minute = 0
    seconds = 0
  }
  const newDate = new Date(current.value);
  newDate.setHours(hour);
  newDate.setMinutes(minute);
  newDate.setSeconds(seconds);
  emit('update:modelValue', Math.floor(newDate.getTime() / 1000));
  emit('change', Math.floor(newDate.getTime() / 1000));
  if (ampm) {
    isShowValue.value = true
    const date = new Date(formattedDate.value)
    timestamp.value = date.getTime()
  }
};

const confirmSelection = () => {
  let hour = Number(selectHour.value);
  const newDate = new Date(current.value);
  if(props.isHalfday){
    let hour = Number(selectHour.value);
    let minute = 0
    let seconds = 0
    if (selectAmPm.value === '下午' && hour < 12) {
      hour = 23;
      minute = 59
      seconds = 59
    } else if (selectAmPm.value === '上午' && hour >= 0) {
      hour = 0;
      minute = 0
      seconds = 0
    }
    newDate.setHours(hour);
    newDate.setMinutes(minute);
    newDate.setSeconds(seconds)
  }else{
    newDate.setHours(hour);
    newDate.setMinutes(Number(selectMinute.value));
    newDate.setSeconds(0)
  }
  if(!props.isGreaterNow){
    emit('update:modelValue', Math.floor(newDate.getTime() / 1000));
  }else {
    if(Math.floor(newDate.getTime() / 1000) <= Math.floor(Date.now() / 1000)){
      emit('update:modelValue', Math.floor(newDate.getTime() / 1000));
    }else {
      emit('update:modelValue', Math.floor(newDate.getTime() / 1000));
    }
  }
  emit('change', Math.floor(newDate.getTime() / 1000));
  showCalendar.value = false;
  showType.value = 1
};

function confirmNow() {
  selectHour.value = new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`
  selectMinute.value = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`
  isShowValue.value = true
  showType.value = 1
  showCalendar.value = false
  const date = new Date(formattedDate.value)
  const timestamp = date.getTime()
  if(!props.isGreaterNow){
    emit('update:modelValue', Math.floor(timestamp / 1000))
  }else {
    if(Math.floor(timestamp / 1000) <= Math.floor(Date.now() / 1000)){
      emit('update:modelValue', Math.floor(timestamp / 1000));
    }else {
      emit('update:modelValue', Math.floor(timestamp / 1000));
    }
  }

  emit('change', Math.floor(timestamp / 1000))

}

const bottom = ref('auto')

function selectDate() {
  eventBus.emit('closeAllModals'); // 打开当前弹窗前关闭其他弹窗
  showCalendar.value = !showCalendar.value;
  calendarList.value = true;
  showHeader.value = true;
  monthPickerVisible.value = false;
  yearPickerVisible.value = false;
  bottom.value = 'auto'
  nextTick(() => {
    const viewportHeight = document.documentElement.clientHeight
    const inputHeight = document.querySelector('.easy-form-fill-input')?.getBoundingClientRect().height
    const rectData = document.querySelector('.easy-form-calendar')?.getBoundingClientRect()
    if (viewportHeight - (rectData?.top ?? 0) + (inputHeight ?? 0) < (rectData?.height ?? 0)) {
      bottom.value = `${inputHeight}px`
    } else {
      bottom.value = 'auto'
    }
  })
}

onMounted(() => {
  eventBus.on('closeAllModals', () => {
    showCalendar.value = false;
  });
});

onUnmounted(() => {
  eventBus.off('closeAllModals' , () => {
    showCalendar.value = false;
  });
});

watch(()=>showCalendar.value,(newValue)=>{
  if(!newValue){
    if(props.isSelectTime){
      emit('change',formattedDate.value ? Math.floor(new Date(formattedDate.value).getTime() / 1000) : undefined)
      emit('update:modelValue',formattedDate.value ? Math.floor(new Date(formattedDate.value).getTime() / 1000) : undefined)
    }
    if(props.isHalfday){
      const [date] = formattedDate.value.split(' ')
      let time = ''
      if(formattedDate.value.includes('上午')){
        time = `${date} 00:00`
      }else {
        time = `${date} 23:59`
      }
      emit('change',formattedDate.value ? Math.floor(new Date(time).getTime() / 1000):undefined)
      emit('update:modelValue',formattedDate.value ? Math.floor(new Date(time).getTime() / 1000):undefined)
    }
  }
})

</script>

<style lang="less" scoped>
.easy-form-box-content {
  font-size: 14px;
  color: var(--easy-form-color-text-component-1);
}

.easy-form-container-preview {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
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
    margin-top: 5px;
    padding: var(--easy-form-select-padding-component);
    background: var(--easy-form-input-bg-component-2);
    font-size: 14px;
    border: 1px dashed transparent;
    border-radius: 4px;
    color: var(--easy-form-color-text-component-1);

    &:focus {
      border: 1px solid blue; // 当input获得焦点时，边框消失
      outline: none; // 移除浏览器默认的焦点轮廓
      transition: border 0.3s ease;
    }
  }
}

.easy-form-calendar, .easy-form-calendar-mobile {
  position: absolute;
  border: 1px solid var(--easy-form-border-color-component-light-1);
  background-color: var(--easy-form-component-background);
  width: 330px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  z-index: 999;
  bottom: var(--easy-form-bottom);

  .easy-form-tabs {
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;

    .easy-form-tab {
      padding: 5px 10px;
      box-sizing: border-box;
      color: var(--easy-form-color-text-component-1);
      position: relative;
      cursor: pointer;

      &-active {
        color: #409eff;

        &:before {
          content: '';
          width: 100%;
          height: 1px;
          background: #409eff;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }

  .easy-form-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: var(--easy-form-background-component-1);
    border-bottom: 1px solid var(--easy-form-border-color-component-light-1);
    color: var(--easy-form-color-text-component-1);

    button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      margin: 0 5px;
    }

    .easy-form-month-picker, .easy-form-year-picker {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 5px;
      justify-content: space-between;
      cursor: pointer;
    }

    .easy-form-height-light {
      font-size: 15px;
      color: var(--easy-form-color-text-component-1);

      span {
        font-weight: bold;
      }

      &:hover {
        color: #007bff;
      }
    }
  }

  .easy-form-picker-panel {
    background-color: var(--easy-form-background-component-1);
    width: 100%;
    padding: 10px;
    border-top: 1px solid var(--easy-form-border-color-component-light-1);
    box-sizing: border-box;
    z-index: 1;

    .easy-form-picker-content {
      display: flex;
      border-bottom: 1px solid #ccc;
      margin-bottom: 11px;
      justify-content: space-between;
      height: 302px;

      .easy-form-picker-list {
        flex: 1;
        overflow-y: auto;
        margin: 5px 0;

        &::-webkit-scrollbar {
          width: 5px;
          height: 1px;
        }

        &::-webkit-scrollbar-thumb {
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

          &:hover {
            background: var(--easy-form-input-bg-component-2);
            color: #409eff;
          }
        }
      }
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
  }
}

.easy-form-month-picker button, .easy-form-year-picker {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  background-color: var(--easy-form-component-background);
  cursor: pointer;
}

.easy-form-calendar-mobile-container {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .6);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: end;
  z-index: 99;
}

.easy-form-calendar-mobile {
  position: static;
  width: 100vw;
}

.easy-form-year-picker-item, .easy-form-month-picker-item {
  padding: 8px;
  background-color: var(--easy-form-component-background);

  &:hover {
    color: #007bff;
  }
}

.easy-form-weekdays {
  display: flex;
  margin: 0 8px;
}

.easy-form-weekdays span {
  width: 14.28%;
  padding: 5px;
  text-align: center;
}

.easy-form-days {
  padding: 0px 14px 8px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: var(--easy-form-color-text-component-1);

  .easy-form-days-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;

    button {
      text-align: center;
      width: 10%;
      cursor: pointer;
      border: 1px solid transparent;
      background: transparent;
      aspect-ratio: 1;
      line-height: 0;
      font-size: 14px;
      position: relative;
      color: var(--easy-form-color-text-component-1);

      &:hover {
        color: #007bff;
      }

      &.easy-form-selected {
        background-color: #007bff;
        color: #fff;
        border-radius: 999px;
      }

      &.easy-form-today {
        font-weight: bold;
        border: 1px solid #007bff;
        border-radius: 999px;
      }

      &.easy-form-other-month {
        color: #ccc;
        cursor: not-allowed;
      }

      div {
        position: absolute;
        inset: 0;
        transform: translateY(50%);
      }
    }
  }

}

.easy-form-date-picker-input {
  width: 100%;
  position: relative;

  .easy-form-date-packer {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    margin: auto;
  }
}
</style>

