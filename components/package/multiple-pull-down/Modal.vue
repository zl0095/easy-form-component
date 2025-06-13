<template>
  <div v-if="showModal" class="easy-form-edit-modal">
    <div class="easy-form-edit-content">
      <div class="easy-form-edit-top">
        <div class="easy-form-edit-top-title">编辑选项</div>
        <SvgIcon name="error" class="easy-form-icon" :width="15" :height="15" @click="() => (showModal = false)"/>
      </div>
      <div class="easy-form-select-container">
        <div v-for="(item, index) in initOptions" :key="index" class="easy-form-select-item">
          <p class="easy-form-title">{{ switchNum(index) }}级选项</p>
          <div v-for="(k, v) in item" :key="v" class="easy-form-option-item">
            <input v-model="k.label" :class="['easy-form-input', selected[index] === v ? 'easy-form-input-active' : '']"
                   type="text" @click="() => select(k, v, index)"/>
            <SvgIcon color="red" :width="20" :height="20" name="reduce" v-if="k.delete" class="easy-form-icon"
                     @click="() => deleteOption(index, k, v)"/>
          </div>
          <div class="easy-form-add" @click="() => addOption(index)">
            <SvgIcon name="add" :width="20" :height="20" color="#1677ff"/>
            <span class="easy-form-add-text">添加选项</span>
          </div>
        </div>
      </div>
      <div class="easy-form-edit-bottom">
        <div class="easy-form-cancel easy-form-button" @click="showModal = false">取消</div>
        <div class="easy-form-save easy-form-button"
             @click="() => (emit('update:options', initOptions[0]), (showModal = false))">保存
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {type PropType, ref} from 'vue';
import {ChildrenArr} from '@/interface';
import SvgIcon from "../../package/svg-icon/index.vue";

const props = defineProps({
  options: {
    type: Array as PropType<ChildrenArr[]>,
    default: () => [],
  },
});
const emit = defineEmits(['update:options']);
const initOptions = ref<ChildrenArr[][]>([]);
const selected = ref<number[]>([]);
const showModal = ref(false);

function switchNum(index: number) {
  switch (index) {
    case 0:
      return '一';
    case 1:
      return '二';
    case 2:
      return '三';
    default:
      return '四';
  }
}

function addChildren(data: ChildrenArr[]) {
  data.forEach((item, index) => {
    item.delete = false;
    if (item.children === undefined) {
      item.children = [];
    }
    if (item.children.length > 0 && Array.isArray(item.children)) {
      addChildren(item.children);
    }
  });
  return data;
}

function show() {
  selected.value = [];
  initOptions.value = [];
  showModal.value = true;
  initOptions.value.push(addChildren(JSON.parse(JSON.stringify(props.options))), [], [], []);
}

function addOption(index: number) {
  if (index === 0) {
    initOptions.value[index].push({label: `选项${initOptions.value[index].length + 1}`, children: [], delete: false});
  } else {
    initOptions.value[index - 1][selected.value[index - 1]]?.children?.push({
      label: `选项${initOptions.value[index].length + 1}`,
      children: [],
      delete: false,
    });
  }
}

function deleteOption(index: number, k: ChildrenArr, v: number) {
  initOptions.value[index].splice(v, 1);
  if (v > 0) {
    initOptions.value[index][v - 1].delete = true;
  }
}

function select(k: ChildrenArr, v: number, index: number) {
  if (index !== 3) {
    if (selected.value[index] === undefined) {
      selected.value.push(v);
    } else {
      selected.value[index] = v;
    }
    initOptions.value.forEach((m, n) => {
      if (n > index) {
        initOptions.value[n] = [];
        selected.value.splice(n);
      }
    });
    if (k.children) {
      initOptions.value[index + 1] = k.children;
    }
  }
  initOptions.value.forEach((m, n) => {
    if (m.length > 0) {
      m.forEach((i) => {
        i.delete = false;
      });
    }
  });
  k.delete = true;
}

defineExpose({
  show,
});
</script>

<style lang="less" scoped>
.easy-form-edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: var(--easy-form-background-component-6);

  .easy-form-edit-content {
    box-sizing: border-box;
    width: 900px;
    padding: 14px 0;
    background: var(--easy-form-component-background);
    border-radius: var(--easy-form-border-radius-component-1);

    .easy-form-edit-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 20px 14px;
      font-size: 16px;
      border-bottom: 1px solid var(--easy-form-border-color-component-1);

      .easy-form-edit-top-title {
        color: var(--easy-form-color-text-component-1);
      }

      .easy-form-icon {
        color: #aaa;
        cursor: pointer;
      }
    }

    .easy-form-select-container {
      display: flex;
      width: 100%;
      height: 488px;
      background: var(--easy-form-background-component-7);

      .easy-form-select-item {
        flex: 1;
        box-sizing: border-box;
        height: 100%;
        padding: 30px 20px;
        overflow-y: auto;
        border-right: 1px solid var(--easy-form-border-color-component-1);

        &::-webkit-scrollbar {
          width: 0;
        }

        .easy-form-title {
          margin-bottom: 20px;
          color: #707070;
          font-size: 14px;
        }

        .easy-form-option-item {
          position: relative;
          margin-bottom: 10px;

          .easy-form-input {
            box-sizing: border-box;
            width: 100%;
            height: 34px;
            padding: 0 12px;
            border: 1px solid #d8d8d8;
            border-radius: var(--easy-form-border-radius-component-1);
            outline: none;

            &:focus {
              border-color: var(--easy-form-primary-background-component);
            }

            &-active {
              border-color: var(--easy-form-primary-background-component);
            }
          }

          .easy-form-icon {
            position: absolute;
            top: -12px;
            right: -10px;
            z-index: 9;
            cursor: pointer;
          }
        }

        .easy-form-add {
          display: flex;
          align-items: center;
          cursor: pointer;

          .easy-form-add-text {
            margin-left: 5px;
            color: var(--easy-form-primary-background-component);
            font-size: 14px;
          }
        }

        &:nth-last-child(1) {
          border-right: none;
        }
      }
    }

    .easy-form-edit-bottom {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      padding: 20px 20px 0;
      font-size: 14px;

      .easy-form-button {
        box-sizing: content-box;
        width: 80px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #d8d8d8;
        cursor: pointer;

        &.easy-form-cancel {
          margin-right: 10px;
          color: var(--easy-form-color-text-component-5);
        }

        &.easy-form-save {
          color: #fff;
          background: var(--easy-form-primary-background-component);
          border-color: var(--easy-form-primary-background-component);
        }
      }
    }
  }
}
</style>
