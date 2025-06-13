<template>
  <div id="box" class="easy-form-box">
    <div v-if="!isMobile()" class="easy-form-content"
         :style="{width:props.modelValue.columns.length<= 3 ? '60%' :'100%' }">
      <div class="easy-form-label">
        <slot name="serial" class="easy-form-serial-number"></slot>
        <div class="easy-form-single-fill-title-value">{{ localTitle }}</div>
      </div>
      <div class="easy-form-error" v-if="error !== ''">{{ error }}</div>
      <table class="easy-form-table">
        <tr v-if="props.modelValue.columns.length">
          <th v-for="(column, index) in props.modelValue.columns" :key="index" style="border:none;text-align: left">
            <input v-model="column.title" class="easy-form-editable easy-form-editable-header" disabled type="text"/>
          </th>
        </tr>
        <tr v-for="(row, rowIndex) in props.modelValue.data" :key="rowIndex">
          <td v-for="(column, columnIndex) in props.modelValue.columns" :key="columnIndex">
            <input v-if="columnIndex === 0" v-model="row.index" class="easy-form-editable" disabled
                   style="background: var(--easy-form-component-background);border: none" type="text">
            <template v-else>
              <span class="easy-form-star-rating" v-for="item in 5" :key="item"
                    @click="handleStarEvent(rowIndex, columnIndex, item)" @mouseenter="() => handleStarEvent(rowIndex, columnIndex, item)">
                     <SvgIcon  v-if="item <= (Number(row[column.key]) || 0)" name="evaluate_active" style="width: 15px;height: 15px" />
                     <SvgIcon v-else :height="15" :width="15" name="evaluate"></SvgIcon>
                </span>
            </template>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      <div class="easy-form-form-layout">
        <div class="easy-form-mobile-title">{{ props.modelValue.title }}</div>
        <div v-for="(row, rowIndex) in props.modelValue.data" :key="rowIndex" class="easy-form-row">
          <div class="easy-form-data-column">
            <label>{{ row.index }}</label>
          </div>
          <div v-for="(column, columnIndex) in props.modelValue.columns" :key="columnIndex" class="easy-form-cell"
               style="display: flex; flex-direction: column">
            <span v-if="columnIndex!==0" class="easy-form-column-title">{{ column.title }}</span>
            <div style="display: flex; flex-direction: row;" v-if="columnIndex!==0">
              <span class="easy-form-star-rating" v-for="item in 5" :key="item"
                    @click="handleStarEvent(rowIndex, columnIndex, item)" @mouseenter="() => handleStarEvent(rowIndex, columnIndex, item)">
                     <SvgIcon  v-if="item <= (Number(row[column.key]) || 0)" name="evaluate_active" style="width: 15px;height: 15px" />
                     <SvgIcon v-else :height="15" :width="15" name="evaluate"></SvgIcon>
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, type PropType, ref, reactive, onMounted, watch} from 'vue'
import {isMobile} from '../utils';
import SvgIcon from "../../package/svg-icon/index.vue";
import {Column, Row} from "./index";

const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string,
      placeholder: string,
      data: Row[],
      columns: Column[],
    }>,
    default: () => ({
      title: '请填写以下内容',
      placeholder: '我是placehoder',
      data: [],
      columns: [],
    })
  },
  rating: {
    type: Array,
    default: () => [],
  },
  error: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['update:rating'])
const localTitle = ref(props.modelValue.title)

const ratings = reactive(new Array(props.modelValue.data.length).fill(0).map(() => new Array(props.modelValue.columns.length).fill(0)))

// 处理星星点击事件
const handleStarEvent = (rowIndex: number, columnIndex: number, starIndex: number) => {
  let key = `fill${columnIndex}`
  props.modelValue.data[rowIndex][key] = starIndex;
};

onMounted(() => {
  watch(() => props.modelValue.data, (newData) => {
    ratings.length = newData.length;
    newData.forEach((_, rowIndex) => {
      ratings[rowIndex] = new Array(props.modelValue.columns.length).fill(0);
    });
  });
  watch(() => props.modelValue.columns, (newColumns) => {
    ratings.forEach((row) => {
      row.length = newColumns.length;
    });
  });
});
</script>

<style lang="less" scoped>
th,
td {
  padding: 12px 15px; // 增加内边距
  text-align: left;
  border-bottom: 1px solid #e1e1e1; // 底部边框
  &:last-child {
    border-right: none; // 最后一个单元格去掉右侧边框
  }
}

th {
  background-color: var(--easy-form-background-component-3);
  font-weight: bold;
  color: #333;
}

input[type="text"].easy-form-editable {
  border: 1px solid #d8d8d8;
  width: 200px;
  box-sizing: border-box;
  height: 32px;
  background-color: transparent;
  color: var(--easy-form-color-text-component-1);
  &:focus {
    outline: none;
    border-color: var(--easy-form-border-color-component-2) !important;
    transition: border-color 0.2s linear;
  }
}

input[type="text"].easy-form-editable-header {
  border: none;
  box-sizing: border-box;
  height: 32px;
  background-color: transparent;
  border-radius: 4px;
}

button {
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 5px;
}

.easy-form-move {
  position: relative;

  .easy-form-more {
    position: absolute;
    top: -26px;
    right: 0px;
    cursor: pointer;
  }

  .easy-form-icon-buttons {
    padding: 6px 4px;
    width: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #e8e8e8;
    background: white;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: -10px;
    transform-origin: center top;
    z-index: 1;
  }
}

.easy-form-box {
  height: 100%;
  background-color: var(--easy-form-component-background);
  border-radius: var(--easy-form-border-radius-component);
  outline: none;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 20px;
  overflow-x: auto;

  .easy-form-label {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    .easy-form-single-fill-title-value {
      position: relative;
      margin-bottom: 10px;

      .easy-form-clear-title {
        position: absolute;
        right: 9px;
        top: 12px;
      }
    }
  }
}

.easy-form-content {
  padding: 0 10px;

  .easy-form-table {
    width: calc(100% - 30px);
    border-collapse: collapse;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    overflow: hidden;
  }
}

.easy-form-mobile-title {
  font-size: 16px;
}

.easy-form-data-column {
  font-size: 15px;
  font-weight: 400;
  color: var(--easy-form-color-text-component-1);
  padding: 10px 0 5px 0;
}

.easy-form-column-title {
  font-size: 14px;
  padding: 10px 0;
}

.easy-form-editable-mobile {
  background: rgba(241, 243, 246, 0.5);
  border: none !important;
}

.easy-form-star-rating {
  display: inline-block;
  cursor: pointer;

  svg {
    transition: fill 0.3s ease;
  }
}

.easy-form-write {
  display: none;
}

.easy-form-active {
  display: inline-block;
  animation: shake 0.2s;
  animation-iteration-count: 1;
}

@keyframes shake {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }

  10%, 20% {
    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    -ms-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)
  }

  30%, 50%, 70%, 90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)
  }

  40%, 60%, 80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}

.easy-form-box-content {
  font-size: 16px;
  color: var(--easy-form-color-text-component-1);
  background: var(--easy-form-input-bg-component);
  border-radius: 4px;
}
</style>