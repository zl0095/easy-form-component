<template>
  <div id="box" class="easy-form-box">
    <div v-if="!isMobile()" class="easy-form-content"
         :style="{width:props.modelValue.columns.length<= 3 ? '60%' :'100%' }">
      <div class="easy-form-label">
        <slot name="serial" class="easy-form-serial-number"></slot>
        <div class="easy-form-fill-title-value">{{ localTitle }}</div>
      </div>
      <div class="easy-form-error" v-if="error !== ''">{{ error }}</div>
      <table class="easy-form-table">
        <tr v-if="props.modelValue.columns.length">
          <th v-for="(column, index) in props.modelValue.columns" :key="index">
            <input v-model="column.title" class="easy-form-editable easy-form-editable-header" disabled type="text"/>
          </th>
        </tr>
        <tr v-for="(row, rowIndex) in props.modelValue.data" :key="rowIndex">
          <td v-for="(column, columnIndex) in props.modelValue.columns" :key="columnIndex">
            <input v-if="columnIndex === 0" v-model="row.index" class="easy-form-editable" disabled
                   style="background: var(--easy-form-component-background);border: none" type="text">
            <input v-else v-model="row[column.key]" class="easy-form-editable" style='border: none;border-radius: 4px'
                   type="text">
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
               style="display: flex;flex-direction: column">
            <span v-if="columnIndex !== 0" class="easy-form-column-title">{{ column.title }}</span>
            <input v-if="columnIndex !== 0" v-model="row[column.key]"
                   class="easy-form-editable easy-form-editable-mobile" type="text">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, type PropType, ref} from 'vue';
import {isMobile} from '../utils';
import {Column, Row} from "./index";


const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string,
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
  error: {
    type: String,
    default: '',
  },
});

const localTitle = ref(props.modelValue.title);
</script>

<style lang="less" scoped>
th, td {
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
  //width: 100%;
  width: 200px;
  box-sizing: border-box;
  height: 32px;
  background-color: var(--easy-form-input-bg-component-2);
  color: var(--easy-form-color-text-component-1);

  &:focus {
    outline: none;
    border-color: var(--easy-form-border-color-component-2) !important;
    transition: border-color 0.2s linear;
  }
}

input[type="text"].easy-form-editable-header {
  border: none;
  width: 100%;
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
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
    border: 1px solid #e8e8e8;
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
  outline: none;
  border-radius: var(--easy-form-border-radius-component);
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 20px;

  .easy-form-label {
    width: 100%;
    display: flex;
    margin-bottom: 5px;

    .easy-form-fill-title-value {
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
  //width: 100%;
  padding: 0 10px;
  overflow: auto;

  .easy-form-table {
    width: calc(100% - 30px);
    border-collapse: collapse;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    overflow: hidden;
  }
}

.easy-form-mobile-title {
  font-size: 14px;
}

.easy-form-data-column {
  font-size: 15px;
  color: var(--easy-form-color-text-component-1);
  font-weight: 400;
  padding: 10px 0 5px 0;
}

.easy-form-column-title {
  font-size: 14px;
  padding: 10px 0;
  color: var(--easy-form-color-text-component-2);
}

.easy-form-editable-mobile {
  background: rgba(241, 243, 246, .5);
  border: none !important;
}

.easy-form-box-content {
  font-size: 16px;
  color: var(--easy-form-color-text-component-1);
  background: var(--easy-form-input-bg-component);
  border-radius: 4px;
}
</style>