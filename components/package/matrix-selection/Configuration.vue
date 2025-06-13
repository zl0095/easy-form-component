<template>
  <div id="box" :class="{ 'easy-form-focused': isFocused }" class="easy-form-box">
    <div class="easy-form-content">
      <div class="easy-form-label">
        <div style="width: 70%;display: flex;align-items: center">
          <div class="easy-form-serial-number">
            <slot name="serial"></slot>
          </div>
          <div class="easy-form-fill-title-value">
            <input v-model="localTitle"
                   placeholder="请输入标题"
                   class="easy-form-box-content" type="text"
                   @blur="(e) => (isFocused = false,emit('blurTitle',localTitle,e))"
                   @focus="(e) => (isFocused = true,emit('focusTitle',localTitle,e))"
                   @input="(e)=>watchTitleInput(localTitle,e)">
            <SvgIcon name="clear" v-if="props.allowClear&&localTitle!==''" class="easy-form-clear-title"
                     @click="handleClear"/>
          </div>
        </div>
        <div class="easy-form-operation">
          <slot name="operation"></slot>
        </div>
      </div>
      <div class="easy-form-table-container"
           :style="{ maxWidth: '1027px', minWidth: '770px', minHeight: containerHeight + 'px', overflowX: 'auto' }">
        <table class="easy-form-table"
               :style="{ width: totalColumnsWidth > containerWidth ? 'max-content' : containerWidth + 'px' }">
          <tr v-if="props.modelValue.columns">
            <th v-for="(column, index) in modelValue.columns" :key="index"
                style="background: var(--easy-form-background-component-3);border: 1px solid #d8d8d8;text-align: center;">
              <input v-model="column.title" class="easy-form-editable easy-form-editable-header" type="text"/>
              <div class="easy-form-move" v-if="index !== 0">
                <SvgIcon name="more" class="easy-form-more" @click="showMoveTop = showMoveTop === index ? -1 : index"/>
                <div v-if="showMoveTop === index" class="easy-form-icon-buttons">
                  <div v-if="index !== 0" @click="moveColumnLeft(index)"
                       :class="{ 'easy-form-disabled': index === 1 || showMoveTop === -1 }">左移
                  </div>
                  <div @click="moveColumnRight(index)"
                       :class="{ 'easy-form-disabled': index === props.modelValue.columns.length - 1 || showMoveTop === -1 }">
                    右移
                  </div>
                  <div @click="deleteColumn(index)">删除</div>
                </div>
              </div>
            </th>
          </tr>
          <tr v-for="(row, rowIndex) in modelValue.data" :key="rowIndex">
            <td v-for="(column, columnIndex) in modelValue.columns" :key="columnIndex"
                :style="{ 'border': '1px solid #d8d8d8', 'text-align': 'center' }">
              <input v-if="columnIndex === 0" v-model="row.index" class="easy-form-editable" disabled
                     style="background: var(--easy-form-component-background);border: none" type="text">
              <template v-else>
                <input
                    type="radio"
                    :value="columnIndex"
                    :style="{ transform: 'scale(1.5)' }"
                    v-model="row.selected" />
              </template>
              <div v-if="columnIndex===0" class="easy-form-move">
                <SvgIcon name="more" class="easy-form-more" @click="showMoveTopHandler(rowIndex)"/>
                <div v-if="showMoveLeft === rowIndex && columnIndex === 0 && rowIndex !== currentOperation.rowIndex"
                     class="easy-form-icon-buttons" :style="{top: `${moveTop}px`}">
                  <div @click="moveRowUp(rowIndex)" :class="{ 'easy-form-disabled': rowIndex === 0 }">上移</div>
                  <div @click="moveRowDown(rowIndex)"
                       :class="{ 'easy-form-disabled': rowIndex === props.modelValue.data.length - 1 }">下移
                  </div>
                  <div @click="deleteRow(rowIndex)">删除</div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="easy-form-add" @click="addRow">
        <div class="easy-form-add-item">
          <SvgIcon name="add" class="easy-form-icon" color="#1677ff"/>
          <span>增加行</span>
        </div>
        <slot name="addRow"></slot>
      </div>
      <div class="easy-form-add easy-form-add-column" @click="addColumn">
        <div class="easy-form-add-item">
          <SvgIcon name="add" class="easy-form-icon" color="#1677ff"/>
          <span>增加列</span>
        </div>
        <slot name="addColumn"></slot>
      </div>
      <div class="easy-form-add easy-form-add-column" @click="showPopup = true">
        <div class="easy-form-add-item">
          <SvgIcon name="add" class="easy-form-icon" color="#1677ff"/>
          <span>批量增加</span>
        </div>
        <slot name="batchadd"></slot>
      </div>
      <p class="easy-form-set-switch" v-if="isRequiredShow">
        <span class="easy-form-tit">是否必填</span>
        <Switch size="small" @change="()=>emit('update:modelValue',propsModelValue)"
                v-model:checked="propsModelValue.required"></Switch>
      </p>
    </div>
    <!--  批量处理弹窗-->
    <Popup :visible="showPopup" title="批量增加" @close="handleClose" :width="400">
      <div class="easy-form-add">
        <div class="easy-form-add-item">
          <input v-model="batchRowCount" type="number" placeholder="批量添加行" class="easy-form-batch-input">
          <button @click="batchAddRows">批量添加行</button>
        </div>
        <slot name="addRow"></slot>
      </div>
      <div class="easy-form-add">
        <div class="easy-form-add-item">
          <input v-model="batchColumnCount" type="number" placeholder="批量添加列" class="easy-form-batch-input">
          <button @click="batchAddColumns">批量添加列</button>
        </div>
        <slot name="addRow"></slot>
      </div>
    </Popup>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, type PropType, ref, watch} from 'vue'
import SvgIcon from "@/package/svg-icon/index.vue";
import Switch from "@/package/common/Switch.vue";
import Popup from "@/package/popup/index";
import {Column, Row} from "./index";

const currentOperation = ref({rowIndex: -1, columnIndex: -1});
const isFocused = ref(false);
const showMoveTop = ref(-1)
const showMoveLeft = ref(-1)
const containerWidth = ref(770); // 假设容器宽度为800px
const containerHeight = ref(200); // 容器的固定高度
const totalColumnsWidth = ref(0); // 所有列的总宽度
const columnWidth = 200; // 每列的固定宽度
const batchRowCount = ref<number>(0); //批量添加行
const batchColumnCount = ref<number>(0);//批量添加列
const showPopup = ref(false); // 控制弹窗显示状态
const moveTop = ref(0); // 移动的距离

const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      placeholder: string;
      data: Row[];
      columns: Column[];
      required: boolean;
      error: string
    }>,
    default: () => ({
      title: '请填写以下内容',
      placeholder: '我是placehoder',
      data: [],
      columns: [],
      required: false,
      error: ''
    })
  },
  isRequiredShow: {
    type: Boolean,
    default: true
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: [Number, String],
    default: ''
  },
});

const emit = defineEmits(['blurTitle', 'focusTitle', 'inputTitle', 'update:data', 'update:columns', 'update:localTitle.value', 'update:modelValue'])
const localTitle = ref(props.modelValue.title);
const propsModelValue = ref({
  required: props.modelValue.required
})

function watchTitleInput(title: string, event: Event) {
  if (props.maxLength && title.length > parseInt(props.maxLength.toString(), 10)) {
    localTitle.value = title.substring(0, props.maxLength as number)
  }
  emit('update:modelValue', {...props.modelValue, title: localTitle.value});
  emit('inputTitle', localTitle.value, event)
}

// 添加列的函数
function addColumn() {
  const newColumn = {
    title: `选项${props.modelValue.columns.length}`,
    key: `fill${props.modelValue.columns.length}`,
  };
  props.modelValue.columns.push(newColumn);
  emit('update:columns', [...props.modelValue.columns]);
}

watch(() => props.modelValue.columns, () => {
  totalColumnsWidth.value = props.modelValue.columns.length * columnWidth;
}, {deep: true});

function addRow() {
  const newRow: Row = {index: `矩阵${props.modelValue.data.length + 1}`};
  props.modelValue.data.push(newRow);
  emit('update:data', [...props.modelValue.data]);
}

function moveColumnLeft(index: number) {
  if (index > 0 && index !== currentOperation.value.columnIndex) {
    const [movedColumn] = props.modelValue.columns.splice(index, 1);
    props.modelValue.columns.splice(index - 1, 0, movedColumn);
    emit('update:columns', [...props.modelValue.columns]);
    showMoveTop.value = -1;
  }
}

function moveColumnRight(index: number) {
  if (index < props.modelValue.columns.length - 1 && showMoveTop.value !== -1) {
    const [movedColumn] = props.modelValue.columns.splice(index, 1);
    props.modelValue.columns.splice(index + 1, 0, movedColumn);
    emit('update:columns', [...props.modelValue.columns]);
    showMoveTop.value = -1; // 重置
  }
}

function deleteColumn(index: number) {
  // 要删除列的 key
  const columnToDelete = props.modelValue.columns[index];
  if (!columnToDelete) {
    return;
  }
  const keyToDelete = columnToDelete.key;
  props.modelValue.columns.splice(index, 1);
  emit('update:columns', [...props.modelValue.columns]);
  props.modelValue.data.forEach(row => {
    if (keyToDelete in row) {
      delete row[keyToDelete];
    }
  });
  emit('update:data', [...props.modelValue.data]);
  showMoveTop.value = -1;
}

function moveRowUp(index: number) {
  if (index > 0 && index !== currentOperation.value.rowIndex) {
    const movedRow = props.modelValue.data.splice(index, 1)[0];
    props.modelValue.data.splice(index - 1, 0, movedRow);
    emit('update:data', [...props.modelValue.data]);
    showMoveLeft.value = -1
  }
}

function moveRowDown(index: number) {
  if (index < props.modelValue.data.length - 1 && index !== currentOperation.value.rowIndex) {
    const movedRow = props.modelValue.data.splice(index, 1)[0];
    props.modelValue.data.splice(index + 1, 0, movedRow);
    emit('update:data', [...props.modelValue.data]);
    showMoveLeft.value = -1
  }
}

function deleteRow(index: number) {
  props.modelValue.data.splice(index, 1);
  emit('update:data', [...props.modelValue.data]);
  showMoveLeft.value = -1
}

const handleClear = () => {
  localTitle.value = '';
  emit('update:modelValue', {...props.modelValue, title: ''});
};

// 列--更多操作
const showMoveTopHandler = (rowIndex: number) => {
  showMoveLeft.value = showMoveLeft.value === rowIndex ? -1 : rowIndex
  //当列表是最后一行且length>1或倒数第二行且length>2时，调整悬浮窗定位高度为-120
  if (props.modelValue.data.length - 1 === rowIndex && props.modelValue.data.length > 1 || props.modelValue.data.length - 2 === rowIndex && props.modelValue.data.length > 2) {
    moveTop.value = -120
  } else {
    moveTop.value = -10
  }
}

//批量添加行
const batchAddRows = () => {
  const count = batchRowCount.value;
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      const newRow: Row = {
        index: `矩阵 ${props.modelValue.data.length + 1}`,
        fill1: '',
        fill2: '',
      };
      props.modelValue.columns.forEach((column) => {
        if (column.key === 'index') {
          newRow.index = `矩阵 ${props.modelValue.data.length + 1}`;
        } else {
          newRow[column.key] = ''; // 这里假设每一列都有一个默认值 ''
        }
      });
      props.modelValue.data.push(newRow);
      emit('update:data', [...props.modelValue.data]);
    }
  }
};

//批量添加列
const batchAddColumns = () => {
  const count = batchColumnCount.value;
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      const newColumn = {
        title: `选项${(props.modelValue.columns?.length ?? 0)}`,
        key: `column_${(props.modelValue.columns?.length ?? 0)}`
      };
      props.modelValue.columns.push(newColumn);

      emit('update:columns', [...props.modelValue.columns]);
    }
  }
};

//关闭弹窗
const handleClose = () => {
  batchRowCount.value = 0;
  batchColumnCount.value = 0;
  showPopup.value = false;
}

</script>

<style lang="less" scoped>
.easy-form-focused {
  border-color: var(--easy-form-border-color-component-2) !important;
  transition: border-color 0.2s linear;
}

th,
td {
  width: 240px;
  padding: 8px;
  text-align: left;
  border: 1px solid black;
  height: 60px;
}

input[type='text'].easy-form-editable {
  box-sizing: border-box;
  width: 240px;
  height: 40px;
  color: var(--easy-form-color-text-component-1);
  text-align: center;
  background-color: var(--easy-form-component-background);
  border: 1px solid #d8d8d8;

  &:focus {
    outline: none;
  }

  &:hover {
    border: 1px dashed #ccc;
  }
}

input[type='text'].easy-form-editable-header {
  box-sizing: border-box;
  //width: 70%;
  height: 40px;
  background: var(--easy-form-background-component-3);
  border: none;
  border-radius: 4px;
}

.easy-form-move {
  position: relative;

  .easy-form-more {
    position: absolute;
    top: -26px;
    right: 0;
    cursor: pointer;
  }

  .easy-form-icon-buttons {
    position: absolute;
    top: 0;
    right: -10px;
    z-index: 999;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 80px;
    padding: 7px 12px;
    font-size: 13px;
    border: 1px solid #e8e8e8;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    transform-origin: center top;
    cursor: pointer;
    text-align: center;
    line-height: 22px;
    background-color: var(--easy-form-component-background);
    color: var(--easy-form-color-text-component-1);

    div {
      width: 100%;
      padding: 2px;
    }
  }
}

.easy-form-box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: var(--easy-form-item-padding-component);
  background-color: var(--easy-form-component-background);
  border: 1px solid transparent;
  border-radius: var(--easy-form-border-radius-component);
  outline: none;
  box-shadow: 0 6px 12px 0 rgb(0 0 0 / 10%);

  .easy-form-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .easy-form-serial-number {
      width: 35px;
      margin: auto;
    }

    .easy-form-fill-title-value {
      position: relative;
      flex: 1;

      .easy-form-clear-title {
        position: absolute;
        top: 12px;
        right: 9px;
      }
    }
  }

  .easy-form-box-content {
    width: 100%;
    padding: var(--easy-form-select-padding-component);
    color: var(--easy-form-color-text-component-1);
    font-size: 16px;
    background: var(--easy-form-input-bg-component);
    border: 1px dashed transparent;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
      border: 1px dashed #ccc;
    }

    &:focus {
      background: rgb(241 243 246 / 50%);
      border: 1px dashed transparent;
      outline: none;
    }
  }
}

.easy-form-add {
  margin-left: 35px;
}

.easy-form-content {
  width: 100%;
  overflow-x: auto;

  .easy-form-table-container {
    //width: 100%;
    margin-left: 35px;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;
  }

  .easy-form-table {
    width: max-content;
    width: 100%;
    height: 100%;
    border-collapse: collapse; //合并边框
  }

  .easy-form-table-container::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .easy-form-table-container::-webkit-scrollbar-thumb {
    background-color: #ccc; /* 滚动条颜色 */
    border-radius: 4px; /* 滚动条圆角 */
  }

  .easy-form-table-container::-webkit-scrollbar-track {
    background-color: transparent; /* 滚动条轨道颜色 */
  }
}

.easy-form-circle {
  width: 16px;
  height: 16px;
  margin: auto;
  border: 1px solid #aaa;
  border-radius: 50%;
  cursor: pointer;
}

.easy-form-disabled {
  color: #ccc;
  cursor: not-allowed;
}

//批量处理样式
/* 输入框样式 */
.easy-form-batch-input {
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  margin-right: 8px;
  color: var(--easy-form-color-text-component-1);
  background: var(--easy-form-input-bg-component);
}

.easy-form-batch-input:focus {
  border-color: #007BFF;
}

/* 按钮样式 */
.easy-form-add button {
  padding: 6px 12px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s ease;
}

.easy-form-add button:hover {
  background-color: #0056b3;
}
</style>